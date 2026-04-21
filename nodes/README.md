# Node Reference

All 228 graph node types available in Faster Motion.

For machine-readable data, see [`node-registry.json`](../node-registry.json).

## [State machine](state-machine/)

State machine evaluation: layer advance, pose blending (linear, masked, weighted), object pose evaluation, and blend space nodes.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [SM Property Apply](state-machine/smPropertyApply.md) | `smPropertyApply` | canvas | Signal node — SM property writes are done, downstream can read safely |
| [Pose Eval](state-machine/poseEval.md) | `poseEval` | canvas | Evaluate animation clip bone tracks into a pose bundle (no mutation) |
| [Blend Pose](state-machine/blendPose.md) | `blendPose` | canvas | Blend two pose bundles by weight (linear lerp) |
| [Masked Blend Pose](state-machine/maskedBlendPose.md) | `maskedBlendPose` | canvas | Blend two pose bundles with bone mask — unmasked bones pass through from A |
| [Animated Parameter](state-machine/animatedParameter.md) | `animatedParameter` | shared | Sample a keyframe track at a progress input and drive a ParameterStoreNode writer port each frame. Joystick-input animation pattern — an autoplay clip keyframes a joystick parameter, which then seeks other clips. |
| [Additive Pose Blend](state-machine/additivePoseBlend.md) | `additivePoseBlend` | shared | Combine N pose bundles by summing their deltas from a rest baseline — multi-clip stacking (autoplay plus parameter-seeked clips). |
| [Object Pose Eval](state-machine/objectPoseEval.md) | `objectPoseEval` | canvas | Evaluate animation clip object tracks into a pose bundle (x, y, rotation, scaleX, scaleY, opacity + extended props) |
| [Gradient Decompose](state-machine/gradientDecompose.md) | `gradientDecompose` | canvas | Decompose gradient/color FillValues into RGBA + per-stop float channels for the object pose bundle |
| [Property Mask](state-machine/propertyMask.md) | `propertyMask` | canvas | Build per-property animated mask from raw transforms (reset-map pattern) |
| [Object Blend](state-machine/objectBlend.md) | `objectBlend` | canvas | Blend two object pose bundles by weight (linear lerp) |
| [Object Masked Blend](state-machine/objectMaskedBlend.md) | `objectMaskedBlend` | canvas | Blend two object pose bundles with per-object mask — unmasked objects pass through from A |
| [Timeline Pose](state-machine/timelinePose.md) | `timelinePose` | canvas | Evaluates animation clip bone tracks at current Timeline progress. |
| [Timeline State](state-machine/timelineState.md) | `timelineState` | canvas | Animation state node — drives a TimelineNode from state machine layer events. |
| [Remap Apply](state-machine/remapApply.md) | `remapApply` | canvas | Side-effect node for nested artboard remap bindings — ordering anchor between SM writes and downstream coverage reads. |
| [SM Parameter Store](state-machine/smParameterStore.md) | `smParameterStore` | canvas | Declarative parameter store — one dynamic output port per SM parameter. Receives writes from listeners, drivers, and audio bindings. |
| [Layer Advance](state-machine/layerAdvance.md) | `layerAdvance` | canvas | Per-layer state machine solver — evaluates conditions, advances transitions, outputs current/previous state progress and weights. |
| [State Apply](state-machine/stateApply.md) | `stateApply` | canvas | Reads layer state from LayerAdvanceNode, sets animation clip progress and applies state evaluation. |
| [Blend Space 1D Eval](state-machine/blendSpace1DEval.md) | `blendSpace1DEval` | canvas | F266 Phase 3: pure 1D blend space evaluator. Wraps evaluateBlend1DTransforms(). Inputs: inputValue (axis parameter), progress. Output: per-object transform map blended between adjacent animations. |
| [Blend Direct Eval](state-machine/blendDirectEval.md) | `blendDirectEval` | canvas | F266 Phase 3: pure direct-blend evaluator. Wraps evaluateBlendDirectTransforms(). Per-animation weight inputs (weight_<id>) drive sequential blend-on-top. Weights from parameters use normalized scale (value/100, clamped 0..1). |
| [Blend Space 2D Eval](state-machine/blendSpace2DEval.md) | `blendSpace2DEval` | canvas | F266 Phase 3: 2D blend space graph citizen. Serializable and inspectable in FVE. Evaluator stub — 2D blend transform output is still produced by BlendSpace2D.apply() pending extraction of a pure helper (Phase 6+). |
| [Reset Map](state-machine/resetMap.md) | `resetMap` | canvas | Applies animation reset maps during state transitions — properties animated by only one state get reset values during crossfade. |
| [SM Hit Test](state-machine/smHitTest.md) | `smHitTest` | canvas | Translates pointer events + hit object IDs into per-target HitResult map for listener evaluation. |
| [Listener Action](state-machine/listenerAction.md) | `listenerAction` | canvas | Routes listener actions into parameter writes (for SMParameterStoreNode) and side-effect actions (for audio/callback nodes). |
| [SM Audio Action](state-machine/smAudioAction.md) | `smAudioAction` | canvas | Terminal node for audio side effects — owns HTMLAudioElement cache, handles play/pause/stop actions. |
| [SM Callback Action](state-machine/smCallbackAction.md) | `smCallbackAction` | canvas | Terminal node for stateless one-shot callbacks — dispatches switchCamera, setSkin, openUrl, fireEvent, animationAction. |
| [SM Post Advance](state-machine/smPostAdvance.md) | `smPostAdvance` | canvas | Post-advance coordinator — trigger consumption, reset maps application, solver reset signal. Runs after all layers complete. |
| [SM Audio Binding](state-machine/smAudioBinding.md) | `smAudioBinding` | canvas | Reads frequency data from audio tracks, applies temporal smoothing, outputs parameter values for audio-reactive animations. |

