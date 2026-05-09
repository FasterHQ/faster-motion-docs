# Text Stagger Animation

**Type:** `textStaggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Splits a text element into chars / words / lines and animates each piece from a single 0..1 progress signal with staggered start times. One authoring node replaces the splitText + per-piece tween chain. Channels are author-friendly `{from, to, ease, unit}` ranges (numeric) or CSS-fragment ranges (`blur(16px) → blur(0px)`, `inset(0 100% 0 0) → inset(0 0% 0 0)` — the runtime tokenizes numeric tokens and lerps each independently). Compound: expands at load time to `splitText` + 1× `staggerWrite` (continuous mode) — runtime stays at 2 nodes regardless of piece count. Discrete mode (instant flip per piece, typewriter-style) falls back to `splitText` + N× `propertyAnimation` and requires `count` (since N keyframe-shaped children must be emitted up front). `totalStagger` is the fraction of progress consumed by spreading start times across pieces; runtime reads piece count dynamically from splitText, so editing the heading text does not require a graph edit.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Drives the 0..1 envelope. Each piece animates over a window `[delay_i, delay_i + (1 - totalStagger)]` of progress, where delay_i is determined by `staggerFrom` and `totalStagger`. Wire from any 0..1 source — `scrollTrigger.progress`, a `pulseTween`, a looping clock, or a custom expression. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the text element to split. The element's textContent is replaced with per-piece spans (chars / words / lines) at bind time. |
| `splitMode` | enum | `"chars"` | **Characters** = one span per glyph (typewriter, char-cascade, blur-focus). **Words** = one span per whitespace-separated word (word-by-word reveals, multilingual-friendly). **Lines** = one span per visible line (line-reveal, mast-clip-wipe — note this re-measures on resize).. Options: `chars`, `words`, `lines` |
| `totalStagger` | float | `0.4` | Fraction of progress (0..1) reserved for spreading per-piece start times. **0** = all pieces animate together over full progress. **0.34** = last piece starts at progress 0.34 (typical hero-intro feel). **0.95** = nearly each piece gets its own instant — typewriter-grade density. Each piece's easing window is `1 - totalStagger`. (min: 0, max: 1, step: 0.01) |
| `staggerFrom` | enum | `"start"` | Order in which pieces begin animating. **Start** types in left-to-right (typewriter, manifesto). **End** reverses. **Center** explodes outward from the middle. **Edges** collapses inward. **Random** uses a deterministic seed so reloads stay consistent.. Options: `start`, `end`, `center`, `edges`, `random` |
| `discrete` | bool | `false` | When ON, each piece flips its channels INSTANTLY at its delay boundary (no fade window). Used for typewriter where chars should snap on, never appear half-faded under a blinking cursor. Requires explicit `count` because the expander emits N propertyAnimation children up front. Continuous mode (default) eases pieces over the per-piece window — the typical authoring choice. |
| `count` | int | `—` | Number of pieces the expander generates per-child propertyAnimations for. Continuous mode reads count dynamically from splitText at runtime — no count needed there. Set this to the literal char/word count of the source text in discrete mode. (min: 1, step: 1) |
| `channels` | textStaggerChannels | `{"opacity":{"type":"float",...` | CSS properties to animate per piece. Each channel: numeric (`from: 150, to: 0, unit: %`), color hex/rgb pair, hue-cycle (`mode: hueCycle`), or string CSS fragment (`from: "blur(16px)", to: "blur(0px)"`). All channels share the same stagger window and progress; per-channel ease. |


## Use cases

- Hero text intro — `splitMode: chars`, `totalStagger: 0.34`, `staggerFrom: random`, channels translateY 150%→0% + opacity 0→1 (see `section-snap` demo).
- Typewriter — `splitMode: chars`, `discrete: true`, `staggerFrom: start`, channel opacity 0→1 with `ease: linear`. Each char instant-flips on; pair with `indexedDockAnimation` to dock a cursor element on the freshly-typed char (see `text-effects/typewriter`).
- Word-by-word reveal — `splitMode: words`, `staggerFrom: start`, channels translateY 40px→0 + opacity 0→1 (see `text-effects/word-stagger`).
- Blur focus — `splitMode: chars`, channels `filter: blur(16px) → blur(0px)` + opacity 0→1 (string-fragment channel; see `text-effects/blur-focus`).
- Clip-wipe per char — channel `clipPath: inset(0 100% 0 0) → inset(0 0% 0 0)` (see `text-effects/clip-wipe`).
- Color cycle through chars — `staggerFrom: start`, channel `color: hueCycle` with from/to hue degrees (see `text-effects/tube-text`).

## See also

- [Split Text](splitText.md) — `splitText`
- [Stagger Write](../boundary/staggerWrite.md) — `staggerWrite`
- [Stagger Animation](staggerAnimation.md) — `staggerAnimation`
- [Text Reveal](textRevealAnimation.md) — `textRevealAnimation`
- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`

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
