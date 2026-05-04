# Group

**Type:** `group`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Authoring node for a scene-tree group container. Same expansion path as `sceneObject` but with type pinned to `group`. Children are separate `sceneObject` / `group` compounds whose params.parentId references this group; the loader joins parent-child via id at Phase 06 STN parent-resolution.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | string | `""` | Object Id |
| `name` | string | `""` | Name |
| `parentId` | string | `—` | Parent Id |

