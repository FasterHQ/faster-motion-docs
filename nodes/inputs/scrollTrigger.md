# Scroll Trigger

**Type:** `scrollTrigger`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Track element visibility during scroll — outputs progress, direction, velocity, and isInView

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `isInView` | `float` | In View |
| `direction` | `float` | Direction |
| `velocity` | `float` | Velocity |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Trigger Element |
| `startEdge` | string | `"top bottom"` | Start Edge |
| `endEdge` | string | `"bottom top"` | End Edge |
| `scroller` | string | `—` | Scroll Container |
| `invert` | bool | `false` | Invert Progress |

