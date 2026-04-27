# Random Float

**Type:** `randomFloat`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Picks a uniform random float in [`min`, `max`) on each rising-edge `pulse` and holds it until the next pulse. Wire into a tween's `to` for per-spawn variety (random rotation, scale variance, fall distance).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `min` | float | `0` | Min |
| `max` | float | `1` | Max |
| `seed` | int | `1` | Seed |

