# Morph Path Animation

**Type:** `morphPathAnimation`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Interpolate an SVG path element from its current d attribute toward a target d, driven by a 0..1 progress input. One authoring node replaces the canonical chain `domAttributeRead(d) → morphCompute(fromPath ← read, toPath) → domPoseWrite(d)` that every SVG morph repeats. Compound: expanded into those three primitives at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `toPath` | string | `""` | Target Path (d) |

