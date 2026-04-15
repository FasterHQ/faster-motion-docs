# Morph Compute

**Type:** `morphCompute`  
**Category:** paths  
**Context:** DOM — operates on HTML elements via CSS selectors  

Pure SVG path interpolation — takes fromPath and toPath as string inputs, outputs interpolated path string. Zero DOM awareness.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `fromPath` | `string` | From Path |
| `toPath` | `string` | To Path |
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `string` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `toPath` | string | `""` | To Path (d) |

