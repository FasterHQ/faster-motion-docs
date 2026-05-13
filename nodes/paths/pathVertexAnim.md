# Path Vertex Anim

**Type:** `pathVertexAnim`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Publishes a path-vertex AttributeBundle consumed by SceneRenderNode (via registerPathVertexAnim). Accepts either per-vertex scalar ports (vertexX_n / vertexY_n / handle ports) or a bulk Float32 vertexBuffer ([x0,y0,x1,y1,...]) for sim-driven flows. Node id convention: `vertex-anim-${objectId}`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `vertexBuffer` | `float32buffer` | Bulk vertex source. Flat [x0,y0,x1,y1,...] Float32Array of length vertexCount*2. When wired, takes precedence over per-vertex ports. |
| `smWritesDone` | `any` | Ordering input — wire from state-machine writes to ensure SM property writes complete before this node re-publishes the bundle. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `attributeBundle` | Points |
| `closed` | `bool` | Closed |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `vertexCount` | float | `0` | Vertex Count (min: 1, step: 1) |
| `closed` | bool | `true` | Closed Path |


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
