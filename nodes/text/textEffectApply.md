# Text Effect Apply

**Type:** `textEffectApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-character blur/glow/shadow via the F260 port contract. Writes piece.outputs.blur/glow/shadow.set(v) per character using the perCharProgress stagger + reveal mode. The `effect` param selects which port to write.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `stagger` | `float` | Stagger |
| `from` | `float` | From |
| `to` | `float` | To |
| `seed` | `float` | Seed |
| `color` | `string` | Color |
| `offsetX` | `float` | Offset X |
| `offsetY` | `float` | Offset Y |
| `alpha` | `float` | Alpha |
| `outerStrength` | `float` | Outer Strength |
| `innerStrength` | `float` | Inner Strength |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |
| `mode` | enum | `"linear"` | Reveal Mode. Options: `linear`, `center-out`, `edges-in`, `random` |
| `effect` | enum | `"blur"` | Effect. Options: `blur`, `glow`, `shadow` |

