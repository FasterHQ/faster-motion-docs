# Click State Dispatcher

**Type:** `clickStateDispatcher`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Click N targets to set a state to one of N values, written to a single attribute on a write target. Compound: expanded into N eventListener + chained-ternary expression + pulseOr + latch + 1 domPropertyWrite. The latch holds the dispatched value, the write puts it on the writeTo target as a `data-*` attribute that CSS can match against. Also exposes `value` (latched float, for downstream graph computation) and `pulse` (rising-edge merged click pulse, for downstream triggers).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `pulse` | `float` | Pulse |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targets` | selectorList | `[]` | Click Targets |
| `values` | numberList | `[]` | Values |
| `writeTo` | elementSelector | `""` | Write To |
| `writeAttribute` | string | `"data-active"` | Attribute |
| `initial` | float | `0` | Initial Value |
| `event` | domEvent | `"click"` | Event |

