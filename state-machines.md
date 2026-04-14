# State Machines

State machines in Faster Motion manage animation transitions — switching between idle, walk, run, attack clips based on parameters and conditions.

## Core Concepts

### Layers
A state machine can have multiple layers that evaluate independently. Each layer has its own set of states and transitions. Layers blend together — a base layer might handle locomotion while an additive layer handles facial expressions.

### States
Each state references an animation clip (a set of keyframed tracks for bones and/or objects). When a state is active, its clip is evaluated at the current progress and produces a **pose bundle** — a collection of transform values for every bone/object.

### Transitions
Transitions define how to move between states. They have:
- **Source state** and **target state**
- **Conditions** — parameter-based rules that trigger the transition (e.g., `speed > 0.5`)
- **Duration** — blend time between the two states
- **Exit time** — optional: only transition after the source clip reaches a certain progress

### Pose Blending
During a transition, two states are active simultaneously. The `blendPose` node linearly interpolates between them based on transition progress. `maskedBlendPose` allows blending only specific bones (e.g., blend upper body from one clip, lower body from another).

## Graph Nodes

### Evaluation Flow

```
LayerAdvance → PoseEval (per state) → BlendPose → BoneTransform (per bone)
```

1. **Layer Advance** — Advances the state machine: evaluates transition conditions, updates active state(s), computes blend weights
2. **Pose Eval** — Evaluates an animation clip at a given progress, outputting a pose bundle
3. **Blend Pose** / **Masked Blend Pose** — Blends two pose bundles by weight
4. **Object Pose Eval** — Same as Pose Eval but for scene object tracks (position, rotation, scale, opacity)
5. **Object Blend** / **Object Masked Blend** — Blends object pose bundles

### Blend Spaces
For smooth parameter-driven blending (e.g., walk speed controlling a walk↔run blend):
- **Blend Space 1D** — Blends along a single parameter axis
- **Blend Space 2D** — Blends across two parameter axes (e.g., speed + direction)

### Related Nodes

| Node | Purpose |
|------|---------|
| `poseEval` | Evaluate clip → bone pose bundle |
| `blendPose` | Linear blend of two bone pose bundles |
| `maskedBlendPose` | Blend with per-bone mask |
| `objectPoseEval` | Evaluate clip → object pose bundle |
| `objectBlend` | Linear blend of two object pose bundles |
| `objectMaskedBlend` | Blend with per-object mask |
| `smPropertyApply` | Signal that SM writes are complete |
