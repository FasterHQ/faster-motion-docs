# Seek Remap

**Type:** `seekRemap`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Map a raw parameter value into [0,1] progress for TimelinePoseNode / ObjectPoseEvalNode seek bindings

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `inputMin` | float | `-1` | Input Min |
| `inputMax` | float | `1` | Input Max |
| `invert` | bool | `false` | Invert |

