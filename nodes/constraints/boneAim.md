# Bone Aim

**Type:** `boneAim`  
**Category:** constraints  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Aim bone at target position

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `boneWorldPosition` | `vec2` | Bone Position |
| `targetPosition` | `vec2` | Target |
| `parentWorldRotation` | `float` | Parent Rotation |
| `currentRotation` | `float` | Current Rotation |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `rotation` | `float` | Rotation |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `offsetAngle` | float | `0` | Offset Angle |
| `smoothing` | float | `0` | Smoothing (min: 0, max: 1) |
| `minAngle` | float | `—` | Min Angle |
| `maxAngle` | float | `—` | Max Angle |

