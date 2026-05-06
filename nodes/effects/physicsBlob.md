# Physics Blob

**Type:** `physicsBlob`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Soft-body blob silhouette built on a Verlet mass-spring chain. N point particles arranged in a closed circular loop, each connected to its neighbour and skip-1 neighbour by stiff distance-springs, with rest-pose attraction so the shape always recovers. Cursor interaction is a per-particle Gaussian-falloff repulsion. Adjacent particles follow through the spring network, so the silhouette stays C¹-smooth no matter how hard the cursor pulls — no vertex-shader V-cusps. Rendered via Canvas2D as a closed Catmull-Rom curve (converted to cubic Bézier segments) filled with the channel colour. Use this when you want the patrickheng-style smooth-blob feel; use `meshAttractor` when you want fullscreen WebGL mesh distortion of arbitrary geometry.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `geometrySource` | meshGeometrySource | `{"kind":"round","segmentCou...` | Rest Shape |
| `radius` | float | `-1` | Radius (px) |
| `stiffness` | float | `0.9` | Stiffness (min: 0.05, max: 1) |
| `damping` | float | `0.06` | Damping (min: 0, max: 0.3) |
| `iterations` | int | `6` | Iterations (min: 1, max: 16) |
| `centreX` | float | `-1` | Centre X |
| `centreY` | float | `-1` | Centre Y |
| `channels` | meshAttractorChannels | `{}` | Channel Values |

