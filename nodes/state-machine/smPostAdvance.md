# SM Post Advance

**Type:** `smPostAdvance`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Post-advance coordinator — trigger consumption, reset maps application, solver reset signal. Runs after all layers complete.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `layersDone` | `any` | Layers Done |
| `statesDone` | `any` | States Done |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `advanced` | `float` | Advanced |
| `resetSolvers` | `float` | Reset Solvers |


## Parameters

_No configurable parameters._
