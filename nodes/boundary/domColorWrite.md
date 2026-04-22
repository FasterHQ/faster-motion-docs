# DOM Color Write

**Type:** `domColorWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write rgb() color to a DOM element CSS property. F293 Phase 7: accepts a single color-typed input.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | Color |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target |
| `propertyName` | enum | `"color"` | Property. Options: `color`, `backgroundColor`, `borderColor`, `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor`, `outlineColor`, `textDecorationColor`, `caretColor`, `accentColor`, `fill`, `stroke` |

