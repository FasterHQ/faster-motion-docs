# Parallax

**Type:** `parallax`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Convert scroll progress to parallax pixel offset

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `offset` | `float` | Offset |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `speed` | float | `0.5` | Speed (min: -10, max: 10) |
| `range` | float | `-1` | Range (px) (min: -1, max: 5000) |

