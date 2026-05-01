# Load Pulse

**Type:** `loadPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Fires a single-frame `pulse` on the first graph evaluation, then stays at 0 forever. The graph-native equivalent of "do this once at startup". Replaces the common hack of `(time > 0.05 ? 1 : 0)` expression + thresholdPulse rising-edge detector — that pattern silently failed because of thresholdPulse's cold-start rule (first-frame-above-threshold is NOT a rising edge).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |


## Parameters

_No configurable parameters._
