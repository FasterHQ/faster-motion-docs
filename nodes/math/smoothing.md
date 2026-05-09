# Smoothing

**Type:** `smoothing`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Temporal lowpass filter for any float signal — picks one of three filter shapes via `mode`. Replaces the old `spring` and `valueSolver` nodes (folded in). For magnetic-snap behaviour compose `snapFloat → smoothing(mode:exponential)`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | The raw float to smooth. Wire from any source — gate expression, pointer axis, scroll velocity, observer delta, etc. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `output` | `float` | The filtered value. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"exponential"` | Filter shape. Each mode surfaces its own params below.. Options: `exponential`, `spring`, `linearApproach` |
| `smooth` | float | `5` | Exponential rate constant. Higher = faster. 0 = pass-through. 5 = ~250ms tail (typical UI). Used in `exponential` mode. (min: 0, max: 10, step: 0.1) |
| `rate` | float | `1` | Maximum movement per second toward target. 0 = instant snap. Used in `linearApproach` mode. (min: 0, max: 1000, step: 0.1) |
| `stiffness` | float | `180` | Spring constant. Higher = tighter / faster oscillation. Used in `spring` mode. (min: 1, step: 10) |
| `damping` | float | `12` | Velocity damping. Higher = less ring. Critical damping at ~2*sqrt(stiffness*mass). Used in `spring` mode. (min: 0, step: 1) |
| `mass` | float | `1` | Inertia. Higher = slower acceleration. Used in `spring` mode. (min: 0.01, step: 0.1) |
| `posterizeFps` | float | `0` | Stop-motion quantization on the spring output. 0 = continuous (default). Used in `spring` mode. (min: 0, step: 1) |
| `compositionMode` | enum | `"replace"` | How spring output combines with the input target. `replace` (default) — output IS the spring value. `add` — sum. `multiply` — modulate. Used in `spring` mode.. Options: `replace`, `add`, `multiply` |
| `subSteps` | int | `1` | Per-frame integration steps. 1 = standard. Higher = stiffer convergence when the target jumps a lot per frame. (min: 1, max: 16, step: 1) |
| `initialValue` | float | `—` | Optional seed for the filter. NaN (default) = "use first target as initial". |


## Use cases

- `mode: exponential` — soft lag with no overshoot. Best for pointer-follow, scroll-velocity smoothing, gate-flicker damping. (Default.)
- `mode: spring` — 2nd-order mass-spring-damper with overshoot. Best for bouncy follow, settle-with-ring, physics-feel UI.
- `mode: linearApproach` — bounded velocity. Output moves at most `rate * dt` per second toward target then snaps. Best for hard-edged target tracking with a max speed (e.g. throttled scroll-position correction).

## See also

- [Velocity](velocity.md) — `velocity`
- [Remap](remap.md) — `remap`
- [Expression](expression.md) — `expression`
- [Snap Float](snapFloat.md) — `snapFloat`
- [Inertia](../procedural/inertia.md) — `inertia`

## Envelope

Every node in a `.fmtion` file shares the same envelope shape. The per-node sections above describe the contents of `params` and the wires that go into `connections`; the fields here apply to **every** node, including this one.

```json
{
  "id": "myUniqueNodeId",
  "type": "<nodeType>",
  "activeWhen": "(min-width: 768px)",
  "_note": "Why this node exists.",
  "params": { },
  "connections": { "input": { "nodeId": "...", "port": "..." } }
}
```

| Field | Type | Required | Summary |
|-------|------|----------|---------|
| `id` | string | yes | Stable, unique within the graph. Other nodes' `connections` reference it. |
| `type` | string | yes | The node-type slug — the `Type:` line at the top of this page. |
| `params` | object | no | Per-node parameters. Every key is a row in the **Parameters** table above. |
| `connections` | object | no | Maps each input port (see **Inputs** above) to a `{ nodeId, port }` source. Use a `[…]` array of those for multi-wire inputs. |
| `activeWhen` | `string \| string[] \| null` | no | CSS-media-query gate. The node is **dropped from the graph at load** when the query doesn't match — different from a per-frame `enabled` port (load-time topology mutation, not runtime gating). String = single query; array = AND'd queries; `"none"` or `null` = never active. |
| `_note` | string | no | Free-text author comment. Preserved through the loader and visible in dev tools / inspector. The recommended place for "why" prose, since `.fmtion` JSON forbids real comments. |

`activeWhen` examples:

```json
{ "activeWhen": "(min-width: 768px)" }
{ "activeWhen": ["(min-width: 768px)", "(prefers-reduced-motion: no-preference)"] }
{ "activeWhen": "none" }
```

`_note` example:

```json
{ "_note": "Drives hero parallax. Keep amp ≤ 0.4 to avoid layout shift at 1440px." }
```
