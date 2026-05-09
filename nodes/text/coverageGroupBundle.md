# Coverage Group Bundle

**Type:** `coverageGroupBundle`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

F356: Author-facing compound for a coverage group + N coverage ranges with self-aligning bundle reads. Expands at load to one `coverageGroup` + N `coverageRange` primitives with a shared `bundle` connection — no `bundleRead` intermediaries. Compound: no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `attributes` | Bundle |
| `upstream` | `mat4Bundle` | Upstream |
| `charCount` | `float` | Char Count |
| `smWritesDone` | `any` | SM Writes Done |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `charTransforms` | `mat4Bundle` | Char Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | string | `""` | Object Id |
| `flags` | int | `63` | Flags |
| `originX` | float | `0` | Origin X (step: 1) |
| `originY` | float | `0` | Origin Y (step: 1) |
| `invertOpacity` | bool | `false` | Invert Opacity |


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
