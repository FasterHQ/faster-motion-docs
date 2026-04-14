# Object Masked Blend

**Type:** `objectMaskedBlend`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Blend two object pose bundles with per-object mask — unmasked objects pass through from A

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `poseA` | `attributes` | Pose A (base) |
| `poseB` | `attributes` | Pose B (layer) |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `objectPose` | `attributes` | Object Pose |


## Parameters

_No configurable parameters._
