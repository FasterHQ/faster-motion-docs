# Variant Stagger Animation

**Type:** `variantStaggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Fan a compound across N indexed DOM elements where each child has UNIQUE from/to values on shared channels. Per-child variation sibling of F324 staggerAnimation (which requires uniform values). Use for mouse-driven dispersals, hover-chaos grids, card-spread layouts, per-icon flutter — any "N siblings, same channels, different ranges". Compound: expands into N× propertyAnimation at load time (fixed-point loop then expands each to mk+pw).

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
| `channels` | variantStaggerChannelMeta | `{"translateX":{"type":"floa...` | Channel Metadata |
| `variants` | variantStaggerTable | `[{"index":1,"values":{"tran...` | Variants |

