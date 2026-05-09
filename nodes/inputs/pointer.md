# Pointer

**Type:** `pointer`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Tracks pointer position over an element. One node emits all coordinate spaces in parallel — wire whichever output the consumer needs.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | Pixel coordinate relative to the element rect (left edge = 0). _(unit: pixels)_ |
| `y` | `float` | Pixel coordinate relative to the element rect (top edge = 0). _(unit: pixels)_ |
| `normalizedX` | `float` | Element-relative [0..1]. 0 = left edge, 1 = right edge. Drop into nodes expecting 0..1 progress. _(range: 0..1, unit: fraction)_ |
| `normalizedY` | `float` | Element-relative [0..1]. 0 = top edge, 1 = bottom edge. _(range: 0..1, unit: fraction)_ |
| `centeredX` | `float` | Element-relative [-1..1] with 0 at the element center. Use for parallax / tilt where neutral = no transform. _(range: -1..1, unit: fraction)_ |
| `centeredY` | `float` | Element-relative [-1..1] with 0 at the element center. _(range: -1..1, unit: fraction)_ |
| `isInside` | `float` | 1 when the pointer is over the element, 0 otherwise. Use for hover gates. _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element pointer coords are measured against. In `element` space, outputs are relative to this element's rect (rect moves with scroll). In `viewport` space, the element only gates `isInside`; coords are clientX/clientY. Example: "body" for full-page, ".hero" for a section-scoped tracker, "#card-1" for a specific element. |
| `smoothing` | float | `—` | Built-in exponential lowpass on the raw pointer position. 0 = snaps to cursor; 0.6 = silky parallax; 0.9 = very smooth / heavy lag. Frame-rate independent. **For spring / linearApproach / advanced curve shapes** leave this at 0 and chain a `smoothing` node downstream — same effect, full curve catalogue available. (min: 0, max: 0.99, step: 0.05) |
| `space` | enum | `—` | `element` (default) — x/y are rect-relative; the bound element's rect.top moves with scroll, so `y` includes scroll delta when the element scrolls past. Use for in-section hover effects. `viewport` — x/y are clientX/clientY, normalized against window dims; stable regardless of scroll. Use for `position: fixed` cursor elements that need to sit under the actual mouse on every section. Default `element`.. Options: `element`, `viewport` |


## Use cases

- Cursor-driven element transforms — wire `x`/`y` straight into pose properties for cursor-following effects.
- Centered parallax / tilt — wire `centeredX`/`centeredY` (range [-1..1], origin at element center) into rotate or skew animations.
- Velocity / progress drivers — wire `normalizedX`/`normalizedY` into nodes that expect 0..1 input (mouseVelocity, multiKeyframe progress, etc).

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
