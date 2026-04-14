# Draggable

**Type:** `draggable`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Enable drag interaction with optional axis lock and bounds

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `targetPosition` | `vec2` | Target |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `vec2` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lockX` | bool | `false` | Lock X |
| `lockY` | bool | `false` | Lock Y |
| `boundsMinX` | float | `99999` | Min X |
| `boundsMaxX` | float | `99999` | Max X |
| `boundsMinY` | float | `99999` | Min Y |
| `boundsMaxY` | float | `99999` | Max Y |

