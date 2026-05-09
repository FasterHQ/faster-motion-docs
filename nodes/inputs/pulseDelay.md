# Pulse Delay

**Type:** `pulseDelay`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Fires `pulse` exactly `delay` seconds after a rising-edge `trigger`. Graph-native equivalent of `setTimeout(..., delay)`. Single-slot — additional triggers while a pulse is pending are absorbed (matches debounce / one-shot semantics). For per-trigger queuing, compose with `pulseCounter`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Rising-edge starts the timer (only if no pulse is currently pending). Wire from any pulse source. _(unit: pulse)_ |
| `reset` | `float` | Rising-edge cancels any pending pulse without firing. _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Single-frame `1` exactly `delay` seconds after the trigger rising edge. _(unit: pulse)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `delay` | float | `0.2` | Seconds between trigger and pulse. 0.2 for typical timeline offsets; 0.5–1.0 for animation-handoff chains. (min: 0, step: 0.05) |


## Use cases

- Timeline offset — fire chars stagger 0.2s after a slide tween starts (delayed reveal handoff).
- Debounce + delay — wait N ms after a rapid input burst settles before reacting.
- Animation handoff — chain animations: tween A finishes → wait 100ms → tween B restarts.
- Time-based content reveal — fire reveal pulse N seconds after a trigger without coupling to another animation's progress.

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
