# Scroll Bar

**Type:** `scrollBar`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Scroll bar indicator that tracks scroll position

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `scrollProgress` | `float` | Scroll Progress |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `axis` | enum | `"y"` | Axis. Options: `x`, `y` |
| `trackLength` | float | `200` | Track Length (min: 0) |

