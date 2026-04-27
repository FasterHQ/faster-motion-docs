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
| `minX` | float | `null` | Min X |
| `maxX` | float | `null` | Max X |
| `minY` | float | `null` | Min Y |
| `maxY` | float | `null` | Max Y |
| `minZoom` | float | `0` | Min Zoom (min: 0) |
| `maxZoom` | float | `null` | Max Zoom (min: 0) |

