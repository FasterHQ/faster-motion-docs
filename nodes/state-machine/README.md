# State machine Nodes

State machine evaluation: layer advance, pose blending (linear, masked, weighted), object pose evaluation, and blend space nodes.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [SM Property Apply](smPropertyApply.md) | `smPropertyApply` | canvas | Signal node — SM property writes are done, downstream can read safely |
| [Pose Eval](poseEval.md) | `poseEval` | canvas | Evaluate animation clip bone tracks into a pose bundle (no mutation) |
| [Blend Pose](blendPose.md) | `blendPose` | canvas | Blend two pose bundles by weight (linear lerp) |
| [Masked Blend Pose](maskedBlendPose.md) | `maskedBlendPose` | canvas | Blend two pose bundles with bone mask — unmasked bones pass through from A |
| [Object Pose Eval](objectPoseEval.md) | `objectPoseEval` | canvas | Evaluate animation clip object tracks into a pose bundle (x, y, rotation, scaleX, scaleY, opacity + extended props) |
| [Gradient Decompose](gradientDecompose.md) | `gradientDecompose` | canvas | Decompose gradient/color FillValues into RGBA + per-stop float channels for the object pose bundle |
| [Property Mask](propertyMask.md) | `propertyMask` | canvas | Build per-property animated mask from raw transforms (reset-map pattern) |
| [Object Blend](objectBlend.md) | `objectBlend` | canvas | Blend two object pose bundles by weight (linear lerp) |
| [Object Masked Blend](objectMaskedBlend.md) | `objectMaskedBlend` | canvas | Blend two object pose bundles with per-object mask — unmasked objects pass through from A |
| [Timeline Pose](timelinePose.md) | `timelinePose` | canvas | Evaluates animation clip bone tracks at current Timeline progress. |
| [Timeline State](timelineState.md) | `timelineState` | canvas | Animation state node — drives a TimelineNode from state machine layer events. |
| [Remap Apply](remapApply.md) | `remapApply` | canvas | Side-effect node for nested artboard remap bindings — ordering anchor between SM writes and downstream coverage reads. |
| [SM Parameter Store](smParameterStore.md) | `smParameterStore` | canvas | Declarative parameter store — one dynamic output port per SM parameter. Receives writes from listeners, drivers, and audio bindings. |
| [Layer Advance](layerAdvance.md) | `layerAdvance` | canvas | Per-layer state machine solver — evaluates conditions, advances transitions, outputs current/previous state progress and weights. |
| [State Apply](stateApply.md) | `stateApply` | canvas | Reads layer state from LayerAdvanceNode, sets animation clip progress and applies state evaluation. |
| [Blend Space 1D Eval](blendSpace1DEval.md) | `blendSpace1DEval` | canvas | F266 Phase 3: pure 1D blend space evaluator. Wraps evaluateBlend1DTransforms(). Inputs: inputValue (axis parameter), progress. Output: per-object transform map blended between adjacent animations. |
| [Blend Direct Eval](blendDirectEval.md) | `blendDirectEval` | canvas | F266 Phase 3: pure direct-blend evaluator. Wraps evaluateBlendDirectTransforms(). Per-animation weight inputs (weight_<id>) drive sequential blend-on-top. Weights from parameters use normalized scale (value/100, clamped 0..1). |
| [Blend Space 2D Eval](blendSpace2DEval.md) | `blendSpace2DEval` | canvas | F266 Phase 3: 2D blend space graph citizen. Serializable and inspectable in FVE. Evaluator stub — 2D blend transform output is still produced by BlendSpace2D.apply() pending extraction of a pure helper (Phase 6+). |
| [Reset Map](resetMap.md) | `resetMap` | canvas | Applies animation reset maps during state transitions — properties animated by only one state get reset values during crossfade. |
| [SM Hit Test](smHitTest.md) | `smHitTest` | canvas | Translates pointer events + hit object IDs into per-target HitResult map for listener evaluation. |
| [Listener Action](listenerAction.md) | `listenerAction` | canvas | Routes listener actions into parameter writes (for SMParameterStoreNode) and side-effect actions (for audio/callback nodes). |
| [SM Audio Action](smAudioAction.md) | `smAudioAction` | canvas | Terminal node for audio side effects — owns HTMLAudioElement cache, handles play/pause/stop actions. |
| [SM Callback Action](smCallbackAction.md) | `smCallbackAction` | canvas | Terminal node for stateless one-shot callbacks — dispatches switchCamera, setSkin, openUrl, fireEvent, animationAction. |
| [SM Post Advance](smPostAdvance.md) | `smPostAdvance` | canvas | Post-advance coordinator — trigger consumption, reset maps application, solver reset signal. Runs after all layers complete. |
| [SM Audio Binding](smAudioBinding.md) | `smAudioBinding` | canvas | Reads frequency data from audio tracks, applies temporal smoothing, outputs parameter values for audio-reactive animations. |
