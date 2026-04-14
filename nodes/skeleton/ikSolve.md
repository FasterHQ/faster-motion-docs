# IK Solve

**Type:** `ikSolve`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-chain IK solver. Pure array-based FABRIK on AttributeBundle data.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |
| `targetPosition` | `vec2` | Target Position |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `skeletonId` | objectPicker | `""` | Skeleton |
| `startBone` | bonePicker | `""` | Start Bone |
| `endBone` | bonePicker | `""` | End Bone |
| `bendDirection` | int | `0` | Bend Direction (min: -1, max: 1) |
| `iterations` | int | `10` | Iterations (min: 1, max: 50) |
| `tolerance` | float | `0.5` | Tolerance (min: 0.01, max: 10) |

