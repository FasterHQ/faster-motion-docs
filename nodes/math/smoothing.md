# Smoothing

**Type:** `smoothing`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Exponential smoothing for any float signal — frame-rate independent

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `output` | `float` | Output |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `smooth` | float | `1` | Smooth (min: 0, max: 10) |

