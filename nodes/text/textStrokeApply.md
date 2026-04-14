# Text Stroke Apply

**Type:** `textStrokeApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-character stroke color interpolation. Writes `piece.outputs.stroke.set(lerpedColor)` via the F260 port-sourced rendering contract.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `stagger` | `float` | Stagger |
| `fromStroke` | `string` | From Stroke |
| `toStroke` | `string` | To Stroke |
| `seed` | `float` | Seed |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |
| `mode` | enum | `"linear"` | Reveal Mode. Options: `linear`, `center-out`, `edges-in`, `random` |

