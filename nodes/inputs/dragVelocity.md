# Drag Velocity

**Type:** `dragVelocity`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Pointer-drag gesture with continuous per-axis velocity output and post-release inertia. Emits px/sec velocity on each axis (smoothed across pointer samples), magnitude, and an `isDragging` gate. After the pointer is released, velocity decays exponentially over `releaseDecay` so consumers see a natural fling tail. Lighter than `dragInput`: no Draggable wrapper, no progress bounds — pure velocity primitive for fluid-carousel / drag-distortion idioms.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | Gate |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `dx` | `float` | dx (px/sec) |
| `dy` | `float` | dy (px/sec) |
| `magnitude` | `float` | Magnitude (px/sec) |
| `isDragging` | `float` | Is Dragging |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Listen Target |
| `sampleSmoothing` | float | `0.7` | Sample Smoothing (min: 0, max: 0.99) |
| `releaseDecay` | float | `0.85` | Release Decay (min: 0, max: 0.99) |
| `pointerCapture` | bool | `true` | Pointer Capture |