## [Boundary](boundary/)

Scene I/O boundary: read/write object transforms and properties, DOM CSS/attribute writes, color writes, stagger writes, data writes.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Object Position](boundary/objectPosition.md) | `objectPosition` | canvas | Read world position of a scene object |
| [Position Write](boundary/positionWrite.md) | `positionWrite` | canvas | Write world-space position to a scene object |
| [Transform Read](boundary/transformRead.md) | `transformRead` | canvas | Read full transform (position + rotation + scale) of a scene object |
| [Transform Write](boundary/transformWrite.md) | `transformWrite` | canvas | Write full transform to a scene object |
| [Property Write](boundary/propertyWrite.md) | `propertyWrite` | canvas | Write a float value to any object property |
| [Data Write](boundary/dataWrite.md) | `dataWrite` | canvas | Write any-typed value to a canvas object property |
| [DOM Property Write](boundary/domPropertyWrite.md) | `domPropertyWrite` | dom | Write a float value to a CSS property, transform, attribute, or textContent on a DOM element |
| [Stagger Write](boundary/staggerWrite.md) | `staggerWrite` | dom | Batched stagger animation — one node handles all elements matching a selector with per-element timing offset |
| [DOM Dock To](boundary/domDockTo.md) | `domDockTo` | shared | Compute additive translate that centers a source DOM element over a target element, scaled by a 0..1 blend. Wire outputs into a domPoseWrite translateX/translateY. |
| [DOM Indexed Dock](boundary/domIndexedDock.md) | `domIndexedDock` | shared | Dock a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. Sibling to domDockTo (which docks onto a static target). Used for typewriter cursors, scanning highlights, focus rings, and any "park X on the active item in a sequence" effect. |
| [DOM String Write](boundary/domStringWrite.md) | `domStringWrite` | dom | Write a string value to a DOM element (CSS, SVG attribute, textContent) |
| [DOM Stage Preset](boundary/domStagePreset.md) | `domStagePreset` | shared | One-shot mount-time CSS writer: perspective / transformStyle on the stage, transformOrigin per slide. Used by the carousel mount-time setup. |
| [DOM Color Write](boundary/domColorWrite.md) | `domColorWrite` | dom | Write rgb() color to a DOM element CSS property. F293 Phase 7: accepts a single color-typed input. |
| [Scene Transform](boundary/sceneTransform.md) | `sceneTransform` | canvas | Per-object transform — reads from objectPose bundle by index, computes world matrix, writes to HeadlessObject |
| [Object Property Read](boundary/objectPropertyRead.md) | `objectPropertyRead` | canvas | Read a runtime object property (bidirectional binding read side). |
| [Layout Compute](boundary/layoutCompute.md) | `layoutCompute` | canvas | WASM flex layout recompute + animated transitions. |
| [Mask Sync](boundary/maskSync.md) | `maskSync` | canvas | Mask transform synchronization — world-space mask geometry from source objects. |
| [Camera](boundary/camera.md) | `camera` | canvas | 2D camera — zoom, pan, rotation, parallax, DOF, color effects, tint, vignette. |
| [Switch Gate](boundary/switchGate.md) | `switchGate` | shared | Gates parentVisible for one child of a displayMode:switch group. Internal loader-generated node. |
| [Clip Path Write](boundary/clipPathWrite.md) | `clipPathWrite` | shared | Serializes ClipPathPoints to CSS polygon() and writes to target element clip-path. Dirty-checks the serialized string to skip redundant DOM writes. |
| [DOM Pose Write](boundary/domPoseWrite.md) | `domPoseWrite` | shared | Write multiple float values to CSS properties on a single DOM element. Transform components route through the accumulator, other properties go through DOMBatcher. |
| [DOM Attribute Read](boundary/domAttributeRead.md) | `domAttributeRead` | shared | Reads a DOM/SVG attribute (e.g., d, viewBox, points) from an element at bind time and outputs it as a string. Static read — the boundary counterpart to DOMStringWriteNode. |
| [Scene Render](boundary/sceneRender.md) | `sceneRender` | canvas | F232 renderer-agnostic scene boundary writer — draws all registered objects via Rust/WASM WebGL2. |
| [Bone Render](boundary/boneRender.md) | `boneRender` | canvas | Editor-mode bone debug rendering — draws skeleton overlays in viewport. |
| [Additive Property Write](boundary/additivePropertyWrite.md) | `additivePropertyWrite` | canvas | F241 additive write boundary — sums multiple driver outputs into a single property without overwriting. |

## [Paths](paths/)

