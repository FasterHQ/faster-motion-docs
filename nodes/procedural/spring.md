# Spring

**Type:** `spring`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Damped spring physics — smooth follow with overshoot. Defaults to replace composition (spring IS the value).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `baseValue` | `float` | Target |
| `time` | `float` | Time |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stiffness` | float | `180` | Stiffness (min: 1) |
| `damping` | float | `12` | Damping (min: 0) |
| `mass` | float | `1` | Mass (min: 0.01) |
| `compositionMode` | enum | `"replace"` | Compose. Options: `add`, `replace`, `multiply` |

