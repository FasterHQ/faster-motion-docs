# Variant Stagger Animation

**Type:** `variantStaggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Fan a compound across N indexed DOM elements where each child has UNIQUE from/to values on shared channels. Per-child variation sibling of F324 staggerAnimation (which requires uniform values). Use for mouse-driven dispersals, hover-chaos grids, card-spread layouts, per-icon flutter — any "N siblings, same channels, different ranges". Compound: expands into N× propertyAnimation at load time (fixed-point loop then expands each to mk+pw).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selectorTemplate` | string | `""` | Selector Template |
| `channels` | variantStaggerChannelMeta | `{"translateX":{"type":"floa...` | Channel Metadata |
| `variants` | variantStaggerTable | `[{"index":1,"values":{"tran...` | Variants |


## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| 3D Tilt Parallax Card | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-tilt-parallax-card) · [`faster-claude/catalog/animations/hover-interactions/tilt-parallax-card/tilt-parallax-card.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/tilt-parallax-card/) |
| Course Catalog | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-course-catalog) · [`faster-claude/catalog/animations/advanced-orchestration/course-catalog/course-catalog.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/course-catalog/) |
| Product Story | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-product-story) · [`faster-claude/catalog/animations/scroll-layouts/product-story/product-story.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/product-story/) |
| Reactive Grid | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-reactive-grid) · [`faster-claude/catalog/animations/hover-interactions/reactive-grid/reactive-grid.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/reactive-grid/) |
| Scrollytelling | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-scrollytelling) · [`faster-claude/catalog/animations/scroll-layouts/scrollytelling/scrollytelling.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/scrollytelling/) |
| Text Dispersion | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-text-dispersion) · [`faster-claude/catalog/animations/hover-interactions/text-dispersion/text-dispersion.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/text-dispersion/) |

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
