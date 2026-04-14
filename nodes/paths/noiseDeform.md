# Noise Deform

**Type:** `noiseDeform`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Per-vertex noise displacement using 2D simplex.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `strength` | `float` | Strength |
| `falloff` | `any` | Falloff |
| `amplitude` | `float` | Amplitude |
| `frequency` | `float` | Frequency |
| `seed` | `float` | Seed |
| `octaves` | `float` | Octaves |
| `lacunarity` | `float` | Lacunarity |
| `persistence` | `float` | Persistence |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `amplitude` | float | `5` | Amplitude (min: 0, max: 100) |
| `frequency` | float | `0.1` | Frequency (min: 0, max: 5) |
| `seed` | float | `0` | Seed |
| `octaves` | int | `1` | Octaves (min: 1, max: 6) |
| `lacunarity` | float | `2` | Lacunarity (min: 1, max: 4) |
| `persistence` | float | `0.5` | Persistence (min: 0, max: 1) |

