# Listener Action

**Type:** `listenerAction`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Routes listener actions into parameter writes (for SMParameterStoreNode) and side-effect actions (for audio/callback nodes).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `hitResults` | `any` | Hit Results |
| `definition` | `any` | Definition |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `parameterWrites` | `any` | Parameter Writes |
| `sideEffectActions` | `any` | Side Effect Actions |


## Parameters

_No configurable parameters._
