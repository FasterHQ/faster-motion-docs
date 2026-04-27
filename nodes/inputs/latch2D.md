# Latch (2D)

**Type:** `latch2D`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Atomic sample-and-hold for a scalar X+Y pair. On rising-edge `pulse`, captures both axes from the SAME frame.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `valueX` | `float` | Value X |
| `valueY` | `float` | Value Y |
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `heldX` | `float` | Held X |
| `heldY` | `float` | Held Y |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialX` | float | `0` | Initial X |
| `initialY` | float | `0` | Initial Y |

