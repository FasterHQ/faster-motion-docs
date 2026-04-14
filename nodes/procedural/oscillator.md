# Oscillator

**Type:** `oscillator`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Periodic wave generator (sine, triangle, square, sawtooth)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `baseValue` | `float` | Base Value |
| `time` | `float` | Time |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `waveType` | enum | `"sine"` | Wave. Options: `sine`, `cosine`, `triangle`, `sawtooth`, `square` |
| `frequency` | float | `1` | Frequency (Hz) (min: 0.01) |
| `amplitude` | float | `10` | Amplitude |
| `phase` | float | `0` | Phase (rad) |
| `seed` | int | `0` | Seed (min: 0) |
| `compositionMode` | enum | `"add"` | Compose. Options: `add`, `replace`, `multiply` |

