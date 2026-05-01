# Node Reference

All 281 graph node types available in Faster Motion.

For machine-readable data, see [`node-registry.json`](../node-registry.json).

## [Inputs](inputs/)

Nodes that read external signals into the graph: DOM events, mouse position, scroll progress, keyboard input, time, and other browser/device inputs.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Scroll Input](inputs/scrollInput.md) | `scrollInput` | dom | Scroll progress (0-1) from page scroll position |
| [Time Input](inputs/timeInput.md) | `timeInput` | shared | Elapsed time to normalized progress (0-1) |
| [Mouse Input](inputs/mouseInput.md) | `mouseInput` | dom | Pointer position (0-1) on selected axis |
| [Mouse Velocity](inputs/mouseVelocity.md) | `mouseVelocity` | dom | Per-frame pointer velocity. One node emits five outputs in parallel — wire whichever fits. |
| [Distance Input](inputs/distanceInput.md) | `distanceInput` | dom | Mouse distance to target (0 = at target, 1 = beyond radius) |
| [Drag Input](inputs/dragInput.md) | `dragInput` | dom | Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw. |
| [Scroll Event](inputs/scrollEvent.md) | `scrollEvent` | shared | F349 — edge-pulse detector on a 0..1 progress signal. Emits 1-frame pulses on threshold crossings: `entered` (forward across startThreshold), `left` (forward across endThreshold), `enteredBack` (backward across endThreshold), `leftBack` (backward across startThreshold). Pair with `pulseTween` and/or `parameterAction(set/toggle)` to recover trigger-mode toggleActions semantics, or with `parameterAction(set, amount=1)` on `entered` only to recover an observe-once latch. |
| [Scroll Trigger](inputs/scrollTrigger.md) | `scrollTrigger` | dom | Track an element's position relative to the scroll viewport — outputs progress (0..1), direction (±1), velocity (px/s), isInView (0/1), and pin geometry. Edges control when progress starts and ends, expressed as `<elementEdge> <viewportEdge>` pairs ("top bottom" = element top reaches viewport bottom; "bottom top" = element bottom reaches viewport top). When `pin: true` is authored, the loader emits a PinAnchor sibling and wires `flowTop` automatically so progress measures through the spacer rather than the pinned rect. |
| [Pin](inputs/pin.md) | `pin` | shared | F330/F340 pin engagement state machine. Reads engine handle (from sibling PinAnchorNode) + progress; runs the 3-state lifecycle: BEFORE (progress ≤ 0) = element natural inside spacer; PINNED (0 < progress < 1) = element position:fixed at viewport top; AFTER (progress ≥ 1) = element at bottom of spacer via padding-top. Spacer + handle ownership lives on PinAnchorNode (loader-emitted). Subsumes scrollPin. |
| [Pointer](inputs/pointer.md) | `pointer` | dom | Tracks pointer position over an element. One node emits all coordinate spaces in parallel — wire whichever output the consumer needs. |
| [Observer](inputs/observer.md) | `observer` | dom | Gesture detector — listens for wheel / touch / pointer / scroll events on a target and outputs accumulated deltas. Events accumulate internally until the magnitude crosses `tolerance`, at which point the per-frame `deltaX` / `deltaY` outputs spike to the gesture amount for one frame, then reset to 0 next frame. Pair with `thresholdPulse` to convert deltas into discrete pulses, then `pulseCounter` for snap navigation. |
| [Pulse Counter](inputs/pulseCounter.md) | `pulseCounter` | shared | Pulse-driven integer counter with optional wrap-around. Each rising edge of `pulse` advances `index` by `step`; rising edge of `reset` returns `index` to `start`. With `wrap` enabled, output is folded into `[start, start + max)` via positive modulo (negative steps wrap correctly too). The current `index` is published every frame; downstream consumers (`pulseRouter`, expressions, `parameterReadFloat`) read it like any other numeric source. |
| [Threshold Pulse](inputs/thresholdPulse.md) | `thresholdPulse` | shared | Edge-detector / pulse generator. Watches `value` and fires a single-frame `pulse` when it crosses `threshold`. `mode: edge` (default) fires once per crossing then suppresses until value drops below `threshold − hysteresis` and re-crosses (debounce). `mode: auto` fires periodically paced by `cooldownMs` for as long as value stays past threshold (metronome). `direction` selects rising-only / falling-only / both. Continuous comparator output `isAbove` is raw (1 while past threshold, 0 otherwise) — useful as a gate when you do not want pulse semantics. First-frame past-threshold does NOT fire (cold-start state-snap, prevents spurious init pulses). |
| [Latch](inputs/latch.md) | `latch` | shared | Sample-and-hold on rising-edge `pulse`. Captures the live `value` at the pulse moment and freezes it on `held`. |
| [Latch (2D)](inputs/latch2D.md) | `latch2D` | shared | Atomic sample-and-hold for a scalar X+Y pair. On rising-edge `pulse`, captures both axes from the SAME frame. |
| [Latch (Vec2)](inputs/latchVec2.md) | `latchVec2` | shared | Vec2 sample-and-hold. Both components captured atomically on the rising-edge `pulse`. See `latch` for the float variant. |
| [Pulse Router](inputs/pulseRouter.md) | `pulseRouter` | shared | Demultiplex one pulse to one of `count` output channels by integer `index`. Rising edge on `pulse` produces a single-frame spike on `out{Math.round(index)}`; out-of-range follows `defaultRoute` (set to -1 to drop). |
| [Indexed Dispatch](inputs/indexedDispatch.md) | `indexedDispatch` | shared | Edge dispatcher for an externally-owned integer index. Whenever `index` rises or falls to a different integer, fires a single-frame pulse pair: `exit_out{prev}` for the slot we leave and `enter_out{curr}` for the slot we enter. First evaluate fires only the initial enter (no prior slot exists). Sink-agnostic — routes pulses, not values. |
| [Accumulate Pulse](inputs/accumulatePulse.md) | `accumulatePulse` | shared | Integrates `value` per frame and emits a `pulse` each time the running total reaches `threshold`, then subtracts threshold from the accumulator (overshoot carries forward). `maxBacklog` clamps post-fire overshoot so a one-frame burst cannot queue an unbounded backlog. |
| [Random Index](inputs/randomIndex.md) | `randomIndex` | shared | Sister of `pulseCounter`: picks a random integer in [0, count) on each rising-edge `pulse`. Pair with `pulseRouter` for non-rhythmic dispatch where round-robin reads as too mechanical. Deterministic — uses a seeded mulberry32 PRNG so seek + replay produce identical sequences. |
| [Random Float](inputs/randomFloat.md) | `randomFloat` | shared | Picks a uniform random float in [`min`, `max`) on each rising-edge `pulse` and holds it until the next pulse. Wire into a tween's `to` for per-spawn variety (random rotation, scale variance, fall distance). |
| [Load Pulse](inputs/loadPulse.md) | `loadPulse` | shared | Fires a single-frame `pulse` on the first graph evaluation, then stays at 0 forever. The graph-native equivalent of "do this once at startup". Replaces the common hack of `(time > 0.05 ? 1 : 0)` expression + thresholdPulse rising-edge detector — that pattern silently failed because of thresholdPulse's cold-start rule (first-frame-above-threshold is NOT a rising edge). |
| [Direction Latch](inputs/directionLatch.md) | `directionLatch` | shared | Maintains a ±1 direction value, flipped to +1 on rising-edge `forward` or -1 on rising-edge `backward`. Outputs `direction` (signed) plus `forwardActive` / `backwardActive` (binary 0/1) for use as multipliers in direction-aware animation expressions. Replaces the pulseTween-of-duration-0.001s + sign-extracting expressions hack. |
| [Bidirectional Counter](inputs/bidirectionalCounter.md) | `bidirectionalCounter` | shared | Clamped integer counter with separate `increment` and `decrement` inputs. Counter never grows past `max` or below `min` — out-of-range pulses are silently absorbed inside the node, so the visible `value` always reflects bounds. Sister of `pulseCounter`, but bidirectional and clamped. Avoids the `cDn − cUp` two-counter-subtract hack and its over-scroll drift bug at boundaries. |
| [Pulse Delay](inputs/pulseDelay.md) | `pulseDelay` | shared | Fires `pulse` exactly `delay` seconds after a rising-edge `trigger`. Graph-native equivalent of `setTimeout(..., delay)`. Single-slot — additional triggers while a pulse is pending are absorbed (matches debounce / one-shot semantics). For per-trigger queuing, compose with `pulseCounter`. |
| [Pulse OR](inputs/pulseOr.md) | `pulseOr` | shared | Fires `pulse=1` for a single frame whenever ANY input pulse has a rising edge. Replaces the boilerplate `Math.max(node('a'), node('b'), …)` expression + thresholdPulse pair authors use to combine multiple trigger sources. |
| [Pulse Dispatch](inputs/pulseDispatch.md) | `pulseDispatch` | shared | One pulse in, one of N channels out per pulse. `strategy` picks the dispatch rule. Replaces the accumulator + counter + router triplet. |
| [Event Listener](inputs/eventListener.md) | `eventListener` | dom | DOM event to graph signal (click, hover, etc.) |
| [Keyboard Listener](inputs/keyboardListener.md) | `keyboardListener` | dom | Keyboard key press/release to graph signal |
| [Text Input](inputs/textInput.md) | `textInput` | canvas | Interactive text field with cursor and selection |
| [Hover](inputs/hover.md) | `hover` | shared | mouseenter/mouseleave with smooth 0→1 transition over duration. |
| [DOM Query Size](inputs/domQuerySize.md) | `domQuerySize` | shared | Counts DOM elements matching a CSS selector at bind time. Pairs with forEach-driven cluster math: feed `count` into a singleton expression that needs to know N (e.g. dock cluster bounds) so the graph-side N stays in lockstep with the DOM-side icon count — author no longer has to keep a hardcoded `N` in sync with the HTML. |
| [Distance](inputs/distance.md) | `distance` | shared | Mouse-to-element-rect proximity. Outputs 0 (far) to 1 (touching) with falloff. |
| [Scroll Progress](inputs/scrollProgress.md) | `scrollProgress` | dom | Outputs normalized scroll position [0, 1]. Drive text/instance animations from scroll. |
| [Mouse Progress](inputs/mouseProgress.md) | `mouseProgress` | shared | Outputs normalized mouse position [0, 1] relative to a target element or viewport. |
| [Keyframe Progress](inputs/keyframeProgress.md) | `keyframeProgress` | shared | Reads a parameter value and outputs it as progress. Wire from ParameterStoreNode or SM output for timeline-driven animations. |
| [Canvas Pointer](inputs/canvasPointer.md) | `canvasPointer` | shared | Canvas-level pointer event source — outputs normalized pointer position, down/up flags, and hold state. |
| [Bidirectional Snap](inputs/bidirectionalSnap.md) | `bidirectionalSnap` | shared | Self-contained wheel-driven discrete-step navigator. Bundles observer + threshold pulses + counter + direction latch + initial-load pulse + indexed dispatcher into one author-facing node. Outputs an integer `activeIdx` that wraps in [0, count), forward / backward latches for direction-aware reveals, and per-section enter / exit pulse pairs (`enter_out{i}`, `exit_out{i}`) fired on every `activeIdx` edge. Compound — expands at load to ~8 primitives. |

