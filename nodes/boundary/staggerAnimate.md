# Stagger Animate

**Type:** `staggerAnimate`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Runtime per-element keyframe-with-stagger writer. Resolves N elements at bind time from a plain CSS selector and applies a multi-channel keyframe template per element with translation-stagger (each element's progress is shifted by `stagger * effectiveIndex(i)`). The runtime backing for the `staggerAnimation` compound — authors usually reach for the compound. Out-of-range progress per element holds the first/last keyframe (same semantics as MultiKeyframeNode).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `selector` | `string` | Selector |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector |
| `stagger` | float | `0` | Stagger (min: 0, max: 1) |
| `staggerFrom` | enum | `"start"` | Stagger From. Options: `start`, `end`, `center`, `edges`, `random` |
| `delayOffset` | float | `0` | Delay Offset (min: 0, max: 1) |

