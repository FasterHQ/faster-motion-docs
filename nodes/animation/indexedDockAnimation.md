# Indexed Dock Animation

**Type:** `indexedDockAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Docks a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. As progress advances from 0 → 1, the source jumps from child[0] → child[1] → … → child[count-1] in lockstep with `floor(progress × count)`. The dock measures children's `getBoundingClientRect()` at runtime and parks the source at the most-recently-revealed child's right edge (whitespace children are skipped automatically so cursor-style consumers don't freeze across word breaks). Authors route the computed `offsetX` to any horizontal-offset-driven CSS property via `channels` (default: `translateX` in px). Compound: expands at load time to `domIndexedDock + domPoseWrite` — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sourceSelector` | elementSelector | `""` | Source (what docks) |
| `childSelector` | elementSelector | `""` | Children (the list) |
| `channels` | indexedDockChannels | `{"translateX":{"from":"offs...` | Channels |

