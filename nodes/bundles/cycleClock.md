# Cycle Clock

**Type:** `cycleClock`  
**Category:** bundles  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Accumulates ambient scheduler deltaTime into a normalized 0..1 cycle progress. The canonical "looping clock" — drives any consumer that takes a 0..1 progress (textRevealAnimation, propertyAnimation, staggerAnimation) when you want continuous motion not gated by scroll or user input. No input ports: clock nodes read ambient time directly (F236), so they keep ticking even when the rest of the graph is idle.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Normalized 0..1 cycle position. With `pingPong: false` ramps 0→1 then jumps back to 0 (sawtooth). With `pingPong: true` ramps 0→1 then 1→0 then 0→1 … (triangle wave). Wire into any 0..1 consumer. _(range: 0..1, unit: progress)_ |
| `completed` | `float` | Integer count of finished cycles since load. Useful for one-shot triggers ("after the third loop, fire X") via `thresholdPulse` or an `expression` node. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1000` | Length of one cycle in milliseconds. With `pingPong: false` this is the time for progress to go 0→1 (then it jumps back). With `pingPong: true` this is the time per direction — the full 0→1→0 round trip is 2× duration. Typical values: 1000–3000ms for ambient motion, 5000–20000ms for slow ambient cycles, 200–600ms for snappy beats. (min: 1, step: 100) |
| `iterations` | int | `0` | How many cycles to run before settling. **0** (default) loops forever — the most common case for ambient clocks. **N>0** runs exactly N cycles then holds at progress=1 (one-shot intros, finite N-beat sequences). The `completed` output port reflects this count so authors can trigger downstream actions on completion. (min: 0) |
| `pingPong` | bool | `false` | When ON, progress ramps up then down each cycle (triangle wave: 0→1→0→1→0…). Doubles the perceptual "beat" since each cycle visits 1.0 once but progress=0 only at start/midpoint. When OFF (default), progress is a sawtooth (0→1, jump back to 0). Use ping-pong for symmetrical reversible motion (in-and-out shimmer); use sawtooth for "type from start, snap back, type again" patterns where the consumer (e.g. `textRevealAnimation` with `cycleMode: pingPong`) handles its own bidirectionality. |


## Use cases

- Looping typewriter / phrase cycler — wire `progress` into a `textRevealAnimation`. With `iterations: 0` the cycle runs forever; pair with `cycleMode: pingPong` on the consumer for type-and-delete.
- Ambient ticker / shimmer — drive `propertyAnimation` channels (opacity flicker, hue cycle) with `pingPong: true` for smooth back-and-forth without authoring two keyframe stops.
- Bone secondary motion — feed into `boneJiggleCompute` / `wiggle` / `instanceStaggerCompute` as the time base when you want the motion decoupled from a Timeline.
- Counted intro / N-beat sequence — set `iterations: 4` to play 4 cycles then settle at 1.0 (for finite intros that auto-stop).

## See also

- [Time Input](../inputs/timeInput.md) — `timeInput`
- [Oscillator](../procedural/oscillator.md) — `oscillator`
- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`
- [Seamless Playhead](../animation/seamlessPlayhead.md) — `seamlessPlayhead`

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
