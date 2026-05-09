# Fluid Sim

**Type:** `fluidSim`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Lightweight 2D fluid sim — drag injects coloured ink + velocity; the velocity field self-advects and dissipates; the dye flows along the velocity and fades. Renders to a host canvas. Produces the "wet paint trail along drag path" look used by gestural carousels and editorial sites. Requires `EXT_color_buffer_float` for RGBA16F render targets — fails loud on incompatible browsers rather than banding into RGBA8.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `splatX` | `float` | Splat centre X in host pixels. Wire from `pointer.x` (or any pixel coordinate source). |
| `splatY` | `float` | Splat centre Y in host pixels. |
| `splatVx` | `float` | Velocity injected with each splat. Wire from `dragVelocity.dx` for drag-driven flow. |
| `splatVy` | `float` | Velocity injected with each splat (Y axis). |
| `splatColor` | `color` | Ink colour added to the dye field on each splat. Wire from `paletteLut.color` for per-section ink. |
| `splatStrength` | `float` | 0..1 multiplier on the splat. 0 = skip the splat pass entirely (no paint added). The simulation still runs (existing dye continues to flow + dissipate). _(range: 0..1)_ |
| `splatRadius` | `float` | Gaussian sigma of the splat in host pixels. Larger = softer, broader strokes. Default 30. |
| `velocityDissipation` | `float` | Per-second retention of the velocity field. 1 = velocity persists (chaotic). 0.5 = halve every second (default). 0 = velocity zeroes instantly each frame. _(range: 0..1)_ |
| `dyeDissipation` | `float` | Per-second retention of paint. 1 = paint stays forever. 0.95 = slow fade (default). Lower for ephemeral trails. _(range: 0..1)_ |
| `opacity` | `float` | Final-blit opacity [0..1]. _(range: 0..1)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the host element. The simulation canvas mounts inside as a position:absolute child filling the host. |
| `simResolution` | int | `256` | Internal simulation grid size (cells, square). 256 = good default. Lower = faster + softer; higher = sharper detail at GPU cost. The display canvas is independent — it always fills the host and upsamples bilinearly. (min: 32, max: 1024) |


## Use cases

- Carousel paint trail — wire `pointer.x/.y` into `splatX/splatY`, `dragVelocity.dx/.dy` into `splatVx/splatVy`, `dragVelocity.magnitude` into `splatStrength`, and a `paletteLut.color` into `splatColor` for per-section ink.
- Cursor-following ink — same pattern but `splatStrength` driven by an `expression` like `magnitude > 50 ? 1 : 0` so the ink only appears on fast cursor moves.
- Wheel-momentum smear — wire `wheelGesture.burstMagnitude` into `splatStrength` so the field reacts to scroll bursts.
- Static reactive ambient — keep `splatStrength` low (e.g. 0.05) and `splatRadius` large for slow ambient swirls.

## See also

- [Drag Velocity](../inputs/dragVelocity.md) — `dragVelocity`
- [Pointer](../inputs/pointer.md) — `pointer`
- [Mesh Attractor](meshAttractor.md) — `meshAttractor`
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
