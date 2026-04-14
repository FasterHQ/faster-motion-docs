# Random Distribution

**Type:** `randomDistribution`  
**Category:** distribution  
**Context:** Shared — works in both DOM and canvas graphs  

Distribute points randomly in a bounding box (seeded PRNG).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `width` | `float` | Width |
| `height` | `float` | Height |
| `seed` | `float` | Seed |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `any` | Points |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | float | `400` | Width (min: 0, max: 2000) |
| `height` | float | `300` | Height (min: 0, max: 2000) |
| `seed` | float | `42` | Seed |

