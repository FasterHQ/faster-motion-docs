# Grid Distribution

**Type:** `gridDistribution`  
**Category:** distribution  
**Context:** Shared — works in both DOM and canvas graphs  

Distribute points in a rows × cols grid centered at origin.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `rows` | `float` | Rows |
| `cols` | `float` | Cols |
| `spacingX` | `float` | Spacing X |
| `spacingY` | `float` | Spacing Y |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `any` | Points |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `rows` | int | `3` | Rows (min: 1, max: 50) |
| `cols` | int | `3` | Cols (min: 1, max: 50) |
| `spacingX` | float | `50` | Spacing X (min: 0, max: 500) |
| `spacingY` | float | `50` | Spacing Y (min: 0, max: 500) |

