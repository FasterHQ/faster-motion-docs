# Physics Body Lookup

**Type:** `physicsBodyLookup`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Body-id-as-input pose source. Takes a `bodyId` input that may change every frame (typically wired from `physicsCollisionPulse.otherBodyId` or `physicsMouseDrag.pickedBodyId`), reads the live body pose from the engine, and publishes pose + velocity outputs. `x`/`y` are converted to viewport pixels using the world's frame element so consumers like `cursorProximityWrite` and `domVariablesWrite` can use them directly. `frameX`/`frameY` expose the raw frame-local pose for graph nodes operating in physics coords.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X (viewport px) |
| `y` | `float` | Y (viewport px) |
| `frameX` | `float` | Frame X (px) |
| `frameY` | `float` | Frame Y (px) |
| `rotation` | `float` | Rotation (rad) |
| `vx` | `float` | Velocity X (px/s) |
| `vy` | `float` | Velocity Y (px/s) |
| `awake` | `float` | Awake |


## Parameters

_No configurable parameters._
