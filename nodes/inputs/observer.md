# Observer

**Type:** `observer`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Detect gestures (wheel, touch, pointer, scroll) — outputs deltas

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `deltaX` | `float` | Delta X |
| `deltaY` | `float` | Delta Y |
| `isPressed` | `float` | Pressed |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Element |
| `eventType` | enum | `"wheel"` | Event Type. Options: `wheel`, `touch`, `pointer`, `scroll` |
| `axis` | enum | `"y"` | Axis. Options: `x`, `y`, `both` |
| `tolerance` | float | `10` | Tolerance (px) (min: 0, max: 100) |

