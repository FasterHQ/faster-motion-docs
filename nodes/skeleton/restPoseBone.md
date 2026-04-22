# Rest Pose Bone

**Type:** `restPoseBone`  
**Category:** skeleton  
**Context:** Shared — works in both DOM and canvas graphs  

Per-bone pure-FK node — reads pose at boneIndex, computes pre-override world matrix from parent. Paired with boneTransform.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `parentWorldMatrix` | `any` | Parent Rest World Matrix |
| `pose` | `attributes` | Pose |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `restWorldMatrix` | `any` | Rest World Matrix |
| `restLocalMatrix` | `any` | Rest Local Matrix |
| `restX` | `float` | Rest X |
| `restY` | `float` | Rest Y |
| `restRotation` | `float` | Rest Rotation |
| `restScaleX` | `float` | Rest Scale X |
| `restScaleY` | `float` | Rest Scale Y |


## Parameters

_No configurable parameters._
