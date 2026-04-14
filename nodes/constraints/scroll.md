# Scroll Constraint

**Type:** `scroll`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Scrollable container with bounds and momentum

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `targetPosition` | `vec2` | Target |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `vec2` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `axis` | enum | `"y"` | Axis. Options: `x`, `y`, `both` |
| `contentSize` | float | `1000` | Content Size (min: 0) |
| `viewportSize` | float | `500` | Viewport Size (min: 0) |
| `momentum` | bool | `true` | Momentum |
| `bounce` | bool | `true` | Bounce |

