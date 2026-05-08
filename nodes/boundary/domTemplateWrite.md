# DOM Template Write

**Type:** `domTemplateWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Combines N float inputs into one CSS string via a `{name}` template, then writes that string to a DOM element's style / attribute / textContent. One node replaces the pattern of N propertyAnimation channels each writing its own CSS variable plus a CSS `var()` recipe in the renderer — the graph emits the fully formed string and the CSS just consumes it. Use when one CSS property takes multiple animated components in one string: `filter: blur(...) brightness(...)`, `clip-path: polygon(...)`, `mask-image`, `transform-origin`.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `propertyName` | cssProperty | `"filter"` | CSS Property |
| `template` | string | `"blur({blur}px) brightness(...` | Template |
| `inputs` | stringFloatMap | `{"blur":{"type":"float"},"b...` | Inputs (port name → type) |
| `writeMode` | enum | `""` | Write Mode. Options: ``, `style`, `attribute`, `textContent` |
| `precision` | int | `4` | Decimal Places (min: 0, max: 8) |

