# Timeline

**Type:** `timeline`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Playback sequencer — self-advancing or externally driven (scroll, parameter)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `play` | `float` | Play |
| `pause` | `float` | Pause |
| `seek` | `float` | Seek |
| `gate` | `float` | Gate |


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
| `duration` | float | `1000` | Duration (ms) (min: 0, max: 60000) |
| `iterations` | int | `1` | Iterations (min: 0, max: 100) |
| `pingPong` | bool | `false` | Ping Pong |
| `timeScale` | float | `1` | Speed (min: -10, max: 10) |
| `delay` | float | `0` | Delay (ms) (min: 0, max: 10000) |
| `autoplay` | bool | `true` | Autoplay |

