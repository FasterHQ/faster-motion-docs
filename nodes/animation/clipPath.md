# Clip Path

**Type:** `clipPath`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Keyframed polygon clip-path with structured point data. Interpolates between polygon keyframe stops — outputs typed ClipPathPoints for visual per-point editing in FVE.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `clipPathPoints` | Points |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `keyframes` | clipPathKeyframes | `[]` | Keyframes |

