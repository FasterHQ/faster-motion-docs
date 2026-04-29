# Smoothing

**Type:** `smoothing`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Frame-rate-independent exponential smoothing on any float signal. The output eases toward the input value at a rate controlled by `smooth` — pass-through at `0` (or below), near-instant at `10`. Useful for taking a noisy / step-y / discrete signal (gate flicks, scroll-velocity, mouse position) and producing a damped, animation-ready curve.

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
| `smooth` | float | `5` | Response (min: 0, max: 10) |

