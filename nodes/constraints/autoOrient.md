# Auto Orient

**Type:** `autoOrient`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Orient rotation based on movement velocity

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `currentPosition` | `vec2` | Position |
| `currentRotation` | `float` | Rotation |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `rotation` | `float` | Rotation |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `rotationOffset` | float | `0` | Offset (deg) |

