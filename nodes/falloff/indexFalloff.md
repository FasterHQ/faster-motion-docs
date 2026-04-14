# Index Falloff

**Type:** `indexFalloff`  
**Category:** falloff  
**Context:** Shared — works in both DOM and canvas graphs  

Element index mapping falloff (reads ForEachNode context).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `strength` | `float` | Strength |
| `startIndex` | `float` | Start Index |
| `endIndex` | `float` | End Index |
| `fadeRange` | `float` | Fade Range |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `startIndex` | int | `0` | Start Index (min: 0) |
| `endIndex` | int | `-1` | End Index (-1 = last) (min: -1) |
| `fadeRange` | float | `2` | Fade Range (min: 0, max: 50) |
| `invert` | bool | `false` | Invert |

