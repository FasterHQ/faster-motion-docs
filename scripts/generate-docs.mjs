#!/usr/bin/env node
/**
 * Generate docs from faster-motion NodeMetadata.ts
 *
 * Reads the TypeScript source, extracts NODE_METADATA via regex/eval,
 * and generates:
 *   - node-registry.json (machine-readable, for agents)
 *   - nodes/<category>/<type>.md (per-node docs)
 *   - nodes/<category>/README.md (category index)
 *   - nodes/README.md (master index)
 */

import { writeFileSync, mkdirSync, existsSync, rmSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { execFileSync } from 'child_process';

const FM_ROOT = join(dirname(new URL(import.meta.url).pathname), '../../faster-motion');
const DOCS_ROOT = join(dirname(new URL(import.meta.url).pathname), '..');
const METADATA_PATH = join(FM_ROOT, 'src/core/NodeMetadata.ts');

// ── Load NODE_METADATA via tsx ────────────────────────────────────────────
// Replaces a fragile regex/Function() preprocessor that broke on TypeScript
// type assertions (`as const`), unbalanced brackets inside string literals,
// and arbitrary computed initializers (e.g. `Array.from(...)`). tsx executes
// the real .ts file, so any expression the FM source can compile we get
// back as a real JS value.

let nodes;
try {
  const stdout = execFileSync(
    'npx',
    ['--no-install', 'tsx', '--eval',
      // FM is a CJS package (no "type": "module"), so tsx's dynamic
      // import returns `{ default: { NODE_METADATA, ... } }`. Read
      // through `default` and fall back to the named export for forward
      // compat if/when FM flips to ESM.
      `import('${METADATA_PATH}').then(m => process.stdout.write(JSON.stringify((m.default && m.default.NODE_METADATA) || m.NODE_METADATA)))`,
    ],
    { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'inherit'], maxBuffer: 32 * 1024 * 1024 },
  );
  nodes = JSON.parse(stdout);
} catch (e) {
  console.error('Failed to load NODE_METADATA via tsx:', e.message);
  process.exit(1);
}

console.log(`Parsed ${nodes.length} nodes from NodeMetadata.ts`);

// Filter out loader-generated internal nodes. These are materialized by
// loader phases from higher-level authoring primitives (e.g. MaskClipNode
// from the `maskId` string on objects) and are not authored directly. They
// belong in the FM runtime codebase, not in author-facing documentation
// per CLAUDE.md's "do not document internal FM implementation details".
const authoredNodes = nodes.filter(n => n.internal !== true);
const internalNodes = nodes.filter(n => n.internal === true);
if (internalNodes.length > 0) {
  console.log(`Filtered ${internalNodes.length} internal node(s) from author-facing docs: ${internalNodes.map(n => n.type).join(', ')}`);
}
nodes = authoredNodes;

// ── Category descriptions ─────────────────────────────────────────────────

const CATEGORY_DESCRIPTIONS = {
  'inputs': 'Nodes that read external signals into the graph: DOM events, mouse position, scroll progress, keyboard input, time, and other browser/device inputs.',
  'constraints': 'Position, rotation, and transform constraints that enforce spatial relationships between objects: follow, aim, distance clamp, drag, path follow, camera bounds.',
  'animation': 'Core animation primitives: timelines for playback control, tweens for A→B interpolation, keyframes for multi-stop curves, and stagger for per-element timing.',
  'state-machine': 'State machine evaluation: layer advance, pose blending (linear, masked, weighted), object pose evaluation, and blend space nodes.',
  'skeleton': 'Bone and skeleton rigging: per-bone FK transforms, IK solvers, bone collectors, spring/jiggle bone physics, chain dynamics, and FK recomposition.',
  'procedural': 'Time-driven procedural generators: wiggle, noise, oscillator, spring physics, modulate, ring delay, random values, and stagger drivers.',
  'math': 'Pure compute nodes: remap ranges, math expressions, utility operations (abs, clamp, round), smoothing, parallax offset, velocity calculation, string operations.',
  'integration': 'Graph composition and data flow: ForEach stamping, scene composition, parameter store read/write, float/value sources.',
  'paths': 'Path geometry read/write and modifiers: bend, wave, noise deform, trim, offset, boolean ops, wiggle path, round corners, repeater, conform, and more.',
  'falloff': 'Spatial weight fields that modulate deformer strength: linear ramp, radial distance, shape boundary, fractal noise, element index, and user-defined curve.',
  'solvers': 'Iterative solvers: value accumulation, mesh relaxation, distance constraint solving, rigid body physics (Planck.js/Box2D), and physics body readout.',
  'distribution': 'Point distribution generators: grid, circle, linear, random, fibonacci spiral, path sampling. Feed into Generator node to create object clones.',
  'text': 'Text animation nodes: split text into characters/words/lines, per-character wave/fade/spring/skew/distort transforms, coverage ranges for reveal effects.',
  'media': 'Media playback: audio tracks with RMS level output, Lottie animation control, DOM spritesheets, video sync, and WebGL video effects.',
  'effects': 'Visual effects: WASM/GPU filter chains, parametric shape generation, glitch computation, FLIP layout animation, and morph path interpolation.',
  'boundary': 'Scene I/O boundary: read/write object transforms and properties, DOM CSS/attribute writes, color writes, stagger writes, data writes.',
  'data': 'Data flow utilities: parameter actions (set, toggle, fire, increment), data source reads, and type casting between port types.',
  'attributes': 'AttributeBundle operations: read/write named attributes from bundles, extract single values by property name and index.',
  'bundles': 'Transform bundle infrastructure: time context, cycle clocks, and Mat4 transform bundle merge/mask operations.',
};

// ── Port type descriptions ────────────────────────────────────────────────

