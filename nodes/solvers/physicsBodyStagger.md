# Physics Body Stagger

**Type:** `physicsBodyStagger`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Runtime-fanout compound — one node = N physicsBody instances + N DOM transform writes. Resolves N elements at bind time from a plain CSS selector and creates one body per element with shared params. Per-element radius via `shape.radiusFromCSS: "--bd"` reads each element's CSS variable (same convention `staggerAnimate` uses). Saves ~3N nodes for ball-drop / scatter patterns. For per-element heterogeneity beyond size (different bodyKind / restitution per element), drop down to primitive `physicsBody` + `domPoseWrite` pairs.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `enabled` | `float` | Enabled |
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bodyIds` | `floatArray` | Body IDs |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector |
| `shape` | physicsShape | `{"kind":"circle","radius":25}` | Shape |
| `initialX` | string | `0` | Initial X |
| `initialY` | string | `0` | Initial Y |
| `initialXSpacing` | float | `0` | X Spacing per Index (px) |
| `initialYSpacing` | float | `0` | Y Spacing per Index (px) |
| `jitterX` | float | `0` | Jitter X (px) (min: 0) |
| `jitterY` | float | `0` | Jitter Y (px) (min: 0) |
| `density` | float | `1` | Density (min: 0.001) |
| `restitution` | float | `0.5` | Restitution (min: 0, max: 2) |
| `friction` | float | `0.5` | Friction (min: 0, max: 2) |
| `linearDamping` | float | `0` | Linear Damping (min: 0) |
| `angularDamping` | float | `0` | Angular Damping (min: 0) |
| `lockRotation` | bool | `false` | Lock Rotation |
| `ccd` | bool | `false` | CCD |
| `writeTransform` | bool | `true` | Write Transform to Element |
| `resetBelowProgress` | float | `null` | Reset Below Progress (min: 0, max: 1) |

