# Effect Pass

**Type:** `effectPass`  
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
| `effect` | enum | `"vignette"` | Effect. Options: `sepia`, `grayscale`, `invert`, `brightness`, `contrast`, `saturation`, `hueShift`, `duotone`, `vignette`, `glitch`, `rgbShift`, `pixelate`, `wave`, `ripple`, `swirl`, `blur`, `radialBlur`, `motionBlur`, `scanlines`, `chromaticAberration`, `verticalSlice`, `filmGrain`, `neonGlow`, `chromakey`, `halftone`, `posterize`, `sharpen`, `emboss`, `edgeDetect` |
| `selector` | elementSelector | `""` | Host Element |
| `sourceSelector` | elementSelector | `""` | Source Element |

