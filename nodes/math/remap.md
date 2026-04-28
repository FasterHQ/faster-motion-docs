# Remap

**Type:** `remap`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Map a value from one range to another with optional curve

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `inputMin` | `float` | Input Min |
| `inputMax` | `float` | Input Max |
| `outputMin` | `float` | Output Min |
| `outputMax` | `float` | Output Max |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `inputMin` | float | `0` | Input Min |
| `inputMax` | float | `1` | Input Max |
| `outputMin` | float | `0` | Output Min |
| `outputMax` | float | `1` | Output Max |
| `curve` | easingCurve | `"linear"` | Curve |
| `clamp` | bool | `true` | Clamp |

