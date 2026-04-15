# DOM Attribute Read

**Type:** `domAttributeRead`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Reads a DOM/SVG attribute (e.g., d, viewBox, points) from an element at bind time and outputs it as a string. Static read — the boundary counterpart to DOMStringWriteNode.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `attribute` | string | `"d"` | Attribute |

