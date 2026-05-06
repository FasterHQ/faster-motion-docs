# Palette LUT

**Type:** `paletteLut`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Sample a 1D colour palette at position `t` ∈ [0..1] with configurable interpolation (sRGB or perceptually-uniform OKLab) and wrap mode (clamp / repeat / mirror). Stops can be static (param) or dynamically wired via `inputStops` for computed palettes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `t` | `float` | Position |
| `inputStops` | `floatArray` | Stops (wired) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | Colour |
| `r` | `float` | R |
| `g` | `float` | G |
| `b` | `float` | B |
| `a` | `float` | A |
| `colorHex` | `string` | Hex |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stops` | colorPaletteStops | `[]` | Palette Stops |
| `wrapMode` | enum | `"clamp"` | Wrap Mode. Options: `clamp`, `repeat`, `mirror` |
| `interpolationMode` | enum | `"srgb"` | Interpolation. Options: `srgb`, `oklab` |

