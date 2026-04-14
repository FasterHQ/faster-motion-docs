# Distance Input

**Type:** `distanceInput`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Mouse distance to target (0 = at target, 1 = beyond radius)

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `radius` | float | `0.2` | Radius (min: 0.01, max: 2) |
| `falloff` | enum | `"linear"` | Falloff. Options: `linear`, `quadratic`, `smooth` |

