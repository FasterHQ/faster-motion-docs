# Physics Collision Pulse

**Type:** `physicsCollisionPulse`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — fires a one-frame `pulse: 1.0` on the frame a tracked body collides with another body. Filters by `bodyId` (required) and optionally `withBodyId` (specific second-body); set the `event` param to `start` (contact-begin) or `end` (separate). Composes 1:1 with `pulseTween`, state-machine triggers, and `expression` math for "ball lands → squash" or "two bodies meet → spawn".

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Required. Track collisions involving this body. -1 = disabled. |
| `withBodyId` | `float` | Optional second-body filter. -1 = match any other body. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse _(range: 0..1, unit: pulse)_ |
| `otherBodyId` | `float` | Other Body ID |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `event` | enum | `"start"` | `start` fires on contact-begin (most common). `end` fires on separation.. Options: `start`, `end` |


## Use cases

- Squash on landing — `physicsCollisionPulse.pulse` → `pulseTween {duration: 0.15, ease: easeOutBack}` → scale-Y multiplier on the body's element transform. The ball bounces and squishes on each ground contact.
- Combo counter — counts how many balls have hit the floor; `physicsCollisionPulse` per-ball → accumulator → text update. (Pair with `physicsBodyStagger.bodyIds` and one pulse node per index.)
- Spawn-on-impact — collision pulse triggers a `clickStateDispatcher`-style state transition that introduces a new particle / sound / VFX object.

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
