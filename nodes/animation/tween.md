# Tween

**Type:** `tween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Stateless A→B interpolation with easing — pure function of `progress`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `from` | `float` | From (input) |
| `to` | `float` | To (input) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `from` | float | `0` | From |
| `to` | float | `1` | To |
| `ease` | easingCurve | `"linear"` | Easing |

