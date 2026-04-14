# Scene Transform

**Type:** `sceneTransform`  
**Category:** boundary  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Per-object transform — reads from objectPose bundle by index, computes world matrix, writes to HeadlessObject

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `parentWorldMatrix` | `any` | Parent World Matrix |
| `smWritesDone` | `any` | SM Writes Done |
| `deltaTime` | `float` | Delta Time |
| `objectPose` | `attributes` | Object Pose |
| `x` | `float` | X |
| `y` | `float` | Y |
| `rotation` | `float` | Rotation |
| `scaleX` | `float` | Scale X |
| `scaleY` | `float` | Scale Y |
| `opacity` | `float` | Opacity |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `worldMatrix` | `any` | World Matrix |
| `x` | `float` | X |
| `y` | `float` | Y |
| `rotation` | `float` | Rotation |
| `scaleX` | `float` | Scale X |
| `scaleY` | `float` | Scale Y |
| `opacity` | `float` | Opacity |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | objectPicker | `""` | Object |
| `objectIndex` | int | `-1` | Object Index |

