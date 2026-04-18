# Animated Parameter

**Type:** `animatedParameter`  
**Category:** state-machine  
**Context:** Shared — works in both DOM and canvas graphs  

Sample a keyframe track at a progress input and drive a ParameterStoreNode writer port each frame. Joystick-input animation pattern — an autoplay clip keyframes a joystick parameter, which then seeks other clips.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetParameterId` | string | `""` | Parameter ID |
| `duration` | float | `1000` | Duration (ms) (min: 0) |

