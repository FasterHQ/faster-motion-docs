# Carousel Fanout

**Type:** `carouselFanout`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Runtime fan-out of a shared keyframe template across N DOM elements with phase-shifted local time. Resolves matching elements at bind time via `selector` and runs all N slot evaluations inside one node — replaces the legacy expansion-time fan-out (`carouselEffectAnimation` → N × `slideSlotAnimation` × 4 primitives) with a single runtime node. Preferred runtime shape; `carouselEffectAnimation` is the author-facing compound that emits one of these. Channels accept the simple `{cssUnit?, template?, keyframes}` shape and the composed `{template, channels: { sub: { keyframes } }}` shape that drives multi-input CSS strings (`filter: blur({blur}px) brightness({bright})`) without going through CSS variables.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector |
| `slotStride` | float | `0.1` | Slot Stride (playhead) |
| `slotWindow` | float | `1` | Slot Window |
| `slotOffsetBase` | float | `0` | Slot 0 Offset |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels (shared by every slot) |

