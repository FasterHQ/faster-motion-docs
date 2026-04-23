# DOM Attribute Read

**Type:** `domAttributeRead`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Reads a DOM value from an element at bind time and outputs it as a string. `readMode: attribute` (default) reads via getAttribute — SVG d/viewBox/points, data-* attributes, aria-* attributes. `readMode: textContent` reads el.textContent — used for i18n-friendly text animations where the translatable string lives in the DOM. Static read. Boundary counterpart to DOMStringWriteNode.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `readMode` | enum | `"attribute"` | Read mode. Options: `attribute`, `textContent` |
| `attribute` | string | `"d"` | Attribute name |

