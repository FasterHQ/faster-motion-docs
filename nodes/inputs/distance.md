# Distance

**Type:** `distance`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Mouse-to-element-rect proximity. Outputs 0 (far) to 1 (touching) with falloff.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `proximity` | `float` | Proximity |
| `rawDistance` | `float` | Raw Distance |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Selector |
| `maxDistance` | float | `150` | Max Distance (min: 0) |
| `falloff` | string | `"linear"` | Falloff |
| `invert` | bool | `true` | Invert |
| `smooth` | float | `0` | Smoothing (min: 0, max: 1) |

