# Glitch Compute

**Type:** `glitchCompute`  
**Category:** effects  
**Context:** DOM — operates on HTML elements via CSS selectors  

Stateful random glitch — outputs offset, skew, and opacity

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `intensity` | `float` | Intensity |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `offsetX` | `float` | Offset X |
| `offsetY` | `float` | Offset Y |
| `skewX` | `float` | Skew X |
| `opacity` | `float` | Opacity |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `maxOffset` | float | `20` | Max Offset (px) (min: 0, max: 200) |
| `maxSkew` | float | `10` | Max Skew (deg) (min: 0, max: 45) |
| `interval` | float | `3000` | Interval (ms) (min: 100, max: 10000) |
| `glitchDuration` | float | `150` | Duration (ms) (min: 10, max: 1000) |
| `seed` | int | `42` | Seed (min: 0, max: 99999) |

