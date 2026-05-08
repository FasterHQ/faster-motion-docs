# Viewport Observer

**Type:** `viewportObserver`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

IntersectionObserver-backed visibility detector. Watches a single element (typically per-clone in a forEach template via `{ "fromScope": "selector" }`) and emits an `enterPulse` (single frame) when it becomes visible, an `exitPulse` when it leaves, plus a continuous `isVisible` gate and the raw `intersectionRatio` (0..1). Crucially this fires on transform-induced visibility changes too — a translateX-driven carousel (no document scroll) still triggers the pulses, which is what differentiates it from `scrollTrigger`'s scroll-event-driven progress. Use as the trigger for per-card pluck animations: each card's pluck fires the moment IT enters view, with parameters captured from a velocity signal at that exact moment via a `latch`.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `enterPulse` | `float` | Enter |
| `exitPulse` | `float` | Exit |
| `isVisible` | `float` | Visible |
| `intersectionRatio` | `float` | Ratio |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Element |
| `rootMargin` | string | `"0px"` | Root Margin |
| `threshold` | float | `0.05` | Threshold (min: 0.01, max: 1) |

