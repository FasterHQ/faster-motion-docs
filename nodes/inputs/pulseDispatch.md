# Pulse Dispatch

**Type:** `pulseDispatch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

One pulse in, one of N channels out per pulse. `strategy` picks the dispatch rule. Replaces the accumulator + counter + router triplet.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Continuous signal that auto-accumulates to pulses at `threshold`. Wire ONE of `value` or `pulse`, not both. |
| `pulse` | `float` | Pre-formed pulse signal — drives the selector directly, skipping the accumulator. Wire ONE of `value` or `pulse`, not both. |
| `reset` | `float` | Hold high to reset the accumulator and selector to their initial state. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `strategy` | enum | `"roundRobin"` | How channels are picked for each pulse. Round Robin = cycle 0,1,...,N-1 (rhythmic, predictable). Random = pick a random channel (organic, less mechanical). Sequential = fire channels 0..N-1 once then stop (one-shot reveals).. Options: `roundRobin`, `random`, `sequential` |
| `threshold` | float | `0.07` | Accumulated `value` required to fire one pulse (value-mode only — ignored when `pulse` is wired directly). Lower = more frequent pulses; higher = sparser. Example: 0.07 for cursor trail (fires every ~70 px of cursor velocity), 1.0 for slow ambient spawn. (min: 0.001, step: 0.01) |
| `maxBacklog` | float | `1.5` | Caps how many "make-up" pulses can queue from a one-frame burst (e.g. cursor flicked across screen). 0 = no backlog (drop excess); 1.5 = up to 1.5× threshold worth of catch-up pulses. Prevents a single fast move from emptying every channel at once. (min: 0, step: 0.5) |
| `count` | int | `1` | Number of output channels. Auto-derived from `forEach` match count when wired indexed — manual setting is only needed for non-forEach hand-wired graphs. Example: 18 for 18-flair trail, 4 for a 4-corner ripple. (min: 1, max: 256) |
| `defaultRoute` | int | `-1` | Channel to fire when the selector returns an out-of-range index. -1 = drop the pulse (most common). Set to a specific channel index to use it as a fallback. (min: -1) |
| `seed` | int | `1` | Random strategy only. PRNG seed — same seed produces the same sequence on every load, useful for deterministic replay. Example: 1, 42, 1337. |
| `avoidRepeat` | bool | `false` | Random strategy only. When on, never picks the same channel twice in a row (rerolls). Useful for trails/spawns where back-to-back same-target reads as glitchy. |


## Use cases

- Cursor / image trail spawn — feed `mouseVelocity.magnitude` to `value`, wire indexed `out` to a per-element `forEach` instance. Round-robin or random dispatch picks which element each pulse spawns.
- Grid-stagger reveals — feed scroll / time progress as a pulse source, dispatch to N stagger slots in sequence.
- Particle bursts — accumulate a continuous signal (audio, scroll velocity), fire random-channel pulses to scatter spawns across N targets.

## See also

- [Indexed Dispatch](indexedDispatch.md) — `indexedDispatch`
- [Pulse Router](pulseRouter.md) — `pulseRouter`
- [Click State Dispatcher](clickStateDispatcher.md) — `clickStateDispatcher`

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
