# Bidirectional Counter

**Type:** `bidirectionalCounter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Clamped integer counter with separate `increment` and `decrement` inputs. Counter never grows past `max` or below `min` — out-of-range pulses are silently absorbed inside the node, so the visible `value` always reflects bounds. Sister of `pulseCounter`, but bidirectional and clamped. Avoids the `cDn − cUp` two-counter-subtract hack and its over-scroll drift bug at boundaries.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `increment` | `float` | Increment |
| `decrement` | `float` | Decrement |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | int | `0` | Start |
| `min` | int | `0` | Min |
| `max` | int | `10` | Max |
| `step` | int | `1` | Step (min: 1) |

