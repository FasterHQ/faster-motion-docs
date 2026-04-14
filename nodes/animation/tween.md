# Tween

**Type:** `tween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

A→B interpolation with easing — stateless, pure function of progress

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `from` | float | `0` | From |
| `to` | float | `1` | To |
| `ease` | string | `"linear"` | Easing |

