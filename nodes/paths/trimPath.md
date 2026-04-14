# Trim Path

**Type:** `trimPath`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Output a sub-segment of a path by start/end position.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `start` | `float` | Start |
| `end` | `float` | End |
| `offset` | `float` | Offset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | float | `0` | Start (min: 0, max: 1) |
| `end` | float | `1` | End (min: 0, max: 1) |
| `offset` | float | `0` | Offset (min: -1, max: 1) |

