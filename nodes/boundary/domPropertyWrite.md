# DOM Property Write

**Type:** `domPropertyWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write a float value to a single CSS property, transform component, data-attribute, scrollTop/scrollLeft, or textContent on a DOM element. Single-property sibling of `domPoseWrite` — use this when you need to drive ONE value (CSS variable, opacity, scrollTop, etc.); use `domPoseWrite` when you need a batched transform pose (translate / scale / rotate / skew). Custom properties (CSS variables like `--bento-col`) work — pass the full `--name` as the Property field; the runtime calls `el.style.setProperty(name, value + unit)`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `selector` | `string` | Selector |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `propertyName` | cssProperty | `"opacity"` | Property |
| `cssUnit` | enum | `"none"` | Unit. Options: `none`, `px`, `%`, `deg`, `rad`, `em`, `rem`, `vw`, `vh` |
| `template` | string | `""` | Template |

