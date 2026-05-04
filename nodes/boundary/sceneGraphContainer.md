# Scene Graph Container

**Type:** `sceneGraphContainer`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Singleton authoring marker that requests the standard scene runtime topology — clip-registry-scene, scene-rest-bundle, layout-compute, scene-render, canvas-timeline, per-object STNs, per-clip OCEs, and the scene-graph + animation-subgraph modules. Phase 01a expansion derives the full set from sibling sceneObject / group / animationClip / stateMachine compounds in the same canvas area. Use instead of authoring those runtime nodes by hand — keeps file format slim and runtime topology a function of authoring intent.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

_No configurable parameters._
