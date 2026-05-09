# DOM Pose Write

**Type:** `domPoseWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Boundary node: writes one or more float values to CSS properties on a target DOM element. Pick which properties to expose via the picker — each becomes an input port wired from upstream tweens / latches / math.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `selector` | `string` | F357 — wireable selector. When connected (e.g. from `splitText.pieceSelector`), the wired value overrides the `CSS Selector` param at bind time. Unwired = the param value is used. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the target element. Examples: ".hero", "#card-1", ".flair". Inside a forEach template, set this to `{ "fromScope": "selector" }` to bind to the per-iteration matched element. Multiple matches: only the first is written (use forEach for per-element fan-out). |
| `properties` | domPoseProperties | `{}` | Picker for which CSS properties this node writes. Each enabled property becomes an input port + a CSS unit setting (px, %, deg, none). Transform properties (translate*, scale*, rotate*, skew*) batch through the accumulator; everything else writes via DOMBatcher. |


## Use cases

- Apply a tween to an element — wire `tween.value` into one of the inputs (e.g. `translateX`, `opacity`) and set the CSS selector to the target.
- Combine multi-axis animations on one element — expose multiple inputs (translateX + translateY + scale + opacity) and wire each from its own tween / latch / math node.
- Per-element drivers — pair with a `forEach` instance using `{ "fromScope": "selector" }` for the per-iteration target to write per-instance poses (cursor trail, image trail, grid stagger).

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
