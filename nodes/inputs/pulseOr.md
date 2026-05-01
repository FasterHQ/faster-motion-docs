# Pulse OR

**Type:** `pulseOr`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Fires `pulse=1` for a single frame whenever ANY input pulse has a rising edge. Replaces the boilerplate `Math.max(node('a'), node('b'), …)` expression + thresholdPulse pair authors use to combine multiple trigger sources.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `a` | `float` | A |
| `b` | `float` | B |
| `c` | `float` | C |
| `d` | `float` | D |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |


## Parameters

_No configurable parameters._
