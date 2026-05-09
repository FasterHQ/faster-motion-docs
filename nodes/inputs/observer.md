# Observer

**Type:** `observer`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Gesture detector — listens for wheel / touch / pointer / scroll events on a target and outputs accumulated deltas. Events accumulate internally until the magnitude crosses `tolerance`, at which point the per-frame `deltaX` / `deltaY` outputs spike to the gesture amount for one frame, then reset to 0 next frame. Pair with `thresholdPulse` to convert deltas into discrete pulses, then `pulseCounter` for snap navigation.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `deltaX` | `float` | Horizontal gesture magnitude. Positive = right / scroll-right; negative = left / scroll-left. Non-zero only on the frame a gesture crosses tolerance; resets to 0 next frame. |
| `deltaY` | `float` | Vertical gesture magnitude. Positive = down / scroll-down; negative = up / scroll-up. Non-zero only on the frame a gesture crosses tolerance; resets to 0 next frame. |
| `isPressed` | `float` | For pointer / touch eventType: `1` while the pointer / touch is down, `0` otherwise. Useful as a gate for press-driven effects. _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element to listen on. **Leave empty** to attach to `window` — that's the right choice for most full-page wheel / touch navigation, since wheel events from anywhere in the viewport still fire on window. Set a specific selector only when you want gestures restricted to one element's region (e.g. `.scrolly-section` for a section-scoped wheel listener). |
| `eventType` | enum | `"wheel"` | Which input modality to detect. **Wheel** covers mouse wheel AND trackpad two-finger scroll on macOS. **Touch** covers mobile / tablet finger scroll. **Pointer** covers mouse-button-held drag. **Scroll** observes the target's `scroll` event (use `scrollTrigger` for richer scroll-driven progress with edge windows). **Note:** only one type per Observer node — author multiple Observers if you need wheel AND touch.. Options: `wheel`, `touch`, `pointer`, `scroll` |
| `axis` | enum | `"y"` | Which axis registers gestures. **Y** for typical vertical-scroll navigation, **X** for horizontal carousels, **Both** when both axes drive things (e.g. a 2D pan).. Options: `x`, `y`, `both` |
| `tolerance` | float | `10` | Accumulator threshold. Wheel events accumulate internally; the node fires `deltaX` / `deltaY` once their cumulative magnitude exceeds this value, then resets the accumulator. **Lower** (~5) = sensitive to small flicks, fires often. **Higher** (~50) = requires a real gesture, fires rarely. For section-snap use `30–50`; for continuous velocity reactions use `5–10`. (min: 1, max: 200, step: 1) |


## Use cases

- Section-snap navigation — `observer` (eventType: wheel) → `thresholdPulse` (rising on |deltaY|) → `pulseCounter` (wrap) → per-section gates → section transitions. (See `section-snap` demo.)
- Scroll-velocity reactive effects — wire `deltaY` through `smoothing` to drive a skew / blur / parallax intensity that responds to scroll speed.
- Touch / drag detection without `dragInput` — when you only need raw deltas (not full drag-progress 0..1), `eventType: touch` gives the same delta stream.
- Press-and-hold gating — `isPressed` output (1 while pointer / touch is down) gates downstream effects without writing your own listener.

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
