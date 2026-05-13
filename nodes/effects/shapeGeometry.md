# Shape Geometry

**Type:** `shapeGeometry`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Shared non-text geometry source. F381 P2.1. Companion to `glyphGeometry` — emits the same typed-port output shape from any non-text `geometrySource` kind: `round` / `spike` / `blob` / `svgPath` / `clipPath` / `rawVertices`. Use the same generators as `meshAttractor`'s geometrySource param.

Pair its outputs with `softMesh.geometrySource` + `physicsStaticBody{kind:fromGeometry}` so visible blob silhouette + rigid bowl collider stay aligned by construction (kills the legacy `physicsBlob` + `physicsBowlFromBlob` drift bug class).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Optional. When wired from `physicsWorld.world`, the geometry node uses the world's `frameSelector` to compute body-coord origin. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `vertices` | `float32buffer` | Rest-pose vertex buffer in body coords. |
| `subpathStarts` | `uint16buffer` | Subpath Starts |
| `ringSubpathCounts` | `uint16buffer` | Entry i = number of subpaths in ring i (1 outer + N holes). First subpath per ring is outer; remaining are holes. Critical for collider/renderer consumers that need to distinguish outer silhouettes from interior holes. |
| `sharpFlags` | `uint16buffer` | Sharp Flags |
| `bboxMinX` | `float` | BBox Min X |
| `bboxMinY` | `float` | BBox Min Y |
| `bboxMaxX` | `float` | BBox Max X |
| `bboxMaxY` | `float` | BBox Max Y |
| `bodyCenterX` | `float` | Body Centre X |
| `bodyCenterY` | `float` | Body Centre Y |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the host element. Used for sizing (auto-radius fallback) and resolving the physics frame. |
| `geometrySource` | meshGeometrySource | `{"kind":"round","segmentCou...` | Pick a geometry kind: round / spike / blob / svgPath / clipPath / rawVertices. `textOutline` is rejected here — use `glyphGeometry` for text. |
| `radius` | float | `-1` | -1 = auto (~40% of min host dimension). |
| `cornerSharpnessDeg` | float | `25` | Corner Sharpness (°) (min: 0, max: 90, step: 5) |


## Use cases

- Soft-walled ball pit — one `shapeGeometry{kind:round}` feeds a `softMesh` (visible deformable bowl) AND a `physicsStaticBody{fromGeometry}` (rigid collider). Balls collide with the visibly deforming bowl, no per-frame vertex re-derivation.
- Cursor-reactive logo — `shapeGeometry{kind:svgPath}` feeds a `softMesh` + `softMeshRender`. Cursor warps the logo silhouette.

## See also

- [Glyph Geometry](glyphGeometry.md) — `glyphGeometry`
- [Soft Mesh](softMesh.md) — `softMesh`
- [Physics Static Body](../solvers/physicsStaticBody.md) — `physicsStaticBody`

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