const PORT_TYPE_INFO = {
  'float': { description: 'Numeric value', default: '0' },
  'vec2': { description: 'Two-component vector `{x, y}`', default: '{x: 0, y: 0}' },
  'bool': { description: 'Boolean true/false', default: 'false' },
  'color': { description: 'RGBA color `{r, g, b, a}` (0-1 range)', default: '{r: 1, g: 1, b: 1, a: 1}' },
  'transform': { description: 'Full 2D transform `{x, y, rotation, scaleX, scaleY}`', default: '{x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1}' },
  'string': { description: 'Text string', default: '""' },
  'path': { description: 'Path geometry (SVG-like segments array)', default: 'empty path' },
  'attributes': { description: 'AttributeBundle — keyed Float32Array bundle for batch data (poses, bone transforms)', default: 'empty bundle' },
  'mat4Bundle': { description: 'Per-element 4x4 transform bundle (for text character transforms)', default: 'identity bundle' },
  'any': { description: 'Wildcard — accepts any type', default: 'undefined' },
  'attribute': { description: 'Single attribute channel from a bundle', default: 'empty' },
};

// ── Context classification (dom / canvas / shared) ────────────────────────
// Determined by what the node reads/writes: CSS selectors = DOM, objectId/bones = canvas

const DOM_NODES = new Set([
  'scrollInput', 'scrollTrigger', 'scrollPin', 'scrollProgress',
  'domPropertyWrite', 'domColorWrite', 'domStringWrite', 'staggerWrite',
  'eventListener', 'keyboardListener', 'pointer', 'observer',
  'mouseInput', 'mouseVelocity', 'distanceInput', 'dragInput',
  'alongPathCompute', 'morphCompute', 'scrambleCompute',
  'domSprite', 'lottie', 'videoEffect', 'flip',
  'glitchCompute', 'inputSource',
]);

const CANVAS_NODES = new Set([
  // Skeleton / bones
  'boneTransform', 'boneCollector', 'skeletonTransform', 'ikSolve', 'ikTarget',
  'fkRecompose', 'jiggleBone', 'springBonePhysics', 'chainPhysics',
  'boneAim', 'boneRender', 'boneMat4Bundle', 'boneJiggleCompute',
  // Scene objects
  'sceneTransform', 'sceneRender', 'objectPosition', 'objectPropertyRead',
  'positionWrite', 'transformRead', 'transformWrite', 'propertyWrite',
  'dataWrite', 'additivePropertyWrite', 'maskSync', 'camera',
  // Path on canvas objects
  'pathRead', 'pathWrite',
  // Canvas-specific
  'textSplit', 'textInput', 'textApply', 'textColorApply', 'textStrokeApply',
  'textStrokeWidthApply', 'textEffectApply', 'textDrawLayerIndexApply',
  'textScrambleApply', 'textSequence', 'splitText',
  // Generator / clones
  'generator', 'cloneSlot', 'instanceApply', 'instanceStaggerCompute',
  // Physics (canvas objects)
  'physicsWorld', 'physicsBodyRead',
  // Scene composition
  'sceneGraph',
  // SM nodes that reference animation clips/objects
  'poseEval', 'blendPose', 'maskedBlendPose',
  'objectPoseEval', 'objectBlend', 'objectMaskedBlend',
  'gradientDecompose', 'propertyMask',
  'layerAdvance', 'stateApply', 'smPropertyApply', 'smPostAdvance',
  'timelinePose', 'timelineState', 'smHitTest',
  'smAudioAction', 'smAudioBinding', 'smCallbackAction',
  'smParameterStore', 'listenerAction', 'resetMap', 'remapApply',
  'blendSpace1DEval', 'blendSpace2DEval', 'blendDirectEval',
  // WASM effect (canvas WebGL)
  'wasmEffect', 'parametricShape',
  // Particles (canvas)
  'particleEmitter', 'particleUpdate',
  // Layout (canvas)
  'layoutCompute',
  // Deformers (canvas objects)
  'meshDeform', 'skinnedPathDeform',
  // Bundles (canvas bone/transform data)
  'timeContext', 'cycleClock', 'transformBundleMerge', 'transformBundleMask',
]);

// Everything not in DOM_NODES or CANVAS_NODES is 'shared'
function getNodeContext(type) {
  if (DOM_NODES.has(type)) return 'dom';
  if (CANVAS_NODES.has(type)) return 'canvas';
  return 'shared';
}

// ── Validator-code drift check ────────────────────────────────────────────
// Walk faster-motion/src/devtools/runtime/validate/*.ts, collect every
// stable `code: 'X_Y'` literal, and assert each one is documented in
// debugging.md. When upstream introduces a new check, this surfaces it
// loudly. New codes: add a row to debugging.md, then append the code
// string here.

import { readdirSync as readdirSyncFs } from 'fs';

const VALIDATE_DIR = join(FM_ROOT, 'src/devtools/runtime/validate');
const validateCodes = new Set();
try {
  for (const f of readdirSyncFs(VALIDATE_DIR)) {
    if (!f.endsWith('.ts') || f === 'util.ts' || f === 'index.ts') continue;
    const src = readFileSync(join(VALIDATE_DIR, f), 'utf-8');
    // Live emissions: `code: 'X_Y'` inside a push() call.
    for (const m of src.matchAll(/code:\s*'([A-Z][A-Z0-9_]*)'/g)) {
      validateCodes.add(m[1]);
    }
    // Loader-time anchor docs: codes listed in the file header as
    //   `   - `CODE_NAME` —` (backtick-wrapped, hyphen separator).
    for (const m of src.matchAll(/`([A-Z][A-Z0-9_]+)`\s*—/g)) {
      validateCodes.add(m[1]);
    }
  }
} catch (e) {
  console.warn(`Could not scan validator dir: ${e.message}`);
}

