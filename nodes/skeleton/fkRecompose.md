# FK Recompose

**Type:** `fkRecompose`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Reads a post-IK/physics bone pose bundle and outputs per-bone world matrices via full parent×local FK. One per IK/physics skeleton, lives at scene level (outside rig Module) so only one bundle wire crosses the Module boundary.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |
| `skeletonRootParentWorldMatrix` | `any` | Skeleton Root Parent |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `skeletonId` | objectPicker | `""` | Skeleton |
| `boneCount` | int | `0` | Bone Count |

