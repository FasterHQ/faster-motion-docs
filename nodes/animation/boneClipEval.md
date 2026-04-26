# Bone Clip Eval

**Type:** `boneClipEval`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F342: evaluates an AnimationClip's bone tracks at progress and outputs an absolute pose AttributeBundle. Replaces TimelinePoseNode. Reads clip from a wired ClipRegistry port and rest baseline from a wired SkeletonSource port — no imperative bind(clip).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `clip` | `any` | Clip |
| `restBaseline` | `attributes` | Rest Baseline |
| `progress` | `float` | Progress |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pose` | `attributes` | Pose |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `animationId` | string | `—` | Animation Id |
| `skeletonId` | string | `—` | Skeleton Id |

