# Text Fade Compute

**Type:** `textFadeCompute`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Per-character opacity ramp with stagger. Geometry modifier — routes through TextApply via Mat4Bundle.

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
| `stagger` | float | `0.5` | Stagger (min: 0, max: 1) |
| `fromOpacity` | float | `0` | From Opacity (min: 0, max: 1) |
| `toOpacity` | float | `1` | To Opacity (min: 0, max: 1) |
| `fadeIn` | bool | `true` | Fade In |

