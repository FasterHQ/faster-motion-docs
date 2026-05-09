# Phase Shift

**Type:** `phaseShift`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Per-clone phase shift of a shared 0..1 progress signal. Computes `(progress + index/count) % 1`, wrapping the result into [0, 1) so it can drive any node that consumes a normalized progress (staggerWrite, multiKeyframe, propertyAnimation). Replaces the inline `((node('progress') + (node('index') / node('count'))) % 1)` expression that recurs in any forEach-instanced template that needs each clone to ride a different phase of one shared clock.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Shared 0..1 driver. Wire from a `timeline.progress`, `scrollTrigger.progress`, or any normalized signal that all clones should ride. _(range: 0..1, unit: progress)_ |
| `index` | `float` | This clone's slot. In a forEach-instanced template, set `params.index: { "fromScope": "index" }` — the F374 expander resolves it to 0..count-1 per clone. |
| `count` | `float` | Total number of slots. Wire from a sibling `domQuerySize` so the divisor tracks the live DOM (changing the HTML element count auto-rescales every clone's phase). |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Phase-shifted progress, wrapped into [0, 1). Same shape and units as the input progress — wire into the same downstream consumer types you would the raw shared timeline. _(range: 0..1, unit: progress)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | float | `0` | Unwired baseline for the index input. Templates typically pass `{ "fromScope": "index" }` here so each clone gets a different value; standalone authoring can set a literal slot. |
| `count` | float | `1` | Unwired baseline for the count input. Wire from a sibling `domQuerySize.count` for DOM-driven scaling. |


## Use cases

- Rolling text tubes — N stacked text lines splitting one shared timeline into N evenly-distributed phases (see `tube-text` demo).
- Carousels / marquees — one global cycle drives N phase-locked items; index of each item determines its slot.
- Parallax / layered animation — same scroll progress fans out into N depth-shifted clones with custom 1/N spacing.

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
