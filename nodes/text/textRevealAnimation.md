# Text Reveal

**Type:** `textRevealAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Progressively reveals text by character, word, sentence, or line, driven by a progress input. DOM-first: the translatable source lives in the HTML, the .fmtion carries only the animation recipe. `sourceFrom: element` (DEFAULT) reads `selector`.textContent at bind time. `sourceFrom: elements` reads textContent from every element matching `sourcesSelector` and cycles through them in document order (multi-word typewriter). `sourceFrom: param` is an escape hatch for non-translatable copy — prefer element/elements for anything user-facing. Default (char + prefixes + includeEmpty) gives classic typewriter; switch granularity for word/sentence/line reveals under the same node type. `cycleMode: pingPong` (multi-source only) makes each phrase type forward then delete backward before the next phrase begins from empty — native author-level type+delete typewriter cycle, no progress remap needed. OPTIONAL `channels` + `variants` (same shape as variantStaggerAnimation) declare per-source side effects — e.g. a `color` channel with three hex values cycles the color at actual word boundaries regardless of word length or language. Compound: expands to `textDecompose` + `textSequence` + `domStringWrite` (+ optional channel writers) at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Drives the reveal. With `cycleMode: forward` (default) progress 0..1 types every source's prefixes in sequence. With `cycleMode: pingPong` progress 0..1 splits into one window per source and runs a 0→1→0 triangle inside each — type-then-delete-then-next-phrase. Wire from any 0..1 source: `scrollTrigger`, `pulseTween`, `cycleClock`, `remap`, an `expression`. _(range: 0..1, unit: progress)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element where the reveal text gets written (textContent / attribute / style). With `sourceFrom: element` and no `sourceSelector`, this same element's textContent is also read at bind time as the source — the most common case. |
| `sourceFrom` | enum | `"element"` | **Element** (default — translatable single source): reads `sourceSelector` (or `selector`) textContent at bind time. **Elements** (translatable multi-source cycle): reads textContent from every element matching `sourcesSelector` and cycles through them in document order. **Param** (escape hatch): bake `source` (string) or `sources` (string[]) into the .fmtion — for non-translatable / debug-only content. Prefer element/elements for anything user-facing so translations don't require a fmtion edit.. Options: `element`, `elements`, `param` |
| `sourceSelector` | elementSelector | `—` | CSS selector for the element to READ source text from. Optional — defaults to `selector` (the write target). Use this when the translatable source lives on a sibling/ancestor element while the reveal writes elsewhere (e.g., source on a hidden `<span>` mirror, written into a visible `<h1>`). |
| `sourcesSelector` | elementSelector | `—` | CSS selector matching every element whose textContent is a phrase to cycle through. Sources are read in document order. Typical pattern: hide them with `display: none` (the reveal target is the only visible writer). Example: `".te-phrase"` matching three hidden `<span class="te-phrase">…</span>` siblings. |
| `source` | string | `—` | Single source string baked into the .fmtion. Use only for non-translatable content (debug pages, internal tools). For user-facing text, switch to `sourceFrom: element` / `elements` so translation is a HTML edit not a fmtion edit. |
| `granularity` | enum | `"char"` | **Character** (default — typewriter): one prefix/atom per glyph. Unicode-aware. **Word**: split on whitespace, one prefix per word. **Sentence**: split on `.`, `!`, `?`. **Line**: split on `\n`. All four reuse the same compound — switching granularity converts between typewriter, word reveal, sentence reveal, line reveal without changing nodes.. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"prefixes"` | **Prefixes** (default — typewriter): cumulative from start. "S", "Su", "Sun", "Sunny". **Suffixes**: cumulative from end. "y", "ny", "nny", "Sunny" (reverse build). **Atoms**: each piece in isolation, no buildup. "S", "u", "n", "n", "y" — flips one char at a time, useful for slot-machine / split-flap effects.. Options: `prefixes`, `suffixes`, `atoms` |
| `includeEmpty` | bool | `true` | When ON (default), prepends an empty string before each source's prefixes. With single source: typing starts from "" not "S". With multi-source: there's a clean `""` between phrases — useful for `cycleMode: pingPong` so each phrase begins from empty rather than jumping straight from the previous phrase's last char. |
| `stripWhitespace` | bool | `false` | When ON, drops empty / whitespace-only atoms during decompose. Affects `granularity: word` (skips runs of whitespace), `granularity: line` (drops blank lines), etc. Off by default (preserves the source faithfully). |
| `separator` | string | `—` | Overrides the granularity's default split rule. Use to split on something exotic — `","` for CSV, `"\|"` for piped lists. When set, `granularity` is ignored for the split itself but still controls the join character used to reconstruct prefix strings. |
| `writeMode` | enum | `"textContent"` | **Text content** (default): writes to `el.textContent`. **Attribute**: writes via `el.setAttribute(propertyName, ...)` — for `aria-label`, `data-*`, `title`. **CSS style / variable**: writes via `el.style.setProperty(kebab(propertyName), ...)` — for CSS custom props (`--my-text`) or properties whose value is a string (e.g. `content` of a generated counter).. Options: `textContent`, `attribute`, `style` |
| `propertyName` | cssProperty | `"textContent"` | For `writeMode: attribute` — the attribute name (`aria-label`, `data-current`). For `writeMode: style` — the CSS property name (`--my-text`, `content`). Ignored for `writeMode: textContent` (the property name is fixed). |
| `cycleMode` | enum | `"forward"` | **Forward** (default): progress 0..1 walks the concatenated prefix array — types phrase 1, then phrase 2, then phrase 3 in order. Drive with a sawtooth clock for continuous typing. **Ping-Pong**: each phrase types forward, deletes backward to empty, then the next phrase starts from empty. Splits progress into one window per source automatically — no progress remap expression required. Drive with the same sawtooth clock; the per-phrase triangle is built inside textSequence using the wired `itemSources`.. Options: `forward`, `pingPong` |
| `channels` | textRevealChannels | `—` | Per-source side effects beyond text — e.g. cycle a `color` channel through 3 hex values so each phrase gets its own hue at word boundaries. Each channel becomes one `arrayPick` + one writer at expand time. Length-independent: works correctly across language translations and variable phrase lengths because indexing is by source position not character count. |
| `variants` | textRevealVariants | `—` | Per-source value table for `channels`. Each variant entry maps a source index (0, 1, 2…) to scalar values per channel. Same authoring shape as `variantStaggerAnimation` but variants here are picks (one value per source), not interpolation ranges. |


