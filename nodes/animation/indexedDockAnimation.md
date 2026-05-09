# Indexed Dock Animation

**Type:** `indexedDockAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Docks a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. As progress advances from 0 → 1, the source jumps from child[0] → child[1] → … → child[count-1] in lockstep with `floor(progress × count)`. The dock measures children's `getBoundingClientRect()` at runtime and parks the source at the most-recently-revealed child's right edge (whitespace children are skipped automatically so cursor-style consumers don't freeze across word breaks). Authors route the computed `offsetX` to any horizontal-offset-driven CSS property via `channels` (default: `translateX` in px). Compound: expands at load time to `domIndexedDock + domPoseWrite` — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Drives WHICH child the source docks onto. Target index = `floor(progress × count)`. Wire from any 0..1 source — `scrollTrigger.progress`, a `pulseTween`, or a hand-built ramp. Stays at child[0] for progress=0 (left-edge anchor before first reveal), parks at child[count-1].right for progress=1. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sourceSelector` | elementSelector | `""` | CSS selector for the element being moved. Most use cases match a single element (e.g. `.cursor`, `.tab-underline`, `.focus-ring`). The graph reads its current position and applies a translate that lands it on the active child. |
| `childSelector` | elementSelector | `""` | CSS selector matching the indexed children, in document / reading order. For typewriter chars, set to `.text-target .ft-split-char` (the spans `splitText` creates). For tab pills, `.tab-bar > .tab`. The graph picks `floor(progress × count)`-th match each frame. |
| `channels` | indexedDockChannels | `{"translateX":{"from":"offs...` | How the computed `offsetX` maps to CSS. Default routes to `translateX (px)`. Authors can swap to `marginLeft`, a CSS custom var, mask-position, or any horizontal-offset-driven property. |


## Use cases

- Typewriter cursor — pair with `textStaggerAnimation { discrete: true }` so each char instant-flips on; cursor parks on the just-typed char's right edge as scroll progresses (see `text-effects/typewriter` demo).
- Tab / pill underline — source = `.underline` element, children = `.tab` elements; underline slides between active tabs proportional to progress.
- Onboarding step indicator — focus ring jumps between step elements.
- Carousel page dot — active-dot pill snaps to whichever dot corresponds to current slide via `progress` from the carousel's `scrollTrigger`.
- Scanning highlight — a colored bar walks through items in a list as scroll advances (combine with a `pulseDelay` to slow the walk).

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
