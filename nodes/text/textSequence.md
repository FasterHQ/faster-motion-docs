# Text Sequence

**Type:** `textSequence`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Cycles through a string array based on progress — outputs current text and index. The `texts` input port takes priority over the static `texts` param when wired (from textDecompose or any stringArray source), so the node composes with upstream text-data transforms without losing back-compat for .fmtion files that bake in a static array.

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

_No configurable parameters._
