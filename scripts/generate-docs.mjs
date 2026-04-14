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

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const FM_ROOT = join(dirname(new URL(import.meta.url).pathname), '../../faster-motion');
const DOCS_ROOT = join(dirname(new URL(import.meta.url).pathname), '..');
const METADATA_PATH = join(FM_ROOT, 'src/core/NodeMetadata.ts');

// ── Read & parse NodeMetadata.ts ──────────────────────────────────────────

const source = readFileSync(METADATA_PATH, 'utf-8');

// Extract the array literal from `export const NODE_METADATA: NodeTypeDescriptor[] = [ ... ];`
const startMarker = 'export const NODE_METADATA: NodeTypeDescriptor[] = [';
const startIdx = source.indexOf(startMarker);
if (startIdx === -1) throw new Error('Could not find NODE_METADATA in source');

// Find matching closing bracket
let depth = 0;
let arrayStart = -1;
for (let i = startIdx + startMarker.length - 1; i < source.length; i++) {
  if (source[i] === '[') { depth++; if (arrayStart === -1) arrayStart = i; }
  if (source[i] === ']') { depth--; if (depth === 0) { var arrayEnd = i + 1; break; } }
}

let arrayStr = source.slice(arrayStart, arrayEnd);

// Clean up TypeScript artifacts for eval:
// - Remove single-line comments (// ...)
arrayStr = arrayStr.replace(/\/\/[^\n]*/g, '');
// - Remove Infinity/-Infinity (not valid JSON, replace with large number)
arrayStr = arrayStr.replace(/-?Infinity/g, '99999');
// - Wrap unquoted keys in quotes for JSON
// Actually, let's use Function() to evaluate it as JS since it uses JS object literals
const evalStr = `return ${arrayStr}`;
let nodes;
try {
  nodes = new Function(evalStr)();
} catch (e) {
  console.error('Failed to parse NODE_METADATA:', e.message);
  process.exit(1);
}

console.log(`Parsed ${nodes.length} nodes from NodeMetadata.ts`);

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

  // Build node entry
  registry.nodes[node.type] = {
    displayName: node.displayName,
    category: node.category,
    context: getNodeContext(node.type),
    description: node.description,
    inputs: (node.ports?.inputs || []).map(p => ({
      name: p.name,
      type: p.type,
      label: p.label,
    })),
    outputs: (node.ports?.outputs || []).map(p => ({
      name: p.name,
      type: p.type,
      label: p.label,
    })),
    parameters: (node.paramSchema || []).map(p => {
      const entry = { key: p.key, label: p.label, type: p.type };
      if (p.options) entry.options = p.options.map(o => o.value);
      if (p.min !== undefined) entry.min = p.min;
      if (p.max !== undefined) entry.max = p.max;
      if (p.step !== undefined) entry.step = p.step;
      if (p.defaultValue !== undefined) entry.default = p.defaultValue;
      return entry;
    }),
    defaults: node.defaultParams || {},
    dynamicPorts: node.dynamicPorts || false,
  };
}

writeFileSync(
  join(DOCS_ROOT, 'node-registry.json'),
  JSON.stringify(registry, null, 2) + '\n',
);
console.log(`Written node-registry.json (${nodes.length} nodes)`);

// ── Generate per-node markdown ────────────────────────────────────────────

function formatParamTable(paramSchema, defaults) {
  if (!paramSchema || paramSchema.length === 0) return '_No configurable parameters._';

  let md = '| Parameter | Type | Default | Description |\n';
  md += '|-----------|------|---------|-------------|\n';
  for (const p of paramSchema) {
    const def = defaults[p.key];
    let defStr = def !== undefined ? JSON.stringify(def) : '—';
    if (defStr.length > 30) defStr = defStr.slice(0, 27) + '...';
    let desc = p.label;
    if (p.options) {
      desc += '. Options: ' + p.options.map(o => `\`${o.value}\``).join(', ');
    }
    if (p.min !== undefined || p.max !== undefined) {
      const parts = [];
      if (p.min !== undefined) parts.push(`min: ${p.min}`);
      if (p.max !== undefined) parts.push(`max: ${p.max}`);
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
    md += `| \`${p.name}\` | \`${p.type}\` | ${p.label} |\n`;
  }
  return md;
}

const CONTEXT_LABELS = {
  dom: 'DOM — operates on HTML elements via CSS selectors',
  canvas: 'Canvas — operates on canvas scene objects, bones, or skeletons',
  shared: 'Shared — works in both DOM and canvas graphs',
};

function generateNodeMd(node) {
  const inputs = node.ports?.inputs || [];
  const outputs = node.ports?.outputs || [];
  const ctx = getNodeContext(node.type);

  let md = `# ${node.displayName}\n\n`;
  md += `**Type:** \`${node.type}\`  \n`;
  md += `**Category:** ${node.category}  \n`;
  md += `**Context:** ${CONTEXT_LABELS[ctx]}  \n`;
  if (node.dynamicPorts) md += `**Dynamic Ports:** Yes — ports may be added/removed at runtime  \n`;
  md += `\n`;
  md += `${node.description}\n\n`;

  md += `## Inputs\n\n`;
  md += formatPortTable(inputs, 'inputs') + '\n\n';

  md += `## Outputs\n\n`;
  md += formatPortTable(outputs, 'outputs') + '\n\n';

  md += `## Parameters\n\n`;
  md += formatParamTable(node.paramSchema, node.defaultParams || {}) + '\n';

  return md;
}

// Group nodes by category
const byCategory = {};
for (const node of nodes) {
  if (!byCategory[node.category]) byCategory[node.category] = [];
  byCategory[node.category].push(node);
}

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
    writeFileSync(join(catDir, `${n.type}.md`), generateNodeMd(n));
  }
}

// Master node index
let masterMd = `# Node Reference\n\n`;
masterMd += `All ${nodes.length} graph node types available in Faster Motion.\n\n`;
masterMd += `For machine-readable data, see [\`node-registry.json\`](../node-registry.json).\n\n`;

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
