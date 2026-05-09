# Color Tween

**Type:** `colorTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Perceptually uniform color interpolation in OKLab space. Emits a packed `color` bundle for direct wiring, plus individual r/g/b channels for legacy consumers.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | 0..1 driver. At 0, output = `fromColor`; at 1, output = `toColor`. Wire from timeline, scrollTrigger, or any normalized signal. _(range: 0..1, unit: progress)_ |
| `fromColor` | `color` | Optional Color-typed override of the From Color param. When wired, the tween starts at this incoming color. Use to chain a colorTween's output into another, or sample from a palette / image / state. _(unit: color)_ |
| `toColor` | `color` | Optional Color-typed override of the To Color param. Same behavior as From Color (input). _(unit: color)_ |
| `hueOffset` | `float` | Optional hue rotation in degrees applied to BOTH from/to colors before interpolation. 0 = unchanged. 180 = opposite hue. Wire a randomFloat (0..360) for per-spawn random color, or a time-driven signal for continuous color cycling. _(unit: degrees)_ |
| `saturation` | `float` | Multiplier on the chroma (a, b) magnitude. 1 = unchanged, 0 = full grayscale, 1.5 = boosted chroma. Useful for "fade to grey" by ramping 1→0 over lifecycle, or per-spawn variety with randomFloat. _(unit: multiplier)_ |
| `alpha` | `float` | 0..1 alpha applied to the output Color bundle. Wire from an opacity tween to fold opacity into the same node — replaces a separate opacity-write path. _(range: 0..1, unit: fraction)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `color` | `color` | Packed Color bundle (RGBA). Wire into a `domPoseWrite` color-typed property port (or any Color-typed input). _(unit: color)_ |
| `r` | `float` | Red channel as a 0..255 float — for legacy r/g/b consumers. _(range: 0..255, unit: byte)_ |
| `g` | `float` | Green channel 0..255. _(range: 0..255, unit: byte)_ |
| `b` | `float` | Blue channel 0..255. _(range: 0..255, unit: byte)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fromColor` | colorString | `"#000000"` | Color at progress=0 (when From Color input port is unwired). Pick from the swatch or paste hex / rgb() / hsl(). |
| `toColor` | colorString | `"#ffffff"` | Color at progress=1 (when To Color input port is unwired). Same format as From Color. |
| `ease` | easingCurve | `"linear"` | Easing curve applied to progress before color interpolation. Use power2.out / expo.out to front-load the color shift (color reaches near-final state early in lifecycle). |
| `saturation` | float | `1` | Default chroma multiplier when Saturation port is unwired. 1 = unchanged. (min: 0, max: 3, step: 0.05) |
| `alpha` | float | `1` | Default output alpha when Alpha port is unwired. 1 = fully opaque. (min: 0, max: 1, step: 0.05) |


## Use cases

- Lifecycle color shift — wire `progress` from a timeline, set `fromColor`/`toColor` to head/tail colors. Output `color` drops into a `domPoseWrite` color-typed property port (e.g. `backgroundColor` with `portType: "color"`) or any color-typed input.
- Hot-to-cold visualization — bind a 0..1 metric (intensity, distance, age) to progress; OKLab keeps midpoints perceptually balanced unlike RGB lerp.

## See also

- [Tween](tween.md) — `tween`
- [Pulse Tween](pulseTween.md) — `pulseTween`
- [Remap](../math/remap.md) — `remap`

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
