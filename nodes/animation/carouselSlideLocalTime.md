# Carousel Slide Local Time

**Type:** `carouselSlideLocalTime`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Per-slide local-time for carousel tween semantics. slideProgress = clamp((playhead - slideIndex*spacing) mod loopDuration / duration, 0, 1).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |
| `slideIndex` | `float` | Slide Index |
| `spacing` | `float` | Spacing (s) |
| `duration` | `float` | Duration (s) |
| `loopDuration` | `float` | Loop Duration (s) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `slideProgress` | `float` | Slide Progress |


## Parameters

_No configurable parameters._
