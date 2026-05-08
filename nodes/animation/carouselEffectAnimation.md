# Carousel Effect Animation

**Type:** `carouselEffectAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

A whole seamlessPlayhead-driven carousel effect as one author node. Every slot element matched by `selector` runs the same channel template, phase-shifted by its document-order index times `slotStride`. Expands at load into a single `carouselFanout` runtime node — N is resolved at bind time from `selector`, so adding or removing cards requires no graph edits. If you need per-slot divergence, detach to individual `slideSlotAnimation` nodes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `".carousel-slide"` | Selector |
| `slotStride` | float | `0.1` | Slot Stride (playhead) |
| `slotWindow` | float | `1` | Slot Window |
| `slotOffsetBase` | float | `0` | Slot 0 Offset |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels (shared by every slot) |

