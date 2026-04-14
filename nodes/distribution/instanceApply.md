# Instance Apply

**Type:** `instanceApply`  
**Category:** distribution  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

F264 Phase 2: Writes Mat4TransformBundle per-instance transforms to GeneratorNode clone STNs via SceneTransformNode.setPose. Decomposes 4×4 → 2D pose per clone — full port contract flow, no imperative HeadlessObject mutation.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `transforms` | `mat4Bundle` | Transforms |
| `cloneIds` | `any` | Clone IDs |


## Outputs

_No outputs._

## Parameters

_No configurable parameters._
