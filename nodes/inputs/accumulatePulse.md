# Accumulate Pulse

**Type:** `accumulatePulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Integrates `value` per frame and emits a `pulse` each time the running total reaches `threshold`, then subtracts threshold from the accumulator (overshoot carries forward). `maxBacklog` clamps post-fire overshoot so a one-frame burst cannot queue an unbounded backlog.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `total` | `float` | Total |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `threshold` | float | `100` | Threshold (min: 0.001) |
| `maxBacklog` | float | `1.5` | Max Backlog (min: 0) |

