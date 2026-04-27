# Color Keyframe

**Type:** `colorKeyframe`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-stop color interpolation in OKLab space. Outputs a single `color` port (Color {r,g,b,a} 0-1 sRGB) that wires into a `domPoseWrite` color-typed property port. Keyframes are `{ time, value, ease? }` where value is a CSS color string.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | Color |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `keyframes` | colorKeyframes | `[{"time":0,"value":"#000000...` | Keyframes |

