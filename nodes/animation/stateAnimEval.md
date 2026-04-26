# State Anim Eval

**Type:** `stateAnimEval`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F345: evaluates a single SM animation state's clip at progress and outputs a transforms map. Reads clip from a wired ClipRegistry port. The downstream StateTransformsMux selects the active state's output by currentStateId. Replaces PoseEvalNode's imperative state.clip read.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `clip` | `any` | Clip |
| `progress` | `float` | Progress |
| `weight` | `float` | Weight |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `transforms` | `any` | Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stateId` | string | `—` | State Id |
| `animationId` | string | `—` | Animation Id |
| `role` | string | `—` | Role |

