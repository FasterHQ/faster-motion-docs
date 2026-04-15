# DOM Pose Write

**Type:** `domPoseWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Write multiple float values to CSS properties on a single DOM element. Transform components route through the accumulator, other properties go through DOMBatcher.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `properties` | string | `{}` | Properties |

