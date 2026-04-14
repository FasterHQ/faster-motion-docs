# Text Draw Layer Index Apply

**Type:** `textDrawLayerIndexApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-character draw-order layering. Assigns a discrete layer index per character based on reveal order pattern + stride. Writes `piece.outputs.drawLayerIndex.set(layerIdx)` via the F260 port-sourced rendering contract.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `baseIndex` | `float` | Base Index |
| `stride` | `float` | Stride |
| `seed` | `float` | Seed |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |
| `mode` | enum | `"linear"` | Order Mode. Options: `linear`, `center-out`, `edges-in`, `random` |

