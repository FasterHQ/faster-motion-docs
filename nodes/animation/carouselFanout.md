# Carousel Fanout

**Type:** `carouselFanout`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Runtime fan-out of a shared keyframe template across N DOM elements with phase-shifted local time. Resolves matching elements at bind time via `selector` and runs all N slot evaluations inside one node — replaces the legacy expansion-time fan-out (`carouselEffectAnimation` → N × `slideSlotAnimation` × 4 primitives) with a single runtime node. Preferred runtime shape; `carouselEffectAnimation` is the author-facing compound that emits one of these. Channels accept the simple `{cssUnit?, template?, keyframes}` shape and the composed `{template, channels: { sub: { keyframes } }}` shape that drives multi-input CSS strings (`filter: blur({blur}px) brightness({bright})`) without going through CSS variables.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `playhead` | `float` | Playhead |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector matching every slot element. Document order = slot order. |
| `slotStride` | float | `0.1` | Slot Stride (playhead) (step: 0.01) |
| `slotWindow` | float | `1` | Slot Window (step: 0.05) |
| `slotOffsetBase` | float | `0` | Slot 0 Offset (step: 0.05) |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | Shared keyframe template. Optional per-channel `template: "blur({value}px)"` for single-input string writes; composed `{template, channels: { sub: { keyframes } }}` for multi-input CSS string writes (`filter`, `clip-path`). |


## See also

- [Carousel Effect Animation](carouselEffectAnimation.md) — `carouselEffectAnimation`
- [Slide Slot Animation](slideSlotAnimation.md) — `slideSlotAnimation`
- [Multi Keyframe](multiKeyframe.md) — `multiKeyframe`
- `carouselWrapCounter` _(not in author-facing docs)_

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
