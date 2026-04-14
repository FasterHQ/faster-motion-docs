# Event Listener

**Type:** `eventListener`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

DOM event to graph signal (click, hover, etc.)

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
| `target` | string | `""` | Target |
| `event` | enum | `"click"` | Event. Options: `click`, `mouseenter`, `mouseleave`, `pointerdown`, `pointerup` |

