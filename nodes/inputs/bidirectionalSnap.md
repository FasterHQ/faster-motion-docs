# Bidirectional Snap

**Type:** `bidirectionalSnap`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Self-contained wheel-driven discrete-step navigator. Bundles observer + threshold pulses + counter + direction latch + initial-load pulse + indexed dispatcher into one author-facing node. Outputs an integer `activeIdx` that wraps in [0, count), forward / backward latches for direction-aware reveals, and per-section enter / exit pulse pairs (`enter_out{i}`, `exit_out{i}`) fired on every `activeIdx` edge. Compound — expands at load to ~8 primitives.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `activeIdx` | `float` | Currently-active integer section index (in [0, count)). Snaps on each wheel-driven step. |
| `forwardActive` | `float` | 0/1 latch — `1` when the most recent step was forward (wheel-down). Use to gate forward-only animation values. |
| `backwardActive` | `float` | 0/1 latch — `1` when the most recent step was backward (wheel-up). Mirror of `forwardActive`. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `1` | Number of sections / slots in the snap sequence. Auto-derived from a sibling forEach instance's match count when wired with `indexed: true` — manual setting only needed for non-forEach hand-wired graphs. (min: 1, max: 256) |
| `mountSelector` | elementSelector | `""` | CSS selector for the element the observer attaches its wheel listener to. Empty = window-level (most common for fullscreen snap demos). Set to a scrollable container for embedded carousels. |
| `threshold` | float | `30` | Minimum signed delta-Y per evaluate to count as a step. Lower = more sensitive (small trackpad nudges fire); higher = more deliberate. Default 30 matches typical wheel-event magnitudes. (min: 1, step: 1) |
| `cooldownMs` | int | `1300` | Minimum milliseconds between consecutive step pulses. Prevents one continuous wheel gesture from firing multiple steps. Default 1300 is roughly the section transition duration — tune to match your enter tween length. (min: 0, step: 100) |
| `tolerance` | float | `50` | Pass-through to the internal observer node. Filters tiny scroll noise that shouldn't register as motion at all. Default 50. (min: 0, step: 1) |


## Use cases

- Section-snap fullscreen scroll — wheel up / wheel down advances or retreats one section at a time; the indexedDispatch fires paired enter / exit pulses so the leaving section's exit tween and the entering section's enter tween both run from the same edge.
- Vertical or horizontal carousel — same compound, just point each per-slide gate at the carousel's slide elements.
- Scroll-spy nav, tab strip stepper — anywhere a wheel / keyboard / button click moves a single integer cursor and N parallel pipelines all need their per-slot pulses.

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
