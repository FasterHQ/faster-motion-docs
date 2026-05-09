# Random Float

**Type:** `randomFloat`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Picks a uniform random float in [`min`, `max`) on each rising-edge `pulse` and holds it until the next pulse. Wire into a tween's `to` for per-spawn variety (random rotation, scale variance, fall distance).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Trigger. On rising edge (0 → >0), a fresh random float is sampled. |
| `reset` | `float` | On rising edge, restarts the PRNG sequence from `seed` and resamples. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Most recently sampled float in [`min`, `max`). Stays constant between pulses. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `min` | float | `0` | Lower bound (inclusive) of the random range. Example: -360 for full-rotation range, 0 for positive-only values. |
| `max` | float | `1` | Upper bound (exclusive) of the random range. Example: 360 paired with min=-360 → angle in degrees [-360, 360). |
| `seed` | int | `1` | PRNG seed (mulberry32). Same seed → same sequence on every load. Examples: 1, 42, 1337. |


## Use cases

- Random rotation per spawn — wire `value` into a tween's `to`, set `min: -360, max: 360`. Each pulse picks a fresh angle.
- Random duration / amplitude — vary tween range per fire so trail items / particles don't look mechanical.
- Deterministic randomness — set `seed` for reproducible sequences across reloads.

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
