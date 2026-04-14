# Text Scramble Apply

**Type:** `textScrambleApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-character glyph swap from a pre-rasterized pool. F272: configurable pool, easing curves, per-char stagger + reveal mode.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `seed` | `float` | Seed |
| `easing` | `string` | Easing |
| `stagger` | `float` | Stagger |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |
| `poolString` | string | `""` | Scramble Characters |
| `mode` | string | `"linear"` | Reveal Mode |

