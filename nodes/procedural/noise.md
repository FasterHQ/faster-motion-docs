# Noise

**Type:** `noise`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-octave simplex noise

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
| `speed` | float | `1` | Speed (min: 0.01) |
| `scale` | float | `1` | Scale |
| `offset` | float | `0` | Offset |
| `octaves` | int | `1` | Octaves (min: 1, max: 8) |
| `seed` | int | `0` | Seed (min: 0) |
| `compositionMode` | enum | `"add"` | Compose. Options: `add`, `replace`, `multiply` |

