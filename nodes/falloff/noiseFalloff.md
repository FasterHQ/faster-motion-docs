# Noise Falloff

**Type:** `noiseFalloff`  
**Category:** falloff  
**Context:** Shared — works in both DOM and canvas graphs  

Fractal simplex noise-based falloff (max 6 octaves).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength |
| `frequency` | `float` | Frequency |
| `octaves` | `float` | Octaves |
| `lacunarity` | `float` | Lacunarity |
| `persistence` | `float` | Persistence |
| `seed` | `float` | Seed |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `frequency` | float | `1` | Frequency (min: 0, max: 10) |
| `octaves` | int | `1` | Octaves (min: 1, max: 6) |
| `lacunarity` | float | `2` | Lacunarity (min: 1, max: 4) |
| `persistence` | float | `0.5` | Persistence (min: 0, max: 1) |
| `seed` | float | `0` | Seed |
| `invert` | bool | `false` | Invert |

