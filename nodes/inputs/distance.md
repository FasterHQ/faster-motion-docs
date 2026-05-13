# Distance

**Type:** `distance`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Mouse-to-element-rect proximity. Outputs 0 (far) to 1 (touching) with falloff.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `proximity` | `float` | Proximity |
| `rawDistance` | `float` | Raw Distance |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Selector |
| `maxDistance` | float | `150` | Max Distance (min: 0, step: 10) |
| `falloff` | string | `"linear"` | Falloff |
| `invert` | bool | `true` | Invert |
| `smooth` | float | `0` | Smoothing (min: 0, max: 1, step: 0.05) |


## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Neural Constellation | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-neural-constellation) · [`faster-claude/catalog/animations/distance-proximity/neural-constellation/neural-constellation.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/neural-constellation/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |
| Product DNA | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-product-dna) · [`faster-claude/catalog/animations/distance-proximity/product-dna/product-dna.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/product-dna/) |
| Proximity Spotlight | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-proximity-spotlight) · [`faster-claude/catalog/animations/distance-proximity/proximity-spotlight/proximity-spotlight.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/proximity-spotlight/) |
| SVG Proximity Field | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-rect-proximity-field) · [`faster-claude/catalog/animations/distance-proximity/rect-proximity-field/rect-proximity-field.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/rect-proximity-field/) |

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
