# Physics Apply Impulse

**Type:** `physicsApplyImpulse`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — pulse-triggered instantaneous impulse on a body. Same shape as `physicsApplyForce` but applies an instantaneous velocity delta (Δv = impulse/mass) instead of a continuous force across one step. Use for explosions, kicks, projectiles — anything that should change a body's velocity discontinuously.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |
| `impulse` | `vec2` | Impulse (px/s · kg) |
| `point` | `vec2` | Point (body-local px) |
| `trigger` | `float` | Trigger _(range: 0..1, unit: pulse)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `paramImpulseX` | float | `0` | Used when the `impulse` input port is unwired. Author-convenience static vector — same pattern as `physicsWorld.paramGravity{X,Y}`. (step: 10) |
| `paramImpulseY` | float | `0` | Default Impulse Y (px/s · kg) (step: 10) |
| `paramPointX` | float | `0` | Off-centre application point; (0, 0) = body centre. (step: 5) |
| `paramPointY` | float | `0` | Default Point Y (body-local px) (step: 5) |


## Use cases

- Ragdoll on hit — state-machine transition fires `physicsApplyImpulse.trigger`; impulse vector aimed away from the hit point. The character rags down naturally.
- Click-to-launch — `clickStateDispatcher.pulse` → `trigger`; impulse upward. Single click yields a one-shot launch.
- Collision-driven scatter — `physicsCollisionPulse.pulse` (v2 collision events) → `trigger`; impulse derived from the contact normal.

## See also

- [Physics Apply Force](physicsApplyForce.md) — `physicsApplyForce`
- [Physics Body](physicsBody.md) — `physicsBody`

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
