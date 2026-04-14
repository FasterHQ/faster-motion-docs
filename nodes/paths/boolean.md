# Boolean

**Type:** `boolean`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Path boolean operations: union, subtract, intersect, exclude.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pathA` | `path` | Path A |
| `pathB` | `path` | Path B |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `operation` | enum | `"union"` | Operation. Options: `union`, `subtract`, `intersect`, `exclude` |

