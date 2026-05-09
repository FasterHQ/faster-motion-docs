# Slide Deck

**Type:** `slideDeck`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Full-screen slide-deck navigation in one node. Bundles wheel input, optional next/prev arrow clicks, optional nav-link clicks (matchIndex → seekTo), and the eased slideRouter. Compound: at load time it expands to `slideRouter` + `wheelGesture` + up to 3 `clickPulse` nodes + `pulseOr` (when 2+ advance sources). Outputs re-export the slideRouter outputs verbatim. Author can still bypass and wire the primitives by hand for one-off cases — slideDeck is purely additive.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `currentIndex` | `float` | Continuous interpolated index from the internal slideRouter. Lerps from prev to next during transition; equals `discreteIndex` at rest. Compound-aliased to `<id>__router.currentIndex`. |
| `discreteIndex` | `float` | Most-recent latched integer target. Compound-aliased to `<id>__router.discreteIndex`. |
| `transitionProgress` | `float` | Eased 0..1 during a transition; 0 at rest. Compound-aliased to `<id>__router.transitionProgress`. _(range: 0..1, unit: fraction)_ |
| `slideActivations` | `floatArray` | Float[N] channel — entry i is slide i's activation 0..1. Use `floatArrayPick(index: i)` to fan out per-slide. Compound-aliased to `<id>__router.slideActivations`. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slidesSelector` | elementSelector | `""` | CSS selector for slide elements. The internal `slideRouter` derives slideCount from `querySelectorAll(...).length` at bind. Required. |
| `navLinkSelector` | elementSelector | `""` | CSS selector for click-to-seek nav links. Each matched element becomes a click target; the matched-index is wired to `router.seekTo` so clicking the Nth link snaps to slide N. Leave empty to disable nav-link routing. |
| `nextArrowSelector` | elementSelector | `""` | Optional CSS selector for an explicit "next" arrow button. Click → `router.advance`. Leave empty if wheel + key gestures are enough. |
| `prevArrowSelector` | elementSelector | `""` | Optional CSS selector for an explicit "previous" arrow button. Click → `router.retreat`. |
| `wheelEnabled` | bool | `true` | When true (default), expands an internal `wheelGesture` listening at window scope. Disable for pure click-driven decks. |
| `wheelAxis` | axisChooser | `"y"` | Which delta channel(s) feed the wheel accumulator. Vertical for slide decks; horizontal for galleries. |
| `wheelThreshold` | float | `60` | Accumulated \|delta\| required to fire a wheel pulse. (min: 1) |
| `wheelLockoutMs` | float | `850` | Time-based debounce after each wheel pulse. Set ≥ `transitionDurationMs` so wheel events during a transition are ignored. (min: 0) |
| `wheelRestMs` | float | `250` | Idle time after which the wheel accumulator resets to zero. (min: 0) |
| `transitionDurationMs` | float | `800` | Slide transition time on the internal slideRouter. (min: 1) |
| `transitionEase` | easingCurve | `"easeInOutCubic"` | Easing curve for the transition ramp. |
| `wrap` | bool | `false` | When true, advance past the last slide loops to 0; retreat before 0 loops to last. |


## Use cases

- Wheel-driven scrolljack deck — `slidesSelector: "[data-slide-id]"` + `nextArrowSelector: "#next"` + `wheelEnabled: true`. One scroll burst or arrow click advances.
- Hash-routed nav — `navLinkSelector: "[data-slide-link]"`. Each match gets a clickPulse listener; matchIndex → router.seekTo. Add `nextArrowSelector` for chrome.
- Bidirectional gestural deck — `nextArrowSelector` + `prevArrowSelector` for explicit advance/retreat buttons in addition to wheel.
- Per-slide colour drift / parallax — read `currentIndex` (continuous lerp) or `slideActivations` (Float[N]) downstream; same as wiring slideRouter directly.

## See also

- [Slide Router](slideRouter.md) — `slideRouter`
- [Wheel Gesture](wheelGesture.md) — `wheelGesture`
- [Click Pulse](clickPulse.md) — `clickPulse`
- [Pulse OR](pulseOr.md) — `pulseOr`
- [Float Array Pick](../math/floatArrayPick.md) — `floatArrayPick`

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
