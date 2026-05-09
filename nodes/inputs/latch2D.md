# Latch (2D)

**Type:** `latch2D`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Atomic sample-and-hold for a scalar X+Y pair. On rising-edge `pulse`, captures both axes from the SAME frame.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `valueX` | `float` | Live X-axis signal being sampled. Whatever this reads on the rising edge of `pulse` gets captured to `heldX`. |
| `valueY` | `float` | Live Y-axis signal being sampled. Captured atomically together with `valueX`. |
| `pulse` | `float` | Trigger. On rising edge (0 → >0), both `valueX` and `valueY` are captured from the same frame. |
| `reset` | `float` | On rising edge, restores both held values to (`initialX`, `initialY`). |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `heldX` | `float` | Most recently captured X (or `initialX` before the first pulse). Stays constant between pulses. |
| `heldY` | `float` | Most recently captured Y (or `initialY` before the first pulse). Stays constant between pulses. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialX` | float | `0` | Output value of `heldX` before the first pulse arrives, and after each `reset` rising edge. |
| `initialY` | float | `0` | Output value of `heldY` before the first pulse arrives, and after each `reset` rising edge. |


## Use cases

- Snapshot cursor position at spawn — wire `pointer.x` / `pointer.y` into `valueX` / `valueY`; pulse from a trigger source captures the spawn point atomically.
- Drag-start coords — sample drag X+Y at the mousedown moment, hold until next gesture.
- Atomic 2-axis capture — when independent latches would risk pair drift if scheduler ordering shifted (X from frame N, Y from frame N+1).

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
