# Stagger Animation

**Type:** `staggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Fan a single animation template across all DOM elements matching a plain CSS selector, with per-element stagger offsets. Element count is resolved at runtime via `querySelectorAll(selector)` — no template language, no `{i}` placeholder, no per-child graph nodes. Inner `each` is a propertyAnimation-shaped template (float / color / string keyframe channels); the runtime evaluates it per element with translation-stagger (each element's progress is shifted by `stagger * effectiveIndex(i)`). Compound: expands to ONE `staggerAnimate` runtime node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Plain CSS selector matching all the staggered elements — e.g. `.card`, `.tech-item`, `.dot`. The runtime resolves the element list via `querySelectorAll(selector)` at bind time and applies the inner template per element with stagger offsets. No `{i}` template language; no need to know the count up front. |
| `stagger` | float | `0.05` | Per-element delay added to every keyframe time, expressed as a fraction of the input progress. Element i's effective keyframe times = source-template times + `effectiveIndex(i) * stagger`. **0** = all elements animate simultaneously. **1 / (N-1)** = first element peaks at progress 0, last element peaks at progress 1 when the template is centered. Common range: 0.05 – 0.3. (min: 0, max: 1, step: 0.01) |
| `staggerFrom` | enum | `"start"` | **Start** = element 0 fires first, element N-1 last (left-to-right cascade). **End** = reversed (right-to-left). **Center** = middle elements fire first, edges last (outward fan). **Edges** = both ends fire first, middle last (inward collapse). **Random** = deterministic seeded permutation (same shuffle every reload).. Options: `start`, `end`, `center`, `edges`, `random` |
| `delayOffset` | float | `0` | Constant delay added to every element's effective keyframe time. Useful when items should enter from progress 0.2 onward (each lagging the previous by `stagger`) — set `delayOffset: 0.2` and the order pattern (start/center/edges) is preserved, just shifted right. (min: 0, max: 1, step: 0.01) |
| `each` | staggerInnerTemplate | `{"type":"propertyAnimation"...` | The keyframe template applied per element. Channels are the same shape as a propertyAnimation — float / color / string keyframes — but the runtime evaluates them per element with translation-stagger (per-element delay added to keyframe times, not the template compressed into a slot). Authoring tip: for "active item highlight" patterns (color crossfade, focus ring), author keyframes that span [-W, +W] with the peak at t=0 — element i's peak then naturally lands at progress = i * stagger. Out-of-range times are valid (the runtime holds the first/last keyframe value). |


## Use cases

- Card-grid entrance — `selector: ".card"`, channels translateY 40px→0 + opacity 0→1, `stagger: 0.05`, `staggerFrom: start`.
- Dot indicator wave — `selector: ".dot"`, channel scale 1→1.2→1 with `staggerFrom: center`.
- Indexed color crossfade through a list — inner template authored as a triangle (e.g. keyframes at `[t: -W, t: 0, t: W]` for inactive→active→inactive); each child's peak naturally lands at progress = i/(N-1) via the per-element time-shift. Times outside [0, 1] are valid: the runtime holds the first/last keyframe value when progress is out of range, so children only animate while their window overlaps progress.

## See also

- [Text Stagger Animation](textStaggerAnimation.md) — `textStaggerAnimation`
- [Variant Stagger Animation](variantStaggerAnimation.md) — `variantStaggerAnimation`
- [Stagger Write](../boundary/staggerWrite.md) — `staggerWrite`
- [Split Text](splitText.md) — `splitText`
- `staggerAnimate` _(not in author-facing docs)_

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Course Catalog | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-course-catalog) · [`faster-claude/catalog/animations/advanced-orchestration/course-catalog/course-catalog.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/course-catalog/) |
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |
| Stat Counters | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-stat-counters) · [`faster-claude/catalog/animations/scroll-layouts/stat-counters/stat-counters.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/stat-counters/) |
| Velocity Blur | velocity-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/velocity-effects-velocity-blur) · [`faster-claude/catalog/animations/velocity-effects/velocity-blur/velocity-blur.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/velocity-effects/velocity-blur/) |
| Year In Review | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-year-in-review) · [`faster-claude/catalog/animations/scroll-layouts/year-in-review/year-in-review.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/year-in-review/) |
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
