# Pulse Tween

**Type:** `pulseTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F349 — one-shot 0→1 clock controlled by event pulses. Each input is rising-edge-detected: `play` advances toward 1, `reverse` advances toward 0, `restart` resets to 0 and plays forward, `pause` freezes, `resume` un-freezes. Output `progress` is the eased value; `playing` is 1 while advancing. Maps the toggle-actions model (play / reverse / pause / resume / restart on independent rising-edge inputs) onto graph ports. Distinct from the stateless `tween` interpolator (which is a pure function of input progress) — pulseTween OWNS the progress.

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
| `duration` | float | `1` | Duration (sec) (min: 0.001) |
| `ease` | string | `"linear"` | Easing |

