# Text Sequence

**Type:** `textSequence`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Cycles through a string array based on progress — outputs current text and index. The `texts` input port takes priority over the static `texts` param when wired (from textDecompose or any stringArray source), so the node composes with upstream text-data transforms without losing back-compat for .fmtion files that bake in a static array. `mode` selects the index-from-progress convention: `round` (default) = center-snap with flips at midpoints, item i centered at p=i/(N-1) — aligns with counterAnimation's round(min + p*(max-min)) so a sequence + counter scrubbed by the same progress flip in lockstep. `floor` = equal-width buckets, item i occupies [i/N, (i+1)/N) — for streamed timelines (typewriter / video-like). `cycleMode` selects how progress is mapped across multi-source arrays (where `itemSources` tags each item with its source index, typically wired from textDecompose): `forward` (default) walks the concatenated prefixes linearly, `pingPong` splits progress into S equal windows (S = source count) and runs a triangle 0→1→0 within each window — native author-level "type then delete then next phrase" typewriter cycle. With `pingPong` and no `itemSources` wired, falls back to single-source ping-pong over the whole array.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `texts` | `stringArray` | Texts |
| `itemSources` | `floatArray` | Item Sources |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `index` | `float` | Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"round"` | Index Mode. Options: `round`, `floor` |
| `cycleMode` | enum | `"forward"` | Cycle Mode. Options: `forward`, `pingPong` |

