# Physics World

**Type:** `physicsWorld`  
**Category:** solvers  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

One rigid-body simulation world. Wire `gravity` from a `constantVec2` (or set the param), gate `paused` from a scroll-trigger threshold, and the world ticks every frame in play mode (skipped in seek). Bodies, static bodies, joints, and event listeners register with this world via their `world` connection — only ONE `physicsWorld` per scene. Lazy-loads the physics WASM module on first bind; scenes without any physicsWorld pay zero overhead. F236-compliant (reads ambient deltaTime; never an input port for time).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gravity` | `vec2` | Gravity |
| `timeScale` | `float` | Time Scale |
| `paused` | `float` | Paused |
| `progress` | `float` | Progress |
| `pauseUntilStable` | `float` | Pause Until Stable |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World Handle |
| `frameStepped` | `float` | Frame Stepped |
| `bodyCount` | `float` | Body Count |
| `jointCount` | `float` | Joint Count |
| `isSettled` | `float` | Is Settled |
| `maxDynamicBodySpeed` | `float` | Max Dynamic Speed (px/s) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pixelsPerMeter` | float | `100` | Pixels per Meter (min: 1, max: 10000) |
| `subSteps` | int | `4` | Sub-Steps per Frame (min: 1, max: 16) |
| `paramGravityX` | float | `0` | Default Gravity X |
| `paramGravityY` | float | `0` | Default Gravity Y |
| `pauseBelowProgress` | float | `null` | Pause Below Progress (min: 0, max: 1) |
| `settleSpeedThreshold` | float | `1` | Settle Speed Threshold (px/s) (min: 0) |
| `settleFrameCount` | int | `5` | Settle Frame Count (min: 1) |

