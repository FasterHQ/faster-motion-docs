# Carousel Keyboard Nav

**Type:** `carouselKeyboardNav`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Edge-triggered ArrowLeft/ArrowRight → cumulative iteration offset. Wire into SeamlessPlayhead.iteration to enable keyboard slide stepping.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `iterationOffset` | `float` | Iteration Offset |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prevKey` | string | `"ArrowLeft"` | Previous Key |
| `nextKey` | string | `"ArrowRight"` | Next Key |

