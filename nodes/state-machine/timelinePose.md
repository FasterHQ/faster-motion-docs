# Timeline Pose

**Type:** `timelinePose`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Evaluates animation clip bone tracks at current Timeline progress. F316: weight gates contribution to additive blender (0 = rest pose, 1 = full, default 1).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pose` | `attributes` | Pose |


## Parameters

_No configurable parameters._
