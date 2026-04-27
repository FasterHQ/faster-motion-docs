# DOM Query Size

**Type:** `domQuerySize`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Counts DOM elements matching a CSS selector at bind time. Pairs with forEach-driven cluster math: feed `count` into a singleton expression that needs to know N (e.g. dock cluster bounds) so the graph-side N stays in lockstep with the DOM-side icon count — author no longer has to keep a hardcoded `N` in sync with the HTML.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |

