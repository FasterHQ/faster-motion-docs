# Bend

**Type:** `bend`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Bend geometry around a center point.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `strength` | `float` | Strength |
| `falloff` | `any` | Falloff |
| `angle` | `float` | Angle |
| `centerX` | `float` | Center X |
| `centerY` | `float` | Center Y |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `angle` | float | `0` | Angle (°) (min: -360, max: 360) |
| `centerX` | float | `0` | Center X |
| `centerY` | float | `0` | Center Y |
| `axis` | enum | `"y"` | Axis. Options: `x`, `y` |

