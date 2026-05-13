# Threshold Pulse

**Type:** `thresholdPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Edge-detector / pulse generator. Watches `value` and fires a single-frame `pulse` when it crosses `threshold`. `mode: edge` (default) fires once per crossing then suppresses until value drops below `threshold − hysteresis` and re-crosses (debounce). `mode: auto` fires periodically paced by `cooldownMs` for as long as value stays past threshold (metronome). `direction` selects rising-only / falling-only / both. Continuous comparator output `isAbove` is raw (1 while past threshold, 0 otherwise) — useful as a gate when you do not want pulse semantics. First-frame past-threshold does NOT fire (cold-start state-snap, prevents spurious init pulses).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | The signal being watched. Wire from any numeric source — scrollTrigger.progress, observer.deltaY, hover.hover, scroll velocity, etc. |
| `threshold` | `float` | The crossing point. Defaults to `0` if not set in params and not wired. Wire this only if the threshold itself needs to change at runtime — otherwise just set the **Threshold** param. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Single-frame `1` on each crossing event, `0` otherwise. Rising-edge consumed by `pulseCounter`, `pulseTween.restart`, `pulseRouter.pulse`, etc. _(unit: pulse)_ |
| `isAbove` | `float` | Raw comparator output: `1` while value > threshold, `0` otherwise. Use as a gate signal (e.g. drive an opacity ramp via smoothing). _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `threshold` | float | `0` | Static threshold value. Use this in 90% of cases (skip wiring the input port). For wheel pulses use `30–50` to require a real gesture; for `scrollTrigger.progress` milestones use `0.5` / `0.75`; for hover gates use `0.5`. (step: 0.1) |
| `mode` | enum | `"edge"` | **Edge** = fires once per threshold crossing, then re-arms only after value drops back. **Auto** = fires periodically paced by Cooldown for as long as value stays past threshold (continuous trail / heartbeat). Edge is the default.. Options: `edge`, `auto` |
| `direction` | enum | `"rising"` | **Rising** = fire when value crosses up through threshold (mouse enters, scroll forward, gesture starts). **Falling** = crosses down (mouse leaves, gesture ends). **Both** = either direction.. Options: `rising`, `falling`, `both` |
| `hysteresis` | float | `0` | Re-arm gap. After firing on a rising crossing, value must drop below `threshold − hysteresis` before another rising crossing can fire. Defaults to `0` (re-arms immediately when value drops below threshold). Use small values (5–10% of threshold) to debounce noisy signals near the threshold. (min: 0, step: 0.1) |
| `cooldownMs` | float | `0` | Minimum wall-time gap between pulses. Default `0`. Set to ≥ the duration of any animation the pulse triggers (e.g. `1200` for a 1.0s tween) so the next pulse cannot fire mid-animation. Especially important for wheel / touch sources that emit dense bursts of events. (min: 0, step: 10) |


## Use cases

- Wheel / touch gesture detection — wire from `observer.deltaY`, set `threshold` to require a meaningful gesture, `cooldownMs` to debounce. Feed `pulse` into `pulseCounter` for snap navigation. (See `section-snap` demo.)
- Scroll-progress milestones — fire one pulse when a `scrollTrigger.progress` crosses 0.5, 0.75, etc. Drives one-shot reveal animations without keyframes.
- Velocity-reactive trail — pair with `mode: auto` + low `cooldownMs` (50–100ms) to emit periodic pulses while pointer / scroll velocity exceeds a threshold; fan into `pulseRouter` for spawn-style trails.
- Hover-gate edge detection — fire one pulse when a `hover.hover` smooth gate crosses 0.5 (mouse enters); pair with another threshold falling-direction for mouse-leave.
- Debounced numeric guard — prevent re-fires on noisy signals via `cooldownMs` (250–1000ms) — same role as `_.debounce` in imperative code.

## See also

- [Event Listener](eventListener.md) — `eventListener`
- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`
- [Velocity](../math/velocity.md) — `velocity`
- [Latch](latch.md) — `latch`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Otis Roan — Pinned Linear Pan (Mint) | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-otis-roan) · [`faster-claude/catalog/animations/carousel-effects/otis-roan/otis-roan.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/otis-roan/) |
| Editorial Lookbook | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-editorial-lookbook) · [`faster-claude/catalog/animations/scroll-animations/editorial-lookbook/editorial-lookbook.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/editorial-lookbook/) |
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |
| Studio Showreel | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-wheel-deck-blob) · [`faster-claude/catalog/animations/scroll-animations/wheel-deck-blob/wheel-deck-blob.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/wheel-deck-blob/) |

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
