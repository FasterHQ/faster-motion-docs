# Inputs Nodes

Nodes that read external signals into the graph: DOM events, mouse position, scroll progress, keyboard input, time, and other browser/device inputs.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Scroll Input](scrollInput.md) | `scrollInput` | dom | Scroll progress (0-1) from page scroll position |
| [Time Input](timeInput.md) | `timeInput` | shared | Elapsed time to normalized progress (0-1) |
| [Mouse Input](mouseInput.md) | `mouseInput` | dom | Pointer position (0-1) on selected axis |
| [Mouse Velocity](mouseVelocity.md) | `mouseVelocity` | dom | Pointer velocity magnitude (-1 to 1) |
| [Distance Input](distanceInput.md) | `distanceInput` | dom | Mouse distance to target (0 = at target, 1 = beyond radius) |
| [Drag Input](dragInput.md) | `dragInput` | dom | Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw. |
| [Scroll Trigger](scrollTrigger.md) | `scrollTrigger` | dom | Track element visibility during scroll — outputs progress, direction, velocity, isInView, and pin geometry (pinTopOffset) consumed by PinNode. When `pin: true` is authored, the loader wires PinAnchorNode.flowTop into the optional `flowTop` input so progress measures through the spacer (flow position) rather than the pinned element's viewport rect. |
| [Pin](pin.md) | `pin` | shared | F330/F340 pin engagement state machine. Reads engine handle (from sibling PinAnchorNode) + progress; runs the 3-state lifecycle: BEFORE (progress ≤ 0) = element natural inside spacer; PINNED (0 < progress < 1) = element position:fixed at viewport top; AFTER (progress ≥ 1) = element at bottom of spacer via padding-top. Spacer + handle ownership lives on PinAnchorNode (loader-emitted). Subsumes scrollPin. |
| [Pointer](pointer.md) | `pointer` | dom | Track pointer position — outputs x, y, normalized, isInside |
| [Observer](observer.md) | `observer` | dom | Detect gestures (wheel, touch, pointer, scroll) — outputs deltas |
| [Event Listener](eventListener.md) | `eventListener` | dom | DOM event to graph signal (click, hover, etc.) |
| [Keyboard Listener](keyboardListener.md) | `keyboardListener` | dom | Keyboard key press/release to graph signal |
| [Text Input](textInput.md) | `textInput` | canvas | Interactive text field with cursor and selection |
| [Hover](hover.md) | `hover` | shared | mouseenter/mouseleave with smooth 0→1 transition over duration. |
| [Distance](distance.md) | `distance` | shared | Mouse-to-element-rect proximity. Outputs 0 (far) to 1 (touching) with falloff. |
| [Scroll Progress](scrollProgress.md) | `scrollProgress` | dom | Outputs normalized scroll position [0, 1]. Drive text/instance animations from scroll. |
| [Mouse Progress](mouseProgress.md) | `mouseProgress` | shared | Outputs normalized mouse position [0, 1] relative to a target element or viewport. |
| [Keyframe Progress](keyframeProgress.md) | `keyframeProgress` | shared | Reads a parameter value and outputs it as progress. Wire from ParameterStoreNode or SM output for timeline-driven animations. |
| [Canvas Pointer](canvasPointer.md) | `canvasPointer` | shared | Canvas-level pointer event source — outputs normalized pointer position, down/up flags, and hold state. |
