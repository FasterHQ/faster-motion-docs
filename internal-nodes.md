# Internal nodes

These 42 node types are **loader-emitted** — you do NOT author them in `.fmtion` files. They're filtered from the authoring picker and the per-node MD tree, but they DO appear in:

- Runtime error stacks (`[graphWire] Module 'foo' references internal node 'maskClip-bar' …`)
- `debug.validate()` output
- `debug.dump()` snapshots
- `debug.nodes()` filtered listings

When you see one of these in a runtime message, this page is the lookup: it tells you which authoring primitive caused the loader to emit it. The fix is always to edit the **authoring primitive** the description names, never the internal node — internal nodes are runtime plumbing.

> Adjacent reference: [`debugging.md`](debugging.md) for the warning-code catalog and `debug.*` API surface.

## State machine (23)

| Type | Description |
|------|-------------|
| `additivePoseBlend` | Multi-clip pose combiner — emitted by `deriveAnimationSubgraphModule` when a non-SM scene has ≥2 animations. Combines N pose bundles by summing their deltas from a rest baseline. Loader-emitted runtime plumbing — never user-authored at the node level. |
| `animatedParameter` | Joystick-input runtime helper — emitted by the .fmtion converter when a source file uses joystick parameter animation. Samples a keyframe track at a progress input and drives a ParameterStoreNode writer port each frame. Loader-emitted; never user-authored. |
| `gradientDecompose` | Per-OPE color/gradient decomposer — materialised by `startGradientDecomposeAuthoring` reactor. Decomposes gradient/color FillValues into RGBA + per-stop float channels for the object pose bundle. Loader-emitted — never user-authored. |
| `layerAdvance` | Per-layer state machine solver — materialised inside `stateMachine` compound expansion. Evaluates conditions, advances transitions, outputs current/previous state progress and weights. |
| `listenerAction` | SM listener action router — materialised inside `stateMachine` compound expansion. Routes listener actions into parameter writes (for SMParameterStore) and side-effect actions (for audio/callback nodes). |
| `objectMaskedBlend` | SM cross-layer pose combiner — materialised inside `stateMachine` compound expansion (one per layer beyond the first). Blends two object pose bundles with per-object animMask; unmasked objects pass through from A. Multi-clip non-SM rigs use `additivePoseBlend` instead. |
| `objectPoseEval` | Per-state pose evaluator (SM-internal) — materialised inside `stateMachine` compound expansion. Reads animation object tracks at progress, outputs a pose bundle (x, y, rotation, scaleX, scaleY, opacity + extended props). Loader-emitted runtime plumbing — never user-authored. |
| `objectPosePriorityMerge` | Per-channel priority pose merger — picks the highest-priority authored input per slot/channel; falls back to rest baseline when no input authors. Used when multiple writers compete for the same channel (canonical case: editor preview where timeline scrub and an SM AnimationState both target the same animation). Loader-emitted; never user-authored. |
| `propertyMask` | Per-OPE animated-property mask builder — materialised by `startOpeAuthoring` reactor or SM compound expansion. Builds the per-property animMask grid (reset-map pattern) from raw transforms. Loader-emitted — never user-authored. |
| `remapApply` | Nested-artboard remap glue — ordering anchor between SM writes and downstream coverage reads. Loader-emitted; never user-authored. |
| `resetMap` | SM transition reset coordinator — materialised inside `stateMachine` compound expansion. Applies animation reset maps during state transitions so properties animated by only one state get reset values during crossfade. |
| `smAudioAction` | SM audio side-effect terminal — materialised inside `stateMachine` compound expansion. Owns HTMLAudioElement cache, handles play/pause/stop actions. |
| `smAudioBinding` | SM audio-reactive parameter source — materialised inside `stateMachine` compound expansion from `params.audioBindings[]`. Reads frequency data from audio tracks, applies temporal smoothing, writes parameter values into the SM parameter store. |
| `smAutoStart` | SM auto-start latch — materialised inside `stateMachine` compound expansion. Defaults `shouldRun` to 1 on construction so the SM begins running on the first frame. `stop()` flips the internal latch to 0, producing a falling edge on `SMLifecycleNode.shouldRun`. |
| `smCallbackAction` | SM stateless callback dispatcher — materialised inside `stateMachine` compound expansion. Dispatches switchCamera, setSkin, openUrl, fireEvent, animationAction. |
| `smHitTest` | SM listener hit-test translator — materialised inside `stateMachine` compound expansion. Translates pointer events + hit object IDs into per-target HitResult map for listener evaluation. |
| `smLifecycle` | SM running-state + snapshot boundary — materialised inside `stateMachine` compound expansion. Reads `shouldRun` from the auto-start or external lifecycle source, emits `isRunning` for downstream layer/state nodes. F266: stores full SM execution state (clock, current state ids, clip start times, RNG seed) and reapplies it after a graph rebuild for hot-reload preservation. |
| `smParameterStore` | Per-SM parameter store — one dynamic output port per SM parameter. Materialised inside `stateMachine` compound expansion. Receives writes from listeners, drivers, and audio bindings. |
| `smPostAdvance` | SM post-advance coordinator — materialised inside `stateMachine` compound expansion. Trigger consumption, reset-map application, solver reset signal. Runs after all layers complete. |
| `smPropertyApply` | Singleton terminal — materialised by `stateMachine` compound expansion. Signals SM property-write completion to downstream consumers (scene-render, layout-compute). One per scene. |
| `smRandomSource` | Per-SM deterministic Mulberry32 PRNG — materialised inside `stateMachine` compound expansion. Used by LayerAdvance for weighted-random transition selection (`random` field on State). F266: per-SM isolation guarantees snapshot/restore reproduces the identical random sequence. |
| `stateApply` | SM layer state applier — materialised inside `stateMachine` compound expansion. Reads layer state from LayerAdvance, sets animation clip progress, applies state evaluation. |
| `timelineState` | SM-internal animation-state node — drives a TimelineNode from SM layer events. Materialised by the loader (`loader/utils.ts`); never user-authored. |

