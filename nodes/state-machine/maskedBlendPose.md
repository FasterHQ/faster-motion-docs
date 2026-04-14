# Masked Blend Pose

**Type:** `maskedBlendPose`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Blend two pose bundles with bone mask — unmasked bones pass through from A

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `poseA` | `attributes` | Pose A (base) |
| `poseB` | `attributes` | Pose B (layer) |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pose` | `attributes` | Pose |


## Parameters

_No configurable parameters._
