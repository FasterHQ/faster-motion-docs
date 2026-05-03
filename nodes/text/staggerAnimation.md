# Stagger Animation

**Type:** `staggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Fan a single animation template across all DOM elements matching a plain CSS selector, with per-element stagger offsets. Element count is resolved at runtime via `querySelectorAll(selector)` — no template language, no `{i}` placeholder, no per-child graph nodes. Inner `each` is a propertyAnimation-shaped template (float / color / string keyframe channels); the runtime evaluates it per element with translation-stagger (each element's progress is shifted by `stagger * effectiveIndex(i)`). Compound: expands to ONE `staggerAnimate` runtime node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector |
| `stagger` | float | `0.05` | Stagger (per element) (min: 0, max: 1) |
| `staggerFrom` | enum | `"start"` | Stagger From. Options: `start`, `end`, `center`, `edges`, `random` |
| `delayOffset` | float | `0` | Delay Offset (min: 0, max: 1) |
| `each` | staggerInnerTemplate | `{"type":"propertyAnimation"...` | Inner Animation |

