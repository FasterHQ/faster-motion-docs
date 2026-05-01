# Clip Path Reveal

**Type:** `clipPathReveal`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Bidirectional CSS clip-path inset reveal. Drives `--clip-top` and `--clip-bottom` CSS variables on `selector` from a 0..1 progress + a forward / backward direction pair, so `clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0)` rolls open from the bottom up on forward arrival and from the top down on backward arrival. Compound — expands at load to two expression nodes + two `domPropertyWrite` nodes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `forward` | `float` | Forward |
| `backward` | `float` | Backward |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `topPropertyName` | string | `"--clip-top"` | Top Variable |
| `bottomPropertyName` | string | `"--clip-bottom"` | Bottom Variable |
| `cssUnit` | string | `"%"` | Unit |

