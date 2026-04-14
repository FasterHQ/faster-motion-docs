# String Keyframe

**Type:** `stringKeyframe`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-stop string interpolation — parses embedded numbers and interpolates each independently. For CSS strings (filter, boxShadow, gradients) where multiple numbers change together.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `keyframes` | string | `[{"time":0,"value":""},{"ti...` | Keyframes |

