# State Apply

**Type:** `stateApply`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Reads layer state from LayerAdvanceNode, sets animation clip progress and applies state evaluation.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `currentProgress` | `float` | Current Progress |
| `currentWeight` | `float` | Current Weight |
| `previousProgress` | `float` | Previous Progress |
| `previousWeight` | `float` | Previous Weight |
| `layerDone` | `any` | Layer Done |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `applied` | `float` | Applied |


## Parameters

_No configurable parameters._
