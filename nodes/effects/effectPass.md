# Effect Pass

**Type:** `effectPass`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Single-pass shader effect on any `<img>`/`<video>`/`<canvas>` source — driven by the shared `EFFECT_REGISTRY` so 27+ effects are available with no per-effect graph node. Pick the effect by name; the matching shader compiles at bind, and the effect's uniforms become wireable input ports automatically. Includes the post-effect classics (vignette, filmGrain, rgbShift, chromaticAberration, scanlines, glitch, swirl, ripple, halftone, …) and two new ones (`chromaticAberration`, `verticalSlice`) added for fluid-carousel and lens-aberration looks.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `opacity` | `float` | Final-blit opacity 0..1. _(range: 0..1)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `effect` | enum | `"vignette"` | Pick the shader effect from the registry. Each effect's uniforms appear as wireable input ports automatically — change the effect, the inspector's input handle list updates.. Options: `sepia`, `grayscale`, `invert`, `brightness`, `contrast`, `saturation`, `hueShift`, `duotone`, `vignette`, `spotlight`, `glitch`, `rgbShift`, `pixelate`, `wave`, `ripple`, `swirl`, `blur`, `radialBlur`, `motionBlur`, `scanlines`, `chromaticAberration`, `verticalSlice`, `filmGrain`, `neonGlow`, `chromakey`, `halftone`, `posterize`, `sharpen`, `emboss`, `edgeDetect` |
| `selector` | elementSelector | `""` | CSS selector for the host. The output canvas mounts here as a position:absolute child filling the host. |
| `sourceSelector` | elementSelector | `""` | CSS selector for an `<img>`, `<video>`, or `<canvas>` providing the texture. Videos + canvases re-upload every frame; images upload once on load. |


## Use cases

- Frosted-glass / depth-of-field — `effect: vignette` on the slide backdrop, intensity wired to `slideActivations[i]`.
- Film-grain overlay — `effect: filmGrain` on a hero panel, intensity ramps with scroll progress.
- RGB-shift on hover — `effect: rgbShift` on a tile, amount wired from `pointer.distance` (close = stronger split).
- Lens chromatic aberration — `effect: chromaticAberration` for a radial-fringe camera-lens feel; power=2 = quadratic falloff (sharp at centre, lens-like at edges).
- Steviaplease vertical-slice tear — `effect: verticalSlice` on a tile, sliceCount=24 + amount tied to drag velocity for the torn-strip look.
- Scanlines / CRT — `effect: scanlines` over a hero video for retro grading.

## See also

- [Textured Mesh Tile](texturedMeshTile.md) — `texturedMeshTile`
- [Fluid Sim](fluidSim.md) — `fluidSim`
- [Palette LUT](../math/paletteLut.md) — `paletteLut`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |

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
