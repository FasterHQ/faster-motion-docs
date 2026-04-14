# Text Color Apply

**Type:** `textColorApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-character fill color interpolation. Writes `piece.outputs.fill.set(lerpedColor)` via the F260 port-sourced rendering contract. Supports 4 reveal modes (linear, center-out, edges-in, random) + stagger control.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `stagger` | `float` | Stagger |
| `fromColor` | `string` | From Color |
| `toColor` | `string` | To Color |
| `seed` | `float` | Seed |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |
| `mode` | enum | `"linear"` | Reveal Mode. Options: `linear`, `center-out`, `edges-in`, `random` |

