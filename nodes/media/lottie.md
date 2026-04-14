# Lottie

**Type:** `lottie`  
**Category:** media  
**Context:** DOM — operates on HTML elements via CSS selectors  

Lottie animation — autoplay, scroll-driven, or state-controlled

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `scrollProgress` | `float` | Scroll Progress |
| `state` | `float` | State |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `currentFrame` | `float` | Frame |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Container |
| `src` | string | `""` | Source |
| `autoplay` | bool | `true` | Autoplay |
| `loop` | bool | `true` | Loop |
| `speed` | float | `1` | Speed (min: 0.1, max: 10) |