Path geometry read/write and modifiers: bend, wave, noise deform, trim, offset, boolean ops, wiggle path, round corners, repeater, conform, and more.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Morph Compute](paths/morphCompute.md) | `morphCompute` | dom | Pure SVG path interpolation — takes fromPath and toPath as string inputs, outputs interpolated path string. Zero DOM awareness. |
| [Along Path](paths/alongPathCompute.md) | `alongPathCompute` | dom | Follow an SVG path — outputs x, y, angle from pre-sampled LUT |
| [Path Read](paths/pathRead.md) | `pathRead` | canvas | Read path geometry from a scene object. |
| [Path Write](paths/pathWrite.md) | `pathWrite` | canvas | Write path geometry back to a scene object. |
| [Bend](paths/bend.md) | `bend` | shared | Bend geometry around a center point. |
| [Wave](paths/wave.md) | `wave` | shared | Sinusoidal displacement along a path. |
| [Noise Deform](paths/noiseDeform.md) | `noiseDeform` | shared | Per-vertex noise displacement using 2D simplex. |
| [Pinch / Bloat](paths/pinch.md) | `pinch` | shared | Radial pinch or bloat from a center point. |
| [Trim Path](paths/trimPath.md) | `trimPath` | shared | Output a sub-segment of a path by start/end position. |
| [Offset Path](paths/offsetPath.md) | `offsetPath` | shared | Inflate or deflate a path with cubic-preserving Tiller-Hanson offset. |
| [Boolean](paths/boolean.md) | `boolean` | shared | Path boolean operations: union, subtract, intersect, exclude. |
| [Wiggle Path](paths/wigglePath.md) | `wigglePath` | shared | Noise displacement per path point. |
| [Round Corners](paths/roundCorners.md) | `roundCorners` | shared | Round sharp corners with cubic arcs. |
| [Pucker & Bloat](paths/puckerBloat.md) | `puckerBloat` | shared | Move vertices toward/away from centroid. |
| [Chop Path](paths/chopPath.md) | `chopPath` | shared | Split path into N visible segments with gaps. |
| [Wave Deformer](paths/waveDeformer.md) | `waveDeformer` | shared | Sine wave displacement along path. Supports pulse mode. |
| [Zig Zag](paths/zigZag.md) | `zigZag` | shared | Alternating perpendicular peaks and valleys. |
| [Squash & Stretch](paths/squashStretch.md) | `squashStretch` | shared | Non-uniform scale preserving area. |
| [Motion Stretch](paths/motionStretch.md) | `motionStretch` | shared | Stretch along velocity direction. |
| [Repeater](paths/repeater.md) | `repeater` | shared | N copies with cumulative transform offset. |
| [Conform to Path](paths/conformToPath.md) | `conformToPath` | shared | Deform source to follow target path shape. |
| [Merge Paths](paths/mergePaths.md) | `mergePaths` | shared | Boolean ops (union/intersect/subtract/exclude) via clipper2. |
| [Path Vertex Anim](paths/pathVertexAnim.md) | `pathVertexAnim` | shared | Animates per-vertex offsets along a path over time. |

## [Text](text/)

