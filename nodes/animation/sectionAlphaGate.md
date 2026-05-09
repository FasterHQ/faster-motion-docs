# Section Alpha Gate

**Type:** `sectionAlphaGate`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Per-section alpha + z-index gate for layered scroll-snap or carousel slide patterns. Writes `--alpha` (0/1) and `--z` (activeZ / inactiveZ) on `selector` based on whether `myIdx` matches the current `activeIdx`. When `exitPlaying` is wired (typical), the section stays at alpha=1 throughout its own exit fade so the outgoing section doesn't snap to invisible the instant `activeIdx` flips. Compound — expands at load to two expression nodes + two `domPropertyWrite` nodes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `activeIdx` | `float` | Currently-active integer index. Wire from `bidirectionalCounter.value`, `bidirectionalSnap.activeIdx`, or any int producer. |
| `exitPlaying` | `float` | 0/1 — when `1`, this section stays alpha=1 even though it's no longer the active index. Wire from THIS section's exit `pulseTween.playing` so the outgoing section keeps rendering until its tween finishes. Optional: omit for a hard alpha snap. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the section element receiving the alpha + z CSS variables. Inside a forEach template, set this to `{ "fromScope": "selector" }` for per-section fan-out. |
| `myIdx` | int | `0` | This section's index in the snap sequence. Inside a forEach template, set this to `{ "fromScope": "index" }` to assign automatically. Compared against `activeIdx` to decide visibility. (min: 0) |
| `activeZ` | int | `100` | Z-index applied when this section is the active one. Defaults to 100 — high enough to sit above any natural document z-stacking. |
| `inactiveZ` | int | `0` | Z-index applied when this section is NOT active. Defaults to 0 — natural document order. |
| `alphaPropertyName` | string | `"--alpha"` | CSS custom property name receiving the 0/1 alpha. Defaults to `--alpha`. |
| `zPropertyName` | string | `"--z"` | CSS custom property name receiving the z-index. Defaults to `--z`. |


## Use cases

- Section-snap fullscreen scroll demo — each section gets its own gate; only the entering section sits on top (high z) and the previous section stays alpha=1 until its exit pulseTween finishes.
- Carousel slide visibility — fan across N slides, each with `myIdx: { "fromScope": "index" }`, keeps only the active slide on top while neighbours fade in pre-prepared.
- Tab-strip / accordion content panels — alpha gates the inactive panels out, z-index keeps the active one on top.

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
