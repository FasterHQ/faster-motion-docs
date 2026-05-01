# Blend Space 2D Eval

**Type:** `blendSpace2DEval`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

F359 Phase 8: 2D blend space evaluator. Pulls clips from dynamic clip_${animationId} input ports and produces transforms via Delaunay+barycentric (interpolated) or nearest-point (discrete). Grid mode publishes integer frame index on the frameIndex output port.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `inputX` | `float` | Input X |
| `inputY` | `float` | Input Y |
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `transforms` | `any` | Transforms |
| `frameIndex` | `float` | Frame Index |


## Parameters

_No configurable parameters._
