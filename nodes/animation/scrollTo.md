# Scroll To

**Type:** `scrollTo`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F337 — animated scroll-to. Trigger-launched tween over the scroller's scrollTop. Resolves the target Y from a CSS selector (or "top" / "bottom") at trigger time, or from the dynamic `targetY` input port when wired (takes precedence over the selector). Lerps from current scroll through the configured ease, outputs a `value` to feed a domPropertyWrite(scrollTop). Pure-graph; no imperative API.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `targetY` | `float` | Target Y (px) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `progress` | `float` | Progress |
| `isScrolling` | `float` | Is Scrolling |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetSelector` | elementSelector | `""` | Target |
| `duration` | float | `0.8` | Duration (s) (min: 0) |
| `ease` | easingCurve | `"easeInOutCubic"` | Ease |
| `offsetY` | float | `0` | Offset Y (px) |
| `scroller` | elementSelector | `""` | Scroller |