Text animation nodes: split text into characters/words/lines, per-character wave/fade/spring/skew/distort transforms, coverage ranges for reveal effects.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Text Split](text/textSplit.md) | `textSplit` | canvas | Split text into chars/words/lines with glyph metrics for per-element animation |
| [Scramble Compute](text/scrambleCompute.md) | `scrambleCompute` | dom | Per-character scramble effect — outputs original or random character |
| [Text Wave Compute](text/textWaveCompute.md) | `textWaveCompute` | shared | F256: Pure per-character wave sweep. Takes progress + upstream Mat4 bundle. schedulerPhase=pure, zero this.context access. |
| [Coverage Range](text/coverageRange.md) | `coverageRange` | shared | Per-character coverage window with falloff ramps. Animated offset via coverageTime keyframes. Chainable with blend modes. |
| [Coverage Group](text/coverageGroup.md) | `coverageGroup` | shared | F256: Per-character transforms scaled by coverage values. Outputs Mat4TransformBundle. |
| [Text Apply](text/textApply.md) | `textApply` | canvas | Pure passthrough: forwards per-character Mat4 transforms to output port for SRN consumption. Follows SkinnedPathDeformNode pattern (F264). |
| [Split Text](text/splitText.md) | `splitText` | canvas | Setup-only DOM text splitter — splits target element into spans (words/chars/lines). |
| [Counter](text/counter.md) | `counter` | shared | Animated number counter — interpolates min→max with formatting (decimals, separator, template). |
| [Text Sequence](text/textSequence.md) | `textSequence` | canvas | Cycles through a string array based on progress — outputs current text and index. |
| [Text Fade Compute](text/textFadeCompute.md) | `textFadeCompute` | shared | Per-character opacity ramp with stagger. Geometry modifier — routes through TextApply via Mat4Bundle. |
| [Text Spring Compute](text/textSpringCompute.md) | `textSpringCompute` | shared | Per-character bouncy scale/offset via closed-form damped spring. Geometry modifier — routes through TextApply. |
| [Text Scramble Apply](text/textScrambleApply.md) | `textScrambleApply` | canvas | Per-character glyph swap from a pre-rasterized pool. F272: configurable pool, easing curves, per-char stagger + reveal mode. |
| [Text Color Apply](text/textColorApply.md) | `textColorApply` | canvas | Per-character fill color interpolation. Writes `piece.outputs.fill.set(lerpedColor)` via the F260 port-sourced rendering contract. Supports 4 reveal modes (linear, center-out, edges-in, random) + stagger control. |
| [Text Stroke Apply](text/textStrokeApply.md) | `textStrokeApply` | canvas | Per-character stroke color interpolation. Writes `piece.outputs.stroke.set(lerpedColor)` via the F260 port-sourced rendering contract. |
| [Text Stroke Width Apply](text/textStrokeWidthApply.md) | `textStrokeWidthApply` | canvas | Per-character stroke width interpolation. Writes `piece.outputs.strokeWidth.set(lerped)` via the F260 port-sourced rendering contract. |
| [Text Draw Layer Index Apply](text/textDrawLayerIndexApply.md) | `textDrawLayerIndexApply` | canvas | Per-character draw-order layering. Assigns a discrete layer index per character based on reveal order pattern + stride. Writes `piece.outputs.drawLayerIndex.set(layerIdx)` via the F260 port-sourced rendering contract. |
| [Text Effect Apply](text/textEffectApply.md) | `textEffectApply` | canvas | Per-character blur/glow/shadow via the F260 port contract. Writes piece.outputs.blur/glow/shadow.set(v) per character using the perCharProgress stagger + reveal mode. The `effect` param selects which port to write. |
| [Text Skew Compute](text/textSkewCompute.md) | `textSkewCompute` | shared | Per-character horizontal shear with staggered decay. Geometry modifier — routes through TextApply. |
| [Text Distort Compute](text/textDistortCompute.md) | `textDistortCompute` | shared | Per-character random scatter/explosion entrance. Deterministic (seed-based). Geometry modifier — routes through TextApply. |
| [Counter Animation](text/counterAnimation.md) | `counterAnimation` | shared | Interpolate a number from min to max (formatted via template, decimals, thousand separator) driven by a 0..1 progress input. Authors pick any number of output targets via `channels`: `from: "text"` writes the formatted string to any DOM string target (textContent, aria-valuetext, CSS var, title, data-*, etc.), `from: "value"` routes the raw float to any numeric CSS property (opacity, translateY, scale, rotate, width, …). One compound can show the number AND animate motion simultaneously from the same count. Compound: expands into `counter + one domPoseWrite + N domStringWrites` at load time — no runtime class. |
| [Text Sequence Animation](text/textSequenceAnimation.md) | `textSequenceAnimation` | shared | Cycle through a sequence of strings based on progress. textSequence emits both the current string (`text`) and its position in the array (`index`, float). Authors pick any number of output targets via `channels`: `from: "text"` routes the string to any DOM string target (textContent, aria-label, CSS var, title, data-*, etc.), `from: "index"` routes the position float to any numeric CSS property (opacity gating, slide offset, step-in indicator). Compound: expands into `textSequence + one domPoseWrite + N domStringWrites` at load time — no runtime class. |
| [Text Scramble Animation](text/textScrambleAnimation.md) | `textScrambleAnimation` | shared | Scramble a single character — cycles through a charset and settles on the original, driven by a 0..1 progress input. Authors pick one or more string write targets via `channels` (textContent, attribute like aria-label / title / data-*, CSS style property, CSS custom var). Compound: expands to `scrambleCompute` + one `domStringWrite` per channel at load time — no runtime class. |

## [Animation](animation/)

