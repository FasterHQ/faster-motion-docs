# Camera Follow

**Type:** `cameraFollow`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Smoothly follow target with deadzone and lookahead

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `targetPosition` | `vec2` | Target |
| `previousPosition` | `vec2` | Prev Position |
| `deltaTime` | `float` | Delta Time |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `cameraPosition` | `vec2` | Camera Position |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `damping` | float | `0.1` | Damping (min: 0, max: 1) |
| `deadzoneX` | float | `0` | Deadzone X (min: 0) |
| `deadzoneY` | float | `0` | Deadzone Y (min: 0) |
| `lookahead` | float | `0` | Lookahead (min: 0) |
| `offsetX` | float | `0` | Offset X |
| `offsetY` | float | `0` | Offset Y |