## [Animation](animation/)

Core animation primitives: timelines for playback control, tweens for A→B interpolation, keyframes for multi-stop curves, and stagger for per-element timing.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Scroll To](animation/scrollTo.md) | `scrollTo` | shared | F337 — animated scroll-to. Trigger-launched tween over the scroller's scrollTop. Resolves the target Y from a CSS selector (or "top" / "bottom") at trigger time, lerps from current scroll through the configured ease, outputs a `value` to feed a domPropertyWrite(scrollTop). Pure-graph; no imperative API. |
| [Bool Tween](animation/boolTween.md) | `boolTween` | shared | Smoothly tween a 0..1 progress toward a bool target over a fixed duration. Used to drive DOM animations from bool parameters (hover/click toggles). Emits linear progress so downstream multiKeyframe can carry the ease curve. |
| [Timeline](animation/timeline.md) | `timeline` | shared | Playback clock that emits a 0..1 `progress` over `duration` seconds. Self-advances when `autoplay`; can be externally driven by `play` / `pause` / `seek` pulses or a `progress` input. |
| [Seamless Playhead](animation/seamlessPlayhead.md) | `seamlessPlayhead` | shared | Pure-math playhead for seamless infinite loops. Maps progress + iteration to a rawSequence-equivalent playhead time; slideOffset nudges playhead by one spacing-unit per step (keyboard / autoplay step). |
| [Carousel Slide Local Time](animation/carouselSlideLocalTime.md) | `carouselSlideLocalTime` | shared | Per-slide local-time for carousel tween semantics. slideProgress = clamp((playhead - slideIndex*spacing) mod loopDuration / duration, 0, 1). |
| [Carousel Autoplay](animation/carouselAutoplay.md) | `carouselAutoplay` | shared | Time-driven slideOffset for carousel auto-advancement. Pauses on hover (optional) and respects prefers-reduced-motion. |
| [Carousel Keyboard Nav](animation/carouselKeyboardNav.md) | `carouselKeyboardNav` | shared | Edge-triggered ArrowLeft/ArrowRight → cumulative iteration offset. Wire into SeamlessPlayhead.iteration to enable keyboard slide stepping. |
| [Carousel Wrap Counter](animation/carouselWrapCounter.md) | `carouselWrapCounter` | shared | Half-plane wrap detection with cooldown + 3-sample direction majority. Emits cumulative iteration for seamless carousel loops. |
| [Pulse Tween](animation/pulseTween.md) | `pulseTween` | shared | A one-shot 0..1 clock driven by event pulses, not by input progress. Each input is rising-edge-detected: **`play`** advances toward 1, **`reverse`** advances toward 0, **`restart`** resets to 0 and plays forward, **`pause`** freezes the current value, **`resume`** un-freezes. Output `progress` is the eased 0..1 value; `playing` is 1 while advancing. The node OWNS the progress — distinct from the stateless `tween` interpolator (which is a pure function of an input progress source). Use this whenever a transition should be triggered by a discrete event rather than driven by a continuous external clock. |
| [Tween](animation/tween.md) | `tween` | shared | Stateless A→B interpolation with easing — pure function of `progress`. |
| [Keyframe](animation/keyframe.md) | `keyframe` | shared | Multi-stop interpolation with per-segment easing |
| [Stagger](animation/stagger.md) | `stagger` | shared | Per-element timing offset using Element Context (index, count) |
| [Color Tween](animation/colorTween.md) | `colorTween` | shared | Perceptually uniform color interpolation in OKLab space. Emits a packed `color` bundle for direct wiring, plus individual r/g/b channels for legacy consumers. |
| [Seek Remap](animation/seekRemap.md) | `seekRemap` | shared | Map a raw parameter value into [0,1] progress for TimelinePoseNode / ObjectPoseEvalNode seek bindings |
| [Clip Registry](animation/clipRegistry.md) | `clipRegistry` | shared | F342: graph-native publisher of AnimationClip references by id. One dynamic output port per clip (clip_${id}) carries the live AnimationClip reference. Replaces imperative TPN/OPE bind(clip) seams with port-routed clip identity. |
| [Bone Clip Eval](animation/boneClipEval.md) | `boneClipEval` | shared | F342: evaluates an AnimationClip's bone tracks at progress and outputs an absolute pose AttributeBundle. Replaces TimelinePoseNode. Reads clip from a wired ClipRegistry port and rest baseline from a wired SkeletonSource port — no imperative bind(clip). |
| [State Transforms Mux](animation/stateTransformsMux.md) | `stateTransformsMux` | shared | F345: selects an SM layer's active state's transforms by id. Reads currentStateId from LayerAdvanceNode + per-state transforms from dynamic transforms_${stateId} input ports wired from per-state evaluator nodes; outputs the active state's transforms. Replaces PoseEvalNode's imperative layer.getCurrentState().clip read. |
| [State Anim Eval](animation/stateAnimEval.md) | `stateAnimEval` | shared | F345: evaluates a single SM animation state's clip at progress and outputs a transforms map. Reads clip from a wired ClipRegistry port. The downstream StateTransformsMux selects the active state's output by currentStateId. Replaces PoseEvalNode's imperative state.clip read. |
| [Object Clip Eval](animation/objectClipEval.md) | `objectClipEval` | shared | F342: evaluates an AnimationClip's object tracks at progress and outputs an absolute pose AttributeBundle (per-object x/y/rotation/scale/opacity + extended scalar props + text strings). Replaces ObjectPoseEvalNode's Timeline-only bindClip path. Reads clip + rest from typed ports; no imperative bindClip. |
| [Color Keyframe](animation/colorKeyframe.md) | `colorKeyframe` | shared | Multi-stop color interpolation in OKLab space. Outputs a single `color` port (Color {r,g,b,a} 0-1 sRGB) that wires into a `domPoseWrite` color-typed property port. Keyframes are `{ time, value, ease? }` where value is a CSS color string. |
| [String Keyframe](animation/stringKeyframe.md) | `stringKeyframe` | shared | Multi-stop string interpolation — parses embedded numbers and interpolates each independently. For CSS strings (filter, boxShadow, gradients) where multiple numbers change together. |
| [Clip Path](animation/clipPath.md) | `clipPath` | shared | Keyframed polygon clip-path with structured point data. Interpolates between polygon keyframe stops — outputs typed ClipPathPoints for visual per-point editing in FVE. |
| [Multi Keyframe](animation/multiKeyframe.md) | `multiKeyframe` | shared | Multi-channel keyframe interpolation — one progress input, N float outputs with per-channel per-segment easing. Channels defined in params, output ports created dynamically. |
| [Property Animation](animation/propertyAnimation.md) | `propertyAnimation` | shared | Animate one or more CSS properties on a target element, driven by a 0..1 progress input. Compound: expanded into `multiKeyframe + domPoseWrite` at load time — no runtime class. |
| [Clip Path Animation](animation/clipPathAnimation.md) | `clipPathAnimation` | shared | Animate a CSS polygon() clip-path on a target element, driven by a 0..1 progress input. Each keyframe carries `values[]` (the polygon point coordinates). Compound: expanded into `clipPath + clipPathWrite` at load time — no runtime class. |
| [Carousel Effect Animation](animation/carouselEffectAnimation.md) | `carouselEffectAnimation` | shared | An entire seamlessPlayhead-driven carousel effect as one authoring node. Every slot shares the same animation template (channels) and the same slot-window size; only the slot's selector index and playhead-offset vary. Expands at load time into N `slideSlotAnimation` children (which further expand into `remap + mathUtil(fract) + multiKeyframe + domPoseWrite` primitives per slot). Use this when the carousel's N slots truly share one effect; if you need per-slot divergence, detach to individual `slideSlotAnimation` nodes. Compound: no runtime class. |
| [Slide Slot Animation](animation/slideSlotAnimation.md) | `slideSlotAnimation` | shared | A single slot in a seamlessPlayhead-driven carousel. Maps a per-slot window of the carousel playhead (e.g. [0.1, 1.1]) to a [0,1] slot-local progress (remap + fract), then animates CSS properties on the slot element via channels. One compound per slot collapses the canonical `remap + mathUtil(fract) + multiKeyframe + domPoseWrite` chain that every carousel effect repeats per slide. Compound: expanded into those four primitives at load time — no runtime class. |
| [Dock To Animation](animation/dockToAnimation.md) | `dockToAnimation` | shared | Dock a source DOM element onto a target DOM element, driven by a 0..1 progress input (0 = at rest, 1 = fully docked). Emits horizontal + vertical pixel offsets; authors route each offset to any CSS property via `channels`. Default maps offsetX → translateX(px) and offsetY → translateY(px) on the source element — override for axis-only docking, or to pipe the offset into marginLeft / mask-position / CSS custom vars / scale compensation, etc. Compound: expanded into `domDockTo + domPoseWrite` at load time — no runtime class. |
| [Indexed Dock Animation](animation/indexedDockAnimation.md) | `indexedDockAnimation` | shared | Docks a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. As progress advances from 0 → 1, the source jumps from child[0] → child[1] → … → child[count-1] in lockstep with `floor(progress × count)`. The dock measures children's `getBoundingClientRect()` at runtime and parks the source at the most-recently-revealed child's right edge (whitespace children are skipped automatically so cursor-style consumers don't freeze across word breaks). Authors route the computed `offsetX` to any horizontal-offset-driven CSS property via `channels` (default: `translateX` in px). Compound: expands at load time to `domIndexedDock + domPoseWrite` — no runtime class. |
| [Clip Path Reveal](animation/clipPathReveal.md) | `clipPathReveal` | shared | Bidirectional CSS clip-path inset reveal. Drives `--clip-top` and `--clip-bottom` CSS variables on `selector` from a 0..1 progress + a forward / backward direction pair, so `clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0)` rolls open from the bottom up on forward arrival and from the top down on backward arrival. Compound — expands at load to two expression nodes + two `domPropertyWrite` nodes. |
| [Section Alpha Gate](animation/sectionAlphaGate.md) | `sectionAlphaGate` | shared | Per-section alpha + z-index gate for layered scroll-snap or carousel slide patterns. Writes `--alpha` (0/1) and `--z` (activeZ / inactiveZ) on `selector` based on whether `myIdx` matches the current `activeIdx`. When `exitPlaying` is wired (typical), the section stays at alpha=1 throughout its own exit fade so the outgoing section doesn't snap to invisible the instant `activeIdx` flips. Compound — expands at load to two expression nodes + two `domPropertyWrite` nodes. |

## [Text](text/)

Text animation nodes: split text into characters/words/lines, per-character wave/fade/spring/skew/distort transforms, coverage ranges for reveal effects.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Text Split](text/textSplit.md) | `textSplit` | canvas | Split text into chars/words/lines with glyph metrics for per-element animation |
| [Scramble Compute](text/scrambleCompute.md) | `scrambleCompute` | dom | Per-character scramble effect — outputs original or random character. Convention: progress=1 fully scrambled, progress=0 fully revealed; per-char threshold derived from index/count so leftmost char reveals first. F336 adds `speed` (cycle-rate multiplier on the 16Hz baseline flicker) and `revealDelay` (hold-on-scramble fraction at the high-progress end before any chars resolve). `charset` accepts preset names (`upperCase`, `lowerCase`, `upperAndLowerCase`, `01`, `symbols`) or any literal string. |
| [Text Wave Compute](text/textWaveCompute.md) | `textWaveCompute` | shared | F256: Pure per-character wave sweep. Takes progress + upstream Mat4 bundle. schedulerPhase=pure, zero this.context access. |
| [Coverage Range](text/coverageRange.md) | `coverageRange` | shared | F356: Per-character coverage window with falloff ramps. Reads coverageTime from a wired AttributeBundle at slot bundle.objectIds.indexOf(objectId). |
| [Coverage Group](text/coverageGroup.md) | `coverageGroup` | shared | F356: Per-character transforms scaled by coverage values. Reads x/y/rotation/scaleX/scaleY/opacity from a wired AttributeBundle at slot bundle.objectIds.indexOf(objectId). Outputs Mat4TransformBundle. |
| [Coverage Group Bundle](text/coverageGroupBundle.md) | `coverageGroupBundle` | shared | F356: Author-facing compound for a coverage group + N coverage ranges with self-aligning bundle reads. Expands at load to one `coverageGroup` + N `coverageRange` primitives with a shared `bundle` connection — no `bundleRead` intermediaries. Compound: no runtime class. |
| [Text Apply](text/textApply.md) | `textApply` | canvas | Pure passthrough: forwards per-character Mat4 transforms to output port for SRN consumption. Follows SkinnedPathDeformNode pattern (F264). |
| [Split Text](text/splitText.md) | `splitText` | canvas | Setup-only DOM text splitter — wraps every word / character / line of the target element's text content in its own `<span>` so per-piece animations (rotateX, opacity, color, position) can target the pieces individually. Runs once at bind time; the spans persist for the page lifetime. Each span gets a class based on the split mode: `ft-split-word`, `ft-split-char`, or `ft-split-line` — use these in downstream selectors (e.g. `.headline .ft-split-char` for `staggerWrite`). |
| [Split Shape](text/splitShape.md) | `splitShape` | shared | Setup-only DOM shape splitter — fractures the path / polygon source shapes inside an `<svg>` into N polygon fragments at bind time, so per-piece animations (translate, rotate, scale, opacity) can target the pieces individually. Runs once: rejection-samples points inside the source-fill region, tessellates with d3-delaunay's Voronoi, boolean-intersects each cell with the union of source paths via `polygon-clipping` so adjacent pieces share their edges exactly (no gaps or overlap). Each fragment gets the class `ft-shatter-piece`. Mirror to `splitText`, but for SVG geometry — drop in any 2-path logo and shatter it into ~100 deterministic pieces without manually pre-fragmenting in a vector editor. |
| [Counter](text/counter.md) | `counter` | shared | Animated number counter — interpolates min→max with formatting (decimals, separator, template). |
| [Text Sequence](text/textSequence.md) | `textSequence` | canvas | Cycles through a string array based on progress — outputs current text and index. The `texts` input port takes priority over the static `texts` param when wired (from textDecompose or any stringArray source), so the node composes with upstream text-data transforms without losing back-compat for .fmtion files that bake in a static array. |
| [Text Reveal](text/textRevealAnimation.md) | `textRevealAnimation` | shared | Compound — progressively reveals text by character, word, sentence, or line, driven by a progress input. DOM-first: the translatable source lives in the HTML, the .fmtion carries only the animation recipe. `sourceFrom: element` (DEFAULT) reads `selector`.textContent at bind time. `sourceFrom: elements` reads textContent from every element matching `sourcesSelector` and cycles through them in document order (multi-word typewriter). `sourceFrom: param` is an escape hatch for non-translatable copy — prefer element/elements for anything user-facing. Default (char + prefixes + includeEmpty) gives classic typewriter; switch granularity for word/sentence/line reveals under the same node type. OPTIONAL `channels` + `variants` (same shape as variantStaggerAnimation) declare per-source side effects — e.g. a `color` channel with three hex values cycles the color at actual word boundaries regardless of word length or language. Each channel expands to one arrayPick + one writer; no more authoring colorKeyframe with hand-tuned times that drift across languages. |
| [String Array Pick](text/stringArrayPick.md) | `stringArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a string. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback string returned when the resolved array is empty. |
| [String Array Concat](text/stringArrayConcat.md) | `stringArrayConcat` | shared | Pure data transform. Concatenates up to N stringArray inputs (in0..inN-1, default 8) into a single flat stringArray output. Complement to textDecompose for multi-source typewriter-style graphs: each source goes through its own textDecompose; this node stitches the per-source items[] into one indexable stream for textSequence. Unwired ports contribute nothing (default = empty array) so the node is safe to serialize with fewer connections than ports. |
| [Text Decompose](text/textDecompose.md) | `textDecompose` | shared | Pure text-data transform. Splits one or more source strings into an array of strings by granularity (char/word/sentence/line) and optionally reshapes into a cumulative pyramid (prefixes/suffixes). Decouples the data-shape problem from animation — feed items[] into textSequence, variantStagger, or any index-driven consumer. Example: granularity=char, shape=prefixes on "Sunny" → ["S","Su","Sun","Sunn","Sunny"] (classic typewriter). Input precedence (highest wins): `sources` stringArray port (multi-source — typically wired from domStringArrayRead for i18n cycles), `sources` string[] param, `text` string port (single-source wire), `text` string param. Multi-source mode decomposes each entry and concatenates — one graph chain types through every word in order. Emits a parallel `itemSources: floatArray` output that tags each item with its source index — lets downstream nodes drive per-source side effects (per-word colors, opacities, etc.) without re-deriving boundaries. |
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
| [Text Stagger Animation](text/textStaggerAnimation.md) | `textStaggerAnimation` | shared | Splits a text element into chars / words / lines and animates each piece from a single 0..1 progress signal with staggered start times. One authoring node replaces the splitText + per-piece tween chain. Channels are author-friendly `{from, to, ease, unit}` ranges (numeric) or CSS-fragment ranges (`blur(16px) → blur(0px)`, `inset(0 100% 0 0) → inset(0 0% 0 0)` — the runtime tokenizes numeric tokens and lerps each independently). Compound: expands at load time to `splitText` + 1× `staggerWrite` (continuous mode) — runtime stays at 2 nodes regardless of piece count. Discrete mode (instant flip per piece, typewriter-style) falls back to `splitText` + N× `propertyAnimation` and requires `count` (since N keyframe-shaped children must be emitted up front). `totalStagger` is the fraction of progress consumed by spreading start times across pieces; runtime reads piece count dynamically from splitText, so editing the heading text does not require a graph edit. |
| [Stagger Animation](text/staggerAnimation.md) | `staggerAnimation` | shared | Fan a single animation template across N indexed DOM elements with per-child stagger offsets. Selector template uses `{i}` as the per-child index placeholder (e.g. `.card:nth-child({i})`, `.dot[data-i="{i}"]`). Inner `each` is a propertyAnimation template — keyframes get shifted into each child's slot window at load time. Generic counterpart to F323 textStaggerAnimation (which is splitText-specific); use this for pre-existing DOM elements like card grids, list items, icon rows, dot indicators, wave / ripple effects. Compound: expands into N× propertyAnimation at load time (fixed-point loop then expands each to mk+pw) — no runtime class. |
| [Variant Stagger Animation](text/variantStaggerAnimation.md) | `variantStaggerAnimation` | shared | Fan a compound across N indexed DOM elements where each child has UNIQUE from/to values on shared channels. Per-child variation sibling of F324 staggerAnimation (which requires uniform values). Use for mouse-driven dispersals, hover-chaos grids, card-spread layouts, per-icon flutter — any "N siblings, same channels, different ranges". Compound: expands into N× propertyAnimation at load time (fixed-point loop then expands each to mk+pw). |
| [Text Scramble Animation](text/textScrambleAnimation.md) | `textScrambleAnimation` | shared | Scramble a single character — cycles through a charset and settles on the original, driven by a 0..1 progress input. Authors pick one or more string write targets via `channels` (textContent, attribute like aria-label / title / data-*, CSS style property, CSS custom var). Compound: expands to `scrambleCompute` + one `domStringWrite` per channel at load time — no runtime class. |

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
| [Timeline State](state-machine/timelineState.md) | `timelineState` | canvas | Animation state node — drives a TimelineNode from state machine layer events. |
| [Remap Apply](state-machine/remapApply.md) | `remapApply` | canvas | Side-effect node for nested artboard remap bindings — ordering anchor between SM writes and downstream coverage reads. |
| [SM Parameter Store](state-machine/smParameterStore.md) | `smParameterStore` | canvas | Declarative parameter store — one dynamic output port per SM parameter. Receives writes from listeners, drivers, and audio bindings. |
| [Layer Advance](state-machine/layerAdvance.md) | `layerAdvance` | canvas | Per-layer state machine solver — evaluates conditions, advances transitions, outputs current/previous state progress and weights. |
| [State Apply](state-machine/stateApply.md) | `stateApply` | canvas | Reads layer state from LayerAdvanceNode, sets animation clip progress and applies state evaluation. |
| [Blend Space 1D Eval](state-machine/blendSpace1DEval.md) | `blendSpace1DEval` | canvas | F266 Phase 3: pure 1D blend space evaluator. Wraps evaluateBlend1DTransforms(). Inputs: inputValue (axis parameter), progress. Output: per-object transform map blended between adjacent animations. |
| [Blend Direct Eval](state-machine/blendDirectEval.md) | `blendDirectEval` | canvas | F266 Phase 3: pure direct-blend evaluator. Wraps evaluateBlendDirectTransforms(). Per-animation weight inputs (weight_<id>) drive sequential blend-on-top. Weights from parameters use normalized scale (value/100, clamped 0..1). |
| [Blend Space 2D Eval](state-machine/blendSpace2DEval.md) | `blendSpace2DEval` | canvas | F359 Phase 8: 2D blend space evaluator. Pulls clips from dynamic clip_${animationId} input ports and produces transforms via Delaunay+barycentric (interpolated) or nearest-point (discrete). Grid mode publishes integer frame index on the frameIndex output port. |
| [Reset Map](state-machine/resetMap.md) | `resetMap` | canvas | Applies animation reset maps during state transitions — properties animated by only one state get reset values during crossfade. |
| [SM Hit Test](state-machine/smHitTest.md) | `smHitTest` | canvas | Translates pointer events + hit object IDs into per-target HitResult map for listener evaluation. |
| [Listener Action](state-machine/listenerAction.md) | `listenerAction` | canvas | Routes listener actions into parameter writes (for SMParameterStoreNode) and side-effect actions (for audio/callback nodes). |
| [SM Audio Action](state-machine/smAudioAction.md) | `smAudioAction` | canvas | Terminal node for audio side effects — owns HTMLAudioElement cache, handles play/pause/stop actions. |
| [SM Callback Action](state-machine/smCallbackAction.md) | `smCallbackAction` | canvas | Terminal node for stateless one-shot callbacks — dispatches switchCamera, setSkin, openUrl, fireEvent, animationAction. |
| [SM Post Advance](state-machine/smPostAdvance.md) | `smPostAdvance` | canvas | Post-advance coordinator — trigger consumption, reset maps application, solver reset signal. Runs after all layers complete. |
| [SM Lifecycle](state-machine/smLifecycle.md) | `smLifecycle` | shared | Owns the running/stopped state for one state machine. Reads `shouldRun` from the auto-start or external lifecycle source, emits `isRunning` for downstream layer/state nodes. Also the snapshot/restore boundary for hot-reload (F266): stores the full SM execution state (clock, current state ids, clip start times, RNG seed) and reapplies it after a graph rebuild so reloads preserve in-flight animation. |
| [SM Auto Start](state-machine/smAutoStart.md) | `smAutoStart` | shared | Auto-start latch for a state machine. Defaults `shouldRun` to 1 on construction so the SM begins running on the first frame. `stop()` flips the internal latch to 0, producing a falling edge on `SMLifecycleNode.shouldRun`. The reverse signal (start after stop) lives on the parameter / listener side. |
| [SM Random Source](state-machine/smRandomSource.md) | `smRandomSource` | shared | Per-SM deterministic Mulberry32 PRNG used by `LayerAdvanceNode` for weighted-random transition selection. Hot path is direct method call (`nextFloat()`) inside the layer's instant-chain inner loop; the `random` output port is updated each frame for FVE display only. Per-SM isolation guarantees that snapshotting one SM and restoring it later produces the identical random sequence regardless of what other SMs consumed in between (F266). |
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
| [DOM Property Write](boundary/domPropertyWrite.md) | `domPropertyWrite` | dom | Write a float value to a single CSS property, transform component, data-attribute, scrollTop/scrollLeft, or textContent on a DOM element. Single-property sibling of `domPoseWrite` — use this when you need to drive ONE value (CSS variable, opacity, scrollTop, etc.); use `domPoseWrite` when you need a batched transform pose (translate / scale / rotate / skew). Custom properties (CSS variables like `--bento-col`) work — pass the full `--name` as the Property field; the runtime calls `el.style.setProperty(name, value + unit)`. |
| [DOM Variables Write](boundary/domVariablesWrite.md) | `domVariablesWrite` | shared | Batched CSS-custom-property writer with per-variable remap built in. Takes a single shared input value and fans it out to N CSS variables (`--foo`) on one element, with each variable carrying its own input/output range, unit, easing curve, and clamp. Replaces the common `1 source → N remap → N domPropertyWrite` chain — collapses to a single node in author view. |
| [Stagger Write](boundary/staggerWrite.md) | `staggerWrite` | dom | Batched per-element stagger writer, multi-channel. One node animates N CSS properties across the elements matching a selector, with a shared per-element stagger window. F358: each property is one channel in the `channels` map — add as many as you want (e.g. `rotateX` + `color` + `opacity`) and they all share the same selector, totalStagger, staggerOrder, and progress driver. Replaces the older "two staggerWrites with the same selector and one property each" pattern with a single node. |
| [DOM Dock To](boundary/domDockTo.md) | `domDockTo` | shared | Compute additive translate that centers a source DOM element over a target element, scaled by a 0..1 blend. Wire outputs into a domPoseWrite translateX/translateY. |
| [DOM Indexed Dock](boundary/domIndexedDock.md) | `domIndexedDock` | shared | Dock a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. Sibling to domDockTo (which docks onto a static target). Used for typewriter cursors, scanning highlights, focus rings, and any "park X on the active item in a sequence" effect. |
| [DOM String Write](boundary/domStringWrite.md) | `domStringWrite` | dom | Write a string value to a DOM element (CSS, SVG attribute, textContent) |
| [DOM Stage Preset](boundary/domStagePreset.md) | `domStagePreset` | shared | One-shot mount-time CSS writer: perspective / transformStyle on the stage, transformOrigin per slide. Used by the carousel mount-time setup. |
| [Scene Transform](boundary/sceneTransform.md) | `sceneTransform` | canvas | Per-object transform — reads from objectPose bundle by index, computes world matrix, writes to HeadlessObject |
| [Object Property Read](boundary/objectPropertyRead.md) | `objectPropertyRead` | canvas | Read a runtime object property (bidirectional binding read side). |
| [Layout Compute](boundary/layoutCompute.md) | `layoutCompute` | canvas | WASM flex layout recompute + animated transitions. |
| [Mask Sync](boundary/maskSync.md) | `maskSync` | canvas | Mask transform synchronization — world-space mask geometry from source objects. |
| [Camera](boundary/camera.md) | `camera` | canvas | 2D camera — zoom, pan, rotation, parallax, DOF, color effects, tint, vignette. |
| [Switch Gate](boundary/switchGate.md) | `switchGate` | shared | Gates parentVisible for one child of a displayMode:switch group. Internal loader-generated node. |
| [Clip Path Write](boundary/clipPathWrite.md) | `clipPathWrite` | shared | Serializes ClipPathPoints to CSS polygon() and writes to target element clip-path. Dirty-checks the serialized string to skip redundant DOM writes. |
| [DOM Pose Write](boundary/domPoseWrite.md) | `domPoseWrite` | shared | Boundary node: writes one or more float values to CSS properties on a target DOM element. Pick which properties to expose via the picker — each becomes an input port wired from upstream tweens / latches / math. |
| [DOM Attribute Read](boundary/domAttributeRead.md) | `domAttributeRead` | shared | Reads a DOM value from an element at bind time and outputs it as a string. `readMode: attribute` (default) reads via getAttribute — SVG d/viewBox/points, data-* attributes, aria-* attributes. `readMode: textContent` reads el.textContent — used for i18n-friendly text animations where the translatable string lives in the DOM. Static read. Boundary counterpart to DOMStringWriteNode. |
| [DOM String Array Read](boundary/domStringArrayRead.md) | `domStringArrayRead` | shared | Reads textContent (or an attribute) from EVERY element matching a selector, emits the results as a stringArray. Purpose: i18n-friendly multi-source text animations — the HTML owns every translatable string, the .fmtion carries only the recipe. Static read at bind time via querySelectorAll; document-order matches. |
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
| [Morph Path Animation](paths/morphPathAnimation.md) | `morphPathAnimation` | shared | Interpolate an SVG path element from its current d attribute toward a target d, driven by a 0..1 progress input. One authoring node replaces the canonical chain `domAttributeRead(d) → morphCompute(fromPath ← read, toPath) → domPoseWrite(d)` that every SVG morph repeats. Compound: expanded into those three primitives at load time — no runtime class. |

## [Math](math/)

Pure compute nodes: remap ranges, math expressions, utility operations (abs, clamp, round), smoothing, parallax offset, velocity calculation, string operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Remap](math/remap.md) | `remap` | shared | Map a value from one range to another with optional curve |
| [Expression](math/expression.md) | `expression` | shared | Evaluate a JavaScript math expression |
| [Converter](math/converter.md) | `converter` | shared | Value transformation (stringFormat, colorLerp, enumMap, conditional, math) |
| [Snap Float](math/snapFloat.md) | `snapFloat` | shared | F349 — snap an input float to the nearest of N configured values. Optional `smooth > 0` exponentially eases toward the target snap, frame-rate independent (gives ScrollTrigger-style "magnetic" snap behavior). Empty `values` array = passthrough. Linear nearest-neighbor scan; designed for small value lists (≤ 16). |
| [Smoothing](math/smoothing.md) | `smoothing` | shared | Frame-rate-independent exponential smoothing on any float signal. The output eases toward the input value at a rate controlled by `smooth` — pass-through at `0` (or below), near-instant at `10`. Useful for taking a noisy / step-y / discrete signal (gate flicks, scroll-velocity, mouse position) and producing a damped, animation-ready curve. |
| [Gate](math/gate.md) | `gate` | shared | Blend a driven value toward a rest value under a 0..1 gate, with optional spring-smoothed threshold crossings |
| [Parallax](math/parallax.md) | `parallax` | shared | Convert scroll progress to parallax pixel offset |
| [Velocity](math/velocity.md) | `velocity` | shared | Compute smoothed rate-of-change of any float signal |
| [Math Utility](math/mathUtil.md) | `mathUtil` | shared | Single Float→Float math operation. Picks unary (`abs`, `round`, `sqrt`, ...) or binary (`add`, `subtract`, `multiply`) ops; binary ops use `value` + `b`. Range ops (`clamp`, `normalize`) use `value` + `min` + `max`. |
| [String Op](math/stringOp.md) | `stringOp` | shared | Typed String→String operation (uppercase, trim, replace, template, etc.). |
| [String Equals](math/stringEquals.md) | `stringEquals` | shared | F316: Outputs 1 when both string inputs are non-null and strictly equal, 0 otherwise. Null/undefined always evaluates to 0 (fail-safe). `b` input accepts a literal via setLiteralB() when unwired. |
| [Phase Shift](math/phaseShift.md) | `phaseShift` | shared | Per-clone phase shift of a shared 0..1 progress signal. Computes `(progress + index/count) % 1`, wrapping the result into [0, 1) so it can drive any node that consumes a normalized progress (staggerWrite, multiKeyframe, propertyAnimation). Replaces the inline `((node('progress') + ($index / node('count'))) % 1)` expression that recurs in any forEach-instanced template that needs each clone to ride a different phase of one shared clock. |
| [Float Array Pick](math/floatArrayPick.md) | `floatArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a float. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback float returned when the resolved array is empty. Pair with textDecompose.itemSources (or any float-array source) to drive per-index side effects. |
| [Color Array Pick](math/colorArrayPick.md) | `colorArrayPick` | shared | Pure picker — emits `array[floor(index)]` as a Color. Index is clamped to [0, length-1]. Hex-string `values` param is parsed to Color at load time (zero parse cost on hot path). Used to drive a current-color output from a per-variant palette; pair with textReveal\s sourceIndex or variantStagger\s per-child index. |

