# Fluid Sim

**Type:** `fluidSim`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Lightweight 2D fluid sim — drag injects coloured ink + velocity; the velocity field self-advects and dissipates; the dye flows along the velocity and fades. Renders to a host canvas. Produces the "wet paint trail along drag path" look used by gestural carousels and editorial sites. Requires `EXT_color_buffer_float` for RGBA16F render targets — fails loud on incompatible browsers rather than banding into RGBA8.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `splatX` | `float` | Splat X |
| `splatY` | `float` | Splat Y |
| `splatVx` | `float` | Splat Vx (px/sec) |
| `splatVy` | `float` | Splat Vy (px/sec) |
| `splatColor` | `color` | Splat Colour |
| `splatStrength` | `float` | Splat Strength |
| `splatRadius` | `float` | Splat Radius (px) |
| `velocityDissipation` | `float` | Velocity Dissipation |
| `dyeDissipation` | `float` | Dye Dissipation |
| `opacity` | `float` | Opacity |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `simResolution` | int | `256` | Sim Resolution (min: 32, max: 1024) |

