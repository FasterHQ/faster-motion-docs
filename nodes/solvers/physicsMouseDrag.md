# Physics Mouse Drag

**Type:** `physicsMouseDrag`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — pointer-driven drag-to-throw. On `pointerdown` within `selector`, picks a body (either `bodyId` directly or by hit-testing `pickedBodyIds` against `pickElementsSelector`) and creates a kinematic anchor + spring joint. `pointermove` follows the cursor, `pointerup` releases and exposes residual velocity. The spring is rope-jointed (zero rest length) with `stiffness` / `damping` tuning the snappiness. Soft-throw natural fall through gravity / collisions are unchanged because the body remains dynamic the whole time.

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
| `stiffness` | float | `80` | Spring constant of the kinematic-anchor → body joint. Higher = body snaps tightly to the cursor (responsive but jittery on fast motion). Lower = body lags behind the cursor (slingshot feel). Default 80 is balanced for typical 100px/m px-per-meter scenes. (min: 0, step: 50) |
| `damping` | float | `12` | Damping coefficient on the spring. Higher = body settles faster after a release / direction change (heavier feel). Lower = body oscillates around the cursor (springier / more elastic feel). Default 12 critically-damps the default stiffness. (min: 0, step: 5) |
| `pickElementsSelector` | elementSelector | `""` | CSS selector matching the DOM elements that map to `pickedBodyIds` (in document order). On pointerdown, the topmost element matched by this selector under the pointer is hit-tested against pickedBodyIds to identify the grabbed body. Required when `bodyId` is unset (-1) and pickedBodyIds is wired. |


## Use cases

- Drag-to-throw stagger — wire `physicsBodyStagger.bodyIds` → `physicsMouseDrag.pickedBodyIds`, set `selector: body` and `pickElementsSelector: .ball`. User can grab any ball, sling it across the cup, watch the rest scatter on impact.
- Catapult charge — `physicsMouseDrag` on a body anchored by a `physicsJoint type: prismatic`. Drag stretches the spring; release fires it.
- Single-body drag puzzle — `bodyId` set directly to one specific body; user drags that body alone, others remain static.

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Body Stagger](physicsBodyStagger.md) — `physicsBodyStagger`
- [Physics Apply Impulse](physicsApplyImpulse.md) — `physicsApplyImpulse`

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
