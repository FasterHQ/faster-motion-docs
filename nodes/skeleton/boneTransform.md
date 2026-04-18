# Bone Transform

**Type:** `boneTransform`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-bone FK node — reads pose at boneIndex, computes world matrix from parent

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `parentWorldMatrix` | `any` | Parent World Matrix |
| `pose` | `attributes` | Pose |
| `constraintXform` | `any` | Constraint Override |
| `constraintMask` | `float` | Constraint Mask |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `worldMatrix` | `any` | World Matrix |
| `localMatrix` | `any` | Local Matrix |
| `x` | `float` | Local X |
| `y` | `float` | Local Y |
| `rotation` | `float` | Local Rotation |
| `scaleX` | `float` | Local Scale X |
| `scaleY` | `float` | Local Scale Y |
| `worldX` | `float` | World X |
| `worldY` | `float` | World Y |
| `worldRotation` | `float` | World Rotation |
| `worldScaleX` | `float` | World Scale X |
| `worldScaleY` | `float` | World Scale Y |


## Parameters

_No configurable parameters._
