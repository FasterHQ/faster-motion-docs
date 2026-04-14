# Camera Bounds

**Type:** `cameraBounds`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Clamp camera position and zoom to bounds

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `vec2` | Position |
| `zoom` | `float` | Zoom |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `vec2` | Position |
| `zoom` | `float` | Zoom |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `minX` | float | `99999` | Min X |
| `maxX` | float | `99999` | Max X |
| `minY` | float | `99999` | Min Y |
| `maxY` | float | `99999` | Max Y |
| `minZoom` | float | `0` | Min Zoom (min: 0) |
| `maxZoom` | float | `99999` | Max Zoom (min: 0) |

