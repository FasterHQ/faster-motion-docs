# Clip Path Animation

**Type:** `clipPathAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Animate a CSS polygon() clip-path on a target element, driven by a 0..1 progress input. Each keyframe carries `values[]` (the polygon point coordinates). Compound: expanded into `clipPath + clipPathWrite` at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `keyframes` | clipPathKeyframes | `[{"time":0,"values":[50,50,...` | Keyframes |

