<!-- @tracks
  src/devtools/runtime/validate/
  src/devtools/RuntimeDebugAPI.ts
  src/devtools/runtime/types.ts
-->

# Debugging a `.fmtion` at runtime

When an animation doesn't behave as authored, `window.FasterMotion.debug` is the read-channel for live runtime state. It works in any page that has loaded an FM bundle (UMD or ESM) and is the same API agents and humans use.

> Adjacent references: [`fmtion-format.md`](fmtion-format.md) for the file structure. [`port-types.md`](port-types.md) and [`param-types.md`](param-types.md) for the schemas that `debug.validate()` checks against.

## TL;DR

```js
const warnings = await FasterMotion.debug.validate();
for (const w of warnings) {
  console.error(`[${w.code}] ${w.severity} on node "${w.nodeId}": ${w.message}`);
}
```

Returns an array of `DebugWarning` objects. Each carries:

- `severity`: `'error' | 'warning' | 'info'`
- `code`: stable identifier — never changes once published, safe to assert / suppress on
- `message`: human-readable explanation including the offending node id and what to fix
- `nodeId`: which node triggered it (when scoped to one)

If the array is empty, every check passed. If a load-time error threw before validate() could run (e.g. `[graphWire] Output port 'X' not found …`), that's a different class — see [Load-time errors](#load-time-errors-not-validate-codes).

---

## API surface

`window.FasterMotion.debug` is a frozen object. Read methods:

| Method | Purpose |
|---|---|
| `validate()` | Run every lint check against the live graph. Async — returns `Promise<DebugWarning[]>`. **Start here.** |
| `validateFmtion(json)` | Run the same checks against a `.fmtion` JSON object before loading it. Useful in CI / pre-commit. |
| `errors()` | Recent runtime errors caught by FM (typed `DebugError[]`). Distinct from validate() — these are exceptions, not lint findings. |
| `nodes(filter?)` | Snapshot of every graph node — id, type, params, connections, last output values. Pass a filter (id substring, type, category) to narrow. |
| `pins()` | Every active scroll-pin — element, current phase, runway, computed flow geometry. |
| `inspect(selector)` | Match a CSS selector and report which graph nodes target it (writes, reads). Maps DOM → graph. |
| `scroll()` | Current scroll-driver state (scrollY, velocity, virtual position, registered scrollers). |
| `tick()` | Force a single Scheduler tick. Useful when you want to advance the graph by one frame in a paused state. |
| `dump()` | Full snapshot — `{ nodes, pins, errors, gates, overrides, validate }`. The "give me everything" call. |
| `gates()` | Decisions made by `activeWhen` gating at load time — which nodes were dropped and why. |
| `overrides()` | Decisions made by parameter-level overrides — which `set` paths applied or were rejected. |

Drive methods (mutate page state, then resolve once graphs settle):

| Method | Purpose |
|---|---|
| `scrollTo(target)` | Scroll the page programmatically; resolves after the resulting graph evaluations stabilize. |

Physics-runtime read methods (when a `physicsWorld` is in the graph):

| Method | Purpose |
|---|---|
| `physicsWorld()`, `physicsBody(id)`, `physicsBodyIds()`, `physicsBodyAt(x,y)`, `physicsBodyGeometry(id)`, `physicsCollisionLog()`, `physicsJoints()` | Direct introspection of the live physics simulation. |
| `physicsForceUnpause()` / `physicsRestorePause()` | Diagnose pause-related issues without restarting. |

