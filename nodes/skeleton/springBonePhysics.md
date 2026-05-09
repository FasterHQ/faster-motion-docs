# Spring Bone

**Type:** `springBonePhysics`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Rotational spring — bone rotation follows parent with spring dynamics, gravity, and wind.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |
| `deltaTime` | `float` | Delta Time |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bonePoses` | `attributes` | Bone Poses |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `boneIndex` | int | `0` | Bone Index (min: 0) |
| `parentBoneIndex` | int | `-1` | Parent Bone Index (min: -1) |
| `stiffness` | float | `2` | Stiffness (min: 0, step: 0.1) |
| `damping` | float | `0.5` | Damping (min: 0, max: 1, step: 0.05) |
| `mass` | float | `1` | Mass (min: 0.01, step: 0.1) |
| `maxAngle` | float | `1.5708` | Max Angle (rad) (min: 0, max: 3.14159, step: 0.1) |
| `gravityX` | float | `0` | Gravity X (step: 1) |
| `gravityY` | float | `0` | Gravity Y (step: 1) |
| `windX` | float | `0` | Wind X (step: 1) |
| `windY` | float | `0` | Wind Y (step: 1) |


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
