# Wave

**Type:** `wave`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Sinusoidal displacement along a path.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `strength` | `float` | Strength |
| `falloff` | `any` | Falloff |
| `amplitude` | `float` | Amplitude |
| `frequency` | `float` | Frequency |
| `phase` | `float` | Phase |
| `decay` | `float` | Decay |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `amplitude` | float | `10` | Amplitude (min: 0, max: 200) |
| `frequency` | float | `1` | Frequency (min: 0, max: 50) |
| `phase` | float | `0` | Phase |
| `decay` | float | `0` | Decay (min: 0, max: 10) |
| `propagation` | enum | `"x"` | Propagation. Options: `x`, `y` |

