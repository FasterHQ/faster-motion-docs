# Physics Body

**Type:** `physicsBody`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

One rigid body in the wired physicsWorld. Dynamic (default) or kinematic (param). Pose, velocity, and awake state are exposed as typed output ports — wire to `domPropertyWrite` for DOM consumers, to STN inputs for canvas consumers, or to `physicsBodyTransform` for fan-out to multiple consumers.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `enabled` | `float` | Enabled |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `id` | `float` | Body ID |
| `position` | `vec2` | Position |
| `rotation` | `float` | Rotation |
| `linearVelocity` | `vec2` | Linear Velocity |
| `angularVelocity` | `float` | Angular Velocity |
| `awake` | `float` | Awake |
| `x` | `float` | X (px) |
| `y` | `float` | Y (px) |
| `speed` | `float` | Speed (px/s) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bodyKind` | enum | `"dynamic"` | Body Kind. Options: `dynamic`, `kinematic` |
| `shape` | physicsShape | `{"kind":"circle","radius":25}` | Shape |
| `initialX` | float | `0` | Initial X (px) |
| `initialY` | float | `0` | Initial Y (px) |
| `initialRotation` | float | `0` | Initial Rotation (rad) |
| `initialVx` | float | `0` | Initial Vx (px/s) |
| `initialVy` | float | `0` | Initial Vy (px/s) |
| `initialAngularVelocity` | float | `0` | Initial Angular Vel (rad/s) |
| `density` | float | `1` | Density (min: 0.001) |
| `restitution` | float | `0.5` | Restitution (Bounciness) (min: 0, max: 2) |
| `friction` | float | `0.5` | Friction (min: 0, max: 2) |
| `linearDamping` | float | `0` | Linear Damping (min: 0) |
| `angularDamping` | float | `0` | Angular Damping (min: 0) |
| `lockRotation` | bool | `false` | Lock Rotation |
| `ccd` | bool | `false` | Continuous Collision (CCD) |

