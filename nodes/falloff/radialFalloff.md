# Radial Falloff

**Type:** `radialFalloff`  
**Category:** falloff  
**Context:** Shared — works in both DOM and canvas graphs  

Distance-based falloff from a center point.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength |
| `centerX` | `float` | Center X |
| `centerY` | `float` | Center Y |
| `innerRadius` | `float` | Inner Radius |
| `outerRadius` | `float` | Outer Radius |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `centerX` | float | `0` | Center X |
| `centerY` | float | `0` | Center Y |
| `innerRadius` | float | `0` | Inner Radius (min: 0, max: 500) |
| `outerRadius` | float | `100` | Outer Radius (min: 0, max: 500) |
| `invert` | bool | `false` | Invert |

