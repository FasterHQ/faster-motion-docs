# Blend Space 1D Eval

**Type:** `blendSpace1DEval`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

F266 Phase 3: pure 1D blend space evaluator. Wraps evaluateBlend1DTransforms(). Inputs: inputValue (axis parameter), progress. Output: per-object transform map blended between adjacent animations.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `inputValue` | `float` | Input Value |
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `transforms` | `any` | Transforms |


## Parameters

_No configurable parameters._
