# Multi Keyframe

**Type:** `multiKeyframe`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Multi-channel keyframe interpolation — one progress input, N float outputs with per-channel per-segment easing. Channels defined in params, output ports created dynamically.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `channels` | multiKeyframeChannels | `{}` | Channels |

