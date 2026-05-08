# Drag Velocity

**Type:** `dragVelocity`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Passive pointer-drag sensor: cumulative per-axis offset, per-frame raw delta, continuous velocity, optional post-release inertia. Emits px-cumulative offset (`offsetX`/`offsetY`), per-frame raw pointer delta (`frameDeltaX`/`frameDeltaY`), px/sec velocity (`dx`/`dy`), magnitude, and an `isDragging` gate. Never moves the bound element — pure pointer-event integration so the data can be composed into arbitrary downstream graph expressions (carousel pan, parallax pull, scrub-forever timelines, swipe-to-scroll via `scrollPosition`) without hijacking the listen target. After release, velocity decays exponentially over `releaseDecay`; with `inertia: true` that decaying velocity also integrates back into offset (and into `frameDelta*` so an inertia tail can flow into a downstream `scrollPosition`), respecting the optional clamp bounds.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | Gate |
| `clampMinXInput` | `float` | Clamp Min X (wired) |
| `clampMaxXInput` | `float` | Clamp Max X (wired) |
| `clampMinYInput` | `float` | Clamp Min Y (wired) |
| `clampMaxYInput` | `float` | Clamp Max Y (wired) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `offsetX` | `float` | Offset X (px) |
| `frameDeltaX` | `float` | Frame Delta X (px) |
| `frameDeltaY` | `float` | Frame Delta Y (px) |
| `offsetY` | `float` | Offset Y (px) |
| `dx` | `float` | dx (px/sec) |
| `dy` | `float` | dy (px/sec) |
| `magnitude` | `float` | Magnitude (px/sec) |
| `isDragging` | `float` | Is Dragging |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Listen Target |
| `accumulate` | bool | `true` | Accumulate |
| `inertia` | bool | `false` | Inertia |
| `sampleSmoothing` | float | `0.7` | Sample Smoothing (min: 0, max: 0.99) |
| `releaseDecay` | float | `0.85` | Release Decay (min: 0, max: 0.99) |
| `pointerCapture` | bool | `true` | Pointer Capture |
| `axisLock` | string | `"free"` | Axis Lock |
| `axisLockThreshold` | float | `6` | Axis Lock Threshold (px) |
| `clampMinX` | float | `—` | Clamp Min X |
| `clampMaxX` | float | `—` | Clamp Max X |
| `clampMinY` | float | `—` | Clamp Min Y |
| `clampMaxY` | float | `—` | Clamp Max Y |

