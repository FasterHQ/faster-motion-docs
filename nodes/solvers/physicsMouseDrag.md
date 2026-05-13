# Physics Mouse Drag

**Type:** `physicsMouseDrag`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Pointer-driven drag-to-throw. On `pointerdown` within `selector`, picks a body (either `bodyId` directly or by hit-testing `pickedBodyIds` against `pickElementsSelector`). The body stays DYNAMIC throughout the drag — the engine applies a per-substep force `F = stiffness × clamp(cursor − body, maxStretch) − damping × body_velocity` toward the cursor. Static walls stop the dragged body via the engine's normal contact resolution; the spring just pushes harder when the cursor goes past a wall. `pointermove` updates the cursor target; `pointerup` releases and exposes residual velocity (computed from the user's last ~80ms of pointer motion, applied to the body so flick-to-throw lands cleanly).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. Loader resolves at bind to register the drag listener. |
| `bodyId` | `float` | Specific engine body to drag. Use when ONE body is draggable. Default -1 = use pickedBodyIds + pickElementsSelector to hit-test on pointerdown (typical for stagger / multi-element scenes). |
| `pickedBodyIds` | `floatArray` | Wire from `physicsBodyStagger.bodyIds` when `bodyId` is unset (-1). On pointerdown, the node hit-tests pickElementsSelector against this array in document order to figure out which body the user grabbed. |
| `enabled` | `float` | When 0, pointer events are ignored — drag is paused. Wireable for state-machine gating ("only draggable in idle state"). _(range: 0..1, unit: bool)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `dragging` | `float` | 1 while a body is currently grabbed and following the pointer; 0 otherwise. Wire into expression / state-machine triggers to fire effects on grab/release. _(range: 0..1, unit: bool)_ |
| `pointerWorld` | `vec2` | Live pointer position in world coords (px). Only meaningful while dragging — frozen at last value on pointerup. |
| `releasedVelocity` | `vec2` | On pointerup, snapshots the body's residual linear velocity (px/s) so downstream effects can react proportionally to throw strength. Wire into a `pulseTween` for impact intensity, into a `physicsApplyImpulse` for force amplification, etc. |
| `pickedBodyId` | `float` | Engine handle of the currently-grabbed body, or -1 when not dragging. Useful for filtering collision-pulse subscribers to "only the body the user is holding." |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `"body"` | CSS selector for the element that receives `pointerdown` to start a drag. Move + up are listened on `window` so the drag continues even when the cursor leaves the surface. Default `body` covers full-page drag. |
| `stiffness` | float | `1500` | Spring constant in N/m. Force pulling the body toward the cursor scales linearly with cursor-to-body separation up to `maxStretch`. Default 1500 with default damping 15 and maxStretch 40 px gives terminal velocity ~4000 px/s — body keeps up with normal-to-fast cursor motion. Lower (200) feels rubber-bandy/heavy; higher (5000+) feels rigid but risks wall penetration if maxStretch is not lowered accordingly. (min: 0, step: 100) |
| `damping` | float | `15` | Velocity-opposing coefficient in N·s/m. Determines the body's terminal velocity (≈ stiffness · maxStretch / damping) when chasing the cursor. Default 15 is sub-critical (~0.4× critical for a typical 0.3 kg body at k=1500), giving small follow-through overshoot — natural draggable feel. Raise toward 2·sqrt(k·m) for over-damped / sluggish. (min: 0, step: 1) |
| `maxStretch` | float | `40` | Cap on cursor-to-body separation that contributes to spring force. Bounds peak force = stiffness × maxStretch so an arbitrarily-far cursor (e.g. user drags way past a wall) can't drive force past the engine's contact-correction budget — what keeps the dragged body inside walls under sustained pull. 40 px is comfortable; smaller = tighter wall containment but more cursor lag at speed; larger = body keeps up better but contact penetration depth grows. (min: 0, step: 5) |
| `pickElementsSelector` | elementSelector | `""` | CSS selector matching the DOM elements that map to `pickedBodyIds` (in document order). On pointerdown, the topmost element matched by this selector under the pointer is hit-tested against pickedBodyIds to identify the grabbed body. Required when `bodyId` is unset (-1) and pickedBodyIds is wired. |


## Use cases

- Drag-to-throw stagger — wire `physicsBodyStagger.bodyIds` → `physicsMouseDrag.pickedBodyIds`, set `selector: body` and `pickElementsSelector: .ball`. User can grab any ball, sling it across the cup, watch the rest scatter on impact.
- Catapult charge — `physicsMouseDrag` on a body anchored by a `physicsJoint type: prismatic`. Drag stretches the spring; release fires it.
- Single-body drag puzzle — `bodyId` set directly to one specific body; user drags that body alone, others remain static.

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Body Stagger](physicsBodyStagger.md) — `physicsBodyStagger`
- [Physics Apply Impulse](physicsApplyImpulse.md) — `physicsApplyImpulse`

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
