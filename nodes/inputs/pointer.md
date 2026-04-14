# Pointer

**Type:** `pointer`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Track pointer position — outputs x, y, normalized, isInside

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X |
| `y` | `float` | Y |
| `normalizedX` | `float` | Norm X |
| `normalizedY` | `float` | Norm Y |
| `isInside` | `float` | Inside |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Element |
| `normalize` | enum | `"normalized"` | Mode. Options: `centered`, `normalized`, `pixels` |
| `smoothing` | float | `—` | Smoothing (min: 0, max: 0.99) |

