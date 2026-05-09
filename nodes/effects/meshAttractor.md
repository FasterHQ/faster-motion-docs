# Mesh Attractor

**Type:** `meshAttractor`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Fullscreen WebGL mesh with per-vertex displacement driven by up to two mouse attractors. Generates a tessellated 2D silhouette (`round` / `spike` / `blob`) — or accepts a custom `[x0,y0,...]` vertex array for arbitrary shapes (hearts, SVG-imported, text-derived). Falloff curve is selectable (gaussian / linear / smoothstep / inverse-square). F375 channels-driven authoring: every input (mouseX/Y, coef, jump, dist, opacity, colour, …) is a *channel* — author it as a literal value (`{ value: ... }`) for static settings or as a wireable port (`{ port: true, default?: ... }`) to feed it from upstream. Channels not declared in `params.channels` use the per-node default and surface no port handle, so simple cases need no wiring at all.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `geometrySource` | meshGeometrySource | `—` | Pick a built-in generator (round / spike / blob), import an SVG path, render a glyph outline, paste a CSS polygon, or draw a polygon directly. |
| `centreX` | float | `-1` | -1 = auto (host centre). |
| `centreY` | float | `-1` | -1 = auto. |
| `radius` | float | `-1` | -1 = auto (~40% of min dimension). |
| `falloffEase` | easingCurve | `—` | Easing curve mapping cursor distance → falloff weight. Any ease registered on FM (linear / easeOutCubic / sine.inOut / cubic-bezier(...) / etc.) — baked to a 64-entry LUT and sampled in the vertex shader. |
| `channels` | meshAttractorChannels | `{}` | F375 — per-channel authoring. Toggle each channel between literal value (no port), wireable port, or wireable port with inspector default. Float channels also support multiply / offset / curve scaling on the wired path (cooked = curve(raw × multiply + offset)). |


## Use cases

- Interactive hero — declare `mouseX`/`mouseY` as `{ port: true }`, leave the rest as literal channels for static colour / jump / dist.
- Two-pointer / multi-touch attractor — promote `mouseX2`/`mouseY2`/`coef2` to ports and wire from a second `pointer` or touch listener.
- Pointer + scroll attractor — `coef` channel as port, `coef2` channel as port; wire pointer to `coef`, scroll velocity to `coef2`.
- Per-section colour drift — `colour: { port: true }`, wire `slideRouter.slideActivations` → `floatArrayPick` → `paletteLut.color` → `colour`.
- Static palette per blob — `colour: { value: "#f5b023" }`, no upstream colour source needed (the literal-only channel materialises no port).
- Custom silhouette — set `customVertices` to an SVG-imported polygon or a text-derived outline.

## See also

- [Pointer](../inputs/pointer.md) — `pointer`
- [Smoothing](../math/smoothing.md) — `smoothing`
- [Palette LUT](../math/paletteLut.md) — `paletteLut`

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
