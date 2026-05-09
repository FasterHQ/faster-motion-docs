# Physics Body Teleport

**Type:** `physicsBodyTeleport`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Pure sink. On the rising edge of `trigger`, calls bodySetPose on the wired body — instantaneous position write, not solver-mediated. Optional companion bodySetVelocity. Use for "bounce once + fall through" without a global solidness gate (each contact teleports the colliding body past the obstacle, leaving the obstacle solid for everyone else), portal-style entry/exit, or reset-to-spawn on state change.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. |
| `bodyId` | `float` | Body to teleport. Wire from `physicsCollisionPulse.otherBodyId`, `physicsMouseDrag.pickedBodyId`, etc. |
| `x` | `float` | Target X |
| `y` | `float` | Target Y |
| `rotation` | `float` | Target Rotation (rad) |
| `vx` | `float` | Only applied when `setVelocity > 0.5`. |
| `vy` | `float` | Target Velocity Y (px/s) |
| `setVelocity` | `float` | > 0.5 = also apply `vx/vy` on teleport. ≤ 0.5 = preserve existing velocity (carry momentum through). _(range: 0..1, unit: bool)_ |
| `trigger` | `float` | Rising edge fires the teleport. Wire from collision pulse, click pulse, state-machine event, etc. _(range: 0..1, unit: pulse)_ |


## Outputs

_No outputs._

## Parameters

_No configurable parameters._

## Use cases

- Bounce-once-then-fall-through — `physicsCollisionPulse.otherBodyId → bodyId`, `pulse → trigger`. Teleport target Y = obstacle bottom + body radius. Static body stays solid for all other bodies; concurrent collisions each get their own bounce + drop without any shared time window.
- Reset-on-state — wire a state-machine pulse trigger; teleport body back to spawn pose.
- Portal — sensor entry pulse → teleport to portal exit, optionally carrying velocity (set `setVelocity = 1` and wire `vx/vy`).

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Apply Impulse](physicsApplyImpulse.md) — `physicsApplyImpulse`
- [Physics Collision Pulse](physicsCollisionPulse.md) — `physicsCollisionPulse`

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
