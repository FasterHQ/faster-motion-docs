# Physics Static Body

**Type:** `physicsStaticBody`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Immovable static collider — walls, floors, arc-shaped bowls, sensor trigger zones. No pose outputs (it never moves), only an `id: float` for joints + event listeners. The `arc` shape is parameterised as a circular segment of N edge-chain segments, used for the dental ball-drop cup brim.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `id` | `float` | Body ID |
| `centerX` | `float` | Center X (px) |
| `topY` | `float` | Top Y (px) |
| `bottomY` | `float` | Bottom Y (px) |
| `mouthWidth` | `float` | Mouth Width (px) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `shape` | physicsShape | `{"kind":"box","width":100,"...` | Shape |
| `x` | float | `0` | X (px) |
| `y` | float | `0` | Y (px) |
| `rotation` | float | `0` | Rotation (rad) |
| `restitution` | float | `0.5` | Restitution (min: 0, max: 2) |
| `friction` | float | `0.5` | Friction (min: 0, max: 2) |
| `isSensor` | bool | `false` | Sensor (no contact response) |

