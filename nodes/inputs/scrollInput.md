# Scroll Input

**Type:** `scrollInput`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Scroll progress (0-1) from page scroll position

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `scrollPosition` | `float` | Scroll Position |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `axis` | enum | `"y"` | Axis. Options: `x`, `y` |
| `trigger` | string | `""` | Trigger |
| `start` | float | `0` | Start (min: 0, max: 1) |
| `end` | float | `1` | End (min: 0, max: 1) |

