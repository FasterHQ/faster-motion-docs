# Transform Bundle Merge

**Type:** `transformBundleMerge`  
**Category:** bundles  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

FR-1: Compose per-element transform bundles via matrix multiplication or alternative blend modes. Multi-connection input accepts N wires.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bundles` | `mat4Bundle` | Bundles |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `out` | `mat4Bundle` | Merged |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"multiply"` | Mode. Options: `multiply`, `add`, `override`, `blend` |
| `blendWeight` | float | `0.5` | Blend Weight (min: 0, max: 1) |

