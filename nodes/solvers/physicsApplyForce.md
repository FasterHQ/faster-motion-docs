# Physics Apply Force

**Type:** `physicsApplyForce`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — pulse-triggered continuous force on a body. On the rising edge of `trigger` (last frame ≤ 0, this frame > 0), the engine queues `force` for the next world step. Force in px/s². Held HIGH does NOT continuously apply — only the rising edge fires once. For continuous force, drive `trigger` with a `cycleClock` or rapid pulse train.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |
| `force` | `vec2` | Force (px/s²) |
| `point` | `vec2` | Point (body-local px) |
| `trigger` | `float` | Trigger |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `paramForceX` | float | `0` | Default Force X (px/s²) |
| `paramForceY` | float | `0` | Default Force Y (px/s²) |
| `paramPointX` | float | `0` | Default Point X (body-local px) |
| `paramPointY` | float | `0` | Default Point Y (body-local px) |