Core animation primitives: timelines for playback control, tweens for A→B interpolation, keyframes for multi-stop curves, and stagger for per-element timing.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Bool Tween](animation/boolTween.md) | `boolTween` | shared | Smoothly tween a 0..1 progress toward a bool target over a fixed duration. Used to drive DOM animations from bool parameters (hover/click toggles). Emits linear progress so downstream multiKeyframe can carry the ease curve. |
| [Timeline](animation/timeline.md) | `timeline` | shared | Playback sequencer — self-advancing or externally driven (scroll, parameter) |
| [Seamless Playhead](animation/seamlessPlayhead.md) | `seamlessPlayhead` | shared | Pure-math playhead for seamless infinite loops. Maps progress + iteration to a rawSequence-equivalent playhead time; slideOffset nudges playhead by one spacing-unit per step (keyboard / autoplay step). |
| [Carousel Slide Local Time](animation/carouselSlideLocalTime.md) | `carouselSlideLocalTime` | shared | Per-slide local-time for carousel tween semantics. slideProgress = clamp((playhead - slideIndex*spacing) mod loopDuration / duration, 0, 1). |
| [Carousel Autoplay](animation/carouselAutoplay.md) | `carouselAutoplay` | shared | Time-driven slideOffset for carousel auto-advancement. Pauses on hover (optional) and respects prefers-reduced-motion. |
| [Carousel Keyboard Nav](animation/carouselKeyboardNav.md) | `carouselKeyboardNav` | shared | Edge-triggered ArrowLeft/ArrowRight → cumulative iteration offset. Wire into SeamlessPlayhead.iteration to enable keyboard slide stepping. |
| [Carousel Wrap Counter](animation/carouselWrapCounter.md) | `carouselWrapCounter` | shared | Half-plane wrap detection with cooldown + 3-sample direction majority. Emits cumulative iteration for seamless carousel loops. |
| [Tween](animation/tween.md) | `tween` | shared | A→B interpolation with easing — stateless, pure function of progress |
| [Keyframe](animation/keyframe.md) | `keyframe` | shared | Multi-stop interpolation with per-segment easing |
| [Stagger](animation/stagger.md) | `stagger` | shared | Per-element timing offset using Element Context (index, count) |
| [Color Tween](animation/colorTween.md) | `colorTween` | shared | Perceptually uniform color interpolation in OKLab space |
| [Seek Remap](animation/seekRemap.md) | `seekRemap` | shared | Map a raw parameter value into [0,1] progress for TimelinePoseNode / ObjectPoseEvalNode seek bindings |
| [Color Keyframe](animation/colorKeyframe.md) | `colorKeyframe` | shared | Multi-stop color interpolation in OKLab space — outputs r, g, b channels (0-255). |
| [String Keyframe](animation/stringKeyframe.md) | `stringKeyframe` | shared | Multi-stop string interpolation — parses embedded numbers and interpolates each independently. For CSS strings (filter, boxShadow, gradients) where multiple numbers change together. |
| [Clip Path](animation/clipPath.md) | `clipPath` | shared | Keyframed polygon clip-path with structured point data. Interpolates between polygon keyframe stops — outputs typed ClipPathPoints for visual per-point editing in FVE. |
| [Multi Keyframe](animation/multiKeyframe.md) | `multiKeyframe` | shared | Multi-channel keyframe interpolation — one progress input, N float outputs with per-channel per-segment easing. Channels defined in params, output ports created dynamically. |
| [Property Animation](animation/propertyAnimation.md) | `propertyAnimation` | shared | Animate one or more CSS properties on a target element, driven by a 0..1 progress input. Compound: expanded into `multiKeyframe + domPoseWrite` at load time — no runtime class. |
| [Clip Path Animation](animation/clipPathAnimation.md) | `clipPathAnimation` | shared | Animate a CSS polygon() clip-path on a target element, driven by a 0..1 progress input. Each keyframe carries `values[]` (the polygon point coordinates). Compound: expanded into `clipPath + clipPathWrite` at load time — no runtime class. |
| [Slide Slot Animation](animation/slideSlotAnimation.md) | `slideSlotAnimation` | shared | A single slot in a seamlessPlayhead-driven carousel. Maps a per-slot window of the carousel playhead (e.g. [0.1, 1.1]) to a [0,1] slot-local progress (remap + fract), then animates CSS properties on the slot element via channels. One compound per slot collapses the canonical `remap + mathUtil(fract) + multiKeyframe + domPoseWrite` chain that every carousel effect repeats per slide. Compound: expanded into those four primitives at load time — no runtime class. |
| [Dock To Animation](animation/dockToAnimation.md) | `dockToAnimation` | shared | Dock a source DOM element onto a target DOM element, driven by a 0..1 progress input (0 = at rest, 1 = fully docked). Emits horizontal + vertical pixel offsets; authors route each offset to any CSS property via `channels`. Default maps offsetX → translateX(px) and offsetY → translateY(px) on the source element — override for axis-only docking, or to pipe the offset into marginLeft / mask-position / CSS custom vars / scale compensation, etc. Compound: expanded into `domDockTo + domPoseWrite` at load time — no runtime class. |

## [Inputs](inputs/)

Nodes that read external signals into the graph: DOM events, mouse position, scroll progress, keyboard input, time, and other browser/device inputs.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Scroll Input](inputs/scrollInput.md) | `scrollInput` | dom | Scroll progress (0-1) from page scroll position |
| [Time Input](inputs/timeInput.md) | `timeInput` | shared | Elapsed time to normalized progress (0-1) |
| [Mouse Input](inputs/mouseInput.md) | `mouseInput` | dom | Pointer position (0-1) on selected axis |
| [Mouse Velocity](inputs/mouseVelocity.md) | `mouseVelocity` | dom | Pointer velocity magnitude (-1 to 1) |
| [Distance Input](inputs/distanceInput.md) | `distanceInput` | dom | Mouse distance to target (0 = at target, 1 = beyond radius) |
| [Drag Input](inputs/dragInput.md) | `dragInput` | dom | Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw. |
| [Scroll Trigger](inputs/scrollTrigger.md) | `scrollTrigger` | dom | Track element visibility during scroll — outputs progress, direction, velocity, and isInView |
| [Scroll Pin](inputs/scrollPin.md) | `scrollPin` | dom | Pin a DOM element to fixed position while scroll progress is within range |
| [Pointer](inputs/pointer.md) | `pointer` | dom | Track pointer position — outputs x, y, normalized, isInside |
| [Observer](inputs/observer.md) | `observer` | dom | Detect gestures (wheel, touch, pointer, scroll) — outputs deltas |
| [Event Listener](inputs/eventListener.md) | `eventListener` | dom | DOM event to graph signal (click, hover, etc.) |
| [Keyboard Listener](inputs/keyboardListener.md) | `keyboardListener` | dom | Keyboard key press/release to graph signal |
| [Text Input](inputs/textInput.md) | `textInput` | canvas | Interactive text field with cursor and selection |
| [Hover](inputs/hover.md) | `hover` | shared | mouseenter/mouseleave with smooth 0→1 transition over duration. |
| [Distance](inputs/distance.md) | `distance` | shared | Mouse-to-element-rect proximity. Outputs 0 (far) to 1 (touching) with falloff. |
| [Scroll Progress](inputs/scrollProgress.md) | `scrollProgress` | dom | Outputs normalized scroll position [0, 1]. Drive text/instance animations from scroll. |
| [Mouse Progress](inputs/mouseProgress.md) | `mouseProgress` | shared | Outputs normalized mouse position [0, 1] relative to a target element or viewport. |
| [Keyframe Progress](inputs/keyframeProgress.md) | `keyframeProgress` | shared | Reads a parameter value and outputs it as progress. Wire from ParameterStoreNode or SM output for timeline-driven animations. |
| [Canvas Pointer](inputs/canvasPointer.md) | `canvasPointer` | shared | Canvas-level pointer event source — outputs normalized pointer position, down/up flags, and hold state. |

## [Constraints](constraints/)

Position, rotation, and transform constraints that enforce spatial relationships between objects: follow, aim, distance clamp, drag, path follow, camera bounds.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Translation Follow](constraints/translationFollow.md) | `translationFollow` | shared | Constrain position to follow a source position |
| [Transform Follow](constraints/transformFollow.md) | `transformFollow` | shared | Copy transform components from source to target |
| [Distance Clamp](constraints/distanceClamp.md) | `distanceClamp` | shared | Clamp distance between two positions |
| [Auto Orient](constraints/autoOrient.md) | `autoOrient` | shared | Orient rotation based on movement velocity |
| [Bone Aim](constraints/boneAim.md) | `boneAim` | canvas | Aim bone at target position |
| [Camera Follow](constraints/cameraFollow.md) | `cameraFollow` | shared | Smoothly follow target with deadzone and lookahead |
| [Camera Bounds](constraints/cameraBounds.md) | `cameraBounds` | shared | Clamp camera position and zoom to bounds |
| [Draggable](constraints/draggable.md) | `draggable` | shared | Enable drag interaction with optional axis lock and bounds |
| [Scroll Constraint](constraints/scroll.md) | `scroll` | shared | Scrollable container with bounds and momentum |
| [Scroll Bar](constraints/scrollBar.md) | `scrollBar` | shared | Scroll bar indicator that tracks scroll position |
| [Path Follow](constraints/pathFollow.md) | `pathFollow` | shared | Follow a path curve at given progress |

## [Skeleton](skeleton/)

Bone and skeleton rigging: per-bone FK transforms, IK solvers, bone collectors, spring/jiggle bone physics, chain dynamics, and FK recomposition.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Bone Transform](skeleton/boneTransform.md) | `boneTransform` | canvas | Per-bone FK node — reads pose at boneIndex, computes world matrix from parent |
| [Bone Collector](skeleton/boneCollector.md) | `boneCollector` | canvas | Gather per-bone world matrices into AttributeBundle for IK solver |
| [Skeleton Transform](skeleton/skeletonTransform.md) | `skeletonTransform` | canvas | Reads skeleton root transform each frame — feeds root bone parentWorldMatrix |
| [IK Solve](skeleton/ikSolve.md) | `ikSolve` | canvas | Per-chain IK solver. Pure array-based FABRIK on AttributeBundle data. |
| [FK Recompose](skeleton/fkRecompose.md) | `fkRecompose` | canvas | Reads a post-IK/physics bone pose bundle and outputs per-bone world matrices via full parent×local FK. One per IK/physics skeleton, lives at scene level (outside rig Module) so only one bundle wire crosses the Module boundary. |
| [Jiggle Bone](skeleton/jiggleBone.md) | `jiggleBone` | canvas | 2D position spring — adds bouncy displacement to bone x/y from parent movement. |
| [Spring Bone](skeleton/springBonePhysics.md) | `springBonePhysics` | canvas | Rotational spring — bone rotation follows parent with spring dynamics, gravity, and wind. |
| [Chain Physics](skeleton/chainPhysics.md) | `chainPhysics` | canvas | Verlet chain simulation for hair, tails, ropes. Fixed timestep with distance/angular constraints. |
| [IK Target](skeleton/ikTarget.md) | `ikTarget` | canvas | Boundary node — bridges scene-object position into IK solve target port. |
| [Bone Mat4 Bundle](skeleton/boneMat4Bundle.md) | `boneMat4Bundle` | canvas | Gathers per-bone 2×3 world matrices from FK chain and promotes to Mat4TransformBundle for composable bone modifiers. |
| [Bone Jiggle Compute](skeleton/boneJiggleCompute.md) | `boneJiggleCompute` | canvas | Per-bone secondary animation via closed-form damped spring. Composable with other bone modifiers via merge/mask. |

## [Distribution](distribution/)

Point distribution generators: grid, circle, linear, random, fibonacci spiral, path sampling. Feed into Generator node to create object clones.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Grid Distribution](distribution/gridDistribution.md) | `gridDistribution` | shared | Distribute points in a rows × cols grid centered at origin. |
| [Circle Distribution](distribution/circleDistribution.md) | `circleDistribution` | shared | Distribute points evenly around a circle. |
| [Linear Distribution](distribution/linearDistribution.md) | `linearDistribution` | shared | Distribute points along a line from start to end. |
| [Random Distribution](distribution/randomDistribution.md) | `randomDistribution` | shared | Distribute points randomly in a bounding box (seeded PRNG). |
| [Fibonacci Distribution](distribution/fibonacciDistribution.md) | `fibonacciDistribution` | shared | Golden angle spiral distribution (sunflower pattern). |
| [Path Distribution](distribution/pathDistribution.md) | `pathDistribution` | shared | Distribute points along a path via arc-length sampling. |
| [Generator](distribution/generator.md) | `generator` | canvas | Create display object clones at distribution positions. First node that creates visible shapes. |
| [Clone Slot](distribution/cloneSlot.md) | `cloneSlot` | canvas | Pre-declared clone slot for GeneratorNode. Gates clone visibility based on activeCount from generator. |
| [Instance Stagger Compute](distribution/instanceStaggerCompute.md) | `instanceStaggerCompute` | canvas | Per-instance staggered offset/scale animation. Proves Mat4 pipeline works for non-text domains. |
| [Instance Apply](distribution/instanceApply.md) | `instanceApply` | canvas | F264 Phase 2: Writes Mat4TransformBundle per-instance transforms to GeneratorNode clone STNs via SceneTransformNode.setPose. Decomposes 4×4 → 2D pose per clone — full port contract flow, no imperative HeadlessObject mutation. |

## [Math](math/)

Pure compute nodes: remap ranges, math expressions, utility operations (abs, clamp, round), smoothing, parallax offset, velocity calculation, string operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Remap](math/remap.md) | `remap` | shared | Map a value from one range to another with optional curve |
| [Expression](math/expression.md) | `expression` | shared | Evaluate a JavaScript math expression |
| [Converter](math/converter.md) | `converter` | shared | Value transformation (stringFormat, colorLerp, enumMap, conditional, math) |
| [Smoothing](math/smoothing.md) | `smoothing` | shared | Exponential smoothing for any float signal — frame-rate independent |
| [Gate](math/gate.md) | `gate` | shared | Blend a driven value toward a rest value under a 0..1 gate, with optional spring-smoothed threshold crossings |
| [Parallax](math/parallax.md) | `parallax` | shared | Convert scroll progress to parallax pixel offset |
| [Velocity](math/velocity.md) | `velocity` | shared | Compute smoothed rate-of-change of any float signal |
| [Math Utility](math/mathUtil.md) | `mathUtil` | shared | Typed Float→Float math operation (abs, round, clamp, normalize, add, etc.). |
| [String Op](math/stringOp.md) | `stringOp` | shared | Typed String→String operation (uppercase, trim, replace, template, etc.). |

## [Integration](integration/)

Graph composition and data flow: ForEach stamping, scene composition, parameter store read/write, float/value sources.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Data Read](integration/dataRead.md) | `dataRead` | shared | Read any-typed value from ParameterStore |
| [Parameter Write](integration/parameterWrite.md) | `parameterWrite` | shared | Compute a parameter's next value on a rising-edge trigger. Pure-compute — reads currentValue from a ParameterStore.out_<paramId> input, emits nextValue which the store commits through its writer-fanin input. |
| [Float Source](integration/floatSource.md) | `floatSource` | shared | Float value source — reads from connected input or set externally |
| [Value Source](integration/valueSource.md) | `valueSource` | shared | Externally-set Vec2 value |
| [Parameter Read](integration/parameterStoreRead.md) | `parameterStoreRead` | shared | Read a float parameter from ParameterStore |
| [Parameter Write](integration/parameterStoreWrite.md) | `parameterStoreWrite` | shared | Write a float value to ParameterStore |
| [For Each](integration/forEach.md) | `forEach` | shared | Stamp a preset per target object. Stamped nodes are read-only. |
| [Scene](integration/sceneGraph.md) | `sceneGraph` | canvas | Composable scene root — encapsulates an entire .fmtion scene as a single node with promoted ports. |
| [Dirty Trigger](integration/dirtyTrigger.md) | `dirtyTrigger` | shared | External dirtying entry point. No-op evaluate — triggers downstream re-evaluation. |

## [Procedural](procedural/)

Time-driven procedural generators: wiggle, noise, oscillator, spring physics, modulate, ring delay, random values, and stagger drivers.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Wiggle](procedural/wiggle.md) | `wiggle` | shared | AE-style wiggle noise — random displacement |
| [Noise](procedural/noise.md) | `noise` | shared | Multi-octave simplex noise |
| [Spring](procedural/spring.md) | `spring` | shared | Damped spring physics — smooth follow with overshoot. Defaults to replace composition (spring IS the value). |
| [Oscillator](procedural/oscillator.md) | `oscillator` | shared | Periodic wave generator (sine, triangle, square, sawtooth) |
| [Modulate](procedural/modulate.md) | `modulate` | shared | Remap value through a piecewise-linear curve. Defaults to replace composition. |
| [Ring (Delay)](procedural/ring.md) | `ring` | shared | Ring buffer delay — output a past value. Defaults to replace composition. |
| [Random](procedural/random.md) | `random` | shared | Seeded random value per frame. Uniform or gaussian distribution. |
| [Stagger Driver](procedural/staggerDriver.md) | `staggerDriver` | shared | Index-based wave propagation. Uses ForEach element context for per-instance offset. |

## [Effects](effects/)

Visual effects: WASM/GPU filter chains, parametric shape generation, glitch computation, FLIP layout animation, and morph path interpolation.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Flip](effects/flip.md) | `flip` | dom | FLIP layout animation — triggered on rising edge |
| [Glitch Compute](effects/glitchCompute.md) | `glitchCompute` | dom | Stateful random glitch — outputs offset, skew, and opacity |
| [WASM Effect](effects/wasmEffect.md) | `wasmEffect` | canvas | Procedural noise/distortion texture generation via WASM. |
| [Parametric Shape](effects/parametricShape.md) | `parametricShape` | canvas | WASM parametric shape generation with dynamic children. |
| [Particle Emitter](effects/particleEmitter.md) | `particleEmitter` | canvas | Particle system — emit, advance, kill. Outputs per-particle data as AttributeBundle. |
| [Particle Update](effects/particleUpdate.md) | `particleUpdate` | canvas | Particle update boundary — advances particle state from emitter output each frame. |

