# Physics World

**Type:** `physicsWorld`  
**Category:** solvers  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Rigid body physics simulation via Planck.js (Box2D). Lazy-loaded.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `subSteps` | `float` | Sub Steps |
| `gravityX` | `float` | Gravity X |
| `gravityY` | `float` | Gravity Y |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bodyStates` | `any` | Body States |
| `bodyCount` | `float` | Body Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pixelsPerMeter` | float | `100` | Pixels/Meter (min: 1, max: 1000) |

