# Parameter Write

**Type:** `parameterWrite`  
**Category:** integration  
**Context:** Shared — works in both DOM and canvas graphs  

Compute a parameter's next value on a rising-edge trigger. Pure-compute — reads currentValue from a ParameterStore.out_<paramId> input, emits nextValue which the store commits through its writer-fanin input.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `currentValue` | `any` | Current Value |
| `delta` | `float` | Delta |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `nextValue` | `any` | Next Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `parameterId` | string | `""` | Parameter Id |
| `action` | enum | `"set"` | Action. Options: `set`, `toggle`, `fire`, `increment`, `decrement` |
| `value` | string | `false` | Value |

