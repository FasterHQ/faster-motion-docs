# Morph Path Animation

**Type:** `morphPathAnimation`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Interpolate an SVG path element from its current d attribute toward a target d, driven by a 0..1 progress input. One authoring node replaces the canonical chain `domAttributeRead(d) → morphCompute(fromPath ← read, toPath) → domPoseWrite(d)` that every SVG morph repeats. Compound: expanded into those three primitives at load time — no runtime class.

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
| `toPath` | string | `""` | Target Path (d) |


## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Morph Feature | svg-animations | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/svg-animations-morph-feature) · [`faster-claude/catalog/animations/svg-animations/morph-feature/morph-feature.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/svg-animations/morph-feature/) |
| Morph Shapes | svg-animations | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/svg-animations-morph-shapes) · [`faster-claude/catalog/animations/svg-animations/morph-shapes/morph-shapes.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/svg-animations/morph-shapes/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |

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
