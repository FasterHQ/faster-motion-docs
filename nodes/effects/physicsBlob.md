# Physics Blob

**Type:** `physicsBlob`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Soft-body blob silhouette built on a Verlet mass-spring chain. N point particles arranged in a closed circular loop, each connected to its neighbour and skip-1 neighbour by stiff distance-springs, with rest-pose attraction so the shape always recovers. Cursor interaction is a per-particle Gaussian-falloff repulsion. Adjacent particles follow through the spring network, so the silhouette stays C¹-smooth no matter how hard the cursor pulls — no vertex-shader V-cusps. Rendered via Canvas2D as a closed Catmull-Rom curve (converted to cubic Bézier segments) filled with the channel colour. Use this when you want a smooth soft-body blob silhouette; use `meshAttractor` when you want fullscreen WebGL mesh distortion of arbitrary geometry.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Host Element |
| `geometrySource` | meshGeometrySource | `{"kind":"round","segmentCou...` | Pick any geometry source — round / spike / blob / svgPath / textOutline / clipPath / rawVertices. The vertex array becomes the rest layout for the spring chain. Same picker as meshAttractor. |
| `radius` | float | `-1` | Used by radial generators (round / spike / blob). -1 = auto (~40% of min host dimension). |
| `stiffness` | float | `0.9` | Spring stiffness 0..1. Higher = blob holds shape more rigidly. Lower = jelly-like deformation. (min: 0.05, max: 1, step: 0.05) |
| `damping` | float | `0.06` | Air friction per frame. Higher = settles faster. (min: 0, max: 0.3, step: 0.01) |
| `iterations` | int | `6` | Constraint relaxation passes per frame. More = stiffer / less stretchy. 6 is balanced. (min: 1, max: 16) |
| `centreX` | float | `-1` | -1 = auto (host centre). |
| `centreY` | float | `-1` | -1 = auto. |
| `channels` | meshAttractorChannels | `{}` | F375 — same channel-config shape as meshAttractor. Each channel can be a literal value, a wireable port, or a port with inspector default. |


## Use cases

- Cursor-reactive section blob — drop one per `.blob` host with `mouseX/mouseY` from `pointer`, leave defaults for jump/dist; the blob gently pushes away from the cursor and settles back.
- Title-band background — host a `physicsBlob` on the title strip with a low jump for subtle wobble; particles redistribute around the cursor without breaking the silhouette.
- Hover button — small blob with high stiffness so it returns fast, low jump for a subtle press-back effect.

## See also

- [Mesh Attractor](meshAttractor.md) — `meshAttractor`
- [Pointer](../inputs/pointer.md) — `pointer`

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
