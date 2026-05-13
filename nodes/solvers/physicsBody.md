# Physics Body

**Type:** `physicsBody`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

One rigid body in the wired physicsWorld. Dynamic (default) or kinematic (param). Pose, velocity, and awake state are exposed as typed output ports — wire to `domPropertyWrite` for DOM consumers, to STN inputs for canvas consumers, or to `physicsBodyTransform` for fan-out to multiple consumers.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. Loader resolves the connection and registers the body during the physics phase. |
| `enabled` | `float` | 1 = simulated, 0 = removed from broadphase + frozen at last pose. Wireable for state-machine gating. _(range: 0..1, unit: bool)_ |
| `x` | `float` | Kinematic-only: when wired, body pose is teleported to (x, y) each frame. Turns the body into a "live tracker" — wire `pointer.x` for a cursor body, or another physics body's `position.x` for a follow constraint. Pair with `frameSelector` to consume viewport-pixel pointer coords directly. Dynamic bodies ignore this. |
| `y` | `float` | Kinematic-only: see `x` input. NaN sentinel = "not wired"; both x and y must be finite for the per-frame pose teleport to fire. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `id` | `float` | Engine handle as a stable f64. Wire to joint / drag / event nodes. Opaque to authors — never inspect. |
| `position` | `vec2` | Current pose in px. Wire to `domPropertyWrite(translate)` for DOM, to STN.positionXY for canvas. |
| `rotation` | `float` | Rotation _(unit: radians)_ |
| `linearVelocity` | `vec2` | In px/s. Useful for impact pulses, parallax intensity, secondary-motion drivers. |
| `angularVelocity` | `float` | Angular Velocity _(unit: rad/s)_ |
| `awake` | `float` | 1 = simulating, 0 = sleeping (engine auto-sleeps low-velocity bodies). Wire into a `thresholdPulse` to fire "settled" effects. _(range: 0..1, unit: bool)_ |
| `x` | `float` | Convenience: just position.x. Wire into `domPoseWrite.translateX` to drive a single component. |
| `y` | `float` | Convenience: just position.y. |
| `speed` | `float` | Convenience: \|linearVelocity\|. Useful for impact intensity, parallax intensity, secondary-motion drivers. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bodyKind` | enum | `"dynamic"` | Body Kind. Options: `dynamic`, `kinematic` |
| `frameSelector` | string | `""` | Optional CSS selector. When set on a kinematic body whose `x`/`y` inputs are wired, viewport-pixel coords (e.g. raw `pointer.x/y`) are converted to body coords using this element's per-frame BCR + the world's `originAlignment`. Typical use: `frameSelector: ".stage"` on a cursor body that follows `pointer.x/y` (where pointer reads `.track-wrapper`). Leave empty to consume `x`/`y` as already-in-body-coords. |
| `shape` | physicsShape | `{"kind":"circle","radius":25}` | Body shape — pick the kind (circle, box, polygon, edge), then fill in the per-kind parameters. Dynamic bodies need a primitive shape so the engine can compute mass + inertia from density. Use `circle` for ball-like things; `box` for cards / labels; `polygon` for non-axis-aligned rigid shapes (must be convex). |
| `initialX` | float | `0` | Initial X (px) |
| `initialY` | float | `0` | Initial Y (px) |
| `initialRotation` | float | `0` | Initial Rotation (rad) (step: 0.01) |
| `initialVx` | float | `0` | Initial linear X velocity (px/s) at body creation time. Use for "thrown" entrances or pre-impulse setups. |
| `initialVy` | float | `0` | Initial linear Y velocity (px/s) at body creation. Negative on a y-down axis throws the body upward. |
| `initialAngularVelocity` | float | `0` | Initial spin in radians/second at body creation. Pair with low angular damping for sustained tumble. (step: 0.01) |
| `density` | float | `1` | Mass per unit area. 0 is reserved for static bodies — use bodyKind: "kinematic" or `physicsStaticBody` instead. (min: 0.001, step: 0.1) |
| `restitution` | float | `0.5` | 0 = no bounce, 1 = perfectly elastic, > 1 = energy-amplifying (super-bouncy). (min: 0, max: 2, step: 0.05) |
| `friction` | float | `0.5` | Surface friction coefficient. 0 = frictionless (slides forever), 1 = typical solid contact, > 1 = sticky. Combined with the touched body's friction per the engine's blend mode. (min: 0, max: 2, step: 0.05) |
| `linearDamping` | float | `0` | Per-second exponential damping on linear velocity. Higher = settles faster. (min: 0, step: 0.05) |
| `angularDamping` | float | `0` | Per-second exponential damping on angular velocity. 0 = body keeps spinning forever; raise to bleed off rotation over time. (min: 0, step: 0.05) |
| `lockRotation` | bool | `false` | When true, body cannot rotate (locks angular DOF). Useful for upright character bodies. |
| `ccd` | bool | `false` | Enables tunnelling-prevention for fast-moving small bodies. Costs slightly more CPU. |
| `canSleep` | bool | `true` | When true (default), the engine auto-sleeps the body once velocity drops below an internal threshold — gravity, forces, and joint corrections stop applying. Correct for most UI animations (settled balls SHOULD stop simulating). Set false for precision tests / pendulums where the small offset between "asleep at near-equilibrium" vs "exactly at equilibrium" matters, OR when a slept body should still be re-pulled by a wired force/joint that activates after the sleep. |


## See also

- [Physics World](physicsWorld.md) — `physicsWorld`
- [Physics Static Body](physicsStaticBody.md) — `physicsStaticBody`
- [Physics Joint](physicsJoint.md) — `physicsJoint`

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
