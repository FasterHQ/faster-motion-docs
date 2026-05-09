# Direction Latch

**Type:** `directionLatch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Maintains a ±1 direction value, flipped to +1 on rising-edge `forward` or -1 on rising-edge `backward`. Outputs `direction` (signed) plus `forwardActive` / `backwardActive` (binary 0/1) for use as multipliers in direction-aware animation expressions. Replaces the pulseTween-of-duration-0.001s + sign-extracting expressions hack.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `forward` | `float` | Rising-edge trigger. Sets direction to +1. _(unit: pulse)_ |
| `backward` | `float` | Rising-edge trigger. Sets direction to -1. _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `direction` | `float` | Current direction: +1 forward, -1 backward. _(range: -1..1)_ |
| `forwardActive` | `float` | `1` when direction is +1, else `0`. Multiply forward-only values by this. _(range: 0..1)_ |
| `backwardActive` | `float` | `1` when direction is -1, else `0`. _(range: 0..1)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialDirection` | enum | `1` | Direction held until the first input pulse fires. Default forward.. Options: `1`, `-1` |


## Use cases

- Bidirectional section-snap — wire wheel-down pulse to `forward`, wheel-up to `backward`. Multiply slide-in animation values by `direction` so forward/backward animations come from below/above respectively.
- Toggle between two modes with hysteresis-free latching (last gesture wins).
- Track scroll velocity sign without needing per-frame scroll tracking — only the direction of the most recent crossing matters.

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
