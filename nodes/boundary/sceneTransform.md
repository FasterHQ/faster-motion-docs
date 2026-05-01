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
| `parentOpacity` | `float` | Parent Opacity |
| `parentVisible` | `bool` | Parent Visible |
| `smWritesDone` | `any` | SM Writes Done |
| `deltaTime` | `float` | Delta Time |
| `objectPose` | `attributes` | Object Pose |
| `x` | `float` | X |
| `y` | `float` | Y |
| `rotation` | `float` | Rotation |
| `scaleX` | `float` | Scale X |
| `scaleY` | `float` | Scale Y |
| `opacity` | `float` | Opacity |
| `visible` | `bool` | Visible |
| `constraintX` | `float` | Constraint X |
| `constraintY` | `float` | Constraint Y |
| `constraintRotation` | `float` | Constraint Rotation |
| `constraintScaleX` | `float` | Constraint Scale X |
| `constraintScaleY` | `float` | Constraint Scale Y |
| `constraintWorldX` | `float` | Constraint World X |
| `constraintWorldY` | `float` | Constraint World Y |
| `pathInput` | `path` | Path Input |
| `textContent` | `any` | Text Content |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `worldMatrix` | `any` | World Matrix |
| `restWorldMatrix` | `any` | Rest World Matrix |
| `x` | `float` | X |
| `y` | `float` | Y |
| `rotation` | `float` | Rotation |
| `scaleX` | `float` | Scale X |
| `scaleY` | `float` | Scale Y |
| `opacity` | `float` | Opacity |
| `visible` | `bool` | Visible |
| `path` | `path` | Path |
| `textContent` | `any` | Text Content |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | objectPicker | `""` | Object |

