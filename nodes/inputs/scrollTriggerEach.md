# Scroll Trigger Each

**Type:** `scrollTriggerEach`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Per-element scroll progress fan-out. Same edge math as `scrollTrigger`, but resolves N matched elements at bind time and emits `progress`/`isInView` as arrays — each element's progress is computed against ITS OWN viewport position. Pairs with `staggerAnimate.progressArray` for "fire each row when its row enters viewport" patterns where one shared scrolltrigger range can't represent the per-element timing. Use when DOM-order interleaves columns (CSS grid) or rows scroll past at distinctly different viewport positions, and where same-row vs different-row stagger ordering would otherwise force per-tile triggers.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `floatArray` | Progress (per-element) |
| `unclampedProgress` | `floatArray` | Unclamped Progress (per-element) |
| `isInView` | `floatArray` | In View (per-element) |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `startEdge` | scrollEdges | `"top bottom"` | Start Edge |
| `endEdge` | scrollEdges | `"top 50%"` | End Edge |
| `scroller` | string | `—` | Custom Scroller |
| `invert` | bool | `—` | Invert |

