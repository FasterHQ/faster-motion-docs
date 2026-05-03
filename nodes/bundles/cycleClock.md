# Cycle Clock

**Type:** `cycleClock`  
**Category:** bundles  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Accumulates ambient scheduler deltaTime into a normalized 0..1 cycle progress. The canonical "looping clock" — drives any consumer that takes a 0..1 progress (textRevealAnimation, propertyAnimation, staggerAnimation) when you want continuous motion not gated by scroll or user input. No input ports: clock nodes read ambient time directly (F236), so they keep ticking even when the rest of the graph is idle.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `completed` | `float` | Completed Cycles |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1000` | Duration (ms) (min: 1) |
| `iterations` | int | `0` | Iterations (0=infinite) (min: 0) |
| `pingPong` | bool | `false` | Ping-Pong |

