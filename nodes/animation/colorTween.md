# Color Tween

**Type:** `colorTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Perceptually uniform color interpolation in OKLab space. Emits a packed `color` bundle for direct wiring, plus individual r/g/b channels for legacy consumers.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `fromColor` | `color` | From Color (input) |
| `toColor` | `color` | To Color (input) |
| `hueOffset` | `float` | Hue Offset (deg) |
| `saturation` | `float` | Saturation |
| `alpha` | `float` | Alpha |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | Color |
| `r` | `float` | R |
| `g` | `float` | G |
| `b` | `float` | B |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fromColor` | colorString | `"#000000"` | From Color |
| `toColor` | colorString | `"#ffffff"` | To Color |
| `ease` | easingCurve | `"linear"` | Easing |
| `saturation` | float | `1` | Saturation (min: 0, max: 3) |
| `alpha` | float | `1` | Alpha (min: 0, max: 1) |

