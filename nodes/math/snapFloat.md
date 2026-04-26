# Snap Float

**Type:** `snapFloat`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

F349 — snap an input float to the nearest of N configured values. Optional `smooth > 0` exponentially eases toward the target snap, frame-rate independent (gives ScrollTrigger-style "magnetic" snap behavior). Empty `values` array = passthrough. Linear nearest-neighbor scan; designed for small value lists (≤ 16).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `snapped` | `float` | Snapped |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `values` | string | `[]` | Snap Targets |
| `smooth` | float | `0` | Magnetic Smooth (min: 0, max: 10) |

