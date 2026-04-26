# Physics 2D

**Type:** `physics2D`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

F335 — single-body 2D ballistic motion. Rising-edge `trigger` launches a body from origin at `velocity` in direction `angle°`, integrates Verlet under constant `gravity` + exponential `friction`. Outputs current `(x, y)` and `(vx, vy)` so downstream graph nodes can drive position, rotation-from-velocity, fade-by-speed, etc. Auto-stops after `duration` seconds.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X |
| `y` | `float` | Y |
| `vx` | `float` | VX |
| `vy` | `float` | VY |
| `isLaunched` | `float` | Is Launched |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `velocity` | float | `800` | Velocity (min: 0) |
| `angle` | float | `-45` | Angle (°) |
| `gravity` | float | `1000` | Gravity |
| `friction` | float | `0` | Friction (min: 0) |
| `duration` | float | `3` | Duration (sec) (min: 0) |

