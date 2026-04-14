# Stagger Driver

**Type:** `staggerDriver`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Index-based wave propagation. Uses ForEach element context for per-instance offset.

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
| `staggerAmount` | float | `100` | Stagger Amount (min: 0) |
| `mode` | enum | `"linear"` | Mode. Options: `linear`, `wave` |
| `frequency` | float | `1` | Frequency (min: 0) |
| `amplitude` | float | `10` | Amplitude |
| `seed` | int | `0` | Seed (min: 0) |
| `posterizeFps` | int | `0` | Posterize FPS (min: 0) |
| `compositionMode` | enum | `"add"` | Composition. Options: `add`, `replace`, `multiply` |

