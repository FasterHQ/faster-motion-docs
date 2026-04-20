# Property Animation

**Type:** `propertyAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Animate one or more CSS properties on a target element, driven by a 0..1 progress input. Compound: expanded into `multiKeyframe + domPoseWrite` at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels |

