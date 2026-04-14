# Wiggle Path

**Type:** `wigglePath`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Noise displacement per path point.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `time` | `float` | Time |
| `size` | `float` | Size |
| `detail` | `float` | Detail |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `seed` | int | `0` | Seed (min: 0) |
| `posterizeFps` | int | `0` | Posterize FPS (min: 0) |
| `correlation` | float | `0` | Correlation (min: 0, max: 1) |
| `pointType` | enum | `"smooth"` | Point Type. Options: `smooth`, `corner` |

