# Physics Mouse Drag

**Type:** `physicsMouseDrag`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — pointer-driven drag-to-throw. On `pointerdown` within `selector`, picks a body (either `bodyId` directly or by hit-testing `pickedBodyIds` against `pickElementsSelector`) and creates a kinematic anchor + spring joint. `pointermove` follows the cursor, `pointerup` releases and exposes residual velocity. The spring is rope-jointed (zero rest length) with `stiffness` / `damping` tuning the snappiness. Soft-throw natural fall through gravity / collisions are unchanged because the body remains dynamic the whole time.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |
| `pickedBodyIds` | `floatArray` | Picked Body IDs |
| `enabled` | `float` | Enabled |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `dragging` | `float` | Dragging |
| `pointerWorld` | `vec2` | Pointer World |
| `releasedVelocity` | `vec2` | Released Velocity |
| `pickedBodyId` | `float` | Picked Body ID |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `"body"` | Drag Surface Selector |
| `stiffness` | float | `80` | Spring Stiffness (min: 0) |
| `damping` | float | `12` | Spring Damping (min: 0) |
| `pickElementsSelector` | elementSelector | `""` | Pick Elements Selector |

