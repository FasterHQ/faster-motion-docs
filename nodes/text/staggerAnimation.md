# Stagger Animation

**Type:** `staggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Fan a single animation template across N indexed DOM elements with per-child stagger offsets. Selector template uses `{i}` as the per-child index placeholder (e.g. `.card:nth-child({i})`, `.dot[data-i="{i}"]`). Inner `each` is a propertyAnimation template — keyframes get shifted into each child's slot window at load time. Generic counterpart to F323 textStaggerAnimation (which is splitText-specific); use this for pre-existing DOM elements like card grids, list items, icon rows, dot indicators, wave / ripple effects. Compound: expands into N× propertyAnimation at load time (fixed-point loop then expands each to mk+pw) — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selectorTemplate` | string | `""` | Selector Template |
| `count` | int | `1` | Child Count (min: 1) |
| `indexBase` | int | `1` | Index Base (min: 0) |
| `stagger` | float | `0.05` | Stagger (per child) (min: 0, max: 1) |
| `staggerFrom` | enum | `"start"` | Stagger From. Options: `start`, `end`, `center`, `edges`, `random` |
| `delayOffset` | float | `0` | Delay Offset (min: 0, max: 1) |
| `each` | staggerInnerTemplate | `{"type":"propertyAnimation"...` | Inner Animation |

