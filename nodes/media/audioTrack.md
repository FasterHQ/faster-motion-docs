# Audio Track

**Type:** `audioTrack`  
**Category:** media  
**Context:** Shared — works in both DOM and canvas graphs  

Audio playback with level output for audio-reactive animations

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `seek` | `float` | Seek (0-1) |
| `volume` | `float` | Volume |
| `playback` | `float` | Playback (1=play) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `level` | `float` | Level (RMS) |
| `progress` | `float` | Progress (0-1) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | `""` | Audio URL |
| `loop` | bool | `false` | Loop |
| `startTime` | float | `0` | Start Time (ms) (min: 0) |
| `duration` | float | `0` | Duration (ms) (min: 0) |
| `offset` | float | `0` | File Offset (ms) (min: 0) |