const WARNING_CODES_DOCUMENTED = new Set([
  // Wire integrity
  'DEAD_PORT_WIRE',
  // Expression
  'EXPR_REFERENCES_MISSING_NODE',
  // Pins
  'PIN_TARGET_NO_MATCH', 'PIN_TARGET_INVALID_SELECTOR', 'PIN_NO_SPACING_NO_CONSUMER',
  // Scroll triggers
  'SCROLL_TRIGGER_NO_MATCH', 'SCROLL_TRIGGER_INVALID_SELECTOR', 'SCROLL_TRIGGER_OUT_OF_RUNWAY',
  // Stagger writers
  'STAGGER_TARGET_NO_MATCH', 'STAGGER_TARGET_INVALID_SELECTOR',
  // Transform writers
  'MULTIPLE_TRANSFORM_WRITERS_SAME_COMPONENT', 'TRANSFORM_WRITER_INVALID_SELECTOR',
  // Virtual scroll
  'VIRTUAL_SCROLL_TARGET_NO_MATCH', 'VIRTUAL_SCROLL_TARGET_INVALID_SELECTOR',
  'VIRTUAL_SCROLL_NATIVE_RUNWAY_LEAK',
  // Physics
  'PHYSICS_NO_WORLD', 'PHYSICS_MULTIPLE_WORLDS', 'PHYSICS_BODY_REF_MISSING',
  'PHYSICS_PPM_INVALID', 'PHYSICS_ARC_DEGENERATE', 'PHYSICS_MOUSE_DRAG_NO_MATCH',
  'PHYSICS_JOINT_BODY_DISABLED', 'PHYSICS_BOUND_DOUBLE_WRITER',
  'PHYSICS_STAGGER_OUT_OF_FRAME', 'PHYSICS_STAGGER_GROSSLY_MISSIZED',
  'PHYSICS_STAGGER_NO_FRAME_NO_GUARD',
  // Loader-time anchors
  'ACTIVE_WHEN_INVALID_QUERY',
  'OVERRIDE_INVALID_WHEN', 'OVERRIDE_INVALID_SET', 'OVERRIDE_PATH_INVALID',
  'OVERRIDE_PATH_NOT_FOUND', 'OVERRIDE_PATH_TYPE_MISMATCH',
  'OVERRIDE_DUPLICATE_PATH_IN_SAME_BLOCK',
]);

const undocumentedCodes = [...validateCodes].filter(c => !WARNING_CODES_DOCUMENTED.has(c));
const orphanDocumentedCodes = [...WARNING_CODES_DOCUMENTED].filter(c => !validateCodes.has(c));

if (undocumentedCodes.length > 0) {
  console.warn(`\n⚠ Validator codes missing from debugging.md: ${undocumentedCodes.join(', ')}`);
  console.warn(`Add a row to debugging.md and append the code to WARNING_CODES_DOCUMENTED.\n`);
}
if (orphanDocumentedCodes.length > 0) {
  console.warn(`\n⚠ debugging.md documents codes not present in faster-motion source: ${orphanDocumentedCodes.join(', ')}`);
  console.warn(`Either restore the check upstream or remove the row from debugging.md.\n`);
}

// ── Param-type drift check ────────────────────────────────────────────────
// Every `paramSchema[i].type` string used in NodeMetadata must be documented
// in param-types.md (either by name or by being in the basic-primitive set).
// When upstream introduces a new param type and forgets to update the doc,
// this surfaces it loudly. New types: add a section to param-types.md, then
// add the type string to PARAM_TYPES_DOCUMENTED here.

const PARAM_TYPES_DOCUMENTED = new Set([
  // Primitives
  'float', 'int', 'bool', 'string', 'enum', 'color', 'any',
  // Selectors and pickers
  'elementSelector', 'selectorList', 'objectPicker', 'bonePicker',
  'cssProperty', 'domEvent', 'axisChooser', 'eventTypeChooser', 'colorString',
  // Easing / expression
  'easingCurve', 'expression',
  // Channel maps
  'propertyAnimationChannels', 'staggerChannels', 'multiKeyframeChannels',
  'domVariablesChannels', 'meshAttractorChannels',
  'counterChannels', 'dockToChannels', 'indexedDockChannels',
  'textSequenceChannels', 'textStaggerChannels', 'textRevealChannels',
  'stringChannels',
  // Keyframes
  'clipPathKeyframes', 'colorKeyframes',
  // Geometry / physics / scroll
  'meshGeometrySource', 'physicsShape', 'scrollEdges',
  // Arrays and maps
  'floatArray', 'numberList', 'stringArray', 'attrMap', 'stringFloatMap',
  'colorPaletteStops',
  // State-machine sub-shapes
  'smParameters', 'smLayers', 'smListeners', 'smAudioBindings',
  'smPointerAlignTargets',
  // Compound-internal one-offs
  'textWaveRanges', 'textRevealVariants', 'staggerInnerTemplate',
  'variantStaggerTable', 'variantStaggerChannelMeta', 'domPoseProperties',
  // Existing carve-outs documented elsewhere or per-node
  'path', 'attributes',
]);

const undocumentedTypes = new Map();
for (const node of nodes) {
  for (const p of (node.paramSchema || [])) {
    if (!PARAM_TYPES_DOCUMENTED.has(p.type)) {
      if (!undocumentedTypes.has(p.type)) undocumentedTypes.set(p.type, []);
      undocumentedTypes.get(p.type).push(`${node.type}.${p.key}`);
    }
  }
}
if (undocumentedTypes.size > 0) {
  console.warn(`\n⚠ Param types missing from param-types.md:`);
  for (const [t, uses] of undocumentedTypes) {
    console.warn(`  - "${t}" — used by ${uses.slice(0, 3).join(', ')}${uses.length > 3 ? `, +${uses.length - 3} more` : ''}`);
  }
  console.warn(`Add a section to param-types.md and append the type to PARAM_TYPES_DOCUMENTED.\n`);
}

// ── Generate node-registry.json ───────────────────────────────────────────

const registry = {
  _generatedAt: new Date().toISOString().split('T')[0],
  _source: 'faster-motion/src/core/NodeMetadata.ts',
  _nodeCount: nodes.length,
  portTypes: PORT_TYPE_INFO,
  categories: {},
  nodes: {},
};

