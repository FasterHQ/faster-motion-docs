# Seamless Playhead

**Type:** `seamlessPlayhead`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Pure-math playhead for seamless infinite loops. Maps progress + iteration to a rawSequence-equivalent playhead time; slideOffset nudges playhead by one spacing-unit per step (keyboard / autoplay step).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `iteration` | `float` | Iteration |
| `loopDuration` | `float` | Loop Duration (s) |
| `overlap` | `float` | Overlap |
| `slideOffset` | `float` | Slide Offset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead (s) |
| `activeIndex` | `float` | Active Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slideCount` | int | `1` | Slide Count (min: 1, max: 1000, step: 1) |


## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Coverflow Features | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-coverflow-features) · [`faster-claude/catalog/animations/carousel-effects/coverflow-features/coverflow-features.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/coverflow-features/) |
| Coverflow Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-coverflow-gallery) · [`faster-claude/catalog/animations/carousel-effects/coverflow-gallery/coverflow-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/coverflow-gallery/) |
| Coverflow Scroll | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-coverflow-scroll) · [`faster-claude/catalog/animations/carousel-effects/coverflow-scroll/coverflow-scroll.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/coverflow-scroll/) |
| Cube Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-cube-gallery) · [`faster-claude/catalog/animations/carousel-effects/cube-gallery/cube-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/cube-gallery/) |
| Cube Onboarding | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-cube-onboarding) · [`faster-claude/catalog/animations/carousel-effects/cube-onboarding/cube-onboarding.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/cube-onboarding/) |
| Fade Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fade-gallery) · [`faster-claude/catalog/animations/carousel-effects/fade-gallery/fade-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fade-gallery/) |
| Fan Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fan-gallery) · [`faster-claude/catalog/animations/carousel-effects/fan-gallery/fan-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fan-gallery/) |
| Fan Team | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fan-team) · [`faster-claude/catalog/animations/carousel-effects/fan-team/fan-team.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fan-team/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |

_…and 5 more in the catalog._

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
