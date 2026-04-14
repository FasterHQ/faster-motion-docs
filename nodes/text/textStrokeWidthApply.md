# Text Stroke Width Apply

**Type:** `textStrokeWidthApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-character stroke width interpolation. Writes `piece.outputs.strokeWidth.set(lerped)` via the F260 port-sourced rendering contract.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `stagger` | `float` | Stagger |
| `from` | `float` | From Width |
| `to` | `float` | To Width |
| `seed` | `float` | Seed |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |
| `mode` | enum | `"linear"` | Reveal Mode. Options: `linear`, `center-out`, `edges-in`, `random` |

