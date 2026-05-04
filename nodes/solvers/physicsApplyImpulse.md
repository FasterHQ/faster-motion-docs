# Physics Apply Impulse

**Type:** `physicsApplyImpulse`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — pulse-triggered instantaneous impulse on a body. Same shape as `physicsApplyForce` but applies an instantaneous velocity delta (Δv = impulse/mass) instead of a continuous force across one step. Use for explosions, kicks, projectiles — anything that should change a body's velocity discontinuously.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |
| `impulse` | `vec2` | Impulse (px/s · kg) |
| `point` | `vec2` | Point (body-local px) |
| `trigger` | `float` | Trigger |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `paramImpulseX` | float | `0` | Default Impulse X (px/s · kg) |
| `paramImpulseY` | float | `0` | Default Impulse Y (px/s · kg) |
| `paramPointX` | float | `0` | Default Point X (body-local px) |
| `paramPointY` | float | `0` | Default Point Y (body-local px) |

