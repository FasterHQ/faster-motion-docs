# Mesh Attractor

**Type:** `meshAttractor`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Fullscreen WebGL mesh with per-vertex displacement driven by up to two mouse attractors. Generates a tessellated 2D silhouette (`round` / `spike` / `blob`) — or accepts a custom `[x0,y0,...]` vertex array for arbitrary shapes (hearts, SVG-imported, text-derived). Falloff curve is selectable (gaussian / linear / smoothstep / inverse-square). F375 channels-driven authoring: every input (mouseX/Y, coef, jump, dist, opacity, colour, …) is a *channel* — author it as a literal value (`{ value: ... }`) for static settings or as a wireable port (`{ port: true, default?: ... }`) to feed it from upstream. Channels not declared in `params.channels` use the per-node default and surface no port handle, so simple cases need no wiring at all.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `geometrySource` | meshGeometrySource | `—` | Geometry |
| `centreX` | float | `-1` | Centre X |
| `centreY` | float | `-1` | Centre Y |
| `radius` | float | `-1` | Radius (px) |
| `falloffEase` | easingCurve | `—` | Falloff Ease |
| `channels` | meshAttractorChannels | `{}` | Channel Values |

