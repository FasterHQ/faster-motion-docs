# DOM Property Write

**Type:** `domPropertyWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write a float value to a CSS property, transform, attribute, or textContent on a DOM element

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `propertyName` | string | `"opacity"` | Property |
| `cssUnit` | enum | `"none"` | Unit. Options: `none`, `px`, `%`, `deg`, `rad`, `em`, `rem`, `vw`, `vh` |

