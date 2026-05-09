# Chain Physics

**Type:** `chainPhysics`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Verlet chain simulation for hair, tails, ropes. Fixed timestep with distance/angular constraints.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |
| `deltaTime` | `float` | Delta Time |
| `gravity` | `vec2` | Gravity |
| `wind` | `vec2` | Wind |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stiffness` | float | `0.8` | Stiffness (min: 0, max: 1, step: 0.05) |
| `damping` | float | `0.95` | Damping (min: 0, max: 1, step: 0.01) |
| `angularStiffness` | float | `0` | Angular Stiffness (min: 0, max: 1, step: 0.05) |
| `airResistance` | float | `5` | Air Resistance (min: 1, max: 50, step: 0.5) |
| `iterations` | int | `3` | Iterations (min: 1, max: 20) |
| `warmUpSteps` | int | `0` | Warm-Up Steps (min: 0, max: 120) |


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
