# Carousel Effect Animation

**Type:** `carouselEffectAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

A whole seamlessPlayhead-driven carousel effect as one author node. Every slot element matched by `selector` runs the same channel template, phase-shifted by its document-order index times `slotStride`. Expands at load into a single `carouselFanout` runtime node — N is resolved at bind time from `selector`, so adding or removing cards requires no graph edits. If you need per-slot divergence, detach to individual `slideSlotAnimation` nodes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `".carousel-slide"` | CSS selector matching every slot element. Document order = slot order. The runtime fan-out re-resolves the live element list at bind time, so adding or removing matching DOM nodes auto-rescales the carousel. |
| `slotStride` | float | `0.1` | Playhead delta between consecutive slots. Slot i's window starts at `slotOffsetBase + i * slotStride`. (step: 0.01) |
| `slotWindow` | float | `1` | `slotEnd - slotStart` per slot — width of the window in playhead space within which one slot's channels evaluate from t=0 to t=1. (step: 0.05) |
| `slotOffsetBase` | float | `0` | Playhead offset of slot 0's window start. (step: 0.05) |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Shared keyframe template applied to every slot. Optional per-channel `template: "blur({value}px)"` wraps float output into a CSS string — useful for `filter` / `clip-path` writes. Mutually exclusive with `cssUnit`. Composed shape `{ template, channels: { sub: { keyframes } } }` drives multi-input CSS strings. |


## See also

- [Carousel Fanout](carouselFanout.md) — `carouselFanout`
- [Slide Slot Animation](slideSlotAnimation.md) — `slideSlotAnimation`
- `carouselWrapCounter` _(not in author-facing docs)_
- [Seamless Playhead](seamlessPlayhead.md) — `seamlessPlayhead`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Coverflow Features | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-coverflow-features) · [`faster-claude/catalog/animations/carousel-effects/coverflow-features/coverflow-features.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/coverflow-features/) |
| Coverflow Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-coverflow-gallery) · [`faster-claude/catalog/animations/carousel-effects/coverflow-gallery/coverflow-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/coverflow-gallery/) |
| Coverflow Scroll | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-coverflow-scroll) · [`faster-claude/catalog/animations/carousel-effects/coverflow-scroll/coverflow-scroll.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/coverflow-scroll/) |
| Cube Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-cube-gallery) · [`faster-claude/catalog/animations/carousel-effects/cube-gallery/cube-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/cube-gallery/) |
| Cube Onboarding | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-cube-onboarding) · [`faster-claude/catalog/animations/carousel-effects/cube-onboarding/cube-onboarding.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/cube-onboarding/) |
| Fade Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fade-gallery) · [`faster-claude/catalog/animations/carousel-effects/fade-gallery/fade-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fade-gallery/) |
| Fan Team | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fan-team) · [`faster-claude/catalog/animations/carousel-effects/fan-team/fan-team.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fan-team/) |
| OBSCURA — Studio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura-studio) · [`faster-claude/catalog/animations/advanced-orchestration/obscura-studio/obscura-studio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura-studio/) |
| Slide Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-slide-gallery) · [`faster-claude/catalog/animations/carousel-effects/slide-gallery/slide-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/slide-gallery/) |
| Slide Testimonials | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-slide-testimonials) · [`faster-claude/catalog/animations/carousel-effects/slide-testimonials/slide-testimonials.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/slide-testimonials/) |

_…and 2 more in the catalog._

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
