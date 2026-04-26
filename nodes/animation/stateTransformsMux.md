# State Transforms Mux

**Type:** `stateTransformsMux`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F345: selects an SM layer's active state's transforms by id. Reads currentStateId from LayerAdvanceNode + per-state transforms from dynamic transforms_${stateId} input ports wired from per-state evaluator nodes; outputs the active state's transforms. Replaces PoseEvalNode's imperative layer.getCurrentState().clip read.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `currentStateId` | `string` | Current State Id |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `transforms` | `any` | Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `layerId` | string | `—` | Layer Id |
| `role` | string | `—` | Role |
| `stateIds` | string | `—` | State Ids |

