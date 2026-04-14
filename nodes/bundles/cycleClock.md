# Cycle Clock

**Type:** `cycleClock`  
**Category:** bundles  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Accumulates ambient scheduler deltaTime into a cycle progress [0, 1]. Drives time-dependent modifier compute nodes. Supports duration, iterations, ping-pong. No input ports — clock nodes read ambient time directly (F236).

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

