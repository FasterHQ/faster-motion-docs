# Pulse Delay

**Type:** `pulseDelay`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Fires `pulse` exactly `delay` seconds after a rising-edge `trigger`. Graph-native equivalent of `setTimeout(..., delay)`. Single-slot — additional triggers while a pulse is pending are absorbed (matches debounce / one-shot semantics). For per-trigger queuing, compose with `pulseCounter`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `delay` | float | `0.2` | Delay (s) (min: 0) |

