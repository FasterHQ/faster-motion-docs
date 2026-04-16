# DOM Dock To

**Type:** `domDockTo`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Compute additive translate that centers a source DOM element over a target element, scaled by a 0..1 blend. Wire outputs into a domPoseWrite translateX/translateY.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `blend` | `float` | Blend |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `offsetX` | `float` | Offset X (px) |
| `offsetY` | `float` | Offset Y (px) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sourceSelector` | string | `""` | Source Element |
| `targetSelector` | string | `""` | Target Element |
| `sourceAnchor` | string | `"center"` | Source Anchor (Y) |
| `targetAnchor` | string | `"center"` | Target Anchor (Y) |

