# Event Listener

**Type:** `eventListener`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Boundary node — binds a DOM event listener on the target element and emits a graph pulse every frame an event fired. `fired` is 1/0 per frame; `count` is the number of events seen this frame (for click-counting / rapid-fire aggregation). The event queue captures every event between graph ticks, so nothing is dropped on busy frames.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `fired` | `float` | Fired |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | elementSelector | `""` | Target |
| `event` | domEvent | `"click"` | Event |

