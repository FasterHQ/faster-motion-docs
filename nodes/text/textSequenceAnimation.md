# Text Sequence Animation

**Type:** `textSequenceAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Cycle through a sequence of strings based on progress. textSequence emits both the current string (`text`) and its position in the array (`index`, float). Authors pick any number of output targets via `channels`: `from: "text"` routes the string to any DOM string target (textContent, aria-label, CSS var, title, data-*, etc.), `from: "index"` routes the position float to any numeric CSS property (opacity gating, slide offset, step-in indicator). Compound: expands into `textSequence + one domPoseWrite + N domStringWrites` at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `texts` | string | `[]` | Text Sequence |
| `mode` | enum | `"round"` | How progress maps to the active item index. **Round** (default) centers item i at p=i/(N-1) with flips at midpoints — pair with a counterAnimation that uses `min: 1, max: N, decimals: 0` to keep counter and image flips in lockstep. **Floor** gives equal-width buckets; item 0 active for [0, 1/N), item 1 for [1/N, 2/N), etc. — natural for streamed timelines (typewriter / video-like).. Options: `round`, `floor` |
| `channels` | textSequenceChannels | `{"textContent":{"from":"tex...` | Channels |


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