## Use cases

- Classic typewriter on a static heading — `sourceFrom: element`, defaults (char + prefixes + includeEmpty). Drive `progress` from a `scrollTrigger` or `pulseTween` and the heading types itself in.
- Phrase cycler with type-and-delete — `sourceFrom: elements`, `sourcesSelector: ".my-phrase"`, `cycleMode: pingPong`. Drive from a continuous `cycleClock` (sawtooth, `pingPong: false`); each phrase types forward, deletes backward, then the next phrase begins from empty.
- Word-by-word reveal — `granularity: word`, `shape: prefixes`. Builds up "hello", "hello world", "hello world today" instead of char-by-char.
- Reverse / unwrite — `shape: suffixes` with `granularity: char`. Reveals from the end ("y", "ny", "nny", … "Sunny"). Pair with `cycleMode: pingPong` for write-from-end then delete-from-start.
- Per-word color cycle — add a `color` channel + per-source `variants` so each phrase gets its own hue at word boundaries. Length-independent: stays correct across translations / variable phrase length.

## See also

- [Text Sequence](textSequence.md) — `textSequence`
- [Text Sequence Animation](textSequenceAnimation.md) — `textSequenceAnimation`
- [Text Decompose](textDecompose.md) — `textDecompose`
- [Text Stagger Animation](textStaggerAnimation.md) — `textStaggerAnimation`
- [Text Scramble Animation](textScrambleAnimation.md) — `textScrambleAnimation`
- [Cycle Clock](../bundles/cycleClock.md) — `cycleClock`

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
