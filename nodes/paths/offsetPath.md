# Offset Path

**Type:** `offsetPath`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Inflate or deflate a path with cubic-preserving Tiller-Hanson offset.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `strength` | `float` | Strength |
| `falloff` | `any` | Falloff |
| `distance` | `float` | Distance |
| `miterLimit` | `float` | Miter Limit |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `distance` | float | `0` | Distance (min: -100, max: 100) |
| `miterLimit` | float | `4` | Miter Limit (min: 1, max: 10) |
| `joinType` | enum | `"miter"` | Join. Options: `miter`, `round`, `bevel` |
| `endCap` | enum | `"butt"` | End Cap. Options: `butt`, `round`, `square` |

