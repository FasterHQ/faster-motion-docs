# Text Apply

**Type:** `textApply`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Pure passthrough: forwards per-character Mat4 transforms to output port for SRN consumption. Follows SkinnedPathDeformNode pattern (F264).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `charTransforms` | `mat4Bundle` | Char Transforms |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `charTransforms` | `mat4Bundle` | Char Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textId` | objectPicker | `""` | Text Object |

