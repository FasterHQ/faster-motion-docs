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
| `curve` | enum | `"linear"` | Curve. Options: `linear`, `ease`, `easeIn`, `easeOut` |
| `clamp` | bool | `true` | Clamp |

