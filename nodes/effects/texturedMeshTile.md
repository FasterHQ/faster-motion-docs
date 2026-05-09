# Textured Mesh Tile

**Type:** `texturedMeshTile`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Subdivided WebGL plane that samples a bound `<img>` or `<video>` texture and accepts the same per-attractor vertex displacement as `meshAttractor`. Adds a wireable global `offset` port for velocity-driven shifts (drag-carousel stretch, scroll-velocity skew). Tint port allows `paletteLut.color` to recolour the tile while the texture provides the silhouette.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `mouseX` | `float` | Primary attractor X in viewport pixels. |
| `mouseY` | `float` | Primary attractor Y in viewport pixels. |
| `coef` | `float` | Primary attractor gain. 0 = no displacement (default), negative pulls vertices toward the cursor. |
| `mouseX2` | `float` | Secondary attractor X. Active only when `coef2` is non-zero. |
| `mouseY2` | `float` | Secondary attractor Y. |
| `coef2` | `float` | Secondary attractor gain. 0 (default) disables the second attractor. |
| `jump` | `float` | Maximum displacement per attractor in px. |
| `dist` | `float` | Falloff sigma / radius in px. |
| `offsetX` | `float` | Global pixel offset added to every vertex AFTER the attractor displacement. Wire from `dragVelocity.dx` for drag-carousel-style stretch. |
| `offsetY` | `float` | Global pixel offset Y. Wire from `dragVelocity.dy`. |
| `tintMix` | `float` | 0 = pure texture (default). 1 = pure tint (texture supplies alpha only). Lets a `paletteLut.color` recolour the tile while the texture provides the silhouette. _(range: 0..1)_ |
| `tint` | `color` | Tint colour (multiplied with `tintMix`). Wire from `paletteLut.color` for per-section colour drift. |
| `opacity` | `float` | Output alpha [0..1]. Multiplied with the texture's own alpha and `tint.a`. _(range: 0..1)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the host element. The canvas mounts inside as a position:absolute child filling the host bounds. |
| `textureSelector` | elementSelector | `""` | CSS selector for an `<img>` or `<video>` element supplying the texture. The element is queried at bind time; videos re-upload the current frame every render. |
| `subdivisions` | int | `32` | Plane grid resolution. 32 = good default. Higher = smoother displacement at higher GPU cost. 1 = no subdivision (a single quad — vertex displacement does nothing). (min: 1, max: 256) |
| `centreX` | float | `-1` | -1 = auto (host centre). |
| `centreY` | float | `-1` | -1 = auto. |
| `width` | float | `-1` | -1 = auto (host width). |
| `height` | float | `-1` | -1 = auto (host height). |
| `falloffEase` | easingCurve | `"easeOutCubic"` | Easing curve mapping cursor distance → falloff weight. Same vocabulary as `meshAttractor.falloffEase`. |


## Use cases

- Drag-driven carousel tile — wire `dragVelocity.dx/.dy` into `offsetX/offsetY` for fluid-carousel-style velocity stretch.
- Per-tile mouse attractor on a textured plane — same `mouseX/mouseY/coef` semantics as `meshAttractor`.
- Theme drift — wire `paletteLut.color` into `tint` and increase `tintMix` to recolour the tile while the texture provides the alpha / silhouette.
- Video tile with cursor distortion — bind a `<video autoplay loop muted>` via `textureSelector`; hover-driven attractor warps the playing video.

## See also

- [Mesh Attractor](meshAttractor.md) — `meshAttractor`
- [Pointer](../inputs/pointer.md) — `pointer`
- [Palette LUT](../math/paletteLut.md) — `paletteLut`
- [Drag Velocity](../inputs/dragVelocity.md) — `dragVelocity`

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
