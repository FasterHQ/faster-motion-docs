# Text Distort Compute

**Type:** `textDistortCompute`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Per-character random scatter/explosion entrance. Deterministic (seed-based). Geometry modifier — routes through TextApply.

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
| `maxOffsetX` | float | `50` | Max Offset X |
| `maxOffsetY` | float | `50` | Max Offset Y |
| `maxRotation` | float | `0.5` | Max Rotation (rad) |
| `maxScaleDeviation` | float | `0.5` | Max Scale Deviation |
| `seed` | int | `42` | Seed (min: 0) |

