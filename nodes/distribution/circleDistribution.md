# Circle Distribution

**Type:** `circleDistribution`  
**Category:** distribution  
**Context:** Shared — works in both DOM and canvas graphs  

Distribute points evenly around a circle.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `radius` | `float` | Radius |
| `startAngle` | `float` | Start Angle |
| `endAngle` | `float` | End Angle |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `any` | Points |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `radius` | float | `100` | Radius (min: 0, max: 500) |
| `startAngle` | float | `0` | Start (°) (min: 0, max: 360) |
| `endAngle` | float | `360` | End (°) (min: 0, max: 360) |

