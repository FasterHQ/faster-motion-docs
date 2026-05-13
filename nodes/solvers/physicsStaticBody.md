# Physics Static Body

**Type:** `physicsStaticBody`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Immovable static collider — walls, floors, arc-shaped bowls, sensor trigger zones. No pose outputs (it never moves), only an `id: float` for joints + event listeners. The `arc` shape is parameterised as a circular segment of N edge-chain segments, used for the dental ball-drop cup brim.

**F381 P2.2 — `shape.kind: 'fromGeometry'`** reads vertex data from a wired `glyphGeometry` / `shapeGeometry` / `softMesh` source via the `vertices` + `subpathStarts` + `ringSubpathCounts` typed input ports. One closed polyline body is created per OUTER ring (hole subpaths are skipped — balls land on top of an "o", not inside its counter). For multi-glyph text, this means N rigid colliders are created with `id` reporting the first one (sentinel; use `physicsStaticBodyEach` or `physicsBodyLookup` to enumerate). Pair with the SAME geometry source feeding a `softMesh` so visible mesh + collider stay aligned by construction.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. |
| `vertices` | `float32buffer` | Wire from `glyphGeometry.vertices` / `shapeGeometry.vertices` / `softMesh.vertices` when `shape.kind: 'fromGeometry'`. For static colliders that should track a stable rest pose, prefer wiring from `softMesh.restVertices`. Ignored for other shape kinds. |
| `subpathStarts` | `uint16buffer` | Wire from the geometry source's `subpathStarts`. Ignored for other shape kinds. |
| `ringSubpathCounts` | `uint16buffer` | Wire from the geometry source's `ringSubpathCounts`. Lets the body builder skip hole subpaths and emit one polyline per outer ring. Ignored for other shape kinds. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `id` | `float` | Engine handle. Wire to joint or collision-event nodes that filter by body. |
| `centerX` | `float` | For `kind: arc`, the resolved center X in document px. Wire to `physicsBodyStagger.targetCenterX` to spawn dynamics centered on the cup mouth without hand-syncing two sets of viewport units. |
| `topY` | `float` | For `kind: arc`, the Y of the upper opening edge in document px (the higher of the two arc endpoints in screen coords). Pair with `targetCenterX` for IK-style spawn-into-cup. |
| `bottomY` | `float` | For `kind: arc`, the lowest point in document px (`cy + radius`). Useful for bottom-aligned spawning or measuring interior cup height. |
| `mouthWidth` | `float` | Width of the shape's mouth/opening (chord between v0 and v(N-1) for open polylines, bbox width for closed shapes, chord between arc endpoints for `kind: arc`). Wire to `physicsBodyStagger.targetMouthWidth` + set spawnPattern: "fanFromMouth" to fan N balls evenly across the mouth without hand-tuning per-ball spacing. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `shape` | physicsShape | `{"kind":"box","width":100,"...` | Static collider shape — pick the kind (circle, box, polygon, edge, arc, polyline, fromSelector) and fill in the per-kind parameters. **Recommended for art-aligned colliders: `From Selector`** — derives the polyline from a live SVG element, resize-safe, no magic numbers. **For arbitrary shapes: `Polyline`** — vertex chain, same authoring story as clipPath. Use `arc` only when an analytic circular arc is needed without a backing element. |
| `x` | float | `0` | World-space X position of the body in px. CSS units like "50vw" / "100px" also accepted; the loader resolves to px at bind time. Static bodies do not move under simulation; this is the fixed pose. |
| `y` | float | `0` | World-space Y position of the body in px. CSS units accepted ("12vh", "200px"); resolved at bind. Static bodies do not move under simulation. |
| `rotation` | float | `0` | Body orientation in radians. Static bodies hold this rotation forever. Use π/4 ≈ 0.785 for 45°, π ≈ 3.14159 for 180°. (step: 0.01) |
| `restitution` | float | `0.5` | 0 = no bounce (dynamic bodies stick to this surface on impact), 1 = perfectly elastic (energy preserved), > 1 = energy-amplifying. Combined with the dynamic body's restitution per the engine's blend mode. (min: 0, max: 2, step: 0.05) |
| `friction` | float | `0.5` | Surface friction coefficient. 0 = ice (dynamic bodies slide forever), 1 = typical solid surface, > 1 = high friction. Combined with the dynamic body's friction. (min: 0, max: 2, step: 0.05) |
| `isSensor` | bool | `false` | When true, the collider generates collision events but does not push other bodies. Use for trigger zones — pair with `physicsCollisionPulse` (v2) to detect entry/exit. |


## See also

- [Physics World](physicsWorld.md) — `physicsWorld`
- [Physics Body](physicsBody.md) — `physicsBody`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |
| Studio Showreel | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-wheel-deck-blob) · [`faster-claude/catalog/animations/scroll-animations/wheel-deck-blob/wheel-deck-blob.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/wheel-deck-blob/) |

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
