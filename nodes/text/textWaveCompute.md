# Text Wave Compute

**Type:** `textWaveCompute`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

F256: Pure per-character wave sweep. Takes progress + upstream Mat4 bundle. schedulerPhase=pure, zero this.context access.

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
| `ranges` | textWaveRanges | `[{"properties":{"y":-20},"f...` | Ranges |

