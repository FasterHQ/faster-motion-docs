# Chain Physics

**Type:** `chainPhysics`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Verlet chain simulation for hair, tails, ropes. Fixed timestep with distance/angular constraints.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |
| `deltaTime` | `float` | Delta Time |
| `gravity` | `vec2` | Gravity |
| `wind` | `vec2` | Wind |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stiffness` | float | `0.8` | Stiffness (min: 0, max: 1) |
| `damping` | float | `0.95` | Damping (min: 0, max: 1) |
| `angularStiffness` | float | `0` | Angular Stiffness (min: 0, max: 1) |
| `airResistance` | float | `5` | Air Resistance (min: 1, max: 50) |
| `iterations` | int | `3` | Iterations (min: 1, max: 20) |
| `warmUpSteps` | int | `0` | Warm-Up Steps (min: 0, max: 120) |

