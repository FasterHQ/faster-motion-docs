# Physics Body Read

**Type:** `physicsBodyRead`  
**Category:** solvers  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Extract per-body x/y/rotation from PhysicsWorldNode output.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bodyStates` | `any` | Body States |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X |
| `y` | `float` | Y |
| `rotation` | `float` | Rotation |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bodyId` | objectPicker | `""` | Body |

