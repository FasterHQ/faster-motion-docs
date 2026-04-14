# Transform Follow

**Type:** `transformFollow`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Copy transform components from source to target

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `sourceTransform` | `transform` | Source |
| `targetTransform` | `transform` | Target |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `transform` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `copyPosition` | bool | `false` | Copy Position |
| `copyRotation` | bool | `false` | Copy Rotation |
| `copyScale` | bool | `false` | Copy Scale |
| `doesCopyX` | bool | `true` | Copy X |
| `doesCopyY` | bool | `true` | Copy Y |
| `copyFactorX` | float | `1` | Factor X |
| `copyFactorY` | float | `1` | Factor Y |
| `doesCopyRotation` | bool | `true` | Copy Rotation Axis |
| `copyFactorRotation` | float | `1` | Rotation Factor |
| `doesCopyScaleX` | bool | `true` | Copy Scale X |
| `doesCopyScaleY` | bool | `true` | Copy Scale Y |
| `copyFactorScaleX` | float | `1` | Scale Factor X |
| `copyFactorScaleY` | float | `1` | Scale Factor Y |
| `offset` | bool | `false` | Offset Mode |

