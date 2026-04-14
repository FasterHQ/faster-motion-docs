# Faster Motion — Node & Format Reference

Reference documentation for authoring `.fmtion` animation files with Faster Motion's node graph system.

## Contents

| Document | Description |
|----------|-------------|
| [`node-registry.json`](node-registry.json) | Machine-readable registry of all 200+ nodes, ports, and parameters |
| [`fmtion-format.md`](fmtion-format.md) | .fmtion file format specification |
| [`port-types.md`](port-types.md) | Port type reference (float, vec2, color, transform, etc.) |
| [`easing.md`](easing.md) | Easing function presets |
| [`parameters.md`](parameters.md) | Parameter system (types, paths, bindings) |
| [`state-machines.md`](state-machines.md) | State machine concepts |
| [`skeleton.md`](skeleton.md) | Skeleton rigging (bones, IK, physics) |
| [`nodes/`](nodes/) | Per-node documentation organized by category |
| [`patterns/`](patterns/) | Common wiring recipes and graph patterns |

## Node Categories

| Category | Count | Description |
|----------|-------|-------------|
| [Inputs](nodes/inputs/) | Input nodes | DOM events, mouse, scroll, keyboard, time |
| [Animation](nodes/animation/) | Animation nodes | Timeline, tween, keyframe, stagger |
| [Constraints](nodes/constraints/) | Constraint nodes | Follow, aim, distance, drag, path follow |
| [Math](nodes/math/) | Math nodes | Remap, expression, smoothing, velocity |
| [Procedural](nodes/procedural/) | Procedural nodes | Wiggle, noise, spring, oscillator |
| [Paths](nodes/paths/) | Path nodes | Deformers, trim, offset, boolean, repeat |
| [Text](nodes/text/) | Text nodes | Split, wave, fade, scramble, distort |
| [Skeleton](nodes/skeleton/) | Skeleton nodes | Bone FK, IK, jiggle, spring, chain |
| [State Machine](nodes/state-machine/) | SM nodes | Pose eval, blend, masked blend |
| [Boundary](nodes/boundary/) | Boundary nodes | Transform/property read & write |
| [Distribution](nodes/distribution/) | Distribution nodes | Grid, circle, fibonacci, path |
| [Falloff](nodes/falloff/) | Falloff nodes | Linear, radial, shape, noise, curve |
| [Effects](nodes/effects/) | Effect nodes | Glitch, FLIP, video, parametric |
| [Solvers](nodes/solvers/) | Solver nodes | Physics, mesh, constraint solving |
| [Media](nodes/media/) | Media nodes | Audio, lottie, video, sprites |
| [Integration](nodes/integration/) | Integration nodes | ForEach, scene, parameter store |
| [Data](nodes/data/) | Data nodes | Parameter actions, data source, cast |
| [Attributes](nodes/attributes/) | Attribute nodes | Bundle read/write |
| [Bundles](nodes/bundles/) | Bundle nodes | Transform bundle merge/mask |

## For Agents

Read `CLAUDE.md` for instructions on how to use this repo when authoring .fmtion files.
