# Pulse Tween

**Type:** `pulseTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

A one-shot 0..1 clock driven by event pulses, not by input progress. Each input is rising-edge-detected: **`play`** advances toward 1, **`reverse`** advances toward 0, **`restart`** resets to 0 and plays forward, **`pause`** freezes the current value, **`resume`** un-freezes. Output `progress` is the eased 0..1 value; `playing` is 1 while advancing. The node OWNS the progress — distinct from the stateless `tween` interpolator (which is a pure function of an input progress source). Use this whenever a transition should be triggered by a discrete event rather than driven by a continuous external clock.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `play` | `float` | Play |
| `reverse` | `float` | Reverse |
| `restart` | `float` | Restart |
| `pause` | `float` | Pause |
| `resume` | `float` | Resume |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `playing` | `float` | Playing |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1` | Duration (sec) (min: 0.05, max: 10) |
| `ease` | easingCurve | `"easeOutCubic"` | Easing |

