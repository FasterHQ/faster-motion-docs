# Circle Distribution

**Type:** `circleDistribution`  
**Category:** distribution  
**Context:** Shared — works in both DOM and canvas graphs  

Distribute points evenly around a circle.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `radius` | `float` | Radius |
| `startAngle` | `float` | Start Angle |
| `endAngle` | `float` | End Angle |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `any` | Points |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `radius` | float | `100` | Radius (min: 0, max: 500, step: 1) |
| `startAngle` | float | `0` | Start (°) (min: 0, max: 360, step: 1) |
| `endAngle` | float | `360` | End (°) (min: 0, max: 360, step: 1) |


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
