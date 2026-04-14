# Particle Emitter

**Type:** `particleEmitter`  
**Category:** effects  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Particle system — emit, advance, kill. Outputs per-particle data as AttributeBundle.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `deltaTime` | `float` | Delta Time |
| `emitRate` | `float` | Emit Rate |
| `gravity` | `vec2` | Gravity |
| `initialVelocity` | `vec2` | Initial Velocity |
| `lifetime` | `float` | Lifetime |
| `maxParticles` | `float` | Max Particles |
| `particleSize` | `float` | Particle Size |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `particles` | `attributes` | Particles |
| `activeCount` | `float` | Active Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `emitterX` | float | `0` | Emitter X |
| `emitterY` | float | `0` | Emitter Y |
| `spread` | float | `0.785` | Spread (rad) (min: 0, max: 6.28) |
| `seed` | int | `0` | Seed (min: 0) |

