# Parameter Write

**Type:** `parameterWrite`  
**Category:** integration  
**Context:** Shared — works in both DOM and canvas graphs  

Apply an action to a parameter on a rising-edge trigger. Wire an eventListener.fired into this node to express "event → set/toggle/fire/increment/decrement parameter" entirely on the graph canvas.

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
| `action` | enum | `"set"` | Action. Options: `set`, `toggle`, `fire`, `increment`, `decrement` |
| `value` | string | `false` | Value |

