# Parameter Write

**Type:** `parameterWrite`  
**Category:** integration  
**Context:** Shared — works in both DOM and canvas graphs  

Write a constant value to a parameter on a rising-edge trigger. Wire an eventListener.fired output into this node to express "event → set parameter" entirely on the graph canvas.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `parameterId` | string | `""` | Parameter Id |
| `value` | string | `false` | Value |