for (const node of nodes) {
  // Build category index
  if (!registry.categories[node.category]) {
    registry.categories[node.category] = {
      description: CATEGORY_DESCRIPTIONS[node.category] || '',
      nodes: [],
    };
  }
  registry.categories[node.category].nodes.push(node.type);

  // Build node entry. Surface the authored prose (tooltip / range / unit
  // / useCases / seeAlso / compound) — these already exist in
  // NodeMetadata and are the most useful per-node guidance.
  registry.nodes[node.type] = {
    displayName: node.displayName,
    category: node.category,
    context: getNodeContext(node.type),
    description: node.description,
    inputs: (node.ports?.inputs || []).map(p => {
      const entry = { name: p.name, type: p.type, label: p.label };
      if (p.tooltip) entry.tooltip = p.tooltip;
      if (Array.isArray(p.range) && p.range.length === 2) entry.range = p.range;
      if (p.unit) entry.unit = p.unit;
      return entry;
    }),
    outputs: (node.ports?.outputs || []).map(p => {
      const entry = { name: p.name, type: p.type, label: p.label };
      if (p.tooltip) entry.tooltip = p.tooltip;
      if (Array.isArray(p.range) && p.range.length === 2) entry.range = p.range;
      if (p.unit) entry.unit = p.unit;
      return entry;
    }),
    parameters: (node.paramSchema || []).map(p => {
      const entry = { key: p.key, label: p.label, type: p.type };
      if (p.tooltip) entry.tooltip = p.tooltip;
      if (p.options) entry.options = p.options.map(o => o.value);
      if (p.min !== undefined) entry.min = p.min;
      if (p.max !== undefined) entry.max = p.max;
      if (p.step !== undefined) entry.step = p.step;
      if (p.defaultValue !== undefined) entry.default = p.defaultValue;
      return entry;
    }),
    defaults: node.defaultParams || {},
    dynamicPorts: node.dynamicPorts || false,
    compound: node.compound || false,
    useCases: Array.isArray(node.useCases) ? node.useCases : [],
    seeAlso: Array.isArray(node.seeAlso) ? node.seeAlso : [],
  };
}

writeFileSync(
  join(DOCS_ROOT, 'node-registry.json'),
  JSON.stringify(registry, null, 2) + '\n',
);
console.log(`Written node-registry.json (${nodes.length} nodes)`);

// ── Generate per-node markdown ────────────────────────────────────────────

// Markdown tables can't contain literal `|` or unescaped newlines in cells.
// NodeMetadata tooltips occasionally contain both (they're prose). Sanitise
// here rather than asking authors to escape upstream.
function escapeMdCell(text) {
  if (text === undefined || text === null) return '';
  return String(text).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
}

function formatParamTable(paramSchema, defaults) {
  if (!paramSchema || paramSchema.length === 0) return '_No configurable parameters._';

  let md = '| Parameter | Type | Default | Description |\n';
  md += '|-----------|------|---------|-------------|\n';
  for (const p of paramSchema) {
    const def = defaults[p.key];
    let defStr = def !== undefined ? JSON.stringify(def) : '—';
    if (defStr.length > 30) defStr = defStr.slice(0, 27) + '...';
    // Prefer authored tooltip prose over the bare label — tooltips
    // explain wiring intent, value semantics, and footguns; labels are
    // just a UI string. Fall back to label when no tooltip exists.
    let desc = escapeMdCell(p.tooltip || p.label || '');
    if (p.options) {
      desc += '. Options: ' + p.options.map(o => `\`${o.value}\``).join(', ');
    }
    if (p.min !== undefined || p.max !== undefined || p.step !== undefined) {
      const parts = [];
      if (p.min !== undefined) parts.push(`min: ${p.min}`);
      if (p.max !== undefined) parts.push(`max: ${p.max}`);
      if (p.step !== undefined) parts.push(`step: ${p.step}`);
      desc += ` (${parts.join(', ')})`;
    }
    md += `| \`${p.key}\` | ${p.type} | \`${defStr}\` | ${desc} |\n`;
  }
  return md;
}

function formatPortTable(ports, direction) {
  if (!ports || ports.length === 0) return `_No ${direction}._`;
  let md = `| Port | Type | Description |\n`;
  md += `|------|------|-------------|\n`;
  for (const p of ports) {
    let desc = escapeMdCell(p.tooltip || p.label || '');
    // Range and unit sit in NodeMetadata as structured fields. Surface
    // them as a trailing parenthetical so an agent sees the expected
    // value envelope without grepping FM source.
    const meta = [];
    if (Array.isArray(p.range) && p.range.length === 2) {
      meta.push(`range: ${p.range[0]}..${p.range[1]}`);
    }
    if (p.unit) meta.push(`unit: ${p.unit}`);
    if (meta.length) desc += ` _(${meta.join(', ')})_`;
    md += `| \`${p.name}\` | \`${p.type}\` | ${desc} |\n`;
  }
  return md;
}

// Build a type → { category, displayName } map so seeAlso entries become
// real links. Populated once in generateNodeMd's caller and threaded
// through.
function buildTypeIndex(allNodes) {
  const idx = new Map();
  for (const n of allNodes) {
    idx.set(n.type, { category: n.category, displayName: n.displayName });
  }
  return idx;
}

function formatUseCases(useCases) {
  if (!Array.isArray(useCases) || useCases.length === 0) return '';
  let md = `## Use cases\n\n`;
  for (const uc of useCases) {
    // Use cases are prose — keep them as bullet items, no table escape
    // needed since markdown lists tolerate `|` and newlines fine.
    md += `- ${String(uc).trim()}\n`;
  }
  return md + '\n';
}