## [Skeleton](skeleton/)

Bone and skeleton rigging: per-bone FK transforms, IK solvers, bone collectors, spring/jiggle bone physics, chain dynamics, and FK recomposition.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Skeleton Source](skeleton/skeletonSource.md) | `skeletonSource` | shared | Graph-native publisher of a Skeleton's rest pose. Loader calls bind(skeleton) once; the source pulls the rest bundle from skeleton.getRestBundle() (snapshot captured by skeleton.markRest() before IK solves). Output flows to APB.restBaseline / rig pose boundary through typed edges. |
| [Bundle Source](skeleton/bundleSource.md) | `bundleSource` | shared | Graph-native publisher of an externally-built AttributeBundle. Used for scene-level multi-clip APBs whose rest baseline is computed dynamically (no Skeleton involved). Caller (scene-subgraph) calls bind(bundle) at synthesis time. |
| [Rest Pose Bone](skeleton/restPoseBone.md) | `restPoseBone` | shared | Per-bone pure-FK node — reads pose at boneIndex, computes pre-override world matrix from parent. Paired with boneTransform. |
| [Bone Transform](skeleton/boneTransform.md) | `boneTransform` | canvas | Per-bone override-apply node — reads rest scalars from sibling restPoseBone, applies override/additive/constraintXform, outputs post-override world matrix |
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
| [Draggable](constraints/draggable.md) | `draggable` | shared | Wrap a DOM element or canvas object as draggable, with optional inertia. Outputs current position + drag state + velocity, suitable for driving any downstream graph node. Set `direction` to lock to an axis. |
| [Scroll Constraint](constraints/scroll.md) | `scroll` | shared | Scrollable container with bounds and momentum |
| [Scroll Bar](constraints/scrollBar.md) | `scrollBar` | shared | Scroll bar indicator that tracks scroll position |
| [Path Follow](constraints/pathFollow.md) | `pathFollow` | shared | Follow a path curve at given progress |

