# Carousel Wrap Counter

**Type:** `carouselWrapCounter`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Half-plane wrap detection with cooldown + 3-sample direction majority. Emits cumulative iteration for seamless carousel loops.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `iteration` | `float` | Iteration |
| `wrappedProgress` | `float` | Wrapped Progress |
| `direction` | `float` | Direction |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cooldownFrames` | int | `2` | Cooldown Frames (min: 0, max: 60) |
| `directionWindow` | int | `3` | Direction Window (min: 1, max: 15) |