function formatSeeAlso(seeAlso, fromCategory, typeIndex) {
  if (!Array.isArray(seeAlso) || seeAlso.length === 0) return '';
  let md = `## See also\n\n`;
  for (const t of seeAlso) {
    const target = typeIndex.get(t);
    if (target) {
      const sameCat = target.category === fromCategory;
      const href = sameCat ? `${t}.md` : `../${target.category}/${t}.md`;
      md += `- [${target.displayName}](${href}) — \`${t}\`\n`;
    } else {
      // Unknown type — preserve the reference as a literal so the gap
      // is visible. Could be an internal node or a typo.
      md += `- \`${t}\` _(not in author-facing docs)_\n`;
    }
  }
  return md + '\n';
}

const CONTEXT_LABELS = {
  dom: 'DOM — operates on HTML elements via CSS selectors',
  canvas: 'Canvas — operates on canvas scene objects, bones, or skeletons',
  shared: 'Shared — works in both DOM and canvas graphs',
};

// ── Envelope reference ────────────────────────────────────────────────────
// Every node in a .fmtion shares this shape. The per-node sections (Inputs,
// Outputs, Parameters) describe what goes inside `connections` / `params`;
// the fields below apply to every node. Embedded VERBATIM on every node MD
// and in nodes/README.md so an agent reading any single page has the full
// picture without needing to click through to a sibling reference.
//
// Single source of truth — do not duplicate this content elsewhere.
// Canonical envelope: faster-motion/src/core/GraphNode.ts (SerializedGraphNode).
// activeWhen semantics: faster-motion/src/loader/phases/01b-active-when-gate.ts.

const ENVELOPE_SECTION = `## Envelope

Every node in a \`.fmtion\` file shares the same envelope shape. The per-node sections above describe the contents of \`params\` and the wires that go into \`connections\`; the fields here apply to **every** node, including this one.

\`\`\`json
{
  "id": "myUniqueNodeId",
  "type": "<nodeType>",
  "activeWhen": "(min-width: 768px)",
  "_note": "Why this node exists.",
  "params": { },
  "connections": { "input": { "nodeId": "...", "port": "..." } }
}
\`\`\`

| Field | Type | Required | Summary |
|-------|------|----------|---------|
| \`id\` | string | yes | Stable, unique within the graph. Other nodes' \`connections\` reference it. |
| \`type\` | string | yes | The node-type slug — the \`Type:\` line at the top of this page. |
| \`params\` | object | no | Per-node parameters. Every key is a row in the **Parameters** table above. |
| \`connections\` | object | no | Maps each input port (see **Inputs** above) to a \`{ nodeId, port }\` source. Use a \`[…]\` array of those for multi-wire inputs. |
| \`activeWhen\` | \`string \\| string[] \\| null\` | no | CSS-media-query gate. The node is **dropped from the graph at load** when the query doesn't match — different from a per-frame \`enabled\` port (load-time topology mutation, not runtime gating). String = single query; array = AND'd queries; \`"none"\` or \`null\` = never active. |
| \`_note\` | string | no | Free-text author comment. Preserved through the loader and visible in dev tools / inspector. The recommended place for "why" prose, since \`.fmtion\` JSON forbids real comments. |

\`activeWhen\` examples:

\`\`\`json
{ "activeWhen": "(min-width: 768px)" }
{ "activeWhen": ["(min-width: 768px)", "(prefers-reduced-motion: no-preference)"] }
{ "activeWhen": "none" }
\`\`\`

\`_note\` example:

\`\`\`json
{ "_note": "Drives hero parallax. Keep amp ≤ 0.4 to avoid layout shift at 1440px." }
\`\`\`
`;

// Sanity-check the envelope reference against SerializedGraphNode at
// generation time — if FM ever renames or removes a field this surfaces
// here instead of the docs silently going stale.
const ENVELOPE_FIELDS = ['id', 'type', 'params', 'connections', 'activeWhen', '_note'];
for (const field of ENVELOPE_FIELDS) {
  if (!ENVELOPE_SECTION.includes(`\`${field}\``)) {
    console.error(`Envelope reference is missing canonical field: ${field}`);
    process.exit(1);
  }
}

// ── "Used in" — demo links from faster-claude catalog mirror ──────────────
// faster-claude/catalog/animations/marketplace.meta.json is the curated
// list of QA'd, shipped animations (the ready-list filter from
// faster-motion's extract-animations pipeline). We walk it once, parse
// each .fmtion, and build an inverse index Map<nodeType, demoEntry[]>.
// Per-node MDs render that index as a "Used in" section so agents see
// every shipped animation that wires the node — with preview URL + the
// on-disk path inside the local faster-claude mirror they already have
// read access to.

const FASTER_CLAUDE_CATALOG = join(DOCS_ROOT, '..', 'faster-claude', 'catalog', 'animations');
const MARKETPLACE_META_PATH = join(FASTER_CLAUDE_CATALOG, 'marketplace.meta.json');

const usedInIndex = new Map(); // nodeType → Array<{name, slug, category, subcategory, complexity, description, fmtionPath, gitea, preview}>

function walkGraphNodes(parsed, visit) {
  const dom = parsed?.domGraph?.nodes;
  if (Array.isArray(dom)) for (const n of dom) visit(n);
  // Templates body — same loader treats their type field as the runtime
  // type, so include their refs too. Otherwise nodes that only ever
  // appear inside templates would have zero "Used in" entries.
  const tpls = parsed?.domGraph?.templates;
  if (tpls && typeof tpls === 'object') {
    for (const tpl of Object.values(tpls)) {
      if (Array.isArray(tpl?.nodes)) for (const n of tpl.nodes) visit(n);
    }
  }
  // Canvas graphs — second authoring surface for canvas-context nodes.
  const canvas = parsed?.canvas;
  if (Array.isArray(canvas)) {
    for (const area of canvas) {
      const ng = area?.graph?.nodes;
      if (Array.isArray(ng)) for (const n of ng) visit(n);
    }
  }
}