## Animation (10)

| Type | Description |
|------|-------------|
| `boneClipEval` | Per-animation bone-pose evaluator (F342) — emitted by the .fmtion converter / `deriveOpes` reactor for skeletal scenes. Evaluates an AnimationClip's bone tracks at progress and outputs an absolute pose AttributeBundle. Loader-emitted; never user-authored. |
| `carouselAutoplay` | Time-driven slideOffset for carousel auto-advancement. Pauses on hover (optional) and respects prefers-reduced-motion. |
| `carouselKeyboardNav` | Edge-triggered ArrowLeft/ArrowRight → cumulative iteration offset. Wire into SeamlessPlayhead.iteration to enable keyboard slide stepping. |
| `carouselSlideLocalTime` | Per-slide local-time for carousel tween semantics. slideProgress = clamp((playhead - slideIndex*spacing) mod loopDuration / duration, 0, 1). |
| `carouselWrapCounter` | Half-plane wrap detection with cooldown + 3-sample direction majority. Emits cumulative iteration for seamless carousel loops. |
| `clipRegistry` | Singleton scene-level publisher of AnimationClip references — emitted by `deriveOpes` reactor / FM Phase 12. One dynamic output port per clip (clip_${id}) carries the live AnimationClip reference. Replaces imperative TPN/OPE bind(clip) seams with port-routed clip identity. Never user-authored. |
| `objectClipEval` | Per-animation pose evaluator (non-SM path) — emitted by `deriveOpes` reactor, one per AnimationNode. Evaluates an AnimationClip's object tracks at progress and outputs an absolute pose AttributeBundle. Reads clip + rest from typed ports. Loader-emitted — never user-authored. |
| `seekRemap` | Joystick parameter→progress remapper — emitted by the .fmtion converter for source files using joystick seek bindings. Maps a raw parameter value into [0,1] progress for OPE/clip seek inputs. Loader-emitted; never user-authored. |
| `stateAnimEval` | F345: evaluates a single SM animation state's clip at progress and outputs a transforms map. Reads clip from a wired ClipRegistry port. The downstream StateTransformsMux selects the active state's output by currentStateId. Materialised inside `stateMachine` compound expansion (per state per role). |
| `stateTransformsMux` | F345: selects an SM layer's active state's transforms by id. Reads currentStateId from LayerAdvanceNode + per-state transforms from dynamic transforms_${stateId} input ports wired from per-state evaluator nodes; outputs the active state's transforms. Materialised inside `stateMachine` compound expansion (per layer per role). |

