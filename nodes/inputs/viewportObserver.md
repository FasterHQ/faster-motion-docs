# Viewport Observer

**Type:** `viewportObserver`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

IntersectionObserver-backed visibility detector. Watches a single element (typically per-clone in a forEach template via `{ "fromScope": "selector" }`) and emits an `enterPulse` (single frame) when it becomes visible, an `exitPulse` when it leaves, plus a continuous `isVisible` gate and the raw `intersectionRatio` (0..1). Crucially this fires on transform-induced visibility changes too — a translateX-driven carousel (no document scroll) still triggers the pulses, which is what differentiates it from `scrollTrigger`'s scroll-event-driven progress. Use as the trigger for per-card pluck animations: each card's pluck fires the moment IT enters view, with parameters captured from a velocity signal at that exact moment via a `latch`.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `enterPulse` | `float` | Single-frame `1` on each visibility-enter (intersectionRatio crosses up through `threshold`), `0` otherwise. _(unit: pulse)_ |
| `exitPulse` | `float` | Single-frame `1` on each visibility-exit, `0` otherwise. _(unit: pulse)_ |
| `isVisible` | `float` | `1` while element is past `threshold`, `0` otherwise. Use as a gate. _(range: 0..1, unit: gate)_ |
| `intersectionRatio` | `float` | Raw intersection ratio 0..1. Useful as a falloff signal for in-view animations (e.g. opacity = ratio). _(range: 0..1)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element to observe. Inside a forEach template, set this to `{ "fromScope": "selector" }` for per-iteration matched elements. |
| `rootMargin` | string | `"0px"` | CSS-style margin that expands or contracts the viewport rect for the intersection test. `0px` = actual viewport. `-50px` = fire only when element is 50px inside. `200px` = fire 200px BEFORE visible (preload). |
| `threshold` | float | `0.05` | Visibility ratio that flips the gate. 0.05 = "any sliver visible" (default — fires as soon as leading edge enters). 0.5 = "majority visible". 1.0 = "fully visible". (min: 0.01, max: 1, step: 0.05) |


## Use cases

- Per-card pluck on entry — forEach `{ fromScope: "selector" }` per card → viewportObserver → enterPulse → latch(velocity) → tween a swing-out + elastic-return rotation. Each card animates on its own clock because each enters the viewport at a different moment during a drag.
- Lazy reveal — fire a one-shot animation when a section first becomes visible. enterPulse → pulseTween → propertyAnimation.
- Off-screen disable — `isVisible` gates a heavy animation node's `gateInput` so it does no work when scrolled out of view.

## See also

- [Scroll Trigger](scrollTrigger.md) — `scrollTrigger`
- [Observer](observer.md) — `observer`
- [Latch](latch.md) — `latch`

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
