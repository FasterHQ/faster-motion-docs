# Effects Nodes

Visual effects: WASM/GPU filter chains, parametric shape generation, glitch computation, FLIP layout animation, and morph path interpolation.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Flip](flip.md) | `flip` | dom | FLIP layout animation — triggered on rising edge |
| [Glitch Compute](glitchCompute.md) | `glitchCompute` | dom | Stateful random glitch — outputs offset, skew, and opacity |
| [WASM Effect](wasmEffect.md) | `wasmEffect` | canvas | Procedural noise/distortion texture generation via WASM. |
| [Parametric Shape](parametricShape.md) | `parametricShape` | canvas | WASM parametric shape generation with dynamic children. |
| [Particle Emitter](particleEmitter.md) | `particleEmitter` | canvas | Particle system — emit, advance, kill. Outputs per-particle data as AttributeBundle. |
| [Particle Update](particleUpdate.md) | `particleUpdate` | canvas | Particle update boundary — advances particle state from emitter output each frame. |
