# Gaussian Blur Pass

**Type:** `gaussianBlurPass`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Two-pass separable Gaussian blur. Reads a source `<img>`, `<video>`, or `<canvas>` element and presents the blurred output to its own canvas inside the host. Strength is wireable in pixels (sigma); 0 = passthrough. The blur kernel is energy-preserving (weights normalised to 1) and runs through an FBO ping-pong (horizontal then vertical) for separable performance — O(2N) instead of O(N²) per pixel.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength (sigma px) |
| `opacity` | `float` | Opacity |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `sourceSelector` | elementSelector | `""` | Source Element |