## Boundary (6)

| Type | Description |
|------|-------------|
| `boneRender` | Per-skeleton bone debug renderer — auto-emitted by `loader/phases/04-skeletons.ts` for every skeleton in the scene. Draws bone overlays in editor preview. Loader-emitted; never user-authored. |
| `layoutCompute` | Singleton WASM flex layout recompute + animated transitions terminal. Materialised by FM Phase 12 — never user-authored. |
| `maskClip` | F311: loader-generated clip-region resolver. Materialized from authored maskId references — not picked directly. Inputs: ancestorClips (fan-in for nested clips). Output: resolved ResolvedMaskClip bundle consumed by STN.clipPath. |
| `sceneRender` | Singleton renderer-agnostic scene boundary writer — draws all registered objects via Rust/WASM WebGL2. Materialised by FM Phase 10 — never user-authored. |
| `sceneTransform` | Per-object transform — reads from objectPose bundle by index, computes world matrix, writes to HeadlessObject |
| `staggerAnimate` | Runtime per-element keyframe-with-stagger writer. Resolves N elements at bind time from a plain CSS selector and applies a multi-channel keyframe template per element. Two driving modes: (1) shared scalar `progress` + `stagger * effectiveIndex(i)` translation (default — same model as the `staggerAnimation` compound), or (2) `progressArray` per-element fan-in (when wired, each element pulls its own progress directly — pair with `scrollTriggerEach` for "fire each element when ITS row enters viewport"). Out-of-range per-element progress holds first/last keyframe. Per-keyframe `valueFromCSS` / `colorFromCSS` reads each element's computed CSS custom property at bind time, so authors give different end values to different chars/items via per-element `--end-color` (etc.) without per-element node duplication. |

## Inputs (1)

| Type | Description |
|------|-------------|
| `pinAnchor` | F340 spacer + engine-handle owner. Sits topologically upstream of both ScrollTriggerNode and PinNode in the loader-emitted DAG. Binds the element, creates the spacer (PinEngine.setupIdle), publishes spacer flow position (flowTop/flowLeft/flowWidth/flowHeight) and the live engine handle. Anchor reads nothing back from trigger or pin — that's what breaks the scroll-trigger ↔ pin scheduler cycle. Loader-emitted; not authored directly. Filtered from the picker (`internal: true`) but visible in the graph view as a sibling of the trigger that emitted it. To wire FROM its outputs (e.g. `pinTargetFlowTop`, `pinTargetFlowBottom`, `scrollDistance`), reference it by its loader-emitted id `<scrollTriggerId>__pinAnchor` — e.g. a `scrollTrigger` with `id: "svcPin"` produces an anchor with `id: "svcPin__pinAnchor"`. |

## Attributes (1)

| Type | Description |
|------|-------------|
| `bundleRead` | Loader-emitted bundle accessor — bridges OPE/decompose pose bundles to STN scalar inputs by extracting a single float from an AttributeBundle by property name + index. Authored by FM Phase 12 / FVE BRN reactor. Never user-authored. |

## Skeleton (1)

| Type | Description |
|------|-------------|
| `bundleSource` | Singleton scene-rest-pose bundle publisher — emitted by `deriveSceneRestBundle`. Carries the dynamically-computed rest baseline used by APBs / multi-clip combiners. Loader-emitted — never user-authored. |

## Source of truth

Auto-generated from `faster-motion/src/core/NodeMetadata.ts` — every entry with `internal: true`. This page regenerates whenever the per-node tree does. New internals appear here automatically; types removed upstream disappear on the next regen.
