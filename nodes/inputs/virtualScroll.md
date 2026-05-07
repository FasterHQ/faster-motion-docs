# Virtual Scroll

**Type:** `virtualScroll`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Continuous wheel/touch accumulator with eased follow. Replaces document scroll for infinite-loop carousels and patrickheng-style virtual scrollers — listens to wheel/touch on `selector` (or window), accumulates raw deltas into an unbounded `targetPos`, and lerps `position` toward it each frame using `smoothing`. `position` is monotonic and unbounded, so consumers can fract-wrap it (`carouselEffectAnimation` does this internally) for true forever-scroll without document-scroll runways. Optionally hides the native scrollbar by setting `overflow:hidden` on html+body during bind, restoring on dispose.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | Gate |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `float` | Position |
| `velocity` | `float` | Velocity |
| `direction` | `float` | Direction |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Listen Target |
| `axis` | axisChooser | `"y"` | Axis |
| `sensitivity` | float | `1` | Sensitivity (min: 0.01) |
| `smoothing` | float | `0.1` | Smoothing (min: 0, max: 0.99) |
| `hideNativeScroll` | bool | `true` | Hide Native Scrollbar |

