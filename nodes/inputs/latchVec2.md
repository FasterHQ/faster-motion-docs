# Latch (Vec2)

**Type:** `latchVec2`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Vec2 sample-and-hold. Both components captured atomically on the rising-edge `pulse`. See `latch` for the float variant.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `vec2` | Value |
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `held` | `vec2` | Held |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialX` | float | `0` | Initial X |
| `initialY` | float | `0` | Initial Y |

