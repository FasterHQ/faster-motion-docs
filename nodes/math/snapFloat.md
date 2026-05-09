# Snap Float

**Type:** `snapFloat`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Pure 1D nearest-from-list quantizer. Snaps the input to whichever entry of `values` is closest. Empty `values` = passthrough. For magnetic-snap behaviour (eased approach to the snapped target) compose `snapFloat → smoothing(mode:exponential)` — the inlined `smooth` param this node used to expose was a duplicate of SmoothingNode and was removed in the smoothing-family unification.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `snapped` | `float` | Snapped |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `values` | string | `[]` | Snap Targets |


## See also

- [Remap](remap.md) — `remap`
- [Expression](expression.md) — `expression`
- [Smoothing](smoothing.md) — `smoothing`

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
