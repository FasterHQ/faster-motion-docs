<!-- @tracks
  src/core/nodes/ExpressionNode.ts
  src/core/nodes/expressionUtils.ts
  src/core/expressions/ExpressionScope.ts
-->

## Expression syntax

`expression` evaluates a JavaScript expression once per frame, returning a single float on the `value` output. The body is compiled at load time inside a strict-mode `Function` with an explicit, fixed scope — no globals, no DOM, no async.

### Basic shape

```json
{
  "id": "wave",
  "type": "expression",
  "params": { "expression": "Math.sin(time * 2) * 0.5" }
}
```

Any expression that doesn't reference `node()` / `param()` is a "root" — it stands on its own and only depends on time + scope variables.

### Pulling values from other graph nodes — `node('id')`

To read another node's output, call `node('<id>')` in the body. Then add a `connections.upstream_<id>` wire pointing at the source node + port. **The wire is required** — `node('foo')` without a corresponding `upstream_foo` connection reads as `0` and the validator emits **`EXPR_REFERENCES_MISSING_NODE`** at runtime.

```json
{
  "id": "playheadExpr",
  "type": "expression",
  "params": { "expression": "node('p') / 800 + 0.5 + node('o')" },
  "connections": {
    "upstream_p": { "nodeId": "vScroll", "port": "position" },
    "upstream_o": { "nodeId": "kbdNav", "port": "iterationOffset" }
  }
}
```

The naming convention is structural: every `node('X')` reference becomes a port `upstream_X` on the expression node. Author-side: write the body, then list the wires. Multiple references to the same id share one port.

### Reading parameters — `param('name')`

Same shape, prefix `param_`. Reads from the wired parameter source (typically a parameter store node bound to a root-level `parameters.<name>` declaration).

```json
{
  "params": { "expression": "param('hover-strength') * node('progress')" },
  "connections": {
    "param_hover-strength": { "nodeId": "params", "port": "hover-strength" },
    "upstream_progress":    { "nodeId": "scroll", "port": "progress" }
  }
}
```

### Scope variables (no wiring needed)

These are injected automatically — call them directly in the expression. Their values come from the graph context, the `forEach` element context, or FM's runtime clock.

| Name | Type | Source |
|---|---|---|
| `time` | seconds since start | `context.elapsed` |
| `deltaTime` | seconds since last frame | `context.deltaTime` |
| `frame` | integer frame counter | `context.frame` |
| `quality` | 0..1 quality dial | `context.quality` |
| `index` | per-clone 0-based index inside a `forEach` | `elementContext.index` (falls back to params) |
| `count` | total clone count | `elementContext.count` (falls back to params) |
| `normalized` | `index / (count - 1)` | element context |
| `parentIndex` / `parentCount` / `parentNormalized` | nested-`forEach` parent values | element context |
| `positionX` / `positionY` / `positionRotation` / `positionScale` | per-clone CSS-derived position | element context |

### Built-in math + helpers

| Identifier | Signature | Purpose |
|---|---|---|
| `Math` | the standard JS `Math` object | `Math.sin`, `Math.cos`, `Math.PI`, `Math.min`, `Math.floor`, `Math.pow`, etc. — anything on `Math` works. |
| `clamp(v, min, max)` | float | Clamp `v` into `[min, max]`. |
| `lerp(a, b, t)` | float | `a + (b - a) * t`. |
| `linear(t, tMin, tMax, vMin, vMax)` | float | Clamped linear remap of `t` from `[tMin, tMax]` into `[vMin, vMax]`. |
| `noise(x)` | float in `[-1, 1]` | 1D smooth value noise. Deterministic from `x` — pair with `time` for time-varying noise (`noise(time * 2.5)`). |
| `audio(trackId, source)` | float | Reads a level / channel from a registered audio track. `trackId` is the asset id; `source` is one of the track's exposed channels. |
| `prop(name)` | KeyframeAccessor | Cross-property access — read another animated property's keyframe curve. Used by expression-driven animation channels. |
| `velocity(name)` | float | Rate of change of another property at the current time, in property-units per second. |
| `speed(name)` | float | `Math.abs(velocity(name))`. |

