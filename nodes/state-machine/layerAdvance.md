# Layer Advance

**Type:** `layerAdvance`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Per-layer state machine solver — evaluates conditions, advances transitions, outputs current/previous state progress and weights.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `parentDone` | `any` | Parent Done |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `currentStateId` | `string` | Current State |
| `currentProgress` | `float` | Current Progress |
| `currentWeight` | `float` | Current Weight |
| `previousStateId` | `string` | Previous State |
| `previousProgress` | `float` | Previous Progress |
| `previousWeight` | `float` | Previous Weight |
| `isTransitioning` | `float` | Is Transitioning |
| `advanced` | `float` | Advanced |


## Parameters

_No configurable parameters._
