# Scroll Progress

**Type:** `scrollProgress`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Outputs normalized scroll position [0, 1]. Drive text/instance animations from scroll.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scrollSelector` | string | `""` | Scroll Container |
| `startOffset` | float | `0` | Start Offset (px) |
| `endOffset` | float | `0` | End Offset (px) |

