# Coverage Group

**Type:** `coverageGroup`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

F256: Per-character transforms scaled by coverage values. Outputs Mat4TransformBundle.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `coverage` | `attributes` | Coverage |
| `upstream` | `mat4Bundle` | Upstream |
| `x` | `float` | X |
| `y` | `float` | Y |
| `rotation` | `float` | Rotation |
| `scaleX` | `float` | Scale X |
| `scaleY` | `float` | Scale Y |
| `opacity` | `float` | Opacity |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `charTransforms` | `mat4Bundle` | Char Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `flags` | int | `63` | Flags |
| `originX` | float | `0` | Origin X |
| `originY` | float | `0` | Origin Y |
| `invertOpacity` | bool | `false` | Invert Opacity |

