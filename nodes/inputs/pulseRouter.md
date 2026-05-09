# Pulse Router

**Type:** `pulseRouter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Demultiplex one pulse to one of `count` output channels by integer `index`. Rising edge on `pulse` produces a single-frame spike on `out{Math.round(index)}`; out-of-range follows `defaultRoute` (set to -1 to drop).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `index` | `float` | Index |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `1` | Channels (min: 1, max: 256) |
| `defaultRoute` | int | `-1` | Default Route (min: -1) |


## Use cases

- Round-robin spawn — pair with pulseCounter to drive N independent flair / particle / image instances cycled across pulses.
- Channel selector — switch between alternate animations based on an integer state (e.g. tab index → enter/exit channel).
- Layer / row dispatch — fan a single trigger into one of N layout positions for grid-stagger effects.

## See also

- [Indexed Dispatch](indexedDispatch.md) — `indexedDispatch`
- [Pulse Dispatch](pulseDispatch.md) — `pulseDispatch`
- [Pulse OR](pulseOr.md) — `pulseOr`

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
