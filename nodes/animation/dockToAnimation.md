# Dock To Animation

**Type:** `dockToAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Dock a source DOM element onto a target DOM element, driven by a 0..1 progress input (0 = at rest, 1 = fully docked). Emits horizontal + vertical pixel offsets; authors route each offset to any CSS property via `channels`. Default maps offsetX → translateX(px) and offsetY → translateY(px) on the source element — override for axis-only docking, or to pipe the offset into marginLeft / mask-position / CSS custom vars / scale compensation, etc. Compound: expanded into `domDockTo + domPoseWrite` at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sourceSelector` | elementSelector | `""` | Source Element |
| `targetSelector` | elementSelector | `""` | Target Element |
| `sourceAnchor` | string | `"center"` | Source Anchor |
| `targetAnchor` | string | `"center"` | Target Anchor |
| `channels` | dockToChannels | `{"translateX":{"from":"offs...` | Channels |

