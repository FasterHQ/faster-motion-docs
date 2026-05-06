# Slide Crossfade

**Type:** `slideCrossfade`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Full-bleed slide-deck transition compositor. On every change of `discreteIndex`, snapshots all `<canvas>` children of the outgoing slide's host into an offscreen buffer; then renders that snapshot — sliding off in `direction` — over the live next slide as `transitionProgress` ramps 0 → 1. Mirrors patrickheng.com programs #7-#9.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `transitionProgress` | `float` | Progress |
| `discreteIndex` | `float` | Discrete Index |
| `direction` | `float` | Direction |
| `prevColourR` | `float` | Prev R |
| `prevColourG` | `float` | Prev G |
| `prevColourB` | `float` | Prev B |
| `nextColourR` | `float` | Next R |
| `nextColourG` | `float` | Next G |
| `nextColourB` | `float` | Next B |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Compositor Host |
| `prevHostSelector` | elementSelector | `""` | Prev Host |
| `nextHostSelector` | elementSelector | `""` | Next Host |

