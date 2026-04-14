# Shape Falloff

**Type:** `shapeFalloff`  
**Category:** falloff  
**Context:** Shared — works in both DOM and canvas graphs  

Signed-distance boundary falloff (circle or rectangle).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength |
| `cx` | `float` | Center X |
| `cy` | `float` | Center Y |
| `width` | `float` | Width / Radius |
| `height` | `float` | Height |
| `softEdge` | `float` | Soft Edge |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `shapeType` | enum | `"circle"` | Shape. Options: `circle`, `rectangle` |
| `cx` | float | `0` | Center X |
| `cy` | float | `0` | Center Y |
| `width` | float | `100` | Width / Radius (min: 0, max: 500) |
| `height` | float | `100` | Height (min: 0, max: 500) |
| `softEdge` | float | `10` | Soft Edge (min: 0, max: 100) |
| `invert` | bool | `false` | Invert |

