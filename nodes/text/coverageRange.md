# Coverage Range

**Type:** `coverageRange`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

F356: Per-character coverage window with falloff ramps. Reads coverageTime from a wired AttributeBundle at slot bundle.objectIds.indexOf(objectId).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `attributes` | Bundle |
| `charCount` | `float` | Char Count |
| `upstreamCoverage` | `attributes` | Upstream Coverage |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `coverage` | `attributes` | Coverage |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | string | `""` | Object Id |
| `modifyFrom` | float | `0` | From (min: 0, max: 1, step: 0.01) |
| `modifyTo` | float | `1` | To (min: 0, max: 1, step: 0.01) |
| `falloffFrom` | float | `0` | Falloff From (min: 0, max: 1, step: 0.05) |
| `falloffTo` | float | `0` | Falloff To (min: 0, max: 1, step: 0.05) |
| `offset` | float | `0` | Offset (step: 0.01) |
| `strength` | float | `1` | Strength (min: 0, max: 1, step: 0.05) |
| `blendMode` | enum | `"add"` | Blend. Options: `add`, `subtract`, `multiply`, `min`, `max`, `difference` |


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
