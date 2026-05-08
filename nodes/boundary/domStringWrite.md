# DOM String Write

**Type:** `domStringWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write a string value to one or more DOM elements — CSS style property (including custom properties like `--name`), HTML/SVG attribute, or `textContent`. String sibling of `domPropertyWrite` (which writes floats); `domPoseWrite` is the multi-property unified writer when you need both float + string + color in one batched write. Resolves the selector via querySelectorAll; comma-listed selectors write to every match.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `propertyName` | cssProperty | `"textContent"` | Property |
| `writeMode` | enum | `""` | Write Mode. Options: ``, `style`, `attribute`, `textContent` |

