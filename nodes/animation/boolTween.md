# Bool Tween

**Type:** `boolTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Smoothly tween a 0..1 progress toward a bool target over a fixed duration. Used to drive DOM animations from bool parameters (hover/click toggles). Emits linear progress so downstream multiKeyframe can carry the ease curve.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `target` | `any` | Target |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `300` | Duration (ms) (min: 0, max: 10000) |
| `delay` | float | `0` | Delay (ms) (min: 0, max: 10000) |

