# Carousel Effect Animation

**Type:** `carouselEffectAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

An entire seamlessPlayhead-driven carousel effect as one authoring node. Every slot shares the same animation template (channels) and the same slot-window size; only the slot's selector index and playhead-offset vary. Expands at load time into N `slideSlotAnimation` children (which further expand into `remap + mathUtil(fract) + multiKeyframe + domPoseWrite` primitives per slot). Use this when the carousel's N slots truly share one effect; if you need per-slot divergence, detach to individual `slideSlotAnimation` nodes. Compound: no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selectorTemplate` | string | `".carousel-slide:nth-of-typ...` | Selector Template |
| `slotCount` | int | `6` | Slot Count (min: 1, max: 100) |
| `slotStride` | float | `0.1` | Slot Stride (playhead) |
| `slotWindow` | float | `1` | Slot Window |
| `slotOffsetBase` | float | `0` | Slot 0 Offset |
| `indexBase` | int | `1` | Selector Index Base (min: 0, max: 1) |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels (shared by every slot) |

