# Blend Direct Eval

**Type:** `blendDirectEval`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

F266 Phase 3: pure direct-blend evaluator. Wraps evaluateBlendDirectTransforms(). Per-animation weight inputs (weight_<id>) drive sequential blend-on-top. Weights from parameters use normalized scale (value/100, clamped 0..1).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `transforms` | `any` | Transforms |


## Parameters

_No configurable parameters._
