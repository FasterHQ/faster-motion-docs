# Scene

**Type:** `sceneGraph`  
**Category:** integration  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Composable scene root — encapsulates an entire .fmtion scene as a single node with promoted ports.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `deltaTime` | `float` | Delta Time |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sceneFileUrl` | string | `""` | Scene File |
| `label` | string | `""` | Label |

