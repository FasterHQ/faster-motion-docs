# Object Clip Eval

**Type:** `objectClipEval`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F342: evaluates an AnimationClip's object tracks at progress and outputs an absolute pose AttributeBundle (per-object x/y/rotation/scale/opacity + extended scalar props + text strings). Replaces ObjectPoseEvalNode's Timeline-only bindClip path. Reads clip + rest from typed ports; no imperative bindClip.

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
| `objectPose` | `attributes` | Object Pose |
| `transforms` | `any` | Transforms (raw) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `clipId` | string | `—` | Clip Id |
| `animationId` | string | `—` | Animation Id |