if (existsSync(MARKETPLACE_META_PATH)) {
  try {
    const manifest = JSON.parse(readFileSync(MARKETPLACE_META_PATH, 'utf-8'));
    const items = Array.isArray(manifest?.items) ? manifest.items : [];
    let scannedCount = 0;
    let parseFailures = 0;
    for (const item of items) {
      const fmtionRel = item?.preview?.config?.fmtion_file;
      if (typeof fmtionRel !== 'string') continue;
      const absPath = join(FASTER_CLAUDE_CATALOG, fmtionRel);
      if (!existsSync(absPath)) continue;
      let parsed;
      try {
        parsed = JSON.parse(readFileSync(absPath, 'utf-8'));
      } catch (_) {
        parseFailures += 1;
        continue;
      }
      scannedCount += 1;
      const seenTypes = new Set();
      walkGraphNodes(parsed, (n) => {
        if (typeof n?.type === 'string') seenTypes.add(n.type);
      });
      const entry = {
        name: item.name,
        slug: item.slug,
        category: item.category,
        subcategory: item.subcategory,
        complexity: item.complexity || 'unknown',
        description: (item.description || '').replace(/\s+/g, ' ').trim(),
        fmtionPath: `faster-claude/catalog/animations/${fmtionRel}`,
        // Public Gitea browse URL — humans + agents can both read.
        gitea: `https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/${fmtionRel.split('/').slice(0, -1).join('/')}/`,
        // Backend preview endpoint — returns a runnable HTML page that
        // wraps the .fmtion in the FM runtime. Same view the chat
        // modal serves on click.
        preview: `https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/${item.slug}`,
      };
      for (const t of seenTypes) {
        if (!usedInIndex.has(t)) usedInIndex.set(t, []);
        usedInIndex.get(t).push(entry);
      }
    }
    console.log(`Scanned ${scannedCount} animations from faster-claude catalog (${parseFailures} parse failures)`);
  } catch (e) {
    console.warn(`Could not read faster-claude catalog manifest: ${e.message}`);
  }
} else {
  console.warn(`faster-claude catalog not found at ${MARKETPLACE_META_PATH} — skipping "Used in" section emission.`);
}

const COMPLEXITY_RANK = { beginner: 0, moderate: 1, advanced: 2, unknown: 3 };

function formatUsedIn(type) {
  const entries = usedInIndex.get(type);
  if (!entries || entries.length === 0) return '';
  // Order: easiest first (so agents land on approachable examples), then
  // alphabetical by name for stable output. Cap visible at 10; everything
  // else collapsed into a "+N more" trailing line so the section doesn't
  // dominate pages where a node is heavily used.
  const sorted = [...entries].sort((a, b) => {
    const cmp = (COMPLEXITY_RANK[a.complexity] ?? 9) - (COMPLEXITY_RANK[b.complexity] ?? 9);
    return cmp !== 0 ? cmp : a.name.localeCompare(b.name);
  });
  const visible = sorted.slice(0, 10);
  const overflow = sorted.length - visible.length;

  let md = `## Used in\n\n`;
  md += `Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. `;
  md += `Each entry runs in production and is the QA'd reference for the pattern.\n\n`;
  md += `| Animation | Category | Complexity | Sources |\n`;
  md += `|-----------|----------|------------|---------|\n`;
  for (const e of visible) {
    const sources =
      `[preview](${e.preview}) · [\`${e.fmtionPath}\`](${e.gitea})`;
    const cat = [e.category, e.subcategory].filter(Boolean).filter((v, i, arr) => i === 0 || v !== arr[i - 1]).join(' / ');
    md += `| ${e.name} | ${cat} | ${e.complexity} | ${sources} |\n`;
  }
  if (overflow > 0) {
    md += `\n_…and ${overflow} more in the catalog._\n`;
  }
  md += '\n';
  return md;
}

// Hand-authored per-node supplement loader. Drop a file at
// `supplements/<type>.md` and the generator inlines it after the
// auto-generated sections, before the envelope. Useful for nodes whose
// behaviour needs prose the metadata can't carry — `expression` syntax,
// non-trivial param schemas, etc. Drift-checked via the same `@tracks`
// mechanism every other hand-authored doc uses.
const SUPPLEMENTS_DIR = join(DOCS_ROOT, 'supplements');
function readSupplement(type) {
  const path = join(SUPPLEMENTS_DIR, `${type}.md`);
  if (!existsSync(path)) return '';
  // Strip the leading <!-- @tracks ... --> block so it doesn't render
  // in the per-node MD; the block stays in the source file for the
  // drift checker to read.
  const raw = readFileSync(path, 'utf-8');
  return raw.replace(/^<!--\s*@tracks[\s\S]*?-->\s*\n?/, '').trim() + '\n\n';
}

function generateNodeMd(node, typeIndex) {
  const inputs = node.ports?.inputs || [];
  const outputs = node.ports?.outputs || [];
  const ctx = getNodeContext(node.type);

  let md = `# ${node.displayName}\n\n`;
  md += `**Type:** \`${node.type}\`  \n`;
  md += `**Category:** ${node.category}  \n`;
  md += `**Context:** ${CONTEXT_LABELS[ctx]}  \n`;
  if (node.dynamicPorts) md += `**Dynamic Ports:** Yes — ports may be added/removed at runtime  \n`;
  if (node.compound) md += `**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  \n`;
  md += `\n`;
  md += `${node.description}\n\n`;

  md += `## Inputs\n\n`;
  md += formatPortTable(inputs, 'inputs') + '\n\n';

  md += `## Outputs\n\n`;
  md += formatPortTable(outputs, 'outputs') + '\n\n';

  md += `## Parameters\n\n`;
  md += formatParamTable(node.paramSchema, node.defaultParams || {}) + '\n\n';

  md += formatUseCases(node.useCases);
  md += formatSeeAlso(node.seeAlso, node.category, typeIndex);

  md += formatUsedIn(node.type);

  md += readSupplement(node.type);

  md += ENVELOPE_SECTION;

  return md;
}

