# Event Listener

**Type:** `eventListener`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Boundary node — binds a DOM event listener on the target element and emits a graph pulse every frame an event fired. `fired` is 1/0 per frame; `count` is the number of events seen this frame (for click-counting / rapid-fire aggregation). The event queue captures every event between graph ticks, so nothing is dropped on busy frames.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `fired` | `float` | 1 if any events arrived this frame, 0 otherwise. Use as a rising-edge pulse — wire into `pulseTween.play` / `pulseTween.restart`, `latch.pulse`, `bidirectionalCounter.increment`, or any node accepting a trigger pulse. _(range: 0..1, unit: gate)_ |
| `count` | `float` | Number of events seen this frame. Useful for rapid-click counting (multiple clicks in one frame) or aggregating events into a counter. Most consumers want `fired` (0/1) instead — `count` is for cases where the event multiplicity matters. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | elementSelector | `""` | CSS selector for the element to bind the event listener on. Multiple matches: listener attaches to all matched elements; events from any of them fire the same `fired` pulse. Examples: `.btn-open`, `#modal-trigger`, `body` (page-wide). |
| `event` | domEvent | `"click"` | DOM event name. Pick from the grouped list (pointer / keyboard / focus / form / scroll / clipboard) or type a custom event. The runtime calls `addEventListener(name, handler)` directly — any browser-supported event works. |


## Use cases

- Modal / drawer open-close — bind `click` on a button, wire `fired` into a `pulseTween.play` (or `latch.pulse`) to drive a graph-native open/close transition. Replaces `addEventListener` boilerplate for graph-driven interactions.
- Hover toggles — pair two eventListeners (`mouseenter` + `mouseleave`) into `pulseTween.play` / `pulseTween.reverse` for forward-and-reverse animations on hover. Or use the `eventTween` compound which bundles this pattern.
- Click-count UIs — wire `count` into a `bidirectionalCounter` for like / vote / step counters. Each tick increments by the number of clicks that frame.
- Keyboard triggers — set `event: keydown` and gate downstream by a key-code expression (or use `keyboardListener` for built-in key matching).

## See also

- [Modal Toggle](modalToggle.md) — `modalToggle`
- [Click State Dispatcher](clickStateDispatcher.md) — `clickStateDispatcher`
- [Event Tween](../animation/eventTween.md) — `eventTween`
- [Keyboard Listener](keyboardListener.md) — `keyboardListener`
- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`
- [Latch](latch.md) — `latch`

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
