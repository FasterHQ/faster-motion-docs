# State machine Nodes

State machine evaluation: layer advance, pose blending (linear, masked, weighted), object pose evaluation, and blend space nodes.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Pose Eval](poseEval.md) | `poseEval` | canvas | Evaluate animation clip bone tracks into a pose bundle (no mutation) |
| [Blend Pose](blendPose.md) | `blendPose` | canvas | Blend two pose bundles by weight (linear lerp) |
| [Masked Blend Pose](maskedBlendPose.md) | `maskedBlendPose` | canvas | Blend two pose bundles with bone mask — unmasked bones pass through from A |
| [Object Blend](objectBlend.md) | `objectBlend` | canvas | Blend two object pose bundles by weight (linear lerp) |
| [Blend Space 1D Eval](blendSpace1DEval.md) | `blendSpace1DEval` | canvas | F266 Phase 3: pure 1D blend space evaluator. Wraps evaluateBlend1DTransforms(). Inputs: inputValue (axis parameter), progress. Output: per-object transform map blended between adjacent animations. |
| [Blend Direct Eval](blendDirectEval.md) | `blendDirectEval` | canvas | F266 Phase 3: pure direct-blend evaluator. Wraps evaluateBlendDirectTransforms(). Per-animation weight inputs (weight_<id>) drive sequential blend-on-top. Weights from parameters use normalized scale (value/100, clamped 0..1). |
| [Blend Space 2D Eval](blendSpace2DEval.md) | `blendSpace2DEval` | canvas | F359 Phase 8: 2D blend space evaluator. Pulls clips from dynamic clip_${animationId} input ports and produces transforms via Delaunay+barycentric (interpolated) or nearest-point (discrete). Grid mode publishes integer frame index on the frameIndex output port. |
| [State Machine](stateMachine.md) | `stateMachine` | shared | Author-facing compound for a complete state machine: parameters, layers (states + transitions), listeners, audio bindings, pointer-align targets. Expands at load time into the SM cluster — `smParameterStore` + `layerAdvance` + `stateApply` + `poseEval`/`objectPoseEval`/`blendPose` pose pipeline + `smHitTest` + `listenerAction` + `smAudioAction` + `smCallbackAction` + `smPostAdvance` + `smRandomSource` + `smLifecycle` + `smAutoStart` (~33 primitives for a typical button). Compound: no runtime class. The expansion is loader-internal; authors and AI agents see one node carrying the full SM definition. |