The **definitive list** is the frozen `debug` object in [`faster-motion/src/devtools/RuntimeDebugAPI.ts`](https://github.com/FasterHQ/faster-motion/blob/main/src/devtools/RuntimeDebugAPI.ts). Everything in that object is on the public contract.

---

## When to call which

| You see / suspect | Use |
|---|---|
| "Animation doesn't run" | `validate()` first. Most authoring bugs match a stable code. |
| "Scroll trigger doesn't fire" | `validate()` (look for `SCROLL_TRIGGER_*`), then `scroll()` to inspect runway. |
| "Pin section vanishes / jumps" | `pins()` + `validate()` (`PIN_*` codes). |
| "Stagger writes go to the wrong elements" | `inspect(<selector>)` to map DOM → graph. |
| "I can't tell which node is firing" | `nodes({ type: 'someType' })` + `tick()` to step. |
| "Need a one-shot snapshot for a bug report" | `dump()` — paste the JSON. |
| "Want to gate this in CI before deploy" | `validateFmtion(json)` against the static JSON. |

---

## Warning code reference

All codes are **stable** — once published they never change semantics. New checks introduce new codes; old codes never silently widen. Source files live under [`src/devtools/runtime/validate/`](https://github.com/FasterHQ/faster-motion/tree/main/src/devtools/runtime/validate). Two file types:

- **Live graph checks** — walk the live `Graph` instance. File pattern `<topic>Checks.ts`.
- **Loader-time anchors** — codes emitted at LOAD time and folded into `validate()` output via the shared `_loaderWarnings` buffer. Anchor file pattern `<topic>Checks.ts` with no `out.push(...)` body.

### Wire integrity — `wireChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `DEAD_PORT_WIRE` | error | A connection wires to a port name that doesn't exist on the source node's metadata-declared outputs (or input names on the consuming side). Common cause: typo (`port: "progres"`), or a node-type's port was renamed without updating wires. | Check the per-node MD's Outputs / Inputs section for the canonical port name. The validator lists the valid set in the message. |

### Expressions — `expressionChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `EXPR_REFERENCES_MISSING_NODE` | error | An `expression` node's body calls `node('id')` for an `id` that doesn't exist in the graph. | Either fix the typo, or add the missing node. The expression won't evaluate until resolved. |

### Pins — `pinChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `PIN_TARGET_NO_MATCH` | error | The pin's `pinTarget` selector matches zero elements at bind time. | Verify the selector against the actual DOM at load. Add the class / element, or fix the selector. |
| `PIN_TARGET_INVALID_SELECTOR` | error | The selector is malformed (`querySelectorAll` threw). | CSS-selector syntax error — fix the string. |
| `PIN_NO_SPACING_NO_CONSUMER` | warning | `pinSpacing: 'none'` (or `false`) but no graph node consumes the pin's flow ports (`pinTargetFlowBottom`, `pinTargetFlowTop`, `scrollDistance`, `flowTop`, `flowBottom`, `phase`). After release, the target snaps back to its natural document position (often above viewport) and the section visually disappears. | Pick one: (a) leave `pinSpacing` at default `'margin'` so a spacer reserves the runway, (b) wire one of the flow ports into your post-release layout compensation, (c) accept the trade-off — the warning is suppressible if you've manually compensated. |

### Scroll triggers — `scrollChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `SCROLL_TRIGGER_NO_MATCH` | error | The scrollTrigger's `selector` matches zero elements at bind time. | Same as `PIN_TARGET_NO_MATCH` — verify selector vs DOM. |
| `SCROLL_TRIGGER_INVALID_SELECTOR` | error | Selector is malformed. | Fix CSS syntax. |
| `SCROLL_TRIGGER_OUT_OF_RUNWAY` | error | The element height + the configured `startEdge` / `endEdge` produce `startY >= endY` — progress can never reach 1. Common with `endEdge: "bottom top"` on short elements (gives only `elementHeight` of runway). | Use `endEdge: "bottom bottom"` for a runway of `elementHeight - viewportHeight`, or make the element taller. See [`param-types.md` — scroll edges](param-types.md#scroll-edges). |

### Stagger writers — `staggerChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `STAGGER_TARGET_NO_MATCH` | error | A stagger writer's `selector` matches zero elements. Likely the upstream `splitText` hasn't run yet, or the selector points at the wrong split-mode class. | Confirm `splitText` produces `.ft-split-char` / `.ft-split-word` / `.ft-split-line` based on its mode. Wire from `splitText.pieceSelector` (F357) instead of hardcoding the class. |
| `STAGGER_TARGET_INVALID_SELECTOR` | error | Selector is malformed. | Fix CSS syntax. |

### Transform writers — `transformWriterChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `MULTIPLE_TRANSFORM_WRITERS_SAME_COMPONENT` | error | Two or more nodes write the same transform component (e.g. both write `translateX`) on the same element. Last writer wins, but the result is non-deterministic across renders. | Combine into one `domPoseWrite` with multiple channels, or pick which writer should own the component. |
| `TRANSFORM_WRITER_INVALID_SELECTOR` | error | A transform writer's selector is malformed. | Fix CSS syntax. |

### Virtual scroll — `virtualScrollChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `VIRTUAL_SCROLL_TARGET_NO_MATCH` | error | `virtualScroll.selector` matches zero elements. | Verify selector. |
| `VIRTUAL_SCROLL_TARGET_INVALID_SELECTOR` | error | Selector malformed. | Fix CSS syntax. |
| `VIRTUAL_SCROLL_NATIVE_RUNWAY_LEAK` | warning | `virtualScroll` is active but the page still has native scrollable runway, which causes a fight between the two. Indicates `body { overflow: hidden }` (or equivalent) wasn't applied. | Apply the page-level overflow lock virtualScroll expects, or remove the native runway. |

### Physics — `physicsChecks.ts`, `physicsBoundWriterChecks.ts`

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `PHYSICS_NO_WORLD` | error | A physics body / joint / force is in the graph but no `physicsWorld` node anchors them. | Add a `physicsWorld` node. |
| `PHYSICS_MULTIPLE_WORLDS` | error | More than one `physicsWorld` in the same graph. Bodies can only belong to one world. | Remove the extras; consolidate. |
| `PHYSICS_BODY_REF_MISSING` | error | A node references a `bodyId` (or `pickedBodyIds`, etc.) that doesn't resolve to a registered body at bind time. | Confirm the body source — typo in id, or the body was filtered out by `activeWhen`. |
| `PHYSICS_PPM_INVALID` | error | Pixels-per-meter on `physicsWorld` is non-finite, ≤ 0, or absurdly small/large. Solver becomes unstable. | Use a reasonable value (default 100 px/m). |
| `PHYSICS_ARC_DEGENERATE` | error | A joint's arc / chain-link parameters produce a degenerate geometry (zero length, NaN). | Inspect the chain definition; ensure body positions and link lengths are real. |
| `PHYSICS_MOUSE_DRAG_NO_MATCH` | error | A `physicsMouseDrag` is wired but its target body / selector resolves to nothing. | Verify the selector / bodyId source. |
| `PHYSICS_JOINT_BODY_DISABLED` | error | A joint references a body that exists in the graph but has been gated off (e.g. by `activeWhen`). The joint is orphaned. | Either gate the joint with the same condition, or unwire the joint when bodies are inactive. |
| `PHYSICS_BOUND_DOUBLE_WRITER` | error | Two writers target the same physics body's transform. Same family of issue as `MULTIPLE_TRANSFORM_WRITERS_SAME_COMPONENT` but on the physics side. | Pick one owner of the physics body's pose. |
| `PHYSICS_STAGGER_OUT_OF_FRAME` | error | A `physicsBodyStagger` selector matches elements that live **outside** the world's `frameSelector`. Those elements still become physics bodies — usually the cause of phantom bodies that collide with the real fleet mid-air. | Tighten the selector — use an attribute (`[data-physics-x]`) or scope it through the frame (`<frame> <stagger>`). |
| `PHYSICS_STAGGER_GROSSLY_MISSIZED` | warning | Some elements matched by `physicsBodyStagger` have a visible BCR area dramatically off from the authored shape. Collider becomes the authored size; visual stays the BCR size — they don't line up. | Tighten the selector to exclude the off-size elements (legend swatches, icons, etc.), or accept the visual mismatch if intentional. |
| `PHYSICS_STAGGER_NO_FRAME_NO_GUARD` | warning | A single-class `physicsBodyStagger` selector with no `frameSelector` on the world to scope it. Any future DOM addition matching that class becomes a phantom physics body. | Set `frameSelector` on the `physicsWorld`, OR switch the stagger selector to an attribute (`[data-physics-…]`) / a scoped descendant. |

### `activeWhen` — `activeWhenChecks.ts` (loader-time)

This file is documentation-only. Codes emit from `src/loader/util/match-media.ts` via the load gate at `src/loader/phases/01b-active-when-gate.ts`.

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `ACTIVE_WHEN_INVALID_QUERY` | warning | A node's `activeWhen` field is a malformed CSS media query (e.g. `(min-widht: 900px)`). Detected via Chromium's "invalid query → media === ''" round-trip. The gate treats malformed queries as **always-active**, so the warning surfaces because the gate is silently ineffective until the typo is fixed. | Run the query through `window.matchMedia(query).media` in DevTools — if it returns an empty string, the query is malformed. |

### Parameter overrides — `paramOverridesChecks.ts` (loader-time)

Documentation-only. Codes emit from `src/loader/util/apply-param-overrides.ts`.

| Code | Severity | Cause | Fix |
|---|---|---|---|
| `OVERRIDE_INVALID_WHEN` | warning | An override's `when` field is missing, wrong type, or contains a malformed media query. Resolver treats malformed queries as always-match, so the override fires unintentionally on every breakpoint. | Fix the `when` syntax. |
| `OVERRIDE_INVALID_SET` | warning | `set` is not a flat object of path → value pairs (array, primitive, or null was supplied). The whole override is skipped. | Use a `Record<string, unknown>` for `set`. |
| `OVERRIDE_PATH_INVALID` | warning | A `set` key is malformed per the path grammar (segments must match `[A-Za-z_$-][A-Za-z0-9_$-]*` or `[N]` for numeric indices). The single assignment is skipped; other paths in the same `set` block still apply. | Fix the path. |
| `OVERRIDE_PATH_NOT_FOUND` | warning | A `set` path's intermediate or leaf segment doesn't exist on the resolved `params`. Likely a typo or a baseline missing the parent the override expected. | Add the parent in baseline params, or correct the path. |
| `OVERRIDE_PATH_TYPE_MISMATCH` | warning | A `set` value would replace a leaf with a different type bucket (e.g. array → null, object → scalar). Applied anyway — sometimes intentional ("disable this feature at this breakpoint by writing null") — but surfaced so unintentional shape changes are visible. | If unintentional, match the leaf's type. If intentional, suppress on the code. |
| `OVERRIDE_DUPLICATE_PATH_IN_SAME_BLOCK` | warning | Same path appears twice in one override's `set`. Standard JS object iteration only sees the last value — the runtime can never observe the first. | Remove the duplicate entry. |

---

## Reserved codes (planned, not yet emitted)

These are reserved per FM CLAUDE.md and will populate as the F367 v2 work lands. Don't assert on them yet:

- `PHYSICS_BODY_OFFSCREEN_FOREVER`
- `PHYSICS_JOINT_BODY_DISABLED` (already shipped — but planned to expand coverage)
- (additional physics v2 codes may join)

---

## Load-time errors (not validate codes)

Some failures throw during `FmtionLoader.load()` — before `validate()` has a graph to inspect. These appear as exceptions, not warnings. Most common:

| Throw site | Message shape | Cause |
|---|---|---|
| `graphWire()` | `[graphWire] Output port 'X' not found on source node 'id' (type 'T'). Available outputs: […]` | A wire's `port` doesn't match any output on the source node. Check the per-node MD's Outputs section. **The DEAD_PORT_WIRE validator covers the same class but only at validate-time — this throw fires earlier, mid-load, when the graph is being constructed.** |
| `graphWire()` | `[graphWire] Input port 'X' not found on target node …` | Same as above but on the target side. |
| `graphWire()` | `[graphWire] Module 'M' has no promoted input named 'P'` | A wire crosses a module boundary without going through a promoted port. Internal-loader bug; report to FM team. |
| `graphWire()` | `… references internal node 'maskClip-X' / 'pinAnchor-Y' / 'sceneRender' …` | Runtime error names a node type you don't recognise. Internal nodes are loader-emitted from authoring primitives — they're not in the per-node tree. See [`internal-nodes.md`](internal-nodes.md) for the lookup of each internal type and which authoring primitive emits it. |
| `FmtionPageLoader` | `Failed to load page file: <inner>` | An inner error during page load. The inner message points at the real cause. |

When you see one of these, `validate()` is not the tool — fix the underlying wire / structure first, then re-run.

---

## Integrating with an agent loop

Recommended sequence for an agent that just wrote a `.fmtion`:

1. **Pre-write**: faster-claude's `validateFmtion()` already runs `Ajv` schema + semantic checks. Catches typos in port names before write.
2. **Post-load**: load the file in a real page, then call `await FasterMotion.debug.validate()`.
3. **Diff**: compare codes against the previous run. New `error`-severity codes ⇒ regression. New `warning`-severity codes ⇒ probably regression but author may have accepted. New `info` ⇒ usually benign.
4. **Suppress / assert** on individual codes for known trade-offs (e.g. `PIN_NO_SPACING_NO_CONSUMER` when manual flow compensation is in place).

The codes list above is the entire current surface. When a check is added upstream, the doc generator's drift checker fires — see [Source of truth](#source-of-truth) below.

---

## Source of truth

This page tracks the codes actually emitted by `src/devtools/runtime/validate/*Checks.ts` plus the loader-anchored codes documented in `activeWhenChecks.ts` / `paramOverridesChecks.ts`. The doc generator runs a drift check on every regeneration: any `code: 'X'` literal in those files that isn't documented here triggers a build warning. New codes: add a row in the relevant section, then add the code to `WARNING_CODES_DOCUMENTED` in `scripts/generate-docs.mjs`.
