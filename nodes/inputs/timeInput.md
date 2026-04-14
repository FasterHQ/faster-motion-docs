# Time Input

**Type:** `timeInput`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Elapsed time to normalized progress (0-1)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1000` | Duration (ms) (min: 0) |
| `loop` | bool | `false` | Loop |
| `pingpong` | bool | `false` | Ping Pong |
| `delay` | float | `0` | Delay (ms) (min: 0) |

