# Virtual Scroll

**Type:** `virtualScroll`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Continuous wheel/touch accumulator with eased follow. Replaces document scroll for infinite-loop carousels and forever-scroll virtual scrollers — listens to wheel/touch on `selector` (or window), accumulates raw deltas into an unbounded `targetPos`, and lerps `position` toward it each frame using `smoothing`. `position` is monotonic and unbounded, so consumers can fract-wrap it (`carouselEffectAnimation` does this internally) for true forever-scroll without document-scroll runways. Optionally hides the native scrollbar by setting `overflow:hidden` on html+body during bind, restoring on dispose.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | When > 0.5 the node ignores wheel/touch events. Wire from any boolean-shaped graph signal (e.g. a modal-open gate, a transition-busy gate). _(unit: gate)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `position` | `float` | Smoothed accumulated position in raw wheel-delta pixels. Unbounded — keeps growing as user scrolls. _(unit: pixels)_ |
| `velocity` | `float` | Per-frame delta of `position`. Sign indicates direction; magnitude indicates speed. Useful as a scroll-energy input to mesh distortion / motion blur amounts. _(unit: pixels/frame)_ |
| `direction` | `float` | +1 forward / -1 backward / 0 idle. Sign of velocity above a small dead-zone. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Element to listen on. **Leave empty** for window-scope (the right choice for full-page virtual scroll). Set a specific selector only to scope to a region. |
| `axis` | axisChooser | `"y"` | Which delta channel(s) feed the accumulator. Vertical (deltaY) is the default for wheel-driven horizontal carousels (counter-intuitive but matches user expectation — vertical scroll wheel drives horizontal travel). Horizontal (deltaX) for trackpad-pan-only. Both lets the dominant-axis component win. |
| `sensitivity` | float | `1` | Multiplier on raw wheel delta before accumulation. 1.0 = 1px wheel-delta → 1 unit position. Decrease for slower travel, increase for snappier feel. (min: 0.01, step: 0.1) |
| `smoothing` | float | `0.1` | Lerp factor toward target each frame (`position += (target - position) * smoothing`). 0 = instant (no smoothing); 0.1 = relaxed; 0.05 = very smooth (long tail). Smoothing values around ~0.08-0.12 give a buttery scroll feel. (min: 0, max: 0.99, step: 0.05) |
| `hideNativeScroll` | bool | `true` | On bind, set html+body `overflow:hidden` so the native scrollbar never appears (and the page never reaches a "scroll end"). Restored on dispose. Disable only if you want native scroll to coexist (rare). |
| `inertia` | float | `0` | Momentum strength. 0 = pulse-mode (each wheel tick is a discrete jump that the smoothing tail eases). > 0 = wheel ticks become target velocity that decays — Lenis/Locomotive feel where the scroll keeps gliding after you stop. Pair with `smoothing` for an additional render tail. 1 is a strong default. (min: 0, max: 1, step: 0.05) |
| `inertiaFriction` | float | `4` | Velocity decay per second when inertia > 0 (`v *= exp(-friction*dt)`). 4 ≈ "loose mouse-wheel glide" (~0.7s halt), 8 ≈ "snappy" (~0.35s), 16 ≈ "near-immediate". Ignored when inertia = 0. (min: 0, step: 0.5) |


## Use cases

- Infinite-loop carousel — wire `position` through `expression: node('p') / 800` into `carouselEffectAnimation.playhead`. Each 800px of wheel = one full slide cycle. Page never reaches an end.
- Marquee / ribbon scroll — wire `position` directly into `domPoseWrite.translateX` (px units) for an endless side-scrolling ticker.
- Smooth virtual-scroll camera — wire `position` through a smoothing node (extra easing) and a `mathUtil(modulo)` for explicit wrap, plus `velocity` into a `meshAttractor.jump` channel for scroll-velocity-driven distortion.

## See also

- [Wheel Gesture](wheelGesture.md) — `wheelGesture`
- [Scroll Trigger](scrollTrigger.md) — `scrollTrigger`
- [Pointer](pointer.md) — `pointer`
- [Smoothing](../math/smoothing.md) — `smoothing`

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
