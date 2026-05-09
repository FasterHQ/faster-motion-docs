# Camera Bounds

**Type:** `cameraBounds`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Clamp camera position and zoom to bounds

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `vec2` | Position |
| `zoom` | `float` | Zoom |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `vec2` | Position |
| `zoom` | `float` | Zoom |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `minX` | float | `null` | Min X |
| `maxX` | float | `null` | Max X |
| `minY` | float | `null` | Min Y |
| `maxY` | float | `null` | Max Y |
| `minZoom` | float | `0` | Min Zoom (min: 0, step: 0.1) |
| `maxZoom` | float | `null` | Max Zoom (min: 0, step: 0.1) |


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
