# Drag Velocity

**Type:** `dragVelocity`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Passive pointer-drag sensor: cumulative per-axis offset, per-frame raw delta, continuous velocity, optional post-release inertia. Emits px-cumulative offset (`offsetX`/`offsetY`), per-frame raw pointer delta (`frameDeltaX`/`frameDeltaY`), px/sec velocity (`dx`/`dy`), magnitude, and an `isDragging` gate. Never moves the bound element — pure pointer-event integration so the data can be composed into arbitrary downstream graph expressions (carousel pan, parallax pull, scrub-forever timelines, swipe-to-scroll via `scrollPosition`) without hijacking the listen target. After release, velocity decays exponentially over `releaseDecay`; with `inertia: true` that decaying velocity also integrates back into offset (and into `frameDelta*` so an inertia tail can flow into a downstream `scrollPosition`), respecting the optional clamp bounds.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | When > 0.5 the node ignores pointer events. Wire from any "busy" signal — e.g. a transitionProgress > 0 expression — to lock drag while another animation is in flight. _(unit: gate)_ |
| `clampMinXInput` | `float` | Optional dynamic lower bound on offsetX. When the wired value is finite, it overrides the static `clampMinX` param every frame — the right wiring for carousels/parallax that need bounds tied to a measured runway (e.g. wire from `-scrollTrigger.windowPx` so drag range tracks viewport resize). |
| `clampMaxXInput` | `float` | Optional dynamic upper bound on offsetX. Same semantics as `clampMinXInput`. |
| `clampMinYInput` | `float` | Optional dynamic lower bound on offsetY. Same semantics as `clampMinXInput`. |
| `clampMaxYInput` | `float` | Optional dynamic upper bound on offsetY. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `offsetX` | `float` | Cumulative pointer delta on X integrated across pointermove samples. With `accumulate: true` (default) persists across drag sessions — the typical swipe-pan / scrub-forever idiom. With `accumulate: false` resets to 0 on every pointerdown (slider/knob idiom). Optionally clamped via `clampMinX` / `clampMaxX` (static) or `clampMinXInput` / `clampMaxXInput` (dynamic, wired override). _(unit: pixels)_ |
| `frameDeltaX` | `float` | Raw cumulative pointer-X delta from this frame's pointer events plus inertia tail (when `inertia` is on). Republished every evaluate(); 0 on frames with no input. The right port to wire into `scrollPosition.addX` / `addY` for swipe-to-scroll, or any consumer that wants per-frame deltas (not the cumulative offset which keeps growing). _(unit: pixels)_ |
| `frameDeltaY` | `float` | Raw cumulative pointer-Y delta from this frame's pointer events plus inertia tail. Same lifecycle as frameDeltaX. _(unit: pixels)_ |
| `offsetY` | `float` | Cumulative pointer delta on Y. Same semantics as offsetX. Optionally clamped via `clampMinY` / `clampMaxY`. _(unit: pixels)_ |
| `dx` | `float` | Instantaneous velocity on X. While dragging this updates with each pointermove sample; after release it decays toward 0 over `releaseDecay`. _(unit: pixels)_ |
| `dy` | `float` | Instantaneous velocity on Y. Same lifecycle as dx. _(unit: pixels)_ |
| `magnitude` | `float` | `sqrt(dx² + dy²)`. Convenience for "drag speed" driven effects (blur amount, distortion gain). _(unit: pixels)_ |
| `isDragging` | `float` | 1 while a pointer is down, 0 otherwise. Note: velocity continues to decay after isDragging flips to 0 — wire `magnitude` for a "still moving" signal. _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Element to listen on. Empty = window-scope (full-page drag, the default for carousel-style use). Set a specific selector to scope to a region. |
| `accumulate` | bool | `true` | When true (default), `offsetX`/`offsetY` persist across drag sessions — each new drag continues from the previous release position. The right setting for swipe-pan carousels and scrub-forever timelines. Set false for slider/knob idioms where each touch is a fresh delta from origin (offset resets to 0 on pointerdown). |
| `inertia` | bool | `false` | When true, post-release velocity also integrates back into `offsetX`/`offsetY` (with the same decay used on velocity), giving a "throw the carousel" feel. Clamp bounds still apply: hitting a wall zeros that-axis velocity. Default false — pure offset, no glide. |
| `sampleSmoothing` | float | `0.7` | Per-pointermove retention coefficient on the raw delta/dt computation for VELOCITY only — offset always tracks raw deltas exactly. 0 = no smoothing (very jittery velocity). 0.7 = silky default. Higher = smoother but more lag behind the cursor. (min: 0, max: 0.99, step: 0.05) |
| `releaseDecay` | float | `0.85` | Per-frame retention coefficient on velocity AFTER pointerup. 0 = instant snap to 0 (no inertia tail). 0.85 = smooth fling decay (default). Frame-rate independent. (min: 0, max: 0.99, step: 0.05) |
| `pointerCapture` | bool | `true` | When true (default), calls setPointerCapture on pointerdown so move events keep firing even if the cursor leaves the element. Set false for hover-driven UIs that need pointer events to bubble normally. Note: end-of-gesture events (pointermove/up/cancel) are always listened for on `window` so the gesture cleanly terminates regardless of capture. |
| `axisLock` | string | `"free"` | Gesture-classification mode after movement passes `axisLockThreshold`. `free` (default) = both axes always emit (do your own filtering downstream). `auto` = lock to whichever axis dominated at threshold; the other emits 0 for the rest of the gesture. `x` / `y` = require that axis to dominate; if the other dominates the gesture is REJECTED entirely (zero output for the rest of it). Use `y` on a per-card vertical-rotation sensor so horizontal pan-jitter passing over the card is ignored. |
| `axisLockThreshold` | float | `6` | Cumulative \|dx\|+\|dy\| (px) before classification fires. Below this no axis is locked and both accumulate normally so taps and tiny initial movements don't pre-lock to noise. 6 px (default) matches the typical OS click-vs-drag threshold. |
| `clampMinX` | float | `—` | Lower bound on offsetX. Leave unset for unbounded. Combined with clampMaxX to constrain a carousel to a finite runway. |
| `clampMaxX` | float | `—` | Upper bound on offsetX. Leave unset for unbounded. |
| `clampMinY` | float | `—` | Lower bound on offsetY. Leave unset for unbounded. |
| `clampMaxY` | float | `—` | Upper bound on offsetY. Leave unset for unbounded. |


