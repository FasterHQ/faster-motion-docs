# Direction Latch

**Type:** `directionLatch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Maintains a ±1 direction value, flipped to +1 on rising-edge `forward` or -1 on rising-edge `backward`. Outputs `direction` (signed) plus `forwardActive` / `backwardActive` (binary 0/1) for use as multipliers in direction-aware animation expressions. Replaces the pulseTween-of-duration-0.001s + sign-extracting expressions hack.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `forward` | `float` | Forward |
| `backward` | `float` | Backward |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `direction` | `float` | Direction |
| `forwardActive` | `float` | Forward Active |
| `backwardActive` | `float` | Backward Active |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialDirection` | enum | `1` | Initial Direction. Options: `1`, `-1` |

