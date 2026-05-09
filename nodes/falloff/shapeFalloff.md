# Shape Falloff

**Type:** `shapeFalloff`  
**Category:** falloff  
**Context:** Shared — works in both DOM and canvas graphs  

Signed-distance boundary falloff (circle or rectangle).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength |
| `cx` | `float` | Center X |
| `cy` | `float` | Center Y |
| `width` | `float` | Width / Radius |
| `height` | `float` | Height |
| `softEdge` | `float` | Soft Edge |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `shapeType` | enum | `"circle"` | Shape. Options: `circle`, `rectangle` |
| `cx` | float | `0` | Center X |
| `cy` | float | `0` | Center Y |
| `width` | float | `100` | Width / Radius (min: 0, max: 500, step: 1) |
| `height` | float | `100` | Height (min: 0, max: 500, step: 1) |
| `softEdge` | float | `10` | Soft Edge (min: 0, max: 100, step: 0.5) |
| `invert` | bool | `false` | Invert |


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
