# Physics Body Lookup

**Type:** `physicsBodyLookup`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Body-id-as-input pose source. Takes a `bodyId` input that may change every frame (typically wired from `physicsCollisionPulse.otherBodyId` or `physicsMouseDrag.pickedBodyId`), reads the live body pose from the engine, and publishes pose + velocity outputs. `x`/`y` are converted to viewport pixels using the world's frame element so consumers like `cursorProximityWrite` and `domVariablesWrite` can use them directly. `frameX`/`frameY` expose the raw frame-local pose for graph nodes operating in physics coords.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. Loader resolves at bind for the bridge handle + frame element. |
| `bodyId` | `float` | Engine body handle. Wire from `collisionPulse.otherBodyId`, `mouseDrag.pickedBodyId`, `bodyStagger.bodyIds[i]`, or any expression. -1 = unset → outputs hold zeros. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | Body center in viewport coords. Frame-local pose × frame scale + frame BCR.left. Wire into `cursorProximityWrite.cursorX`, `domPropertyWrite`, etc. |
| `y` | `float` | Y (viewport px) |
| `frameX` | `float` | Raw frame-local pose. Use when wiring into another physics primitive that already operates in frame coords. |
| `frameY` | `float` | Frame Y (px) |
| `rotation` | `float` | Rotation (rad) |
| `vx` | `float` | Velocity X (px/s) |
| `vy` | `float` | Velocity Y (px/s) |
| `awake` | `float` | 1 while the engine considers the body active; 0 once it has settled. _(range: 0..1, unit: bool)_ |


## Parameters

_No configurable parameters._

## Use cases

- Smiley-as-cursor on impact — `collisionPulse.otherBodyId` → `bodyLookup.bodyId` → `bodyLookup.x/y` → 2nd `cursorProximityWrite.cursorX/Y`. The colliding smiley drives the same per-char push effect as the real cursor.
- Trail at the dragged body — `mouseDrag.pickedBodyId` → `bodyLookup` → `domPoseWrite` on a trail element so the trail tracks whichever ball the user is holding.
- State-machine gates on a specific body's motion — `bodyLookup.vx`/`.vy` → `expression` → state transition when speed crosses threshold.

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Collision Pulse](physicsCollisionPulse.md) — `physicsCollisionPulse`
- [Physics Mouse Drag](physicsMouseDrag.md) — `physicsMouseDrag`

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
