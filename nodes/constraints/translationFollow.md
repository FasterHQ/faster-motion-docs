# Translation Follow

**Type:** `translationFollow`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Constrain position to follow a source position

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `sourcePosition` | `vec2` | Source |
| `targetPosition` | `vec2` | Target |
| `strength` | `float` | Strength |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `vec2` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `clampMinX` | bool | `false` | Clamp Min X |
| `clampMinValueX` | float | `0` | Min X |
| `clampMaxX` | bool | `false` | Clamp Max X |
| `clampMaxValueX` | float | `0` | Max X |
| `clampMinY` | bool | `false` | Clamp Min Y |
| `clampMinValueY` | float | `0` | Min Y |
| `clampMaxY` | bool | `false` | Clamp Max Y |
| `clampMaxValueY` | float | `0` | Max Y |

