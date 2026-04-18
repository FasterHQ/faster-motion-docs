# Seamless Playhead

**Type:** `seamlessPlayhead`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Pure-math playhead for seamless infinite loops. Maps progress + iteration to a rawSequence-equivalent playhead time; slideOffset nudges playhead by one spacing-unit per step (keyboard / autoplay step).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `iteration` | `float` | Iteration |
| `loopDuration` | `float` | Loop Duration (s) |
| `overlap` | `float` | Overlap |
| `slideOffset` | `float` | Slide Offset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead (s) |
| `activeIndex` | `float` | Active Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slideCount` | int | `1` | Slide Count (min: 1, max: 1000) |

