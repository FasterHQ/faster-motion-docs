# Scroll To

**Type:** `scrollTo`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

F337 — animated scroll-to. Trigger-launched tween over the scroller's scrollTop. Resolves the target Y from a CSS selector (or "top" / "bottom") at trigger time, or from the dynamic `targetY` input port when wired (takes precedence over the selector). Lerps from current scroll through the configured ease, outputs a `value` to feed a domPropertyWrite(scrollTop). Pure-graph; no imperative API.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Rising-edge launches the tween. Wire from a click pulse (`eventListener.fired`, `clickStateDispatcher.pulse`), a `loadPulse`, or any other rising-edge source. Each rising edge restarts the tween from the current scrollY through the configured ease. _(unit: pulse)_ |
| `targetY` | `float` | Optional dynamic destination in document scroll-coords (px). When wired to a finite value, overrides Target Selector at trigger time. NaN (unwired) falls back to selector-based resolution. Use when the destination is graph-computed (e.g. `remap` over a pin-anchor's flowTop + scrollDistance for click-to-pin-progress patterns). |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Animated current scroll position the tween is producing (px). Wire into a `domPropertyWrite(scrollTop)` to drive the page. Stays at the last-tween-end value when idle so the downstream write dirty-checks to a no-op. _(unit: pixels)_ |
| `progress` | `float` | Tween progress 0..1 while animating, 0 when idle. Useful for chaining downstream "during scroll-to" effects (e.g. fade UI, dim overlay). _(range: 0..1, unit: normalized)_ |
| `isScrolling` | `float` | 1 while the tween is animating, 0 when idle (before first trigger or after tween completes). Drive UI that should disable input or show a "scrolling…" indicator during programmatic scroll. _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetSelector` | elementSelector | `""` | CSS selector for the element to scroll to (resolved at trigger time so the value reflects current layout). Two reserved keywords: `top` (scrolls to 0) and `bottom` (scrolls to scrollHeight − viewportH). Leave empty when wiring a dynamic destination through the `targetY` input port instead — the port wins over this selector when finite. |
| `duration` | float | `0.8` | Tween duration in seconds. The eased lerp runs from current scrollY at trigger time to the resolved target Y over this window. Default 0.8s. (min: 0, step: 0.1) |
| `ease` | easingCurve | `"easeInOutCubic"` | Easing curve applied to the [0..1] tween progress. Same vocabulary as tween / propertyAnimation — pick a preset (linear / power / cubic / back / elastic) or pass a parametric string like `cubic-bezier(0.4, 0, 0.2, 1)` / `back.out(1.4)`. Custom eases registered via F333 also work here. |
| `offsetY` | float | `0` | Subtracted from the resolved target Y, in pixels. Use to compensate for a sticky header (e.g. `60` lands the target 60px below the viewport top) or to nudge the destination above/below the natural element edge. (step: 1) |
| `scroller` | elementSelector | `""` | CSS selector for the scrolling element. Empty = the document scroller (`<html>`). Set when scrolling inside an internally-scrolled panel (e.g. a side-pane with `overflow: auto`). The same selector controls where reads + writes go. |


## See also

- [Scroll Trigger](../inputs/scrollTrigger.md) — `scrollTrigger`
- `pinAnchor` _(not in author-facing docs)_
- [Remap](../math/remap.md) — `remap`
- [Event Listener](../inputs/eventListener.md) — `eventListener`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |

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
