# Scroll Tween

**Type:** `scrollTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Animate one or more CSS properties on a target element, driven by scroll progress between two edges of a trigger element. Compound: expanded into `scrollTrigger + propertyAnimation` (which itself expands to `multiKeyframe + domPoseWrite`) — no runtime class. Use this in place of manually wiring `scrollTrigger.progress → tween → domPropertyWrite` for every property. Channels accept EITHER the terse `{from, to, cssUnit?, ease?}` shape (hand-authored / AI-generated) OR the standard `{cssUnit?, keyframes: [{time, value, ease?}]}` shape (FVE-edited) — both expand to the same runtime nodes.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Trigger |
| `target` | elementSelector | `""` | Target |
| `startEdge` | scrollEdges | `"top bottom"` | Scroll Edges |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels |

