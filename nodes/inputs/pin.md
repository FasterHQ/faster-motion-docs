# Pin

**Type:** `pin`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

F330/F340 pin engagement state machine. Reads engine handle (from sibling PinAnchorNode) + progress; runs the 3-state lifecycle: BEFORE (progress ≤ 0) = element natural inside spacer; PINNED (0 < progress < 1) = element position:fixed at viewport top; AFTER (progress ≥ 1) = element at bottom of spacer via padding-top. Spacer + handle ownership lives on PinAnchorNode (loader-emitted). Subsumes scrollPin.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `handle` | `any` | Pin Handle |
| `progress` | `float` | Progress |
| `rawProgress` | `float` | Raw Progress (unclamped) |
| `topOverride` | `float` | Top Override |
| `leftOverride` | `float` | Left Override |
| `widthOverride` | `float` | Width Override |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `isEngaged` | `float` | Is Engaged |
| `rectTop` | `float` | Rect Top |
| `rectLeft` | `float` | Rect Left |
| `rectWidth` | `float` | Rect Width |
| `rectHeight` | `float` | Rect Height |


## Parameters

_No configurable parameters._
