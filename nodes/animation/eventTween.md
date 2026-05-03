# Event Tween

**Type:** `eventTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Time-based tween triggered by a DOM event. `onEvent` starts the play pulse; optional `offEvent` reverses it (e.g. `mouseenter`/`mouseleave` for hover toggles). Compound: expanded into `eventListener + (eventListener?) + pulseTween + propertyAnimation` — no runtime class. Use this in place of CSS transitions when authoring graph-driven interactions. Channels accept EITHER the terse `{from, to, cssUnit?, ease?}` shape (hand-authored / AI-generated) OR the standard `{cssUnit?, keyframes: [{time, value, ease?}]}` shape (FVE-edited).

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `trigger` | elementSelector | `""` | Event Source |
| `target` | elementSelector | `""` | Target |
| `onEvent` | domEvent | `"click"` | On Event |
| `offEvent` | domEvent | `""` | Off Event |
| `duration` | float | `0.3` | Duration |
| `ease` | easingCurve | `"easeOutCubic"` | Ease |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Channels |

