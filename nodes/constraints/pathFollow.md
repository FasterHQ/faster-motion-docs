# Path Follow

**Type:** `pathFollow`  
**Category:** constraints  
**Context:** Shared — works in both DOM and canvas graphs  

Follow a path curve at given progress

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `vec2` | Position |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `orient` | bool | `true` | Auto Orient |
| `loop` | bool | `false` | Loop |

