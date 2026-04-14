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


## Parameters

_No configurable parameters._
