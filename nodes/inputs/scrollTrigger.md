# Scroll Trigger

**Type:** `scrollTrigger`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Track an element's position relative to the scroll viewport — outputs progress (0..1), direction (±1), velocity (px/s), isInView (0/1), and pin geometry. Edges control when progress starts and ends, expressed as `<elementEdge> <viewportEdge>` pairs ("top bottom" = element top reaches viewport bottom; "bottom top" = element bottom reaches viewport top). When `pin: true` is authored, the loader emits a PinAnchor sibling and wires `flowTop` automatically so progress measures through the spacer rather than the pinned rect.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `flowTop` | `float` | Pin Anchor Flow Top |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `unclampedProgress` | `float` | Progress (unclamped) |
| `scrolledPx` | `float` | Scrolled (px, clamped) |
| `scrolledPxUnclamped` | `float` | Scrolled (px, unclamped) |
| `windowPx` | `float` | Window Length (px) |
| `isInView` | `float` | In View |
| `direction` | `float` | Direction |
| `velocity` | `float` | Velocity |
| `pinTopOffset` | `float` | Pin Top Offset |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Trigger Element |
| `startEdge` | scrollEdges | `"top bottom"` | Scroll Edges |
| `scroller` | elementSelector | `""` | Scroll Container |
| `invert` | bool | `false` | Invert Progress |
| `pin` | bool | `false` | Pin |
| `pinSpacing` | bool | `true` | Pin Spacing |
| `pinTarget` | elementSelector | `""` | Pin Target |
| `pinZIndex` | string | `""` | Pin Z-Index |

