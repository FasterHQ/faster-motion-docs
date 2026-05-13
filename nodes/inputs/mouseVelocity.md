# Mouse Velocity

**Type:** `mouseVelocity`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Per-frame pointer velocity. One node emits five outputs in parallel — wire whichever fits.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `mouseX` | `float` | Normalized [0..1] pointer X. Wire from Pointer.normalizedX. _(range: 0..1, unit: fraction)_ |
| `mouseY` | `float` | Normalized [0..1] pointer Y. Wire from Pointer.normalizedY. _(range: 0..1, unit: fraction)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `valueX` | `float` | Signed delta on X remapped to [0..1] with 0.5 at rest. Drops into a 3-keyframe progress for left / neutral / right motion. _(range: 0..1, unit: fraction)_ |
| `valueY` | `float` | Signed delta on Y remapped to [0..1] with 0.5 at rest. Use for up / neutral / down progress. _(range: 0..1, unit: fraction)_ |
| `absoluteX` | `float` | Per-axis speed clamped to [0..1]. Direction-agnostic — only magnitude on X. _(range: 0..1, unit: fraction)_ |
| `absoluteY` | `float` | Per-axis speed clamped to [0..1] on Y. _(range: 0..1, unit: fraction)_ |
| `magnitude` | `float` | 2D speed √(dx²+dy²) clamped to [0..1]. Best single-output choice when direction doesn’t matter (cursor trail spawn rate, velocity-blur). _(range: 0..1, unit: fraction)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sensitivity` | float | `1` | Multiplier on the per-frame mouse delta before clamping. 1 = raw delta. Lower (0.3–0.5) for subtler effects, higher (2–5) when the cursor moves slowly and you still want strong velocity output. Example: 1 for cursor trail, 2 for parallax wiggle. (min: 0.01, step: 0.1) |
| `smoothing` | float | `0` | Per-frame retention factor on the raw delta (0 = no smoothing, raw frame-to-frame; 0.9 = very smooth, slow to react). Frame-rate independent. Example: 0 for snappy cursor trails, 0.4 for smooth parallax. (min: 0, max: 1, step: 0.01) |
| `decay` | float | `0` | Per-frame retention of the peak/centered value after the cursor stops (0 = signal snaps back instantly, 0.95 = lingers for ~1 second). Without decay, velocity-driven effects vanish the instant motion stops. Example: 0.88 for velocity-blur that fades, 0 for instant cut-off. (min: 0, max: 1, step: 0.01) |


## Use cases

- Velocity-reactive UI — skew, blur, or stretch elements proportional to cursor speed via `magnitude`. One node feeds all consumers.
- Directional parallax / tilt — `valueX` and `valueY` drop into a 3-stop progress (left / center / right) for subtle motion-aware depth.
- Distance-since-last-spawn — feed `magnitude` into `accumulatePulse` for spawn rates proportional to cursor speed (cursor trail, image trail).

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Course Catalog | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-course-catalog) · [`faster-claude/catalog/animations/advanced-orchestration/course-catalog/course-catalog.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/course-catalog/) |
| Momentum Wave | velocity-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/velocity-effects-momentum-wave) · [`faster-claude/catalog/animations/velocity-effects/momentum-wave/momentum-wave.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/velocity-effects/momentum-wave/) |
| Neural Constellation | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-neural-constellation) · [`faster-claude/catalog/animations/distance-proximity/neural-constellation/neural-constellation.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/neural-constellation/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |
| Product DNA | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-product-dna) · [`faster-claude/catalog/animations/distance-proximity/product-dna/product-dna.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/product-dna/) |
| Product Launch | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-product-launch) · [`faster-claude/catalog/animations/advanced-orchestration/product-launch/product-launch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/product-launch/) |
| Product Story | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-product-story) · [`faster-claude/catalog/animations/scroll-layouts/product-story/product-story.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/product-story/) |
| SaaS Metrics Showcase | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-saas-metrics) · [`faster-claude/catalog/animations/scroll-layouts/saas-metrics/saas-metrics.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/saas-metrics/) |
| Velocity Blur | velocity-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/velocity-effects-velocity-blur) · [`faster-claude/catalog/animations/velocity-effects/velocity-blur/velocity-blur.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/velocity-effects/velocity-blur/) |

_…and 1 more in the catalog._

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
