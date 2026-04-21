# Slide Slot Animation

**Type:** `slideSlotAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

A single slot in a seamlessPlayhead-driven carousel. Maps a per-slot window of the carousel playhead (e.g. [0.1, 1.1]) to a [0,1] slot-local progress (remap + fract), then animates CSS properties on the slot element via channels. One compound per slot collapses the canonical `remap + mathUtil(fract) + multiKeyframe + domPoseWrite` chain that every carousel effect repeats per slide. Compound: expanded into those four primitives at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `slotStart` | float | `0` | Slot Start (playhead) |
| `slotEnd` | float | `1` | Slot End (playhead) |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels |

