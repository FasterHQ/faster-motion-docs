# Physics Joint

**Type:** `physicsJoint`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — one constraint between two bodies. Backed by Rapier ImpulseJointSet. Four kinds: `distance` (rope-like, fixed length between anchors), `revolute` (pin joint, free rotation around anchor), `prismatic` (slider along axis), `weld` (fully fixed pose). Wire `bodyA` / `bodyB` from `physicsBody.id` outputs OR from indexed entries of `physicsBodyStagger.bodyIds` to address bodies inside a stagger.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyA` | `float` | Body A ID |
| `bodyB` | `float` | Body B ID |
| `enabled` | `float` | Enabled |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `id` | `float` | Joint ID |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `jointKind` | enum | `"distance"` | Joint Kind. Options: `distance`, `revolute`, `prismatic`, `weld` |
| `localAnchorA` | string | `[0,0]` | Anchor A (local px) |
| `localAnchorB` | string | `[0,0]` | Anchor B (local px) |
| `length` | float | `100` | Length (px) — distance only (min: 0) |
| `lowerAngle` | float | `null` | Lower Angle (rad) — revolute only |
| `upperAngle` | float | `null` | Upper Angle (rad) — revolute only |
| `lowerTranslation` | float | `null` | Lower Translation (px) — prismatic only |
| `upperTranslation` | float | `null` | Upper Translation (px) — prismatic only |
| `localAxisA` | string | `[1,0]` | Axis A — prismatic only |

