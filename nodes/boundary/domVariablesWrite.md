# DOM Variables Write

**Type:** `domVariablesWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Batched CSS-custom-property writer with per-variable remap built in. Takes a single shared input value and fans it out to N CSS variables (`--foo`) on one element, with each variable carrying its own input/output range, unit, easing curve, and clamp. Replaces the common `1 source → N remap → N domPropertyWrite` chain — collapses to a single node in author view.

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
| `properties` | domVariablesChannels | `{}` | Variables |

