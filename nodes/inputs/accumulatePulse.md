# Accumulate Pulse

**Type:** `accumulatePulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Integrates `value` per frame and emits a `pulse` each time the running total reaches `threshold`, then subtracts threshold from the accumulator (overshoot carries forward). `maxBacklog` clamps post-fire overshoot so a one-frame burst cannot queue an unbounded backlog.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `total` | `float` | Total |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `threshold` | float | `100` | Threshold (min: 0.001, step: 1) |
| `maxBacklog` | float | `1.5` | Max Backlog (min: 0, step: 0.5) |


## Use cases

- Distance-since-last-spawn triggering — feed cursor velocity (px/frame) and spawn rate becomes proportional to speed (slow = infrequent, fast = frequent). Cursor trail, image trail.
- Per-N-units events — fire every Npx of scroll, every N units of accumulated motion, every N items processed.
- Rate-limited emission from a continuous signal — convert a noisy / continuous quantity into discrete pulses paced by accumulated magnitude.

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