## [Falloff](falloff/)

Spatial weight fields that modulate deformer strength: linear ramp, radial distance, shape boundary, fractal noise, element index, and user-defined curve.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Linear Falloff](falloff/linearFalloff.md) | `linearFalloff` | shared | Ramp falloff along a configurable axis. |
| [Radial Falloff](falloff/radialFalloff.md) | `radialFalloff` | shared | Distance-based falloff from a center point. |
| [Shape Falloff](falloff/shapeFalloff.md) | `shapeFalloff` | shared | Signed-distance boundary falloff (circle or rectangle). |
| [Noise Falloff](falloff/noiseFalloff.md) | `noiseFalloff` | shared | Fractal simplex noise-based falloff (max 6 octaves). |
| [Index Falloff](falloff/indexFalloff.md) | `indexFalloff` | shared | Element index mapping falloff (reads ForEachNode context). |
| [Curve Falloff](falloff/curveFalloff.md) | `curveFalloff` | shared | User-defined keyframe ramp. Input from upstream Float or element normalized. |

## [Media](media/)

Media playback: audio tracks with RMS level output, Lottie animation control, DOM spritesheets, video sync, and WebGL video effects.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [DOM Sprite](media/domSprite.md) | `domSprite` | dom | Display spritesheet frame based on progress |
| [Lottie](media/lottie.md) | `lottie` | dom | Lottie animation — autoplay, scroll-driven, or state-controlled |
| [Video Effect](media/videoEffect.md) | `videoEffect` | dom | WebGL video effect — wraps VideoEffectController |
| [Audio Track](media/audioTrack.md) | `audioTrack` | shared | Audio playback with level output for audio-reactive animations |
| [Video Sync](media/videoSync.md) | `videoSync` | shared | Timeline-to-video playback synchronization. |

## [Solvers](solvers/)

Iterative solvers: value accumulation, mesh relaxation, distance constraint solving, rigid body physics (Planck.js/Box2D), and physics body readout.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Value Solver](solvers/valueSolver.md) | `valueSolver` | shared | Generic float accumulation with temporal feedback. Value moves toward target at given rate. |
| [Mesh Solver](solvers/meshSolver.md) | `meshSolver` | shared | Iterative mesh relaxation. Averages vertex positions toward neighbors. |
| [Constraint Solver](solvers/constraintSolver.md) | `constraintSolver` | shared | Multi-pass distance constraint solving. Maintains rest lengths between connected points. |
| [Physics World](solvers/physicsWorld.md) | `physicsWorld` | canvas | Rigid body physics simulation via Planck.js (Box2D). Lazy-loaded. |
| [Physics Body Read](solvers/physicsBodyRead.md) | `physicsBodyRead` | canvas | Extract per-body x/y/rotation from PhysicsWorldNode output. |

## [Bundles](bundles/)

Transform bundle infrastructure: time context, cycle clocks, and Mat4 transform bundle merge/mask operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Time Context](bundles/timeContext.md) | `timeContext` | canvas | Exposes scheduler ambient time (deltaTime, elapsed, frame) as output ports. Clock node — feed into CycleClock or directly into a time consumer. |
| [Cycle Clock](bundles/cycleClock.md) | `cycleClock` | canvas | Accumulates ambient scheduler deltaTime into a cycle progress [0, 1]. Drives time-dependent modifier compute nodes. Supports duration, iterations, ping-pong. No input ports — clock nodes read ambient time directly (F236). |
| [Transform Bundle Merge](bundles/transformBundleMerge.md) | `transformBundleMerge` | canvas | FR-1: Compose per-element transform bundles via matrix multiplication or alternative blend modes. Multi-connection input accepts N wires. |
| [Transform Bundle Mask](bundles/transformBundleMask.md) | `transformBundleMask` | canvas | Apply a per-element transform bundle only to elements in [from, to] with optional edge falloff. Outside the range, elements pass through as identity. |

## [Attributes](attributes/)

AttributeBundle operations: read/write named attributes from bundles, extract single values by property name and index.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Bundle Read](attributes/bundleRead.md) | `bundleRead` | shared | Extract a single float from an AttributeBundle by property name + index |
| [Attribute Read](attributes/attributeRead.md) | `attributeRead` | shared | Read a named attribute from an AttributeBundle |
| [Attribute Write](attributes/attributeWrite.md) | `attributeWrite` | shared | Stamp a named attribute onto an AttributeBundle |

## [Data](data/)

Data flow utilities: parameter actions (set, toggle, fire, increment), data source reads, and type casting between port types.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Parameter Action](data/parameterAction.md) | `parameterAction` | shared | Compute parameter action (set, toggle, fire, increment, decrement) |
| [Data Source](data/dataSource.md) | `dataSource` | shared | Read a DataRecord field directly into the graph. |
| [Type Cast](data/typeCast.md) | `typeCast` | shared | Explicit AnyType → typed boundary (float, string, bool, color). |

## [Deformers](deformers/)



| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Mesh Deform](deformers/meshDeform.md) | `meshDeform` | canvas | Per-mesh LBS/DQS/morph/lattice deformation. Dynamic morph weight ports. |
| [Skinned Path Deform](deformers/skinnedPathDeform.md) | `skinnedPathDeform` | canvas | Per-path skinned bezier deformation with per-vertex bone weights. |