// Sweep the existing nodes/ tree before regenerating. The directory is
// 100% generator-owned (every file inside it is emitted below), so wiping
// upfront is the simplest way to keep the output deterministic — stale
// MDs for nodes that have since been renamed, removed, or flagged
// `internal: true` in NodeMetadata don't linger across runs. Idempotent
// in a clean tree (no-op when nodes/ doesn't exist).
const NODES_DIR = join(DOCS_ROOT, 'nodes');
rmSync(NODES_DIR, { recursive: true, force: true });

// Group nodes by category
const byCategory = {};
for (const node of nodes) {
  if (!byCategory[node.category]) byCategory[node.category] = [];
  byCategory[node.category].push(node);
}

// Type → { category, displayName } lookup, used by formatSeeAlso to
// build cross-category relative links into sibling node pages.
const typeIndex = buildTypeIndex(nodes);

// Write per-category directories and node files
for (const [cat, catNodes] of Object.entries(byCategory)) {
  const catDir = join(DOCS_ROOT, 'nodes', cat);
  mkdirSync(catDir, { recursive: true });

  // Category README
  let catMd = `# ${cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')} Nodes\n\n`;
  catMd += (CATEGORY_DESCRIPTIONS[cat] || '') + '\n\n';
  catMd += `| Node | Type | Context | Description |\n`;
  catMd += `|------|------|---------|-------------|\n`;
  for (const n of catNodes) {
    const ctx = getNodeContext(n.type);
    catMd += `| [${n.displayName}](${n.type}.md) | \`${n.type}\` | ${ctx} | ${n.description} |\n`;
  }
  writeFileSync(join(catDir, 'README.md'), catMd);

  // Per-node files
  for (const n of catNodes) {
    writeFileSync(join(catDir, `${n.type}.md`), generateNodeMd(n, typeIndex));
  }
}

// Drift-check hand-authored docs against their tracked FM source. Runs as
// a sub-process so a stale doc doesn't break the per-node regeneration —
// the signature mismatch surfaces as a warning at the end of the build.
try {
  const sigCheck = execFileSync('node',
    [join(DOCS_ROOT, 'scripts', 'check-doc-signatures.mjs')],
    { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] },
  );
  const sigLines = sigCheck.trim();
  if (sigLines) console.log('\n' + sigLines);
} catch (e) {
  // Non-zero exit is the drift signal — surface stdout/stderr verbatim.
  if (e.stdout) console.warn('\n' + e.stdout.toString().trim());
  if (e.stderr) console.warn(e.stderr.toString().trim());
}

// ── Internal-nodes reference ──────────────────────────────────────────────
// Loader-emitted internal nodes are filtered from author-facing per-node
// docs but DO leak into runtime errors, debug.validate() output, and
// debug.dump() snapshots. Agents debugging won't recognise them without
// a lookup. Emit a single page that names every internal node with its
// description sourced from NodeMetadata. Auto-generated — when upstream
// adds / removes / re-flags an internal node, this regenerates
// alongside the per-node tree.

const internalByCategory = {};
for (const n of internalNodes) {
  const cat = n.category || 'uncategorised';
  if (!internalByCategory[cat]) internalByCategory[cat] = [];
  internalByCategory[cat].push(n);
}

let internalMd = `# Internal nodes\n\n`;
internalMd += `These ${internalNodes.length} node types are **loader-emitted** — you do NOT author them in \`.fmtion\` files. They're filtered from the authoring picker and the per-node MD tree, but they DO appear in:\n\n`;
internalMd += `- Runtime error stacks (\`[graphWire] Module 'foo' references internal node 'maskClip-bar' …\`)\n`;
internalMd += `- \`debug.validate()\` output\n`;
internalMd += `- \`debug.dump()\` snapshots\n`;
internalMd += `- \`debug.nodes()\` filtered listings\n\n`;
internalMd += `When you see one of these in a runtime message, this page is the lookup: it tells you which authoring primitive caused the loader to emit it. The fix is always to edit the **authoring primitive** the description names, never the internal node — internal nodes are runtime plumbing.\n\n`;
internalMd += `> Adjacent reference: [\`debugging.md\`](debugging.md) for the warning-code catalog and \`debug.*\` API surface.\n\n`;

const internalCatOrder = Object.keys(internalByCategory).sort(
  (a, b) => internalByCategory[b].length - internalByCategory[a].length,
);
for (const cat of internalCatOrder) {
  const list = internalByCategory[cat];
  internalMd += `## ${cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')} (${list.length})\n\n`;
  internalMd += `| Type | Description |\n`;
  internalMd += `|------|-------------|\n`;
  for (const n of list.sort((a, b) => a.type.localeCompare(b.type))) {
    const desc = (n.description || '_(no description)_').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
    internalMd += `| \`${n.type}\` | ${desc} |\n`;
  }
  internalMd += `\n`;
}

internalMd += `## Source of truth\n\n`;
internalMd += `Auto-generated from \`faster-motion/src/core/NodeMetadata.ts\` — every entry with \`internal: true\`. This page regenerates whenever the per-node tree does. New internals appear here automatically; types removed upstream disappear on the next regen.\n`;

writeFileSync(join(DOCS_ROOT, 'internal-nodes.md'), internalMd);
console.log(`Written internal-nodes.md (${internalNodes.length} entries across ${internalCatOrder.length} categories)`);

// ── Compounds explainer + index ───────────────────────────────────────────
// Author-facing compounds (`compound: true` in NodeMetadata) are
// first-class authoring primitives that the loader expands at load time
// into a graph of underlying primitive nodes. Authors write the
// compound; the loader does the substitution. No runtime class for
// them. Auto-generated from NodeMetadata, like internal-nodes.md.

