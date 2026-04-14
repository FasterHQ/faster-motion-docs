# Bone Jiggle Compute

**Type:** `boneJiggleCompute`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-bone secondary animation via closed-form damped spring. Composable with other bone modifiers via merge/mask.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `upstream` | `mat4Bundle` | Upstream |
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `out` | `mat4Bundle` | Output |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stagger` | float | `0.3` | Stagger (min: 0, max: 1) |
| `rotationAmplitude` | float | `0.15` | Rotation Amplitude (rad) |
| `damping` | float | `3` | Damping (min: 0) |
| `frequency` | float | `2` | Frequency (min: 0.1) |

