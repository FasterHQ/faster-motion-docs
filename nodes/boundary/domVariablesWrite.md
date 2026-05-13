# DOM Variables Write

**Type:** `domVariablesWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Batched CSS-custom-property writer with per-variable remap built in. Takes a single shared input value and fans it out to N CSS variables (`--foo`) on one element, with each variable carrying its own input/output range, unit, easing curve, and clamp. Replaces the common `1 source → N remap → N domPropertyWrite` chain — collapses to a single node in author view.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Shared input value. Each declared variable remaps it independently into its own output range using its `inputMin/inputMax → outputMin/outputMax` pair. |
| `selector` | `string` | F357 — wireable selector. When connected (e.g. from `splitText.pieceSelector`), the wired value overrides the `CSS Selector` param at bind time. Unwired = the param value is used. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element receiving the variable writes. Multiple matches: only the first is written (use a forEach instance with `{ "fromScope": "selector" }` for per-element fan-out). |
| `properties` | domVariablesChannels | `{}` | CSS custom properties to write. Each row defines one channel: variable name (must start with `--`), output range (`outputMin` / `outputMax`), unit, and easing curve. The shared `value` input is remapped per-channel using these settings. `inputMin` / `inputMax` default to [0, 1] (most common case for normalized progress / hover gates) and clamp defaults to on — use raw JSON edit if you need to override those. |


## Use cases

- Scroll-driven CSS-variable layouts — one `scrollTrigger.progress` fans out to several `--*` variables that the cascade reads via `calc()` (bento grid expansion, gradient stop drift, accent-hue interpolation).
- Hover gate driving theme variables — `hover.hover` (0..1) → `--accent-hue`, `--accent-sat`, `--shadow-elev` with per-variable ranges and easing, no remap noise in the graph.
- Pose-style writes for non-transform properties — when you want to drive 3+ CSS variables coherently from one input, packing them into one node beats the visual clutter of N separate remap+write pairs.

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |
| Bento FLIP | scroll-animations | intermediate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-bento-flip) · [`faster-claude/catalog/animations/scroll-animations/bento-flip/bento-flip.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/bento-flip/) |

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