const COMPOUNDS_INTRO = `# Compounds

A **compound** is a graph node you author directly that the loader **expands at load time** into a small graph of primitive nodes. The compound carries higher-level intent — "stagger animation across these elements," "carousel with this slot effect," "state machine with these layers" — and the expander materialises the underlying nodes that actually run.

## Why they exist

Most non-trivial animation graphs share recurring shapes: a multi-channel CSS-property animation needs the same \`multiKeyframe + domPoseWrite\` chain every time; a per-character text animation needs \`splitText + staggerWrite\`; a state-machine button needs ~33 primitives. Compounds collapse those shapes into one author-facing node. The .fmtion file stays slim, the runtime topology stays explicit, and the FVE picker has a clean list.

## Authoring rules

- **Author the compound, not its internals.** Drop a \`propertyAnimation\` node in your graph; do NOT also drop the \`multiKeyframe\` + \`domPoseWrite\` it expands into.
- **Compound internals are not addressable from your graph.** A wire \`{ "nodeId": "myAnim/multiKeyframe", … }\` does not work. The loader picks internal-node ids — they're not part of your authoring surface. If you need to reach inside, the compound isn't the right primitive.
- **Expansion happens before \`debug.validate()\` runs.** When validate output references a node id you don't recognise, that's typically a compound's internal child — see [\`internal-nodes.md\`](internal-nodes.md) for the lookup of each internal type.
- **Compound + \`activeWhen\`** = the whole expanded sub-graph is dropped when the query doesn't match. Same for parameter \`overrides\` — they patch the compound's params before expansion.

## When NOT to use a compound

- You need a per-element graph branch with state — reach for [\`forEach\` + a \`templates\` instance](authoring-features.md#foreach--templates--instanceof-f351) instead. Compounds expand once with a single set of params; templates instantiate N times with per-iteration scope.
- You need to wire into the compound's internals — the abstraction is wrong for your case; drop down to primitives.
- Your shape doesn't match any compound — primitives are fine. Compounds are an ergonomic layer, not a requirement.

## All compounds

Below is every author-facing compound currently shipped. The "Expands into" detail is described in each compound's per-node MD and in the source (\`faster-motion/src/loader/expanders/compound-expanders/<type>.ts\`). Cross-link to the per-node MD via the type slug.

`;

const compoundNodes = nodes.filter(n => n.compound === true);
const compoundsByCategory = {};
for (const n of compoundNodes) {
  const cat = n.category || 'uncategorised';
  if (!compoundsByCategory[cat]) compoundsByCategory[cat] = [];
  compoundsByCategory[cat].push(n);
}

let compoundsMd = COMPOUNDS_INTRO;

const compoundCatOrder = Object.keys(compoundsByCategory).sort(
  (a, b) => compoundsByCategory[b].length - compoundsByCategory[a].length,
);
for (const cat of compoundCatOrder) {
  const list = compoundsByCategory[cat];
  compoundsMd += `## ${cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')} (${list.length})\n\n`;
  compoundsMd += `| Node | Type | Description |\n`;
  compoundsMd += `|------|------|-------------|\n`;
  for (const n of list.sort((a, b) => a.type.localeCompare(b.type))) {
    const desc = (n.description || '_(no description)_').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
    compoundsMd += `| [${n.displayName}](nodes/${cat}/${n.type}.md) | \`${n.type}\` | ${desc} |\n`;
  }
  compoundsMd += `\n`;
}

compoundsMd += `## Source of truth\n\n`;
compoundsMd += `Auto-generated from \`faster-motion/src/core/NodeMetadata.ts\` — every entry with \`compound: true\`. Each compound's expansion logic lives in \`faster-motion/src/loader/expanders/compound-expanders/<type>.ts\`. This page regenerates whenever the per-node tree does.\n`;

writeFileSync(join(DOCS_ROOT, 'compounds.md'), compoundsMd);
console.log(`Written compounds.md (${compoundNodes.length} entries across ${compoundCatOrder.length} categories)`);

// Master node index
let masterMd = `# Node Reference\n\n`;
masterMd += `All ${nodes.length} graph node types available in Faster Motion.\n\n`;
masterMd += `For machine-readable data, see [\`node-registry.json\`](../node-registry.json).\n\n`;
masterMd += `> Adjacent indexes: [\`compounds.md\`](../compounds.md) for the ${compoundNodes.length} author-facing compound nodes (with the rule on not wiring into their internals). [\`internal-nodes.md\`](../internal-nodes.md) for the ${internalNodes.length} loader-emitted nodes that surface in runtime errors but aren't author-facing.\n\n`;
masterMd += `> Most node pages carry a **Used in** section listing the shipped animations (\`faster-claude/catalog/animations/marketplace.meta.json\` — currently ${usedInIndex.size > 0 ? Math.max(...[...usedInIndex.values()].map(a => a.length)) : 0} max per node) that wire the node, with preview URLs and on-disk paths.\n\n`;
masterMd += `> Every per-node page below includes the same **Envelope** reference (\`id\`, \`type\`, \`activeWhen\`, \`_note\`, \`params\`, \`connections\`) — it's repeated verbatim on every node page so any single page is self-sufficient. The reference is also inlined immediately below for index browsing.\n\n`;
masterMd += ENVELOPE_SECTION + '\n';

const catOrder = Object.keys(byCategory).sort((a, b) => byCategory[b].length - byCategory[a].length);
for (const cat of catOrder) {
  masterMd += `## [${cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}](${cat}/)\n\n`;
  masterMd += (CATEGORY_DESCRIPTIONS[cat] || '') + '\n\n';
  masterMd += `| Node | Type | Context | Description |\n`;
  masterMd += `|------|------|---------|-------------|\n`;
  for (const n of byCategory[cat]) {
    const ctx = getNodeContext(n.type);
    masterMd += `| [${n.displayName}](${cat}/${n.type}.md) | \`${n.type}\` | ${ctx} | ${n.description} |\n`;
  }
  masterMd += '\n';
}

writeFileSync(join(DOCS_ROOT, 'nodes', 'README.md'), masterMd);
console.log(`Generated ${Object.keys(byCategory).length} category directories with ${nodes.length} node docs`);
