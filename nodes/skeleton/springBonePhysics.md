# Spring Bone

**Type:** `springBonePhysics`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Rotational spring — bone rotation follows parent with spring dynamics, gravity, and wind.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `boneIndex` | int | `0` | Bone Index (min: 0) |
| `parentBoneIndex` | int | `-1` | Parent Bone Index (min: -1) |
| `stiffness` | float | `2` | Stiffness (min: 0) |
| `damping` | float | `0.5` | Damping (min: 0, max: 1) |
| `mass` | float | `1` | Mass (min: 0.01) |
| `maxAngle` | float | `1.5708` | Max Angle (rad) (min: 0, max: 3.14159) |
| `gravityX` | float | `0` | Gravity X |
| `gravityY` | float | `0` | Gravity Y |
| `windX` | float | `0` | Wind X |
| `windY` | float | `0` | Wind Y |

