# Video Effect Pass

**Type:** `videoEffectPass`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Single-pass shader effect on any `<img>`/`<video>`/`<canvas>` source — driven by the shared `EFFECT_REGISTRY` so 27+ effects are available with no per-effect graph node. Pick the effect by name; the matching shader compiles at bind, and the effect's uniforms become wireable input ports automatically. Includes the post-effect classics (vignette, filmGrain, rgbShift, chromaticAberration, scanlines, glitch, swirl, ripple, halftone, …) and two new ones (`chromaticAberration`, `verticalSlice`) added for fluid-carousel and lens-aberration looks.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `opacity` | `float` | Opacity |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `effect` | string | `"vignette"` | Effect |
| `selector` | elementSelector | `""` | Host Element |
| `sourceSelector` | elementSelector | `""` | Source Element |

