# Color Keyframe

**Type:** `colorKeyframe`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-stop color interpolation in OKLab space. Outputs a single `color` port (Color {r,g,b,a} 0-1 sRGB) that wires directly into DOMColorWriteNode.color. Keyframes are `{ time, value, ease? }` where value is a CSS color string.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | Color |


## Parameters

_No configurable parameters._
