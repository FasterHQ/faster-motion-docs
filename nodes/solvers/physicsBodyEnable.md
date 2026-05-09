# Physics Body Enable

**Type:** `physicsBodyEnable`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Pure sink (no outputs) that toggles a body's solidness via `bodySetEnabled`. Wire any 0..1 signal into `enabled` to make the body intangible while the signal is below 0.5. Pattern: `physicsCollisionPulse → pulseTween → expression(1 − progress) → physicsBodyEnable.enabled` makes a static body act as a "trampoline that breaks after one bounce" — the bouncing body falls back through the body for the duration of the pulseTween, then the body becomes solid again. A separate sink node (rather than an `enabled` input on `physicsStaticBody`) keeps the scheduler's dependency graph acyclic when the gating signal is derived from collisions on the same body.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. |
| `bodyId` | `float` | Wire from `physicsStaticBody.id`, `physicsBody.id`, `physicsCollisionPulse.otherBodyId`, etc. |
| `enabled` | `float` | > 0.5 = body solid. ≤ 0.5 = body removed from broad-phase, other bodies pass through. Wireable for time-windowed or state-driven solidness. _(range: 0..1, unit: bool)_ |


## Outputs

_No outputs._

## Parameters

_No configurable parameters._

## Use cases

- Bounce-then-fall-through — `physicsStaticBody.id` filters `physicsCollisionPulse`; pulse drives `pulseTween`; tween's playing/progress feeds an expression that inverts to a 0/1 gate on `physicsBodyEnable.enabled`. Body stays solid until first contact, then intangible for the tween duration so the same body falls back through, then re-solidifies for the next bounce.
- State-machine-gated obstacles — wire `enabled` from a state-machine output so a wall only blocks while the SM is in a specific state.
- Scroll-progress-gated colliders — drive `enabled` from a scrollTrigger expression so a collider only activates within a specific scroll range.

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Static Body](physicsStaticBody.md) — `physicsStaticBody`
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
