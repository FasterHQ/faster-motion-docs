# Wave Deformer

**Type:** `waveDeformer`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Sine wave displacement along path. Supports pulse mode.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `time` | `float` | Time |
| `amplitude` | `float` | Amplitude |
| `frequency` | `float` | Frequency |
| `phase` | `float` | Phase |
| `speed` | `float` | Speed |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `taper` | float | `0` | Taper (min: 0, max: 1) |
| `pulse` | bool | `false` | Pulse Mode |
| `pulseWidth` | float | `0.3` | Pulse Width (min: 0, max: 1) |

