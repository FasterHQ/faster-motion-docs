# Timeline

**Type:** `timeline`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Playback clock that emits a 0..1 `progress` over `duration` seconds. Self-advances when `autoplay`; can be externally driven by `play` / `pause` / `seek` pulses or a `progress` input.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `play` | `float` | Play |
| `pause` | `float` | Pause |
| `seek` | `float` | Seek |
| `gate` | `float` | Gate |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `currentTime` | `float` | Time (ms) |
| `isPlaying` | `float` | Playing |
| `isComplete` | `float` | Complete |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1` | Duration (s) (min: 0, max: 60) |
| `iterations` | int | `1` | Iterations (min: 0, max: 100) |
| `pingPong` | bool | `false` | Ping Pong |
| `timeScale` | float | `1` | Speed (min: -10, max: 10) |
| `delay` | float | `0` | Delay (s) (min: 0, max: 10) |
| `autoplay` | bool | `true` | Autoplay |

