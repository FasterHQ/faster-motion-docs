# Text Sequence

**Type:** `textSequence`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Cycles through a string array based on progress — outputs current text and index. The `texts` input port takes priority over the static `texts` param when wired (from textDecompose or any stringArray source), so the node composes with upstream text-data transforms without losing back-compat for .fmtion files that bake in a static array. `mode` selects the index-from-progress convention: `round` (default) = center-snap with flips at midpoints, item i centered at p=i/(N-1) — aligns with counterAnimation's round(min + p*(max-min)) so a sequence + counter scrubbed by the same progress flip in lockstep (the natural "scrub through N items" UX). `floor` = equal-width buckets, item i occupies [i/N, (i+1)/N) — for streamed timelines (typewriter / video-like).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `texts` | `stringArray` | Texts |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `index` | `float` | Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"round"` | Index Mode. Options: `round`, `floor` |

