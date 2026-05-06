# Wheel Gesture

**Type:** `wheelGesture`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

DOM wheel listener that fires one pulse per noticeable scroll burst with a lockout window — the gesture model used by full-screen scrolljack / slide-deck navigation. Accumulates `deltaY`, fires a single-frame `pulse` once accumulated travel crosses `threshold`, then ignores further wheel events for `lockoutMs` (typically the slide transition duration). Resets the accumulator after `restMs` of idle so a slow scroll doesn't drift toward the threshold.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | Gate |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `direction` | `float` | Direction |
| `accumDelta` | `float` | Accumulated Delta |
| `burstMagnitude` | `float` | Burst Magnitude |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Listen Target |
| `axis` | axisChooser | `"y"` | Axis |
| `threshold` | float | `60` | Burst Threshold (min: 1) |
| `lockoutMs` | float | `800` | Lockout (ms) (min: 0) |
| `restMs` | float | `250` | Idle Reset (ms) (min: 0) |

