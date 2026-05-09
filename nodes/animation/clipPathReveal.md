# Clip Path Reveal

**Type:** `clipPathReveal`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Bidirectional CSS clip-path inset reveal. Drives `--clip-top` and `--clip-bottom` CSS variables on `selector` from a 0..1 progress + a forward / backward direction pair, so `clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0)` rolls open from the bottom up on forward arrival and from the top down on backward arrival. Compound — expands at load to two expression nodes + two `domPropertyWrite` nodes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | 0..1 reveal driver. 0 = fully clipped (hidden), 1 = fully visible. Wire from a tween, pulseTween, scroll progress, or any normalised 0..1 source. |
| `forward` | `float` | 0/1 latch — when `1`, the top inset animates and the bottom stays at 0%. Wire from `directionLatch.forwardActive`. The directionLatch already enforces forward / backward exclusivity so the unused side never animates. |
| `backward` | `float` | 0/1 latch — when `1`, the bottom inset animates and the top stays at 0%. Wire from `directionLatch.backwardActive`. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element receiving the clip-path CSS variables. Inside a forEach template, set this to `{ "fromScope": "selector" }` to fan-out per matched section. |
| `topPropertyName` | string | `"--clip-top"` | CSS custom property name receiving the top inset percentage. Defaults to `--clip-top` matching the demo CSS contract. |
| `bottomPropertyName` | string | `"--clip-bottom"` | CSS custom property name receiving the bottom inset percentage. Defaults to `--clip-bottom`. |
| `cssUnit` | string | `"%"` | CSS unit appended to the written value. Defaults to `%`. |


## Use cases

- Section-snap fullscreen scroll demo — each section's background image reveals from below on forward scroll, from above on backward scroll, with a single 0..1 progress driving both directions.
- Page-transition reveals — background image stays put while the inset rolls back, no jank from animating the image position itself.
- Hero-wipe intros — pair with a `pulseTween` to ramp progress 0→1 on load, gives a clean theatrical reveal without bespoke math nodes per side.

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
