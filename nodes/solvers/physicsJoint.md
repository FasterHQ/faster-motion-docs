# Physics Joint

**Type:** `physicsJoint`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F367 step 5 v2 — one constraint between two bodies. Backed by Rapier ImpulseJointSet. Four kinds: `distance` (rope-like, fixed length between anchors), `revolute` (pin joint, free rotation around anchor), `prismatic` (slider along axis), `weld` (fully fixed pose). Wire `bodyA` / `bodyB` from `physicsBody.id` outputs OR from indexed entries of `physicsBodyStagger.bodyIds` to address bodies inside a stagger.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyA` | `float` | First body endpoint. Wire from `physicsBody.id` or an `arrayPick` of `physicsBodyStagger.bodyIds`. |
| `bodyB` | `float` | Second body endpoint. |
| `enabled` | `float` | Enabled _(range: 0..1, unit: bool)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `id` | `float` | Engine handle for the joint; useful for debug introspection. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `jointKind` | enum | `"distance"` | Joint Kind. Options: `distance`, `revolute`, `prismatic`, `weld` |
| `localAnchorA` | string | `[0,0]` | Body-A-local px offset of the joint anchor as JSON `[x, y]`. [0,0] = body centre. |
| `localAnchorB` | string | `[0,0]` | Body-B-local px offset as JSON `[x, y]`. |
| `length` | float | `100` | Distance joint: rest length between anchors. Ignored for other kinds. (min: 0, step: 10) |
| `lowerAngle` | float | `null` | Lower Angle (rad) — revolute only (step: 0.1) |
| `upperAngle` | float | `null` | Upper Angle (rad) — revolute only (step: 0.1) |
| `lowerTranslation` | float | `null` | Lower Translation (px) — prismatic only |
| `upperTranslation` | float | `null` | Upper Translation (px) — prismatic only |
| `localAxisA` | string | `[1,0]` | Slider axis as a 2D vector [x, y]. Normalised internally. |


## Use cases

- Tetherball — one ball jointed to a fixed anchor body via `distance`. Distance acts as the rope length; the ball swings under gravity.
- Skeleton ragdoll — `revolute` joints between adjacent bone bodies with `lowerAngle` / `upperAngle` limits modelling joint stops. Triggered by a state-machine impulse.
- Cloth banner — N bone bodies in a row + N-1 `distance` joints with low stiffness. Combined with a wind force from `physicsApplyForce` driven by Perlin-noise expression.

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Body Stagger](physicsBodyStagger.md) — `physicsBodyStagger`
- [Physics World](physicsWorld.md) — `physicsWorld`

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
