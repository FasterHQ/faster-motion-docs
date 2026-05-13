# Scroll Trigger Each

**Type:** `scrollTriggerEach`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Per-element scroll progress fan-out. Same edge math as `scrollTrigger`, but resolves N matched elements at bind time and emits `progress`/`isInView` as arrays — each element's progress is computed against ITS OWN viewport position. Pairs with `staggerAnimate.progressArray` for "fire each row when its row enters viewport" patterns where one shared scrolltrigger range can't represent the per-element timing. Use when DOM-order interleaves columns (CSS grid) or rows scroll past at distinctly different viewport positions, and where same-row vs different-row stagger ordering would otherwise force per-tile triggers.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `floatArray` | Per-element 0..1 clamped progress, in DOM order of matched elements. Wire into `staggerAnimate.progressArray` on the same selector. _(range: 0..1, unit: progress)_ |
| `unclampedProgress` | `floatArray` | Per-element raw progress (can go below 0 before range, above 1 after). Use when the consumer wants overshoot-aware values. |
| `isInView` | `floatArray` | Per-element 0/1 gate — 1 when the element's rawProgress is within [0, 1]. _(range: 0..1, unit: gate)_ |
| `count` | `float` | Number of matched elements at bind time. Useful for downstream array-aware math (e.g. building a deterministic stagger schedule that auto-scales when authors add more rows). _(unit: count)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector matching the elements to fan progress out across. Use the same selector that downstream `staggerAnimate` uses (or wire `pieceSelector` from a `splitText` upstream). |
| `startEdge` | scrollEdges | `"top bottom"` | When each element's progress reaches 0. Same `<elementEdge> <viewportEdge>` syntax as `scrollTrigger` — e.g. `top bottom` (progress 0 the instant the element top crosses viewport bottom). |
| `endEdge` | scrollEdges | `"top 50%"` | When each element's progress reaches 1. e.g. `top 50%` (progress 1 when element top reaches 50% of viewport from top). |
| `scroller` | string | `—` | Optional custom scroll-container selector. Defaults to window. |
| `invert` | bool | `—` | Output 1 → 0 instead of 0 → 1. |


## Use cases

- Reveal-as-each-row-enters: wire `progress` (float[]) into `staggerAnimate.progressArray` on the same selector — each row fires its keyframe at ITS OWN viewport entry, no per-tile scrollTrigger duplication.
- Column-interleaved grids: `staggerWrite.staggerOrder: positionY` solves shared-progress visual ordering, but only when one shared scroll range works. When timing must follow per-element scroll (tall grids spanning multiple viewports), use this fan-out instead.
- Per-element parallax depth: drive a remap with each element's own progress so far-from-viewport-center elements lag closer-to-center elements naturally.

## See also

- [Scroll Trigger](scrollTrigger.md) — `scrollTrigger`
- `staggerAnimate` _(not in author-facing docs)_
- [Stagger Write](../boundary/staggerWrite.md) — `staggerWrite`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |

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
