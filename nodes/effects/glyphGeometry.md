# Glyph Geometry

**Type:** `glyphGeometry`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Shared text-outline geometry source. F381 P2.1. Emits typed vertex buffers + bbox + bodyCenter from `text + fontFamily + fontSize + fontWeight` once at init (static). Wire the outputs into BOTH `softMesh.geometrySource` (visible deformable mesh, P2.3) AND `physicsStaticBody{kind:fromGeometry}` (rigid collider, P2.2) so the visible mesh and rigid collider are aligned by construction — kills the entire class of "physicsTextOutline.radius drifted from physicsSoftText.radius" bugs that the legacy paired-node pattern required authors to avoid by hand.

Uses the same WASM glyph extractor pipeline as the legacy nodes (rustybuzz + ttf-parser → earcut), so geometry is bit-identical to what a softMesh with `geometrySource:textOutline` would produce.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Optional. When wired from `physicsWorld.world`, the geometry node uses the world's `frameSelector` to compute body-coord origin. Without a wire, host element acts as its own frame. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `vertices` | `float32buffer` | Rest-pose vertex buffer in body coords. Wire into consumers' `geometrySource` ports. |
| `subpathStarts` | `uint16buffer` | Vertex-pair start index of each subpath. Glyph outer + counter holes flat in traversal order. |
| `ringSubpathCounts` | `uint16buffer` | Entry i = number of subpaths in glyph i (1 outer + N counter holes — e.g. P/R/O/d/e have 1 hole each, H/Y/S/I/C have 0). First subpath per glyph is outer; remaining are holes. Lets `physicsStaticBody{kind:fromGeometry}` build colliders only for letter silhouettes (balls land on top of an "o", not inside its counter). |
| `sharpFlags` | `uint16buffer` | Sharp-corner flag per vertex. |
| `bboxMinX` | `float` | BBox Min X |
| `bboxMinY` | `float` | BBox Min Y |
| `bboxMaxX` | `float` | BBox Max X |
| `bboxMaxY` | `float` | BBox Max Y |
| `bodyCenterX` | `float` | Snapshot rest centroid in body coords. |
| `bodyCenterY` | `float` | Body Centre Y |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the host element. Used for sizing (auto-radius fallback) and resolving the physics frame. |
| `text` | string | `"Text"` | Text |
| `fontFamily` | string | `"sans-serif"` | Font Family |
| `fontSize` | float | `220` | Font Size (px) |
| `fontWeight` | string | `"400"` | CSS weight string. Must match a loaded `FontFace`. |
| `radius` | float | `-1` | -1 = auto: `min(hostW, hostH) * 0.4`. The whole word is refit to fit `2 * radius`. |
| `cornerSharpnessDeg` | float | `25` | Corner Sharpness (°) (min: 0, max: 90, step: 5) |


## Use cases

- Balls-on-text — one `glyphGeometry` feeds a `softMesh` (visible deformable letters) AND a `physicsStaticBody{fromGeometry}` (rigid collider). Balls bounce off the actual letter shapes, no manual radius drift.
- Logotype cursor warp — `glyphGeometry` feeds a `softMesh` + `softMeshRender`. No physics body needed; geometry node simply provides the rest pose.

## See also

- [Shape Geometry](shapeGeometry.md) — `shapeGeometry`
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
