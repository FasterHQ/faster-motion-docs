# DOM String Write

**Type:** `domStringWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write a string value to a DOM element (CSS, SVG attribute, textContent)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `propertyName` | string | `"textContent"` | Property |
| `writeMode` | enum | `—` | Write Mode. Options: ``, `style`, `attribute`, `textContent` |

