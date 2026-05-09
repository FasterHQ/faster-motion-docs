# Wheel Gesture

**Type:** `wheelGesture`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

DOM wheel listener that fires one pulse per noticeable scroll burst with a lockout window — the gesture model used by full-screen scrolljack / slide-deck navigation. Accumulates `deltaY`, fires a single-frame `pulse` once accumulated travel crosses `threshold`, then ignores further wheel events for `lockoutMs` (typically the slide transition duration). Resets the accumulator after `restMs` of idle so a slow scroll doesn't drift toward the threshold.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gateInput` | `float` | When > 0.5 the node ignores wheel events regardless of the time-lockout. Wire from any boolean-shaped graph signal — e.g. `slideRouter.transitionProgress` (any non-zero value means in-flight) to debounce visibly even when the lockoutMs window mismatches the actual transition. _(unit: gate)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Single-frame rising-edge spike when a burst crosses threshold. _(unit: pulse)_ |
| `direction` | `float` | +1 forward / -1 backward / 0 idle. Sign of the burst that fired the most-recent pulse. |
| `accumDelta` | `float` | Current accumulated signed delta on the chosen axis (debug introspection). |
| `burstMagnitude` | `float` | \|accumulated\| at the moment of the most-recent fire. Authors who want "advance N slides on a violent scroll" wire this through `floor(burstMagnitude / threshold)` to count multi-step bursts. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Element to listen on. **Leave empty** for window-scope (the right choice for most full-page wheel navigation). Set a specific selector only to scope to a region. |
| `axis` | axisChooser | `"y"` | Which delta channel(s) feed the accumulator. Vertical (deltaY) is the default for slide decks; horizontal (deltaX) for galleries; both lets dominant-axis bursts fire either direction. |
| `threshold` | float | `60` | Accumulated \|delta\| on the chosen axis required to fire a pulse. Default 60. (min: 1) |
| `lockoutMs` | float | `800` | Time after a pulse during which further wheel events are ignored. Use the `gateInput` port for transition-aware lockout instead of a fixed-time guess. (min: 0) |
| `restMs` | float | `250` | Idle time after which the accumulator resets to zero. Prevents slow continuous scroll from drifting toward threshold. (min: 0) |


## Use cases

- Full-screen slide-deck navigation — wire `wheelGesture.pulse` → `slideRouter.advance` directly. One scroll burst = one slide. (Combine with a second `wheelGesture` filtered to negative direction → `slideRouter.retreat` if you want bidirectional gesture-driven nav.)
- Section-snap pages — same pattern as above with one section per pulse.
- Direction-aware skip — read `direction` (+1/-1) to choose between forward/backward state machine transitions.

## See also

- [Observer](observer.md) — `observer`
- [Threshold Pulse](thresholdPulse.md) — `thresholdPulse`
- [Pulse Counter](pulseCounter.md) — `pulseCounter`
- [Click Pulse](clickPulse.md) — `clickPulse`

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
