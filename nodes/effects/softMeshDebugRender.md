# Soft Mesh Debug Render

**Type:** `softMeshDebugRender`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Second renderer type for softMesh — F381 P1.5. Proves the typed-port output of `softMesh` is renderer-agnostic by consuming the IDENTICAL set of typed ports as `softMeshRender` (vertices, subpathStarts, sharpFlags, bodyCenterX/Y) but rendering a STROKED outline instead of a filled subpath. Also consumes `restVertices` for an optional rest-pose ghost overlay underneath the live outline — useful as a debug aid to see how far the live silhouette has drifted from its rest pose.

Wire one softMesh into both renderers (softMeshRender for fill, softMeshDebugRender for outline / rest ghost) and you have a fill + wireframe debug view from a single sim, demonstrating that swapping renderers requires zero changes to the sim.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `vertices` | `float32buffer` | Wire from `softMesh.vertices`. Live concatenated vertex buffer in body coords. |
| `restVertices` | `float32buffer` | Wire from `softMesh.restVertices` for the rest-pose ghost. Optional — set `restOpacity: 0` if unwired. |
| `subpathStarts` | `uint16buffer` | Wire from `softMesh.subpathStarts`. Same layout for both vertices and restVertices. |
| `sharpFlags` | `uint16buffer` | Wire from `softMesh.sharpFlags`. Sharp-corner flag per vertex. |
| `bodyCenterX` | `float` | Wire from `softMesh.bodyCenterX`. |
| `bodyCenterY` | `float` | Wire from `softMesh.bodyCenterY`. |
| `opacity` | `float` | Stroke opacity for the live outline, 0..1. _(range: 0..1)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Required. Match the linked softMesh's `selector`. |
| `colour` | colorString | `"#1a1a1a"` | Live Outline Colour |
| `restColour` | colorString | `"#888888"` | Rest Ghost Colour |
| `restOpacity` | float | `0.4` | 0 = hide rest ghost (live outline only). 0.3-0.5 = visible ghost beneath live deformation. (min: 0, max: 1, step: 0.05) |
| `strokeWidth` | float | `1.5` | Stroke Width (px) (min: 0.5, max: 10, step: 0.5) |


## Use cases

- Fill + outline debug overlay — pair with `softMeshRender` on the same softMesh; fill renders the silhouette, debug renders the stroked outline.
- Rest-pose ghost — wire `softMesh.restVertices` into `restVertices`; set `restOpacity: 0.4`. Shows the original rest silhouette ghosted under the live deformation.
- Wireframe-only view — set `restOpacity: 0` and omit the fill renderer to render only the deforming outline.

## See also

- [Soft Mesh](softMesh.md) — `softMesh`
- [Soft Mesh Render](softMeshRender.md) — `softMeshRender`

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
