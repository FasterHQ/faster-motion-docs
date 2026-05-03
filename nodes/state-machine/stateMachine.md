# State Machine

**Type:** `stateMachine`  
**Category:** state-machine  
**Context:** Shared — works in both DOM and canvas graphs  

Author-facing compound for a complete state machine: parameters, layers (states + transitions), listeners, audio bindings, pointer-align targets. Expands at load time into the SM cluster — `smParameterStore` + `layerAdvance` + `stateApply` + `poseEval`/`objectPoseEval`/`blendPose` pose pipeline + `smHitTest` + `listenerAction` + `smAudioAction` + `smCallbackAction` + `smPostAdvance` + `smRandomSource` + `smLifecycle` + `smAutoStart` (~33 primitives for a typical button). Compound: no runtime class. The expansion is loader-internal; authors and AI agents see one node carrying the full SM definition.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `parameters` | smParameters | `[]` | Parameters |
| `layers` | smLayers | `[]` | Layers |
| `listeners` | smListeners | `[]` | Listeners |
| `audioBindings` | smAudioBindings | `[]` | Audio Bindings |
| `pointerAlignTargets` | smPointerAlignTargets | `[]` | Pointer Align Targets |

