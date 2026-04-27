# Inputs Nodes

Nodes that read external signals into the graph: DOM events, mouse position, scroll progress, keyboard input, time, and other browser/device inputs.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Scroll Input](scrollInput.md) | `scrollInput` | dom | Scroll progress (0-1) from page scroll position |
| [Time Input](timeInput.md) | `timeInput` | shared | Elapsed time to normalized progress (0-1) |
| [Mouse Input](mouseInput.md) | `mouseInput` | dom | Pointer position (0-1) on selected axis |
| [Mouse Velocity](mouseVelocity.md) | `mouseVelocity` | dom | Per-frame pointer velocity. One node emits five outputs in parallel — wire whichever fits. |
| [Distance Input](distanceInput.md) | `distanceInput` | dom | Mouse distance to target (0 = at target, 1 = beyond radius) |
| [Drag Input](dragInput.md) | `dragInput` | dom | Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw. |
| [Scroll Event](scrollEvent.md) | `scrollEvent` | shared | F349 — edge-pulse detector on a 0..1 progress signal. Emits 1-frame pulses on threshold crossings: `entered` (forward across startThreshold), `left` (forward across endThreshold), `enteredBack` (backward across endThreshold), `leftBack` (backward across startThreshold). Pair with `pulseTween` and/or `parameterAction(set/toggle)` to recover trigger-mode toggleActions semantics, or with `parameterAction(set, amount=1)` on `entered` only to recover an observe-once latch. |
| [Scroll Trigger](scrollTrigger.md) | `scrollTrigger` | dom | Track element visibility during scroll — outputs progress, direction, velocity, isInView, and pin geometry (pinTopOffset) consumed by PinNode. When `pin: true` is authored, the loader wires PinAnchorNode.flowTop into the optional `flowTop` input so progress measures through the spacer (flow position) rather than the pinned element's viewport rect. |
| [Pin](pin.md) | `pin` | shared | F330/F340 pin engagement state machine. Reads engine handle (from sibling PinAnchorNode) + progress; runs the 3-state lifecycle: BEFORE (progress ≤ 0) = element natural inside spacer; PINNED (0 < progress < 1) = element position:fixed at viewport top; AFTER (progress ≥ 1) = element at bottom of spacer via padding-top. Spacer + handle ownership lives on PinAnchorNode (loader-emitted). Subsumes scrollPin. |
| [Pointer](pointer.md) | `pointer` | dom | Tracks pointer position over an element. One node emits all coordinate spaces in parallel — wire whichever output the consumer needs. |
| [Observer](observer.md) | `observer` | dom | Detect gestures (wheel, touch, pointer, scroll) — outputs deltas |
| [Pulse Counter](pulseCounter.md) | `pulseCounter` | shared | Pulse-driven integer counter with optional wrap. Each rising edge of `pulse` advances `index` by `step`; rising edge of `reset` returns `index` to `start`. With `wrap=true`, output is folded into [start, start+max) via positive modulo (so negative steps wrap correctly). |
| [Threshold Pulse](thresholdPulse.md) | `thresholdPulse` | shared | Emits a single-frame pulse when `value` crosses `threshold`. `mode` chooses semantics: `edge` (default) fires once per crossing then suppresses until value drops below `threshold - hysteresis` and re-crosses; `auto` fires periodically paced by `cooldownMs` for as long as value stays past threshold. `direction` selects rising / falling / both. Continuous comparator output `isAbove` is raw (not gated). First-frame above-threshold does NOT fire (cold-start state-snap). |
| [Latch](latch.md) | `latch` | shared | Sample-and-hold on rising-edge `pulse`. Captures the live `value` at the pulse moment and freezes it on `held`. |
| [Latch (2D)](latch2D.md) | `latch2D` | shared | Atomic sample-and-hold for a scalar X+Y pair. On rising-edge `pulse`, captures both axes from the SAME frame. |
| [Latch (Vec2)](latchVec2.md) | `latchVec2` | shared | Vec2 sample-and-hold. Both components captured atomically on the rising-edge `pulse`. See `latch` for the float variant. |
| [Pulse Router](pulseRouter.md) | `pulseRouter` | shared | Demultiplex one pulse to one of `count` output channels by integer `index`. Rising edge on `pulse` produces a single-frame spike on `out{Math.round(index)}`; out-of-range follows `defaultRoute` (set to -1 to drop). |
| [Accumulate Pulse](accumulatePulse.md) | `accumulatePulse` | shared | Integrates `value` per frame and emits a `pulse` each time the running total reaches `threshold`, then subtracts threshold from the accumulator (overshoot carries forward). `maxBacklog` clamps post-fire overshoot so a one-frame burst cannot queue an unbounded backlog. |
| [Random Index](randomIndex.md) | `randomIndex` | shared | Sister of `pulseCounter`: picks a random integer in [0, count) on each rising-edge `pulse`. Pair with `pulseRouter` for non-rhythmic dispatch where round-robin reads as too mechanical. Deterministic — uses a seeded mulberry32 PRNG so seek + replay produce identical sequences. |
| [Random Float](randomFloat.md) | `randomFloat` | shared | Picks a uniform random float in [`min`, `max`) on each rising-edge `pulse` and holds it until the next pulse. Wire into a tween's `to` for per-spawn variety (random rotation, scale variance, fall distance). |
| [Pulse Dispatch](pulseDispatch.md) | `pulseDispatch` | shared | One pulse in, one of N channels out per pulse. `strategy` picks the dispatch rule. Replaces the accumulator + counter + router triplet. |
| [Event Listener](eventListener.md) | `eventListener` | dom | DOM event to graph signal (click, hover, etc.) |
| [Keyboard Listener](keyboardListener.md) | `keyboardListener` | dom | Keyboard key press/release to graph signal |
| [Text Input](textInput.md) | `textInput` | canvas | Interactive text field with cursor and selection |
| [Hover](hover.md) | `hover` | shared | mouseenter/mouseleave with smooth 0→1 transition over duration. |
| [DOM Query Size](domQuerySize.md) | `domQuerySize` | shared | Counts DOM elements matching a CSS selector at bind time. Pairs with forEach-driven cluster math: feed `count` into a singleton expression that needs to know N (e.g. dock cluster bounds) so the graph-side N stays in lockstep with the DOM-side icon count — author no longer has to keep a hardcoded `N` in sync with the HTML. |
| [Distance](distance.md) | `distance` | shared | Mouse-to-element-rect proximity. Outputs 0 (far) to 1 (touching) with falloff. |
| [Scroll Progress](scrollProgress.md) | `scrollProgress` | dom | Outputs normalized scroll position [0, 1]. Drive text/instance animations from scroll. |
| [Mouse Progress](mouseProgress.md) | `mouseProgress` | shared | Outputs normalized mouse position [0, 1] relative to a target element or viewport. |
| [Keyframe Progress](keyframeProgress.md) | `keyframeProgress` | shared | Reads a parameter value and outputs it as progress. Wire from ParameterStoreNode or SM output for timeline-driven animations. |
| [Canvas Pointer](canvasPointer.md) | `canvasPointer` | shared | Canvas-level pointer event source — outputs normalized pointer position, down/up flags, and hold state. |
