# Jiggle Bone

**Type:** `jiggleBone`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

2D position spring — adds bouncy displacement to bone x/y from parent movement.

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
| `stiffness` | float | `5` | Stiffness (min: 0) |
| `damping` | float | `0.3` | Damping (min: 0, max: 1) |
| `mass` | float | `1` | Mass (min: 0.01) |
| `maxDisplacement` | float | `10` | Max Displacement (min: 0) |
| `jiggleX` | bool | `true` | Jiggle X |
| `jiggleY` | bool | `true` | Jiggle Y |

