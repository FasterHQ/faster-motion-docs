# Merge Paths

**Type:** `mergePaths`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Boolean ops (union/intersect/subtract/exclude) via clipper2.

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
| `operation` | enum | `"union"` | Operation. Options: `union`, `intersect`, `subtract`, `exclude` |

