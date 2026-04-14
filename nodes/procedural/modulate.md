# Modulate

**Type:** `modulate`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Remap value through a piecewise-linear curve. Defaults to replace composition.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `baseValue` | `float` | Input |
| `time` | `float` | Time |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `inputMin` | float | `0` | Input Min |
| `inputMax` | float | `100` | Input Max |
| `outputMin` | float | `0` | Output Min |
| `outputMax` | float | `100` | Output Max |
| `clamp` | bool | `true` | Clamp |
| `compositionMode` | enum | `"replace"` | Compose. Options: `add`, `replace`, `multiply` |

