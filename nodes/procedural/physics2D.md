# Physics 2D

**Type:** `physics2D`  
**Category:** procedural  
**Context:** Shared — works in both DOM and canvas graphs  

F335 — single-body 2D ballistic motion. Rising-edge `trigger` launches a body from origin at `velocity` in direction `angle°`, integrates Verlet under constant `gravity` + exponential `friction`. Outputs current `(x, y)` and `(vx, vy)` so downstream graph nodes can drive position, rotation-from-velocity, fade-by-speed, etc. Auto-stops after `duration` seconds.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `x` | `float` | X |
| `y` | `float` | Y |
| `vx` | `float` | VX |
| `vy` | `float` | VY |
| `isLaunched` | `float` | Is Launched |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `velocity` | float | `800` | Velocity (min: 0, step: 50) |
| `angle` | float | `-45` | Angle (°) (step: 1) |
| `gravity` | float | `1000` | Gravity (step: 50) |
| `friction` | float | `0` | Friction (min: 0, step: 0.1) |
| `duration` | float | `3` | Duration (sec) (min: 0, step: 0.1) |


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
