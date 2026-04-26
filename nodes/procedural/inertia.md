# Inertia

**Type:** `inertia`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

F334 — exponential-decay tween. Animates a value from `from` under throw physics with a starting velocity. Optional snap targets land the natural rest position on the nearest snap value while preserving the decel curve. Use as a standalone "throw a property" driver independent of drag.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `velocity` | `float` | Velocity |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `isThrowing` | `float` | Is Throwing |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `from` | float | `0` | From |
| `resistance` | float | `1000` | Resistance (min: 1) |
| `minDuration` | float | `0.2` | Min Duration (min: 0) |
| `maxDuration` | float | `2` | Max Duration (min: 0) |

