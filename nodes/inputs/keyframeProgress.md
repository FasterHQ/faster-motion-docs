# Keyframe Progress

**Type:** `keyframeProgress`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Reads a parameter value and outputs it as progress. Wire from ParameterStoreNode or SM output for timeline-driven animations.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `paramValue` | `float` | Parameter Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `clamp` | bool | `true` | Clamp [0,1] |

