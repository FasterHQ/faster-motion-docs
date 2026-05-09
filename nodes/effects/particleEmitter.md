# Particle Emitter

**Type:** `particleEmitter`  
**Category:** effects  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Particle system — emit, advance, kill. Outputs per-particle data as AttributeBundle.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `deltaTime` | `float` | Delta Time |
| `emitRate` | `float` | Emit Rate |
| `gravity` | `vec2` | Gravity |
| `initialVelocity` | `vec2` | Initial Velocity |
| `lifetime` | `float` | Lifetime |
| `maxParticles` | `float` | Max Particles |
| `particleSize` | `float` | Particle Size |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `particles` | `attributes` | Particles |
| `activeCount` | `float` | Active Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `emitterX` | float | `0` | Emitter X (step: 1) |
| `emitterY` | float | `0` | Emitter Y (step: 1) |
| `spread` | float | `0.785` | Spread (rad) (min: 0, max: 6.28, step: 0.1) |
| `seed` | int | `0` | Seed (min: 0) |


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
