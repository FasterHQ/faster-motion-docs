# Skeleton Source

**Type:** `skeletonSource`  
**Category:** skeleton  
**Context:** Shared — works in both DOM and canvas graphs  

Graph-native publisher of a Skeleton's rest pose. Loader calls bind(skeleton) once; the source pulls the rest bundle from skeleton.getRestBundle() (snapshot captured by skeleton.markRest() before IK solves). Output flows to APB.restBaseline / rig pose boundary through typed edges.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `restPose` | `attributes` | Rest Pose |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `skeletonId` | string | `—` | Skeleton Id |

