# Carousel Autoplay

**Type:** `carouselAutoplay`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Time-driven slideOffset for carousel auto-advancement. Pauses on hover (optional) and respects prefers-reduced-motion.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `slideOffset` | `float` | Slide Offset |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `speed` | float | `0.5` | Speed (slides/sec) (min: 0) |
| `pauseOnHover` | bool | `true` | Pause on Hover |
| `hoverSelector` | string | `""` | Hover Selector |
| `respectReducedMotion` | bool | `true` | Respect Reduced Motion |

