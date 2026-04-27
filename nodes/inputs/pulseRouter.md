# Pulse Router

**Type:** `pulseRouter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Demultiplex one pulse to one of `count` output channels by integer `index`. Rising edge on `pulse` produces a single-frame spike on `out{Math.round(index)}`; out-of-range follows `defaultRoute` (set to -1 to drop).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `index` | `float` | Index |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `1` | Channels (min: 1, max: 256) |
| `defaultRoute` | int | `-1` | Default Route (min: -1) |

