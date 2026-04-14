# Ring (Delay)

**Type:** `ring`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

Ring buffer delay — output a past value. Defaults to replace composition.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `baseValue` | `float` | Input |
| `time` | `float` | Time |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `frames` | int | `5` | Delay Frames (min: 1, max: 120) |
| `smoothing` | float | `0` | Smoothing (min: 0, max: 1) |
| `compositionMode` | enum | `"replace"` | Compose. Options: `add`, `replace`, `multiply` |

