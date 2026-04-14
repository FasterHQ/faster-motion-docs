# Transform Bundle Mask

**Type:** `transformBundleMask`  
**Category:** bundles  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Apply a per-element transform bundle only to elements in [from, to] with optional edge falloff. Outside the range, elements pass through as identity.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `mat4Bundle` | Bundle |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `mat4Bundle` | Masked |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `from` | int | `0` | From (min: 0) |
| `to` | int | `0` | To (min: 0) |
| `falloffFrom` | float | `0` | Falloff From (min: 0, max: 1) |
| `falloffTo` | float | `0` | Falloff To (min: 0, max: 1) |

