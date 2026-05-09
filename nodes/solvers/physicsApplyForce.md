# Physics Apply Force

**Type:** `physicsApplyForce`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — pulse-triggered continuous force on a body. On the rising edge of `trigger` (last frame ≤ 0, this frame > 0), the engine queues `force` for the next world step. Force in px/s². Held HIGH does NOT continuously apply — only the rising edge fires once. For continuous force, drive `trigger` with a `cycleClock` or rapid pulse train.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyId` | `float` | Body ID |
| `force` | `vec2` | Force (px/s²) |
| `point` | `vec2` | Off-centre point applies torque in addition to force. (0, 0) = body centre. |
| `trigger` | `float` | Rising-edge pulse. Wire from `clickStateDispatcher.pulse`, `thresholdPulse`, `physicsCollisionPulse`, etc. _(range: 0..1, unit: pulse)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `paramForceX` | float | `0` | Used when the `force` input port is unwired. Author-convenience static vector — same pattern as `physicsWorld.paramGravity{X,Y}`. (step: 100) |
| `paramForceY` | float | `0` | Default Force Y (px/s²) (step: 100) |
| `paramPointX` | float | `0` | Off-centre application point; (0, 0) = body centre. Off-centre force produces torque. (step: 5) |
| `paramPointY` | float | `0` | Default Point Y (body-local px) (step: 5) |


## Use cases

- Wind / drift — `physicsApplyForce.force` wired from an `expression` sampling Perlin noise; `trigger` held to 1 by a `cycleClock` for periodic re-application.
- Click-to-push — `clickStateDispatcher.pulse` → `trigger`; `force` from a constant vector. Fires once per click.
- Sustained gravity well — multiple bodies, each with a `physicsApplyForce` pulled toward a central point via per-body `expression` math.

## See also

- [Physics Apply Impulse](physicsApplyImpulse.md) — `physicsApplyImpulse`
- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Body Stagger](physicsBodyStagger.md) — `physicsBodyStagger`

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
