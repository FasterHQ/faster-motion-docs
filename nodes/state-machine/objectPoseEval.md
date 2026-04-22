# Object Pose Eval

**Type:** `objectPoseEval`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Evaluate animation clip object tracks into a pose bundle (x, y, rotation, scaleX, scaleY, opacity + extended props)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `layerRef` | `any` | Layer Ref |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `objectPose` | `attributes` | Object Pose |
| `transforms` | `any` | Transforms |


## Parameters

_No configurable parameters._
