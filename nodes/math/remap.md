# Remap

**Type:** `remap`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Map a value from one range to another with optional curve

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `inputMin` | `float` | Input Min |
| `inputMax` | `float` | Input Max |
| `outputMin` | `float` | Output Min |
| `outputMax` | `float` | Output Max |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `inputMin` | float | `0` | Lower edge of the input range. Value at or below this maps to Output Min. Also exposed as an input port — wire it to override per-frame; when unwired, this baseline is used. Common default: 0 for normalized signals (progress, hover gate). |
| `inputMax` | float | `1` | Upper edge of the input range. Value at or above this maps to Output Max. Common default: 1 for normalized signals; set to e.g. 6000 (px/s) when remapping scroll velocity. |
| `outputMin` | float | `0` | Output value at the input range's lower edge. Sign flip works here — set Output Min > Output Max for an inverted remap (e.g. `[0,1] → [20,-20]` to flip a normalized driver into a ±-clamped angle). |
| `outputMax` | float | `1` | Output value at the input range's upper edge. Together with Output Min, defines the target range. Both values are also exposed as input ports for per-frame override. |
| `curve` | easingCurve | `"linear"` | Easing curve applied to the normalized [0..1] interval before mapping into the output range. Same vocabulary as tween / colorTween / propertyAnimation — pick a preset (linear / power / elastic / back / bounce / cubic-bezier) or pass a parametric string like `elastic.out(1, 0.3)` / `cubic-bezier(0.4, 0, 0.2, 1)`. |
| `clamp` | bool | `true` | When on, normalized t is clamped to [0, 1] before the curve and output mapping — values outside the input range pin to outputMin/outputMax. Turn off for extrapolation. |


## See also

- [Expression](expression.md) — `expression`
- [Parallax](parallax.md) — `parallax`
- [Snap Float](snapFloat.md) — `snapFloat`
- `pinAnchor` _(not in author-facing docs)_

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Fan Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fan-gallery) · [`faster-claude/catalog/animations/carousel-effects/fan-gallery/fan-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fan-gallery/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |
| Product Launch | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-product-launch) · [`faster-claude/catalog/animations/advanced-orchestration/product-launch/product-launch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/product-launch/) |
| Stack Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-stack-gallery) · [`faster-claude/catalog/animations/carousel-effects/stack-gallery/stack-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/stack-gallery/) |
| Editorial Lookbook | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-editorial-lookbook) · [`faster-claude/catalog/animations/scroll-animations/editorial-lookbook/editorial-lookbook.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/editorial-lookbook/) |
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
