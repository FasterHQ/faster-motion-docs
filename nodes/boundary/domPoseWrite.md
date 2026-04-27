# DOM Pose Write

**Type:** `domPoseWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Boundary node: writes one or more float values to CSS properties on a target DOM element. Pick which properties to expose via the picker — each becomes an input port wired from upstream tweens / latches / math.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `properties` | domPoseProperties | `{}` | Properties |

