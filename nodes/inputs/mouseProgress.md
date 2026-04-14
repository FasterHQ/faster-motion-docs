# Mouse Progress

**Type:** `mouseProgress`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Outputs normalized mouse position [0, 1] relative to a target element or viewport.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progressX` | `float` | Progress X |
| `progressY` | `float` | Progress Y |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetSelector` | string | `""` | Target Selector |
| `smoothing` | float | `0` | Smoothing (min: 0, max: 0.99) |

