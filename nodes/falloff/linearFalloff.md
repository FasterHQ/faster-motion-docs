# Linear Falloff

**Type:** `linearFalloff`  
**Category:** falloff  
**Context:** Shared — works in both DOM and canvas graphs  

Ramp falloff along a configurable axis.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength |
| `direction` | `float` | Direction |
| `startPos` | `float` | Start |
| `endPos` | `float` | End |
| `clamped` | `bool` | Clamped |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `direction` | float | `0` | Direction (°) (min: 0, max: 360) |
| `startPos` | float | `0` | Start |
| `endPos` | float | `100` | End |
| `clamped` | bool | `true` | Clamped |
| `invert` | bool | `false` | Invert |

