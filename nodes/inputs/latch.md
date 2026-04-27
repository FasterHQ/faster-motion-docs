# Latch

**Type:** `latch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Sample-and-hold on rising-edge `pulse`. Captures the live `value` at the pulse moment and freezes it on `held`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `held` | `float` | Held |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initial` | float | `0` | Initial |

