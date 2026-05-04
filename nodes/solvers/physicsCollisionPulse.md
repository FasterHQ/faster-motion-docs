# Physics Collision Pulse

**Type:** `physicsCollisionPulse`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — fires a one-frame `pulse: 1.0` on the frame a tracked body collides with another body. Filters by `bodyId` (required) and optionally `withBodyId` (specific second-body); set the `event` param to `start` (contact-begin) or `end` (separate). Composes 1:1 with `pulseTween`, state-machine triggers, and `expression` math for "ball lands → squash" or "two bodies meet → spawn".

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |
| `withBodyId` | `float` | With Body ID (optional) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `otherBodyId` | `float` | Other Body ID |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `event` | enum | `"start"` | Event. Options: `start`, `end` |

