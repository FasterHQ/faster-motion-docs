# Hover Distort Video

**Type:** `hoverDistortVideo`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

DOM-level video tile with hover-driven WebGL distortion. Mounts a `<canvas>` overlay on the host element and renders a per-frame upload of a backing `<video>` through a centred bulge + chromatic-aberration fragment shader. Strength tracks `hover` ∈ [0..1]; `loaded` drives an aperture-style reveal on first frame.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `hover` | `float` | Hover |
| `timeProgress` | `float` | Time Progress |
| `loaded` | `float` | Loaded |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `isReady` | `float` | Is Ready |
| `videoWidth` | `float` | Video Width |
| `videoHeight` | `float` | Video Height |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `videoSrc` | string | `""` | Video Source |

