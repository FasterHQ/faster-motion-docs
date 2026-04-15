# Inputs Nodes

Nodes that read external signals into the graph: DOM events, mouse position, scroll progress, keyboard input, time, and other browser/device inputs.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Scroll Input](scrollInput.md) | `scrollInput` | dom | Scroll progress (0-1) from page scroll position |
| [Time Input](timeInput.md) | `timeInput` | shared | Elapsed time to normalized progress (0-1) |
| [Mouse Input](mouseInput.md) | `mouseInput` | dom | Pointer position (0-1) on selected axis |
| [Mouse Velocity](mouseVelocity.md) | `mouseVelocity` | dom | Pointer velocity magnitude (-1 to 1) |
| [Distance Input](distanceInput.md) | `distanceInput` | dom | Mouse distance to target (0 = at target, 1 = beyond radius) |
| [Drag Input](dragInput.md) | `dragInput` | dom | Drag progress (0-1) on selected axis |
| [Scroll Trigger](scrollTrigger.md) | `scrollTrigger` | dom | Track element visibility during scroll — outputs progress, direction, velocity, and isInView |
| [Scroll Pin](scrollPin.md) | `scrollPin` | dom | Pin a DOM element to fixed position while scroll progress is within range |
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
