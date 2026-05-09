# Scroll Trigger

**Type:** `scrollTrigger`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Track an element's position relative to the scroll viewport — outputs progress (0..1), direction (±1), velocity (px/s), isInView (0/1), and pin geometry. Edges control when progress starts and ends, expressed as `<elementEdge> <viewportEdge>` pairs ("top bottom" = element top reaches viewport bottom; "bottom top" = element bottom reaches viewport top). When `pin: true` is authored, the loader emits a PinAnchor sibling and wires `flowTop` automatically so progress measures through the spacer rather than the pinned rect.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `flowTop` | `float` | Auto-wired by the loader from a sibling PinAnchorNode when `pin: true`. Progress is measured against this flow position so a pinned element's rect-during-pin doesn't skew progress. Authors do not wire this manually. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Normalized [0..1] progress between Start Edge and End Edge. The most common ScrollTrigger output — wire into remap / domVariablesWrite / propertyAnimation for scrub-driven effects. _(range: 0..1, unit: progress)_ |
| `unclampedProgress` | `float` | Progress without the [0, 1] clamp. Negative before Start Edge, > 1 after End Edge. Use when you want anticipation / overshoot beyond the trigger window. _(unit: progress)_ |
| `scrolledPx` | `float` | Pixels scrolled past Start Edge, clamped to [0, windowPx]. Mirrors `progress` but in raw pixels. Use for scroll-locked translateY where 1 px scroll == 1 px move, without the CSS having to know the window length. Stays at 0 before the range and at `windowPx` after. _(unit: pixels)_ |
| `scrolledPxUnclamped` | `float` | Pixels scrolled past Start Edge, un-clamped. Goes negative before the range and exceeds `windowPx` after. Use for parallax that keeps moving past End Edge, or pre-roll motion that begins before Start Edge. _(unit: pixels)_ |
| `windowPx` | `float` | Total pixel span between Start Edge and End Edge (always positive). Lets a downstream expression normalize raw `scrolledPx` itself: `scrolledPx / windowPx == progress`. _(unit: pixels)_ |
| `isInView` | `float` | 1 while progress is in [0, 1], 0 otherwise. Pulse this through a hover-style smoother for soft enter/leave gates. _(range: 0..1, unit: gate)_ |
| `direction` | `float` | +1 while scrolling forward, −1 while scrolling backward. Useful for asymmetric effects (e.g. pulse on enter forward but not on enter backward). |
| `velocity` | `float` | Instantaneous scroll velocity in pixels per second. Positive = forward (down for vertical scroll), negative = backward. Pair with a clamped remap to convert to angle/blur/scale. _(unit: velocity-px/s)_ |
| `pinTopOffset` | `float` | Y-offset (px) of the pinned element's top relative to the viewport top during pin. Resolves both vh and px contributions of Start Edge: `top top` → 0, `top 60` → 60, `top top+=75vh` → 75% of viewport height. Loader-internal — usually consumed by a sibling PinNode. _(unit: pixels)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element whose scroll position drives this trigger. The trigger window is determined by where this element's edges meet the viewport edges (per Start Edge / End Edge below). Examples: `.hero`, `#chapter-1`, `body` (full-page). |
| `startEdge` | scrollEdges | `"top bottom"` | Visual two-marker picker for Start Edge (progress = 0) and End Edge (progress = 1). Drag markers to set viewport position; click element-edge lines to choose which edge of the trigger element is tracked. Optional `+= N vh / px / %` offset suffix shifts the marker by an absolute amount (e.g. `top top+=164vh` means progress starts when element-top is 164vh below viewport-top). |
| `scroller` | elementSelector | `""` | CSS selector for the scrolling element. Defaults to the document scroller (window). Set when the trigger lives inside an internally-scrolled panel (e.g. a side-pane with `overflow: auto`). |
| `invert` | bool | `false` | Flip the progress curve (1 → 0 instead of 0 → 1). Equivalent to a `1 - progress` remap downstream. |
| `pin` | bool | `false` | Pin an element to the viewport for the duration of the trigger window. Loader emits a PinAnchor + PinNode pair automatically and wires the trigger's `flowTop` so progress is measured through the spacer (not the pinned rect). |
| `pinSpacing` | bool | `true` | When pinning, insert a spacer to preserve document scroll height. **Default `true` — keep this on for almost every pinned section.**   **WARNING**: setting `false` means the pinned content has NO post-release home in document flow — when the pin releases, the target snaps back to its natural top position which is now far above the viewport, and the section visually DISAPPEARS as the user scrolls past it.   The ONLY correct uses of `pinSpacing: false`: • You're intentionally OVERLAYING a pinned target onto the NEXT section (the next section's background carries it visually after release — see dental-studio `portraitPin` for the canonical pattern). • You've explicitly authored a post-release `translateY` compensation by reading `pinTargetFlowBottom` from the PinAnchor and remapping into a CSS-var the target consumes after release.  If neither of those applies, leave `pinSpacing: true` (or omit it — it's the default). The "disappearing section after pin release" bug is almost always this param set to `false` without the matching post-release flow math. |
| `pinTarget` | elementSelector | `""` | CSS selector for the element to pin. Defaults to the trigger element. Set this when you want the trigger window to be larger than the visible pinned element (e.g. trigger = a tall wrapper, pinTarget = the inner panel that stays visible). |
| `pinZIndex` | string | `""` | CSS z-index applied while pin is engaged. Empty string defers to the default ("1000"). Use to stack one pin above another when their fixed ranges overlap on the page (sibling pins) — replaces ad-hoc `z-index: ... !important` overrides on the pinned element. |


## Use cases

- Scroll-driven animations — wire `progress` (0..1) into a remap or domVariablesWrite for any scroll-scrubbed effect (parallax, sticky reveals, bento expansion, color-mood drift).
- Velocity-reactive UI — wire `velocity` (px/s) into a clamped remap for skew/lean effects on fast scroll, blur strength, scroll-direction badges. (See `scroll-skew` demo.)
- Toggle-action sections — wire `isInView` (0/1) gate into a tween / pulseTween for "play on enter, reverse on leave" behavior decoupled from scroll speed.
- Pinned scroll sections — set `pin: true` + `pinTarget` to fix an element to the viewport while scroll continues, with `progress` measuring through the spacer. Combine with a tall trigger element for scrub-extended animations.

## See also

- [Scroll Tween](../animation/scrollTween.md) — `scrollTween`
- [Pin](pin.md) — `pin`
- `pinAnchor` _(not in author-facing docs)_
- [Property Animation](../animation/propertyAnimation.md) — `propertyAnimation`
- [Parallax](../math/parallax.md) — `parallax`
- [Velocity](../math/velocity.md) — `velocity`
- [Scroll To](../animation/scrollTo.md) — `scrollTo`

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
