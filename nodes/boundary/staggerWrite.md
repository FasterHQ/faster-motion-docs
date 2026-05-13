# Stagger Write

**Type:** `staggerWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Batched per-element stagger writer, multi-channel. One node animates N CSS properties across the elements matching a selector, with a shared per-element stagger window. F358: each property is one channel in the `channels` map — add as many as you want (e.g. `rotateX` + `color` + `opacity`) and they all share the same selector, totalStagger, staggerOrder, and progress driver. Replaces the older "two staggerWrites with the same selector and one property each" pattern with a single node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Single 0..1 driver. Each matched element gets a window inside this range — every channel's `from → to` interpolation runs across the element's own slice (size = 1 − totalStagger). Wire from a `timeline.progress`, `scrollTrigger.progress`, `phaseShift.value`, or any normalized signal. _(range: 0..1, unit: progress)_ |
| `selector` | `string` | F357 — wireable selector. When connected to an upstream string source (typically `splitText.pieceSelector`), the wired value overrides the `CSS Selector` param at bind time. Unwired = the param value is used. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector matching the elements to animate. Pair with `splitText` upstream — its emitted spans use `.ft-split-char` / `.ft-split-word` / `.ft-split-line` selectors. For lists / grids, point at a class like `.list-item`. All matched elements are batched into one accumulator pass. |
| `channels` | staggerChannels | `{}` | Map of CSS property → channel config. Each channel has `{ from, to, cssUnit?, ease?, template? }` — one entry per property you want to drive. All channels share this node's selector + stagger window + progress, so adding a channel costs 0 graph nodes (vs. authoring a second staggerWrite). Property names: transform components (`translateX/Y/Z`, `rotate*`, `scaleX/Y`, `skewX/Y`) route through the transform accumulator; everything else writes via DOMBatcher. Custom properties (`--name`) supported. Use `template` for non-numeric CSS values: `hsl({value} 80% 65%)`, `hue-rotate({value}deg)`, `circle({value}% at 50% 50%)`. |
| `totalStagger` | float | `0.3` | Fraction of the input progress allocated to staggering element starts. `0.3` = elements start across the first 30% of progress, each animates over the remaining 70%. `0` = all elements start simultaneously (no stagger). `1` = elements fire one-after-another (no overlap, last element animates over a 0-width window). Common range: 0.2 – 0.5. (min: 0, max: 1, step: 0.05) |
| `staggerOrder` | enum | `"start"` | Element ordering for the stagger sequence. `Start → End` (default) cascades from first matched to last. `End → Start` reverses. `Center Out` fans from the middle outward (good for radial / "burst" entrances). `Edges In` converges from the ends toward middle. `Random` shuffles deterministically (seeded) per bind. `Position Y / X` group elements by visual top / left coordinate at bind time so same-row (or same-column) elements share a stagger slot — required for grid layouts where DOM order interleaves columns and you want reveal order to follow what the viewer sees, not source order.. Options: `start`, `end`, `center`, `edges`, `random`, `positionY`, `positionX` |


## Use cases

- Per-character text animation — pair with `splitText` (chars mode) and stack channels: `rotateX` for the rotation wave + `color` (via `template: hsl({value} 80% 65%)`) for a hue cycle + `opacity` for fade. All sharing one stagger window. (See `tube-text` demo.)
- List entrance — `opacity 0 → 1` channel + `translateY 30 → 0` channel + `scaleX 0.96 → 1` channel, one node, cascading fade-and-slide-up.
- Symmetric reveals — `staggerOrder: center` / `edges` with multiple channels (size + opacity + color) for radial / burst reveals.
- Randomized choreography — `staggerOrder: random` with a seed, multi-channel writes for organic / non-deterministic entrances.

## See also

- [Text Stagger Animation](../text/textStaggerAnimation.md) — `textStaggerAnimation`
- [Stagger Animation](../text/staggerAnimation.md) — `staggerAnimation`
- [Split Text](../text/splitText.md) — `splitText`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |
| Studio Showreel | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-wheel-deck-blob) · [`faster-claude/catalog/animations/scroll-animations/wheel-deck-blob/wheel-deck-blob.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/wheel-deck-blob/) |

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
