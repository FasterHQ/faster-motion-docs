# Math Utility

**Type:** `mathUtil`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Single Float→Float math operation. Picks unary (`abs`, `round`, `sqrt`, ...) or binary (`add`, `subtract`, `multiply`) ops; binary ops use `value` + `b`. Range ops (`clamp`, `normalize`) use `value` + `min` + `max`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Primary input. For unary ops (abs, sqrt, etc.) this is the operand. For binary ops (add, subtract, multiply) it's the left-hand side. For range ops (clamp, normalize) it's the value being scaled. |
| `min` | `float` | Range minimum. Used by `clamp` (lower bound) and `normalize` (input range start). Ignored by other operations. |
| `max` | `float` | Range maximum. Used by `clamp` (upper bound) and `normalize` (input range end). Ignored by other operations. |
| `b` | `float` | Right-hand operand for binary operations (`add`, `subtract`, `multiply`). Ignored by unary ops. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Output of the selected operation applied to the inputs. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `operation` | enum | `"abs"` | Math operation applied to the inputs. Unary ops (`abs`, `round`, `sqrt`, ...) only use `value`. Binary ops (`add`, `subtract`, `multiply`) use `value` + `b`. Range ops (`clamp`, `normalize`) use `value` + `min` + `max`. Unused inputs are ignored.. Options: `negate`, `abs`, `round`, `floor`, `ceil`, `sign`, `degToRad`, `radToDeg`, `fract`, `reciprocal`, `sqrt`, `clamp`, `normalize`, `add`, `subtract`, `multiply` |


## Use cases

- Combine two signals — wire two sources into `value` and `b`, set `add` / `multiply` to mix them.
- Range remap — feed a 0..1 progress into `normalize` with `min`/`max` to scale into a domain-specific range, or `clamp` to limit it.
- Unit conversion — `degToRad` / `radToDeg` between angle units when wiring rotation drivers.

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Fan Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-fan-gallery) · [`faster-claude/catalog/animations/carousel-effects/fan-gallery/fan-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/fan-gallery/) |
| Interactive Showcase | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-interactive-showcase) · [`faster-claude/catalog/animations/advanced-orchestration/interactive-showcase/interactive-showcase.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/interactive-showcase/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |
| Product Launch | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-product-launch) · [`faster-claude/catalog/animations/advanced-orchestration/product-launch/product-launch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/product-launch/) |
| Stack Gallery | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-stack-gallery) · [`faster-claude/catalog/animations/carousel-effects/stack-gallery/stack-gallery.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/stack-gallery/) |
| Tab Switcher | click-triggers | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/click-triggers-tab-switcher) · [`faster-claude/catalog/animations/click-triggers/tab-switcher/tab-switcher.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/click-triggers/tab-switcher/) |

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
