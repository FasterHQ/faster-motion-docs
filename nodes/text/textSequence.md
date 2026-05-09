# Text Sequence

**Type:** `textSequence`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Cycles through a string array based on progress — outputs current text and index. The `texts` input port takes priority over the static `texts` param when wired (from textDecompose or any stringArray source), so the node composes with upstream text-data transforms without losing back-compat for .fmtion files that bake in a static array. `mode` selects the index-from-progress convention: `round` (default) = center-snap with flips at midpoints, item i centered at p=i/(N-1) — aligns with counterAnimation's round(min + p*(max-min)) so a sequence + counter scrubbed by the same progress flip in lockstep. `floor` = equal-width buckets, item i occupies [i/N, (i+1)/N) — for streamed timelines (typewriter / video-like). `cycleMode` selects how progress is mapped across multi-source arrays (where `itemSources` tags each item with its source index, typically wired from textDecompose): `forward` (default) walks the concatenated prefixes linearly, `pingPong` splits progress into S equal windows (S = source count) and runs a triangle 0→1→0 within each window — native author-level "type then delete then next phrase" typewriter cycle. With `pingPong` and no `itemSources` wired, falls back to single-source ping-pong over the whole array.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `texts` | `stringArray` | Texts |
| `itemSources` | `floatArray` | Per-item source index (one entry per `texts` item, same length). Wire from `textDecompose.itemSources`. Required for `cycleMode: pingPong` to know phrase boundaries. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `index` | `float` | Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"round"` | Index Mode. Options: `round`, `floor` |
| `cycleMode` | enum | `"forward"` | Cycle Mode. Options: `forward`, `pingPong` |


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