## [Procedural](procedural/)

Time-driven procedural generators: wiggle, noise, oscillator, spring physics, modulate, ring delay, random values, and stagger drivers.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Inertia](procedural/inertia.md) | `inertia` | shared | F334 — exponential-decay tween. Animates a value from `from` under throw physics with a starting velocity. Optional snap targets land the natural rest position on the nearest snap value while preserving the decel curve. Use as a standalone "throw a property" driver independent of drag. |
| [Physics 2D](procedural/physics2D.md) | `physics2D` | shared | F335 — single-body 2D ballistic motion. Rising-edge `trigger` launches a body from origin at `velocity` in direction `angle°`, integrates Verlet under constant `gravity` + exponential `friction`. Outputs current `(x, y)` and `(vx, vy)` so downstream graph nodes can drive position, rotation-from-velocity, fade-by-speed, etc. Auto-stops after `duration` seconds. |
| [Wiggle](procedural/wiggle.md) | `wiggle` | shared | AE-style wiggle noise — random displacement |
| [Noise](procedural/noise.md) | `noise` | shared | Multi-octave simplex noise |
| [Spring](procedural/spring.md) | `spring` | shared | Damped spring physics — smooth follow with overshoot. Defaults to replace composition (spring IS the value). |
| [Oscillator](procedural/oscillator.md) | `oscillator` | shared | Periodic wave generator (sine, triangle, square, sawtooth) |
| [Modulate](procedural/modulate.md) | `modulate` | shared | Remap value through a piecewise-linear curve. Defaults to replace composition. |
| [Ring (Delay)](procedural/ring.md) | `ring` | shared | Ring buffer delay — output a past value. Defaults to replace composition. |
| [Random](procedural/random.md) | `random` | shared | Seeded random value per frame. Uniform or gaussian distribution. |
| [Stagger Driver](procedural/staggerDriver.md) | `staggerDriver` | shared | Index-based wave propagation. Uses ForEach element context for per-instance offset. |

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

