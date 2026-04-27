# Pointer

**Type:** `pointer`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Tracks pointer position over an element. One node emits all coordinate spaces in parallel — wire whichever output the consumer needs.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X |
| `y` | `float` | Y |
| `normalizedX` | `float` | Norm X |
| `normalizedY` | `float` | Norm Y |
| `centeredX` | `float` | Centered X |
| `centeredY` | `float` | Centered Y |
| `isInside` | `float` | Inside |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Element |
| `smoothing` | float | `—` | Smoothing (min: 0, max: 0.99) |

