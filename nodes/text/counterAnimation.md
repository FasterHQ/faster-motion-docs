# Counter Animation

**Type:** `counterAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Interpolate a number from min to max (formatted via template, decimals, thousand separator) driven by a 0..1 progress input. Authors pick any number of output targets via `channels`: `from: "text"` writes the formatted string to any DOM string target (textContent, aria-valuetext, CSS var, title, data-*, etc.), `from: "value"` routes the raw float to any numeric CSS property (opacity, translateY, scale, rotate, width, …). One compound can show the number AND animate motion simultaneously from the same count. Compound: expands into `counter + one domPoseWrite + N domStringWrites` at load time — no runtime class.

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
| `min` | float | `0` | Min |
| `max` | float | `100` | Max |
| `decimals` | int | `0` | Decimals (min: 0, max: 10, step: 1) |
| `format` | string | `"{value}"` | Format Template |
| `separator` | string | `""` | Thousand Separator |
| `channels` | counterChannels | `{"textContent":{"from":"tex...` | Channels |


## See also

- [Property Animation](../animation/propertyAnimation.md) — `propertyAnimation`
- [Scroll Tween](../animation/scrollTween.md) — `scrollTween`
- [DOM Property Write](../boundary/domPropertyWrite.md) — `domPropertyWrite`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Course Catalog | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-course-catalog) · [`faster-claude/catalog/animations/advanced-orchestration/course-catalog/course-catalog.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/course-catalog/) |
| Morph Feature | svg-animations | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/svg-animations-morph-feature) · [`faster-claude/catalog/animations/svg-animations/morph-feature/morph-feature.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/svg-animations/morph-feature/) |
| Morph Shapes | svg-animations | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/svg-animations-morph-shapes) · [`faster-claude/catalog/animations/svg-animations/morph-shapes/morph-shapes.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/svg-animations/morph-shapes/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |
| Product Launch | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-product-launch) · [`faster-claude/catalog/animations/advanced-orchestration/product-launch/product-launch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/product-launch/) |
| Scrollytelling | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-scrollytelling) · [`faster-claude/catalog/animations/scroll-layouts/scrollytelling/scrollytelling.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/scrollytelling/) |
| Stat Counters | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-stat-counters) · [`faster-claude/catalog/animations/scroll-layouts/stat-counters/stat-counters.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/stat-counters/) |
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
