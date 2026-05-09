# Noise Deform

**Type:** `noiseDeform`  
**Category:** paths  
**Context:** Shared — works in both DOM and canvas graphs  

Per-vertex noise displacement using 2D simplex.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |
| `strength` | `float` | Strength |
| `falloff` | `any` | Falloff |
| `amplitude` | `float` | Amplitude |
| `frequency` | `float` | Frequency |
| `seed` | `float` | Seed |
| `octaves` | `float` | Octaves |
| `lacunarity` | `float` | Lacunarity |
| `persistence` | `float` | Persistence |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `amplitude` | float | `5` | Amplitude (min: 0, max: 100, step: 0.5) |
| `frequency` | float | `0.1` | Frequency (min: 0, max: 5, step: 0.01) |
| `seed` | float | `0` | Seed |
| `octaves` | int | `1` | Octaves (min: 1, max: 6, step: 1) |
| `lacunarity` | float | `2` | Lacunarity (min: 1, max: 4, step: 0.1) |
| `persistence` | float | `0.5` | Persistence (min: 0, max: 1, step: 0.05) |


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
