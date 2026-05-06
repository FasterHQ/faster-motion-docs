# Slide Router

**Type:** `slideRouter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Gestural N-stage routing with eased transitions. Owns its own discrete-index state and runs an internal eased clock between consecutive indices. Three input triggers (`advance`, `retreat`, `seekTo`) replace the upstream `pulseCounter` chain — wire wheel / click / key gestures directly. Slide count auto-derives from `slidesSelector` (preferred) or is configured manually via `slideCount`. Emits a continuous `currentIndex` (lerped during transition), the latched `discreteIndex`, eased `transitionProgress`, and a `slideActivations` Float[N] channel.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `advance` | `float` | Advance |
| `retreat` | `float` | Retreat |
| `seekTo` | `float` | Seek To |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `currentIndex` | `float` | Current Index |
| `discreteIndex` | `float` | Discrete Index |
| `transitionProgress` | `float` | Transition Progress |
| `slideActivations` | `floatArray` | Slide Activations |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slidesSelector` | elementSelector | `""` | Slides Selector |
| `slideCount` | int | `—` | Slide Count (manual) (min: 1, max: 256) |
| `transitionDurationMs` | float | `800` | Transition Duration (ms) (min: 1) |
| `transitionEase` | easingCurve | `"easeInOutCubic"` | Transition Ease |
| `wrap` | bool | `false` | Wrap |

