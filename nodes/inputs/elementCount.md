# Element Count

**Type:** `elementCount`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Emits `document.querySelectorAll(selector).length` as a first-class graph value. Use to eliminate hard-coded `N` literals scattered across `propertyAnimation` channel maxes, `expression` `* (N-1)` math, and `clickStateDispatcher.values[]` arrays — wire `count`/`countMinusOne` into them so adding a matched element auto-rescales the graph. Re-queries each evaluate; cost is one querySelectorAll per Scheduler tick (negligible). Throws on empty selector or absent DOM (faster-motion-runtime/SSR).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | document.querySelectorAll(selector).length, as a uint. _(unit: count)_ |
| `countMinusOne` | `float` | max(0, count − 1). Convenience for `progress * (N − 1)` and even-spaced index math. _(unit: count)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS selector to count matches for. Resolved against document.querySelectorAll. Examples: ".svc-states > .svc-state", ".tech-list-items .tech-item". |


## Use cases

- Fan-out indexed scroll-driven activations: connect `countMinusOne` to a propertyAnimation channel's output max so `--svc-active` ramps 0..N-1 regardless of how many state elements exist in HTML.
- Drive `Math.round(node('p') * node('n'))` integer-state-index expressions so the round-mode flip points auto-scale.
- Replace per-state click thresholds with `progress / count` math in a remap, eliminating manually-typed `[0, 0.333, 0.667, 1.0]` arrays.

## See also

- [Expression](../math/expression.md) — `expression`
- [Remap](../math/remap.md) — `remap`
- [Property Animation](../animation/propertyAnimation.md) — `propertyAnimation`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
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
