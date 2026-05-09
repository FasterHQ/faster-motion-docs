# Physics Force Field

**Type:** `physicsForceField`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

F379 — continuous force field acting on a fleet of bodies each frame, computed from each body's distance to a moving (or static) field centre. Replaces JS-spring CSS effects (e.g. `cursorProximityWrite`) when targets are physics-bound elements: keeps everything inside ONE physics simulation, so cursor pushes and ball impacts compose cleanly through Rapier instead of fighting at the CSS layer.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | World |
| `bodyIds` | `floatArray` | Fleet to act on. Wire from `physicsStaticBodyEach.bodyIds` or `physicsBodyStagger.bodyIds`. |
| `centerX` | `float` | Field source x. Viewport coords when `frameSelector` is set; otherwise body coords. Wire `pointer.x` for a cursor-driven field. |
| `centerY` | `float` | Center Y (px) |
| `enabled` | `float` | Enabled _(range: 0..1, unit: bool)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"repel"` | Mode. Options: `repel`, `attract` |
| `radius` | float | `200` | Effective range. Bodies further than this from the centre receive zero force. (min: 0, step: 10) |
| `strength` | float | `50` | Peak force magnitude at the centre. Decays to 0 at the radius edge per `falloff`. Tune with respect to body density × mass. (step: 5) |
| `falloff` | enum | `"linear"` | Falloff. Options: `linear`, `inverse`, `inverseSquare` |
| `frameSelector` | string | `""` | Optional CSS selector for viewport→body coord transform on `centerX/Y`. Set when wiring raw `pointer.x/y` so the field centre tracks the visible cursor in the world's coord space. Leave empty when `centerX/Y` are sourced from another physics body or already in body coords. |


## Use cases

- Cursor repulsor — wire `pointer.x/y → centerX/centerY`, `physicsStaticBodyEach.bodyIds → bodyIds`, set `mode: repel`, `radius: 200`. Cursor pushes letters/cards/grid items away with smooth falloff.
- Magnetic cursor — same wiring, `mode: attract`, `falloff: inverse`. Bodies suck toward cursor; pair with a stiff spring tether for snap-back.
- Static gravity well — `centerX/Y` driven by literal coords (not pointer). Bodies orbit / fall toward the well.
- Ball-pit nudge — multiple force fields (one per cursor / one per touch point) target the same body fleet; their contributions stack additively at the physics layer.

## See also

- [Physics Apply Force](physicsApplyForce.md) — `physicsApplyForce`
- [Physics Static Body (per element)](physicsStaticBodyEach.md) — `physicsStaticBodyEach`
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
