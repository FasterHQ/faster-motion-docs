# Procedural Nodes

Time-driven procedural generators: wiggle, noise, oscillator, spring physics, modulate, ring delay, random values, and stagger drivers.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Inertia](inertia.md) | `inertia` | shared | F334 — exponential-decay tween. Animates a value from `from` under throw physics with a starting velocity. Optional snap targets land the natural rest position on the nearest snap value while preserving the decel curve. Use as a standalone "throw a property" driver independent of drag. |
| [Wiggle](wiggle.md) | `wiggle` | shared | AE-style wiggle noise — random displacement |
| [Noise](noise.md) | `noise` | shared | Multi-octave simplex noise |
| [Spring](spring.md) | `spring` | shared | Damped spring physics — smooth follow with overshoot. Defaults to replace composition (spring IS the value). |
| [Oscillator](oscillator.md) | `oscillator` | shared | Periodic wave generator (sine, triangle, square, sawtooth) |
| [Modulate](modulate.md) | `modulate` | shared | Remap value through a piecewise-linear curve. Defaults to replace composition. |
| [Ring (Delay)](ring.md) | `ring` | shared | Ring buffer delay — output a past value. Defaults to replace composition. |
| [Random](random.md) | `random` | shared | Seeded random value per frame. Uniform or gaussian distribution. |
| [Stagger Driver](staggerDriver.md) | `staggerDriver` | shared | Index-based wave propagation. Uses ForEach element context for per-instance offset. |
