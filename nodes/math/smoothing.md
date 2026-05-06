# Smoothing

**Type:** `smoothing`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Temporal lowpass filter for any float signal — picks one of three filter shapes via `mode`. Replaces the old `spring` and `valueSolver` nodes (folded in). For magnetic-snap behaviour compose `snapFloat → smoothing(mode:exponential)`.

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
| `mode` | enum | `"exponential"` | Filter Mode. Options: `exponential`, `spring`, `linearApproach` |
| `smooth` | float | `5` | Response (min: 0, max: 10) |
| `rate` | float | `1` | Rate (units/sec) (min: 0, max: 1000) |
| `stiffness` | float | `180` | Stiffness (min: 1) |
| `damping` | float | `12` | Damping (min: 0) |
| `mass` | float | `1` | Mass (min: 0.01) |
| `posterizeFps` | float | `0` | Posterize FPS (min: 0) |
| `compositionMode` | enum | `"replace"` | Compose. Options: `replace`, `add`, `multiply` |
| `subSteps` | int | `1` | Sub-steps (min: 1, max: 16) |
| `initialValue` | float | `—` | Initial Value |

