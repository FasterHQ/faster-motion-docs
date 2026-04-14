# Text Skew Compute

**Type:** `textSkewCompute`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Per-character horizontal shear with staggered decay. Geometry modifier — routes through TextApply.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `upstream` | `mat4Bundle` | Upstream |
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `charTransforms` | `mat4Bundle` | Char Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stagger` | float | `0.3` | Stagger (min: 0, max: 1) |
| `skewAngle` | float | `0.3` | Skew Angle (rad) |
| `damping` | float | `3` | Damping (min: 0) |

