# Split Text

**Type:** `splitText`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Setup-only DOM text splitter — wraps every word / character / line of the target element's text content in its own `<span>` so per-piece animations (rotateX, opacity, color, position) can target the pieces individually. Runs once at bind time; the spans persist for the page lifetime. Each span gets a class based on the split mode: `ft-split-word`, `ft-split-char`, or `ft-split-line` — use these in downstream selectors (e.g. `.headline .ft-split-char` for `staggerWrite`).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Number of spans created at bind time. Useful for downstream math that needs to know how many pieces exist (compute per-element stagger window, normalize an index, etc.). |
| `pieceSelector` | `string` | Live CSS selector that targets the spans this node creates — format `<target> .ft-split-<mode>`. Wire into a downstream `staggerWrite` / `domPoseWrite` / `domPropertyWrite` / `domVariablesWrite` `selector` input port to keep the consumer in lockstep with this node, no string-copy-paste needed. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element whose text gets split. The element's textContent is replaced with one `<span>` per piece. Multiple matches are processed (each gets its own splits). Common targets: a single `.headline`, all `.line` paragraphs, etc. |
| `mode` | enum | `"words"` | How to break up the text. `words` = whitespace-separated tokens (good for word-level reveals). `chars` = every character including punctuation (good for typewriter / wave effects). `lines` = visual lines after CSS wrapping (good for paragraph reveals). The resulting span class is `ft-split-<mode>` — e.g. `.ft-split-char` for chars mode.. Options: `words`, `chars`, `lines` |


## Use cases

- Per-character text animation — pair with `staggerWrite` (rotateX, translateY, opacity) for typewriter, wave, fade-in, or rolling-tube text effects. Selector pattern: `<lineSelector> .ft-split-char`.
- Word-level reveal — `mode: words` + a stagger-driven opacity/translate tween gives a per-word entrance with natural reading cadence. Selector pattern: `<lineSelector> .ft-split-word`.
- Line-by-line fade — `mode: lines` for paragraph reveals where each visual line (after wrapping) animates in. Selector pattern: `<lineSelector> .ft-split-line`.
- Char-count driven layouts — wire the `count` output into expression / mathUtil to scale a downstream effect by the number of pieces (e.g. compute totalStagger = X / count).

## See also

- [Text Stagger Animation](textStaggerAnimation.md) — `textStaggerAnimation`
- [Stagger Write](../boundary/staggerWrite.md) — `staggerWrite`
- [Stagger Animation](staggerAnimation.md) — `staggerAnimation`
- [Text Reveal](textRevealAnimation.md) — `textRevealAnimation`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Color Fill Text | text-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/text-effects-color-fill) · [`faster-claude/catalog/animations/text-effects/color-fill/color-fill.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/text-effects/color-fill/) |
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |
| Line Reveal | text-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/text-effects-line-reveal) · [`faster-claude/catalog/animations/text-effects/line-reveal/line-reveal.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/text-effects/line-reveal/) |
| Mega-Section Chain | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-mega-section-chain) · [`faster-claude/catalog/animations/scroll-layouts/mega-section-chain/mega-section-chain.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/mega-section-chain/) |
| Neural Constellation | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-neural-constellation) · [`faster-claude/catalog/animations/distance-proximity/neural-constellation/neural-constellation.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/neural-constellation/) |
| Platform Demo | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-platform-demo) · [`faster-claude/catalog/animations/advanced-orchestration/platform-demo/platform-demo.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/platform-demo/) |
| Product DNA | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-product-dna) · [`faster-claude/catalog/animations/distance-proximity/product-dna/product-dna.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/product-dna/) |
| Product Launch | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-product-launch) · [`faster-claude/catalog/animations/advanced-orchestration/product-launch/product-launch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/product-launch/) |
| Product Story | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-product-story) · [`faster-claude/catalog/animations/scroll-layouts/product-story/product-story.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/product-story/) |

_…and 7 more in the catalog._

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
