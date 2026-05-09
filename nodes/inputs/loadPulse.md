# Load Pulse

**Type:** `loadPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Fires a single-frame `pulse` on the first graph evaluation, then stays at 0 forever. The graph-native equivalent of "do this once at startup". Replaces the common hack of `(time > 0.05 ? 1 : 0)` expression + thresholdPulse rising-edge detector — that pattern silently failed because of thresholdPulse's cold-start rule (first-frame-above-threshold is NOT a rising edge).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Single-frame `1` on the first evaluation, `0` thereafter. _(unit: pulse)_ |


## Parameters

_No configurable parameters._

## Use cases

- Trigger a chars-stagger reveal at page load (wire to staggerWrite's upstream restart pulse).
- Prime a `directionLatch` so the initial direction is forward (wire to its `forward` input).
- Restart a `pulseTween` once on init so it animates to a settled state at load.

## See also

- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`
- [Event Listener](eventListener.md) — `eventListener`
- [Threshold Pulse](thresholdPulse.md) — `thresholdPulse`

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
