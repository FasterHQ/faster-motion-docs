# Text Decompose

**Type:** `textDecompose`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Pure text-data transform. Splits one or more source strings into an array of strings by granularity (char/word/sentence/line) and optionally reshapes into a cumulative pyramid (prefixes/suffixes). Decouples the data-shape problem from animation — feed items[] into textSequence, variantStagger, or any index-driven consumer. Example: granularity=char, shape=prefixes on "Sunny" → ["S","Su","Sun","Sunn","Sunny"] (classic typewriter). Input precedence (highest wins): `sources` stringArray port (multi-source — typically wired from domStringArrayRead for i18n cycles), `sources` string[] param, `text` string port (single-source wire), `text` string param. Multi-source mode decomposes each entry and concatenates — one graph chain types through every word in order. Emits a parallel `itemSources: floatArray` output that tags each item with its source index — lets downstream nodes drive per-source side effects (per-word colors, opacities, etc.) without re-deriving boundaries.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `sources` | `stringArray` | Sources |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `items` | `stringArray` | Items |
| `count` | `float` | Count |
| `itemSources` | `floatArray` | Item → Source |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | `""` | Source text (fallback) |
| `granularity` | enum | `"char"` | Granularity. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"atoms"` | Shape. Options: `atoms`, `prefixes`, `suffixes` |
| `includeEmpty` | bool | `false` | Prepend empty entry |
| `stripWhitespace` | bool | `false` | Strip whitespace-only entries |
| `separator` | string | `—` | Custom separator (overrides granularity) |


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
