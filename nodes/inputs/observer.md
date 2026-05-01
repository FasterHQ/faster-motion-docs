# Observer

**Type:** `observer`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Gesture detector — listens for wheel / touch / pointer / scroll events on a target and outputs accumulated deltas. Events accumulate internally until the magnitude crosses `tolerance`, at which point the per-frame `deltaX` / `deltaY` outputs spike to the gesture amount for one frame, then reset to 0 next frame. Pair with `thresholdPulse` to convert deltas into discrete pulses, then `pulseCounter` for snap navigation.

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
| `selector` | elementSelector | `""` | Target Element |
| `eventType` | enum | `"wheel"` | Event Type. Options: `wheel`, `touch`, `pointer`, `scroll` |
| `axis` | enum | `"y"` | Axis. Options: `x`, `y`, `both` |
| `tolerance` | float | `10` | Tolerance (px) (min: 1, max: 200) |

