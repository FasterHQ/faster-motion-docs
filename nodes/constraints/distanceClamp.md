# Distance Clamp

**Type:** `distanceClamp`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Clamp distance between two positions

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `sourcePosition` | `vec2` | Anchor |
| `targetPosition` | `vec2` | Target |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `vec2` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `distance` | float | `0` | Distance (min: 0) |
| `mode` | enum | `"exact"` | Mode. Options: `exact`, `minimum`, `maximum` |

