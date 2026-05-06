# Textured Mesh Tile

**Type:** `texturedMeshTile`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Subdivided WebGL plane that samples a bound `<img>` or `<video>` texture and accepts the same per-attractor vertex displacement as `meshAttractor`. Adds a wireable global `offset` port for velocity-driven shifts (drag-carousel stretch, scroll-velocity skew). Tint port allows `paletteLut.color` to recolour the tile while the texture provides the silhouette.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `mouseX` | `float` | Mouse X |
| `mouseY` | `float` | Mouse Y |
| `coef` | `float` | Coef |
| `mouseX2` | `float` | Mouse 2 X |
| `mouseY2` | `float` | Mouse 2 Y |
| `coef2` | `float` | Coef 2 |
| `jump` | `float` | Jump (px) |
| `dist` | `float` | Falloff Sigma (px) |
| `offsetX` | `float` | Offset X (px) |
| `offsetY` | `float` | Offset Y (px) |
| `tintMix` | `float` | Tint Mix |
| `tint` | `color` | Tint |
| `opacity` | `float` | Opacity |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `textureSelector` | elementSelector | `""` | Texture Source |
| `subdivisions` | int | `32` | Subdivisions (min: 1, max: 256) |
| `centreX` | float | `-1` | Centre X |
| `centreY` | float | `-1` | Centre Y |
| `width` | float | `-1` | Width (px) |
| `height` | float | `-1` | Height (px) |
| `falloffEase` | easingCurve | `"easeOutCubic"` | Falloff Ease |

