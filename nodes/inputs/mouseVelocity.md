# Mouse Velocity

**Type:** `mouseVelocity`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Per-frame pointer velocity. One node emits five outputs in parallel — wire whichever fits.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `mouseX` | `float` | Mouse X |
| `mouseY` | `float` | Mouse Y |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `valueX` | `float` | Value X (centered) |
| `valueY` | `float` | Value Y (centered) |
| `absoluteX` | `float` | Absolute X |
| `absoluteY` | `float` | Absolute Y |
| `magnitude` | `float` | Magnitude |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sensitivity` | float | `1` | Sensitivity (min: 0.01) |
| `smoothing` | float | `0` | Smoothing (min: 0, max: 1) |
| `decay` | float | `0` | Decay (min: 0, max: 1) |

