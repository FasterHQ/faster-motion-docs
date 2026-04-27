# Pulse Dispatch

**Type:** `pulseDispatch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

One pulse in, one of N channels out per pulse. `strategy` picks the dispatch rule. Replaces the accumulator + counter + router triplet.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `strategy` | enum | `"roundRobin"` | Strategy. Options: `roundRobin`, `random`, `sequential` |
| `threshold` | float | `0.07` | Threshold (min: 0.001) |
| `maxBacklog` | float | `1.5` | Max Backlog (min: 0) |
| `count` | int | `1` | Channels (min: 1, max: 256) |
| `defaultRoute` | int | `-1` | Default Route (min: -1) |
| `seed` | int | `1` | Seed |
| `avoidRepeat` | bool | `false` | Avoid Repeat |

