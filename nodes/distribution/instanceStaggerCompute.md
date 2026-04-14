# Instance Stagger Compute

**Type:** `instanceStaggerCompute`  
**Category:** distribution  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-instance staggered offset/scale animation. Proves Mat4 pipeline works for non-text domains.

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
| `stagger` | float | `0.5` | Stagger (min: 0, max: 1) |
| `offsetY` | float | `-20` | Offset Y |
| `scalePulse` | float | `0.3` | Scale Pulse |

