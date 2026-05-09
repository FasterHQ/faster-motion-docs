# Palette LUT

**Type:** `paletteLut`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Sample a 1D colour palette at position `t` ∈ [0..1] with configurable interpolation (sRGB or perceptually-uniform OKLab) and wrap mode (clamp / repeat / mirror). Stops can be static (param) or dynamically wired via `inputStops` for computed palettes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `t` | `float` | Palette position. Behaviour outside [0..1] depends on `wrapMode`. _(range: 0..1, unit: fraction)_ |
| `inputStops` | `floatArray` | Optional flat `[pos, r, g, b, a, ...]` array (5 entries per stop). When wired and non-empty, overrides the static `stops` param. Use for computed / theme-derived palettes. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | The interpolated colour at `t`. |
| `r` | `float` | R _(range: 0..1)_ |
| `g` | `float` | G _(range: 0..1)_ |
| `b` | `float` | B _(range: 0..1)_ |
| `a` | `float` | A _(range: 0..1)_ |
| `colorHex` | `string` | CSS-ready hex string (`#rrggbb` or `#rrggbbaa` if alpha < 1). |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stops` | colorPaletteStops | `[]` | Ordered colour stops: `[{ position: 0..1, color: { r, g, b, a } }, ...]`. Sorted on bind. Overridden by wired `inputStops` when present. |
| `wrapMode` | enum | `"clamp"` | `clamp` (default) — t outside [0..1] returns first / last stop. `repeat` — t = fract(t). `mirror` — triangle wave (1.5 → 0.5; 1.7 → 0.3).. Options: `clamp`, `repeat`, `mirror` |
| `interpolationMode` | enum | `"srgb"` | `srgb` — linear in sRGB channels (default; cheapest; matches naive lerp). `oklab` — perceptually uniform interpolation; significantly nicer for palettes that span hues. Slightly more expensive.. Options: `srgb`, `oklab` |


## Use cases

- Per-slide background colour — author lists slide colours as palette stops, slideRouter.currentIndex / slideCount drives `t`. Wire `color` into a `domPropertyWrite` background.
- Heatmap / data-viz value → colour mapping — `wrapMode: clamp` + `interpolationMode: oklab` for perceptual uniformity.
- Cyclic gradient sweep — `wrapMode: repeat` for an infinite hue cycle driven by time or scroll.
- Theme drift — wire `inputStops` from a state machine (computed at runtime) so the palette itself can change, not just `t`.

## See also

- [Color Tween](../animation/colorTween.md) — `colorTween`
- [Color Keyframe](../animation/colorKeyframe.md) — `colorKeyframe`
- [Expression](expression.md) — `expression`

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
