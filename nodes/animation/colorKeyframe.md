# Color Keyframe

**Type:** `colorKeyframe`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-stop color interpolation in OKLab space — outputs r, g, b channels (0-255). Keyframes are `{ time, value, ease? }` where value is a CSS color string.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `r` | `float` | R |
| `g` | `float` | G |
| `b` | `float` | B |


## Parameters

_No configurable parameters._
