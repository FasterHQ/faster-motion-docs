# IK Target

**Type:** `ikTarget`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Boundary node — bridges scene-object position into IK solve target port.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `vec2` | Position |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `targetPosition` | `vec2` | Target Position |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetObjectId` | objectPicker | `""` | Target Object |

