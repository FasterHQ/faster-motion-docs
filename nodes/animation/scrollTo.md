# Scroll To

**Type:** `scrollTo`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F337 — animated scroll-to. Trigger-launched tween over the scroller's scrollTop. Resolves the target Y from a CSS selector (or "top" / "bottom") at trigger time, lerps from current scroll through the configured ease, outputs a `value` to feed a domPropertyWrite(scrollTop). Pure-graph; no imperative API.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `progress` | `float` | Progress |
| `isScrolling` | `float` | Is Scrolling |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetSelector` | string | `""` | Target Selector |
| `duration` | float | `0.8` | Duration (min: 0) |
| `ease` | string | `"easeInOutCubic"` | Ease |
| `offsetY` | float | `0` | Offset Y |
| `scroller` | string | `""` | Scroller |

