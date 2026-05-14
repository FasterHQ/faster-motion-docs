# Slide Router

**Type:** `slideRouter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Gestural N-stage routing with eased transitions. Owns its own discrete-index state and runs an internal eased clock between consecutive indices. Three input triggers (`advance`, `retreat`, `seekTo`) replace the upstream `pulseCounter` chain — wire wheel / click / key gestures directly. Slide count auto-derives from `slidesSelector` (preferred) or is configured manually via `slideCount`. Emits a continuous `currentIndex` (lerped during transition), the latched `discreteIndex`, eased `transitionProgress`, and a `slideActivations` Float[N] channel.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `advance` | `float` | Trigger. Each rising edge bumps the slide index by +1. Wraps to 0 if `wrap` is on; clamps to last otherwise. _(unit: pulse)_ |
| `retreat` | `float` | Trigger. Each rising edge bumps the slide index by -1. Wraps to last if `wrap` is on; clamps to 0 otherwise. _(unit: pulse)_ |
| `seekTo` | `float` | Wireable absolute index. When finite and changed, snaps to that integer index (clamped to [0, slideCount-1]). Use NaN (the default) to mean "no seek" and let advance / retreat drive instead. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `currentIndex` | `float` | Continuous interpolated index. Lerps from prev to next via the eased clock during a transition; equals `discreteIndex` at rest. Wire to e.g. a `paletteLut` for a continuous colour sweep. |
| `discreteIndex` | `float` | Most-recent latched integer target. Use for "active slide" identity. |
| `transitionProgress` | `float` | Eased 0..1 during a transition; 0 at rest. `isTransitioning` is just `progress > 0` — no separate boolean. _(range: 0..1, unit: fraction)_ |
| `slideActivations` | `floatArray` | Float[N] channel — entry i is slide i's activation 0..1. Use `floatArrayPick(index: i)` to fan out per-slide. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slidesSelector` | elementSelector | `""` | CSS selector for the slide elements. `slideCount` auto-derives from `querySelectorAll(...).length` at bind. Preferred over manual `slideCount` for DOM-driven decks. Leave empty to use `slideCount` instead. |
| `slideCount` | int | `—` | Manual slide count. Use only when `slidesSelector` is empty — e.g. for non-DOM decks driven by a state machine. (min: 1, max: 256) |
| `transitionDurationMs` | float | `800` | Total transition time. Default 800. (min: 1) |
| `transitionEase` | easingCurve | `"easeInOutCubic"` | Easing curve for the transition ramp. Default `easeInOutCubic`. |
| `wrap` | bool | `false` | When true, advance past the last slide loops to 0; retreat before 0 loops to last. Default false (clamp at endpoints). |


## Use cases

- Full-screen wheel deck — `wheelGesture.pulse → slideRouter.advance`. No pulseCounter.
- Nav-link deck — N `clickPulse` nodes per link with `value: <index>`, summed into `slideRouter.seekTo`.
- Keyboard nav — `clickPulse(eventType: keydown)` filtering ArrowDown / ArrowUp into advance / retreat.
- Per-slide colour drift — wire `slideRouter.slideActivations` through `floatArrayPick` then `paletteLut.color`.
- Continuous parallax — wire `slideRouter.currentIndex` (the float lerp) into a `paletteLut.t = currentIndex / (slideCount-1)` for a continuous colour sweep instead of step-changes.

## See also

- [Wheel Gesture](wheelGesture.md) — `wheelGesture`
- [Click Pulse](clickPulse.md) — `clickPulse`
- [Observer](observer.md) — `observer`
- [Float Array Pick](../math/floatArrayPick.md) — `floatArrayPick`

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
