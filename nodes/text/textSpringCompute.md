# Text Spring Compute

**Type:** `textSpringCompute`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Per-character bouncy scale/offset via closed-form damped spring. Geometry modifier — routes through TextApply.

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
| `overshoot` | float | `0.3` | Overshoot |
| `yOvershoot` | float | `-10` | Y Overshoot |
| `damping` | float | `4` | Damping (min: 0) |
| `frequency` | float | `3` | Frequency (min: 0.1) |

