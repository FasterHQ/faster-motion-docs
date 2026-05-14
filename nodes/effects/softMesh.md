# Soft Mesh

**Type:** `softMesh`  
**Category:** effects  
**Context:** Shared — works in both DOM and canvas graphs  

Sim-only soft-body mesh. F381 P1.1. Owns a verlet ring simulator (edge springs + position-anchored shape match + body wrap/dent + cursor Gaussian press) and emits the deformed mesh through typed graph ports — NOT a sim-handle reference. Renderers consume `vertices`, `subpathStarts`, `sharpFlags`, and `bodyCenterX/Y` to draw the mesh without ever touching the sim object directly (F311 graph-native data flow).

**Geometry source** (param `geometrySource`) accepts every kind the meshAttractor catalogue does: `round` / `spike` / `blob` / `svgPath` / `textOutline` / `clipPath` / `rawVertices`. `textOutline` produces multi-glyph rings (one ring per character outer contour with hole topology preserved). All other kinds produce a single ring. Single node handles all rest-shape kinds.

**Cursor force gate**: pushes balls within `mouseSigma` of cursor when (a) cursor is in the Gaussian zone of the rest pose AND (b) cursor is moving (smoothing-invariant 6-frame ring activity check, F381 P0.2). Frame walker honours the world's `frameSelector` directly (F381 P0.1) — no `[data-fm-physics-frame]` HTML attribute required.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire from `physicsWorld.world`. Provides the body coord frame + (optional) body coupling handle. |
| `bodyIds` | `floatArray` | Optional. Engine body handles to test for ball↔mesh contact. Wire from `physicsBodyStagger.bodyIds` for ball-on-mesh interaction. Empty = no body coupling, mesh is purely a cursor-driven visual. |
| `mouseX` | `float` | Cursor X in viewport pixels (from `pointer` with `space: viewport`). Triggers Gaussian press on the rings. Unset / NaN = no cursor effect. |
| `mouseY` | `float` | Cursor Y in viewport pixels. |
| `geomVertices` | `float32buffer` | F381 P2.3 — wire from a shared `glyphGeometry` / `shapeGeometry` source to share rest pose with sibling consumers (e.g. `physicsStaticBody{kind:fromGeometry}`). When wired, softMesh uses these buffers instead of building its own from the inline `geometrySource` param — visible mesh + rigid collider are aligned by construction. Wire ALL three buffer inputs + `geomBodyCenterX/Y` together; partial wiring throws. |
| `geomSubpathStarts` | `uint16buffer` | Wire from the geometry source's `subpathStarts`. Required when `geomVertices` is wired. |
| `geomRingSubpathCounts` | `uint16buffer` | Wire from the geometry source's `ringSubpathCounts`. Required when `geomVertices` is wired. |
| `geomBodyCenterX` | `float` | Wire from the geometry source's `bodyCenterX`. Defines the cursor / render anchor — must match the geometry source's frame of reference. Required when `geomVertices` is wired. |
| `geomBodyCenterY` | `float` | Wire from the geometry source's `bodyCenterY`. Required when `geomVertices` is wired. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `vertices` | `float32buffer` | Live concatenated vertex buffer in body coords [x0,y0,x1,y1,...]. Includes EVERY subpath — outer rings AND holes — in traversal order. Wire into `softMeshRender.vertices`. Allocated once at init, mutated in place per frame (no GC churn). |
| `restVertices` | `float32buffer` | REST-pose vertex buffer in body coords (same layout as `vertices` — same subpathStarts + sharpFlags apply). Static; written once at init and never mutated. Wire into `softMeshDebugRender.restVertices` for a rest-pose ghost overlay, or any consumer that needs to compare live deformation against the original silhouette. |
| `subpathStarts` | `uint16buffer` | Vertex-pair start index of each subpath (outer rings + holes, flat in traversal order). Wire into `softMeshRender.subpathStarts`. Length = total subpath count. |
| `ringSubpathCounts` | `uint16buffer` | Entry i = number of subpaths in ring i (1 outer + N holes). First subpath per ring is outer; remaining are holes. Lets consumers like `physicsStaticBody{kind:fromGeometry}` (P2.2) skip hole subpaths when building rigid colliders. |
| `sharpFlags` | `uint16buffer` | Sharp-corner flag per vertex (1 = sharp `lineTo`, 0 = smooth `quadraticCurveTo`). Wire into `softMeshRender.sharpFlags`. |
| `bodyCenterX` | `float` | Snapshot body-coord X of the rest pose centroid. Renderers translate so this maps to the live host centre — keeps the visual glued to the host element even when the physics frame moves independently (scroll-deck layouts). Wire into `softMeshRender.bodyCenterX`. |
| `bodyCenterY` | `float` | Snapshot body-coord Y of the rest pose centroid. Wire into `softMeshRender.bodyCenterY`. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the host element. Used to size the rest pose (auto radius) and resolve the physics frame for cursor coord conversion. |
| `geometrySource` | meshGeometrySource | `{"kind":"round","segmentCou...` | Pick any geometry kind: round / spike / blob / svgPath / textOutline / clipPath / rawVertices. textOutline produces multi-glyph rings (one ring per character). |
| `radius` | float | `-1` | -1 = auto (~40% of min host dimension). For multi-glyph text, the whole word is refit to fit `2 * radius`. |
| `edgeStiffness` | float | `1` | Per-pass edge-spring relaxation strength. (min: 0, max: 1, step: 0.05) |
| `constraintIterations` | int | `6` | Edge-spring + shape-match passes per frame. (min: 1, max: 16) |
| `restShapeStrength` | float | `0.1` | Position-anchored shape match. 0 = no recovery (mesh can collapse); 1 = rigid (no deformation). 0.05–0.2 = wobble + readable recovery. (min: 0, max: 1, step: 0.01) |
| `damping` | float | `0.04` | Verlet damping per step. (min: 0, max: 0.3, step: 0.01) |
| `gravityScale` | float | `0` | 0 = mesh floats; 1 = falls under world gravity. |
| `bodyRadius` | float | `14` | Treat all incoming bodies as circles of this radius for impulse coupling. |
| `deformZone` | float | `-1` | Soft-contact distance from ball centre. Verts within this distance get pulled to the ball surface (curved dent). Should be slightly larger than bodyRadius. -1 = auto. |
| `mouseSigma` | float | `80` | Gaussian falloff sigma for cursor displacement. |
| `mouseJump` | float | `30` | Peak cursor displacement at the cursor location. 0 = no cursor effect. |
| `wrapStrength` | float | `0.25` | Per-pass conform aggression. 0 = no wrap (ball appears to float); 1 = instant snap. (min: 0, max: 1, step: 0.05) |
| `cursorForceScale` | float | `0.5` | How strongly the cursor drags in-cursor-zone balls. (min: 0, max: 2, step: 0.05) |
| `bodyImpulseScale` | float | `0` | How aggressively the soft ring kicks balls back on impact. 0 (default) = OFF (rigid colliders handle bounce). Per-pass capped internally so high values don't exceed the engine's CCD budget. (min: 0, max: 2, step: 0.05) |
| `impactDentScale` | float | `0.5` | Velocity-scaled extra dent on impact. 0 = thrown ball deforms same as settled ball. 0.5 = visible squish, recovers via shape match. (min: 0, max: 2, step: 0.05) |
| `impactDentMax` | float | `14` | Cap on velocity-driven dent depth. (min: 0, step: 1) |
| `cornerSharpnessDeg` | float | `25` | Rest-pose interior turn-angle threshold for sharp corners. 25° works for Inter Black; lower = chunkier silhouette, higher = rounder. (min: 0, max: 90, step: 5) |


## Use cases

- Soft-body letter row — `geometrySource: textOutline` + `softMeshRender`. Cursor presses letters smoothly; balls (via `bodyIds`) dent text on impact.
- Cursor-reactive blob silhouette — `geometrySource: round/blob/spike` + `softMeshRender`. The cursor presses a deformable blob; no body coupling needed.
- Logotype micro-interaction — `geometrySource: svgPath` of a logo path + `softMeshRender`. Cursor warps the logo silhouette.

## See also

- [Soft Mesh Render](softMeshRender.md) — `softMeshRender`
- [Physics Body Stagger](../solvers/physicsBodyStagger.md) — `physicsBodyStagger`
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
