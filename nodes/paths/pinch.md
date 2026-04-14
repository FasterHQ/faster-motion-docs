# Pinch / Bloat

**Type:** `pinch`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Radial pinch or bloat from a center point.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `strength` | `float` | Strength |
| `falloff` | `any` | Falloff |
| `amount` | `float` | Amount |
| `centerX` | `float` | Center X |
| `centerY` | `float` | Center Y |
| `radius` | `float` | Radius |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `amount` | float | `0` | Amount (min: -1, max: 1) |
| `centerX` | float | `0` | Center X |
| `centerY` | float | `0` | Center Y |
| `radius` | float | `100` | Radius (min: 0, max: 500) |

