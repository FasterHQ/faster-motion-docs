# Scroll Trigger

**Type:** `scrollTrigger`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Track element visibility during scroll — outputs progress, direction, velocity, isInView, and pin geometry (pinTopOffset) consumed by PinNode. When `pin: true` is authored, the loader wires PinAnchorNode.flowTop into the optional `flowTop` input so progress measures through the spacer (flow position) rather than the pinned element's viewport rect.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `flowTop` | `float` | Pin Anchor Flow Top |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `unclampedProgress` | `float` | Progress (unclamped) |
| `isInView` | `float` | In View |
| `direction` | `float` | Direction |
| `velocity` | `float` | Velocity |
| `pinTopOffset` | `float` | Pin Top Offset |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Trigger Element |
| `startEdge` | string | `"top bottom"` | Start Edge |
| `endEdge` | string | `"bottom top"` | End Edge |
| `scroller` | string | `—` | Scroll Container |
| `invert` | bool | `false` | Invert Progress |

