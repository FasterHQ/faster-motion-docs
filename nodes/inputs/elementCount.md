# Element Count

**Type:** `elementCount`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Emits `document.querySelectorAll(selector).length` as a first-class graph value. Use to eliminate hard-coded `N` literals scattered across `propertyAnimation` channel maxes, `expression` `* (N-1)` math, and `clickStateDispatcher.values[]` arrays — wire `count`/`countMinusOne` into them so adding a matched element auto-rescales the graph. Re-queries each evaluate; cost is one querySelectorAll per Scheduler tick (negligible). Throws on empty selector or absent DOM (faster-motion-runtime/SSR).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `countMinusOne` | `float` | Count − 1 |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |

