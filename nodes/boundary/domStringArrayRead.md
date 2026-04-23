# DOM String Array Read

**Type:** `domStringArrayRead`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Reads textContent (or an attribute) from EVERY element matching a selector, emits the results as a stringArray. Purpose: i18n-friendly multi-source text animations — the HTML owns every translatable string, the .fmtion carries only the recipe. Static read at bind time via querySelectorAll; document-order matches.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `items` | `stringArray` | Items |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `readMode` | enum | `"textContent"` | Read mode. Options: `textContent`, `attribute` |
| `attribute` | string | `""` | Attribute name |

