# Soft Mesh Render

**Type:** `softMeshRender`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Canvas2D overlay renderer for a softMesh. F381 P1.2. Consumes the mesh through typed input ports — `vertices`, `subpathStarts`, `sharpFlags`, and `bodyCenterX/Y`, all wired from the linked `softMesh` outputs. No sim-handle / DOM-ref side channels: this node never touches the sim object directly (F311 graph-native data flow).

Mounts a `<canvas>` overlay inside the host resolved from this node's `selector` param (required — set it to the same selector as the linked softMesh). Translates body coords to host-local px by anchoring `bodyCenterX/Y` to the live host centre, so the rendered mesh stays glued to the host even when the underlying physics world frame moves independently (scroll-deck layouts where the world frame lives off-screen while the host scrolls into view). Draws closed subpaths with mixed `lineTo` (sharp corners) / `quadraticCurveTo` (smooth curves through edge midpoints), filled with the author's colour.

**Multiple renderers can wire to one softMesh** — e.g. a main fill plus a debug ghost overlay with different opacity / colour / selector. The simulator computes once; renderers each draw their own canvas.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `vertices` | `float32buffer` | Wire from `softMesh.vertices`. Live concatenated vertex buffer in body coords. |
| `subpathStarts` | `uint16buffer` | Wire from `softMesh.subpathStarts`. Vertex-pair start index of each subpath. |
| `sharpFlags` | `uint16buffer` | Wire from `softMesh.sharpFlags`. Sharp-corner flag per vertex. |
| `bodyCenterX` | `float` | Wire from `softMesh.bodyCenterX`. Snapshot rest centroid in body coords. |
| `bodyCenterY` | `float` | Wire from `softMesh.bodyCenterY`. Snapshot rest centroid in body coords. |
| `opacity` | `float` | Fill opacity 0..1. _(range: 0..1)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Required. CSS selector for the host element the canvas mounts inside. Match the linked softMesh's `selector` so the visual is anchored to the same DOM element the sim was sized to. |
| `colour` | colorString | `"#1a1a1a"` | Fill Colour |


## Use cases

- Visible mesh — wire `softMesh.vertices/subpathStarts/sharpFlags/bodyCenterX/bodyCenterY` to the matching inputs, set `selector` + `colour`. Standard pairing.
- Debug ghost overlay — second softMeshRender wired to the same softMesh with `opacity: 0.3` and a contrasting colour, mounted on a different selector for side-by-side.

## See also

- [Soft Mesh](softMesh.md) — `softMesh`

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