## Use cases

- Swipe-to-scroll carousel — wire `frameDeltaX` (negated) into a `scrollPosition.addY` so horizontal drag advances page scroll directly; pin disengages naturally when scroll reaches the runway end. No need for offset clamps — scroll bounds own the limits.
- Carousel pan (offset-driven) — wire `offsetX` into a translateX expression on the carousel track. Set `clampMinX`/`clampMaxX` to the runway bounds; enable `inertia` for fling-to-snap.
- Drag-driven scrub — wire `offsetX` through an expression mapping it to 0..1 (e.g. `Math.max(0, Math.min(1, offsetX / range))`) and feed the progress port of any animation.
- Per-card rotation / squish — instance the node via forEach scope on each card; wire `dy` into a CSS variable for velocity-gated rotation, or `offsetY` for cumulative rotation.
- Fluid-carousel drag stretch — wire `dx`/`dy` into `texturedMeshTile.offsetX/offsetY` for velocity-driven mesh translation.
- Drag-snap navigation — wire `magnitude` through a `thresholdPulse` to fire a snap once velocity crosses a hard threshold (a "fling to next").
- Velocity-gated wheel — wire `isDragging` into `wheelGesture.gateInput` so wheel events are ignored while the user is actively dragging.

## See also

- [Pointer](pointer.md) — `pointer`
- [Wheel Gesture](wheelGesture.md) — `wheelGesture`
- [Mouse Velocity](mouseVelocity.md) — `mouseVelocity`
- [Smoothing](../math/smoothing.md) — `smoothing`
- [Scroll Position](scrollPosition.md) — `scrollPosition`

## Envelope

Every node in a `.fmtion` file shares the same envelope shape. The per-node sections above describe the contents of `params` and the wires that go into `connections`; the fields here apply to **every** node, including this one.

```json
{
  "id": "myUniqueNodeId",
  "type": "<nodeType>",
  "activeWhen": "(min-width: 768px)",
  "_note": "Why this node exists.",
  "params": { },
  "connections": { "input": { "nodeId": "...", "port": "..." } }
}
```

| Field | Type | Required | Summary |
|-------|------|----------|---------|
| `id` | string | yes | Stable, unique within the graph. Other nodes' `connections` reference it. |
| `type` | string | yes | The node-type slug — the `Type:` line at the top of this page. |
| `params` | object | no | Per-node parameters. Every key is a row in the **Parameters** table above. |
| `connections` | object | no | Maps each input port (see **Inputs** above) to a `{ nodeId, port }` source. Use a `[…]` array of those for multi-wire inputs. |
| `activeWhen` | `string \| string[] \| null` | no | CSS-media-query gate. The node is **dropped from the graph at load** when the query doesn't match — different from a per-frame `enabled` port (load-time topology mutation, not runtime gating). String = single query; array = AND'd queries; `"none"` or `null` = never active. |
| `_note` | string | no | Free-text author comment. Preserved through the loader and visible in dev tools / inspector. The recommended place for "why" prose, since `.fmtion` JSON forbids real comments. |

`activeWhen` examples:

```json
{ "activeWhen": "(min-width: 768px)" }
{ "activeWhen": ["(min-width: 768px)", "(prefers-reduced-motion: no-preference)"] }
{ "activeWhen": "none" }
```

`_note` example:

```json
{ "_note": "Drives hero parallax. Keep amp ≤ 0.4 to avoid layout shift at 1440px." }
```
