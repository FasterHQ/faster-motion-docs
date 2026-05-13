# Scroll Position

**Type:** `scrollPosition`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Owns a scroller's scroll position behind typed graph ports. Reads the target's scrollTop / scrollLeft each frame and publishes them on `scrollX` / `scrollY`. When `addX` / `addY` ports carry non-zero deltas, integrates them (with sub-pixel residue carry across frames so cumulative scroll matches cumulative input) into the scroller — one DOM write per evaluate(), so high-frequency upstream sources don't trigger a synchronous reflow on every input sample. Pair with `dragVelocity.frameDeltaX/Y` for swipe-to-scroll: drag → port → scrollPosition → DOM, fully graph-native, no element side-channels. Other writers (button "scroll to top", parallax-driven scroll) compose into the same node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `addX` | `float` | Per-frame delta to apply to scrollLeft. Sub-pixel values are accumulated across frames so a stream of fractional deltas (e.g. 0.7, 0.6, 0.4) integrates to exactly 1.7 px of scroll, not three quantized 0/1 px steps. Wire from a delta source (drag frameDeltaX, expression integrating velocity, etc). |
| `addY` | `float` | Per-frame delta to apply to scrollTop. Same semantics as addX. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `scrollX` | `float` | Integer scrollLeft — what the browser actually has after this frame's write. Wire here when consumers need exact browser-truth (e.g. comparing to other scroll-event sources). |
| `scrollY` | `float` | Integer scrollTop. |
| `positionX` | `float` | SUB-PIXEL logical X position — the cumulative addX inputs without integer rounding. Use as a smooth pan source: drag-driven sub-pixel deltas reflect here same-frame, before scroll-event-driven readers (which see only integer scrollLeft) catch up. External scroll (wheel, keyboard) is reconciled into the accumulator at start of each frame so the logical position never drifts from browser truth. |
| `positionY` | `float` | SUB-PIXEL logical Y position. Same semantics as positionX. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `"document"` | Element whose scroll position this node owns. `window` or `document` resolves to `document.scrollingElement` (page scroll). Any other value is a CSS selector for an inner scroller. Required. |
| `axis` | string | `"both"` | `both` (default) reads + writes both scrollLeft and scrollTop. `x` / `y` restricts to one axis — useful when only one direction is graph-driven and the other should remain available for organic native scroll without being clobbered each frame. |


## Use cases

- Swipe-to-scroll carousel — wire `dragVelocity.frameDeltaX` (negated, so cursor-left → page-down) into `addY` for horizontal swipe → vertical page scroll.
- Native horizontal scroller — wire `dragVelocity.frameDeltaX` directly into `addX` and set `axis: "x"` to leave the Y axis to organic native scroll.
- Programmatic scroll-to — wire a `pulseTween` or `scrollTo` value into the addY input via a delta-from-current expression for a graph-driven "scroll to next section" button.

## See also

- [Scroll Trigger](scrollTrigger.md) — `scrollTrigger`
- [Drag Velocity](dragVelocity.md) — `dragVelocity`
- [Wheel Gesture](wheelGesture.md) — `wheelGesture`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Otis Roan — Pinned Linear Pan (Mint) | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-otis-roan) · [`faster-claude/catalog/animations/carousel-effects/otis-roan/otis-roan.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/otis-roan/) |

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
