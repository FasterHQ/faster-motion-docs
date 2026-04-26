# Draggable

**Type:** `draggable`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Wrap a DOM element or canvas object as draggable, with optional inertia. Outputs current position + drag state + velocity, suitable for driving any downstream graph node. Set `direction` to lock to an axis.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `vec2` | Position |
| `x` | `float` | X |
| `y` | `float` | Y |
| `isDragging` | `float` | Is Dragging |
| `velocityX` | `float` | Velocity X |
| `velocityY` | `float` | Velocity Y |
| `resultX` | `float` | Result X |
| `resultY` | `float` | Result Y |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `direction` | enum | `"both"` | Direction. Options: `both`, `horizontal`, `vertical` |
| `selector` | string | `""` | Selector |
| `inertia` | bool | `true` | Inertia |
| `throwResistance` | float | `0.55` | Throw Resistance (min: 0) |

