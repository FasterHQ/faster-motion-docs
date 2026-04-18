# Additive Pose Blend

**Type:** `additivePoseBlend`  
**Category:** state-machine  
**Context:** Shared — works in both DOM and canvas graphs  

Combine N pose bundles by summing their deltas from a rest baseline — multi-clip stacking (autoplay plus parameter-seeked clips).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pose` | `attributes` | Pose |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `poseInputCount` | int | `0` | Pose Input Count (min: 0) |

