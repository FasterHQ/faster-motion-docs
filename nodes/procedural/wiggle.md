# Wiggle

**Type:** `wiggle`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

AE-style wiggle noise — random displacement

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
| `frequency` | float | `4` | Frequency (Hz) (min: 0.1) |
| `amplitude` | float | `10` | Amplitude |
| `octaves` | int | `1` | Octaves (min: 1, max: 8) |
| `seed` | int | `0` | Seed (min: 0) |
| `compositionMode` | enum | `"add"` | Compose. Options: `add`, `replace`, `multiply` |

