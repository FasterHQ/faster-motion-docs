# Velocity

**Type:** `velocity`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Compute smoothed rate-of-change of any float signal

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `velocity` | `float` | Velocity |
| `isAtRest` | `float` | At Rest |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `timeConstant` | float | `0.1` | Time Constant (min: 0.01, max: 1) |
| `restThreshold` | float | `0.1` | Rest Threshold (min: 0, max: 10) |
| `decayFactor` | float | `0.95` | Decay (min: 0, max: 1) |

