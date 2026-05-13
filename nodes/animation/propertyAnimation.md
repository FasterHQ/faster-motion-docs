# Property Animation

**Type:** `propertyAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Animate one or more CSS properties on a target element, driven by a 0..1 progress input. Compound: expanded into `multiKeyframe + domPoseWrite` at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Per-CSS-property keyframe channels. Optional per-channel `template: "blur({value}px)"` wraps float output into a CSS string for complex single-channel writes to `filter` / `clip-path` / `mask-image`. Mutually exclusive with `cssUnit`. |


## See also

- [Scroll Tween](scrollTween.md) — `scrollTween`
- [Event Tween](eventTween.md) — `eventTween`
- [Stagger Animation](../text/staggerAnimation.md) — `staggerAnimation`
- [DOM Property Write](../boundary/domPropertyWrite.md) — `domPropertyWrite`
- [Expression](../math/expression.md) — `expression`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Accordion Expand | click-triggers | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/click-triggers-accordion-expand) · [`faster-claude/catalog/animations/click-triggers/accordion-expand/accordion-expand.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/click-triggers/accordion-expand/) |
| Card Lift on Hover | hover-interactions | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-card-lift) · [`faster-claude/catalog/animations/hover-interactions/card-lift/card-lift.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/card-lift/) |
| Fade Reveal on Scroll | scroll-animations | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-fade-reveal) · [`faster-claude/catalog/animations/scroll-animations/fade-reveal/fade-reveal.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/fade-reveal/) |
| Loop Animation | keyframe-sequences | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/keyframe-sequences-loop-animation) · [`faster-claude/catalog/animations/keyframe-sequences/loop-animation/loop-animation.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/keyframe-sequences/loop-animation/) |
| Scrub Progress Indicator | scroll-animations | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-scrub-progress) · [`faster-claude/catalog/animations/scroll-animations/scrub-progress/scrub-progress.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/scrub-progress/) |
| Toggle Switch | click-triggers | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/click-triggers-toggle-switch) · [`faster-claude/catalog/animations/click-triggers/toggle-switch/toggle-switch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/click-triggers/toggle-switch/) |
| 3D Tilt Parallax Card | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-tilt-parallax-card) · [`faster-claude/catalog/animations/hover-interactions/tilt-parallax-card/tilt-parallax-card.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/tilt-parallax-card/) |
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Animated Infographic | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-animated-infographic) · [`faster-claude/catalog/animations/advanced-orchestration/animated-infographic/animated-infographic.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/animated-infographic/) |
| Breathing Hero | time-auto-loops | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/time-auto-loops-breathing-hero) · [`faster-claude/catalog/animations/time-auto-loops/breathing-hero/breathing-hero.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/time-auto-loops/breathing-hero/) |

_…and 92 more in the catalog._

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
