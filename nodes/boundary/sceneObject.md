# Scene Object

**Type:** `sceneObject`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Authoring node for one renderable canvas object — rectangle, ellipse, path, image, text, etc. params carry the visual definition (type, transform fields, fill / stroke, properties bag). Phase 01a expansion pushes this into the canvas objects array so Phase 06 derives the matching sceneTransform exactly as for legacy-shape input. Use instead of writing the objects array inline.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | string | `""` | Object Id |
| `name` | string | `""` | Name |
| `type` | string | `"rectangle"` | Shape Type |
| `parentId` | string | `—` | Parent Id |