### Common patterns

```js
// Phase-shift per clone — every clone rides a different fraction of one progress signal
"(node('progress') + index / count) % 1"

// Threshold gate — output a one-frame pulse when value crosses 0.5 going up
"node('progress') > 0.5 ? 1 : 0"

// Ease-in-out via Hermite (sine.inOut without Math.sin)
"(t => t * t * (3 - 2 * t))(node('progress'))"

// Bell envelope (0 → 1 → 0 over progress)
"Math.sin(Math.PI * node('progress'))"

// Modulo wrap for infinite carousel position into [0,1)
"((node('p') % 1) + 1) % 1"

// Live frame count modulo — picks an active slot from N elements that may be added/removed
"((Math.round((node('p') - 0.5) * node('n')) % node('n')) + node('n')) % node('n')"

// Time-driven sine wiggle
"Math.sin(time * 2) * 0.08"

// Velocity-triggered scale pulse
"1 + speed('translateY') * 0.001"
```

### Constraints

- **Single float output.** The expression must evaluate to a finite number. Non-number results (strings, arrays, NaN, Infinity) are silently dropped — the previous frame's `value` persists.
- **No statements.** The body is a single expression — not a function body. To use locals, wrap in an IIFE: `(() => { const x = …; return x; })()`. Real .fmtion files use this pattern for time-windowed cycles.
- **Forbidden tokens trigger compile-time rejection.** The expression's source is regex-scanned before compilation; any of these words appearing in the body causes the node to fail to compile and `console.error` (no value emitted): `constructor`, `__proto__`, `prototype`, `globalThis`, `window`, `document`, `self`, `eval`, `Function`, `importScripts`, `XMLHttpRequest`, `fetch`, `WebSocket`, `require`, `import`, `process`. The check is conservative — it matches as a word boundary, so a JSON property called `prototype` inside a comment will also trip it.
- **No DOM, no globals, no fetch, no async.** Strict-mode `Function` constructor with the scope explicitly enumerated; everything else is unreachable.
- **Validator coverage.** `EXPR_REFERENCES_MISSING_NODE` fires post-load when a `node('id')` ref doesn't resolve. See [`debugging.md`](../debugging.md).

### When to use this vs other nodes

| You want | Use |
|---|---|
| `(progress + index / count) % 1` — common phase-shift | [`phaseShift`](../nodes/math/phaseShift.md) instead — single primitive replacing the inline expression. |
| Linear remap a value through input/output ranges | [`remap`](../nodes/math/remap.md) — declarative, cheaper to read. |
| Combine two booleans / thresholds | [`pulseOr`](../nodes/math/pulseOr.md), [`expression`](../nodes/math/expression.md) for arithmetic mixes. |
| Custom math that doesn't fit a primitive | `expression`. |
| Time-derived noise | `expression` with `noise(time * speed) * amp` — or a dedicated `wiggle` node for path/transform-shaped noise. |

The bias should be: reach for `expression` only when no primitive node fits. Primitives are easier to inspect in the FVE editor and easier for tooling to reason about. Expressions are the escape hatch.

### Source of truth

- Node implementation: [`src/core/nodes/ExpressionNode.ts`](https://github.com/FasterHQ/faster-motion/blob/main/src/core/nodes/ExpressionNode.ts)
- Reference / validation: [`src/core/expressions/ExpressionScope.ts`](https://github.com/FasterHQ/faster-motion/blob/main/src/core/expressions/ExpressionScope.ts)
- `node()` / `param()` parsing: [`src/core/nodes/expressionUtils.ts`](https://github.com/FasterHQ/faster-motion/blob/main/src/core/nodes/expressionUtils.ts)
- Validator code: `EXPR_REFERENCES_MISSING_NODE` in [`debugging.md`](../debugging.md)
