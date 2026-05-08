# Gated Pulse

**Type:** `gatedPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

AND-gate for pulses. Outputs `pulse=1` ONLY on a frame where the input `pulse` is rising AND `gate` is > 0.5. Replaces the `expression: pulse * gate` + `pulseOr` chain authors use to filter a pulse by a boolean state. Pure combinatorial logic with one frame of edge-detector memory.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `gate` | `float` | Gate |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |


## Parameters

_No configurable parameters._
