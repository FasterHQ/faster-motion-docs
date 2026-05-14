# Pulse Tween

**Type:** `pulseTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

A one-shot 0..1 clock driven by event pulses, not by input progress. Each input is rising-edge-detected: **`play`** advances toward 1, **`reverse`** advances toward 0, **`restart`** resets to 0 and plays forward, **`pause`** freezes the current value, **`resume`** un-freezes. Output `progress` is the eased 0..1 value; `playing` is 1 while advancing. The node OWNS the progress — distinct from the stateless `tween` interpolator (which is a pure function of an input progress source). Use this whenever a transition should be triggered by a discrete event rather than driven by a continuous external clock.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `play` | `float` | Rising-edge trigger. Each 0 → 1 transition starts (or resumes) advancing `progress` toward 1 at the configured duration. _(unit: pulse)_ |
| `reverse` | `float` | Rising-edge trigger. Each 0 → 1 transition starts advancing `progress` toward 0 at the configured duration. Use as the "leave" pulse for hover-style reveals. _(unit: pulse)_ |
| `restart` | `float` | Rising-edge trigger. Each 0 → 1 transition resets `progress` to 0 and plays forward to 1. **Use this** for "fire one transition per pulse" navigation patterns where the previous run might still be partway through. _(unit: pulse)_ |
| `pause` | `float` | Rising-edge trigger. Freezes `progress` at its current value. Ignored if not currently playing. _(unit: pulse)_ |
| `resume` | `float` | Rising-edge trigger. Un-freezes a paused tween at the same direction it was going before pause. _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | The eased 0..1 value. Wire into any consumer expecting a 0..1 driver — `propertyAnimation.progress`, `staggerWrite.progress`, `multiKeyframe.progress`, `tween.progress` for chained interpolations, `remap.value`. _(range: 0..1, unit: progress)_ |
| `playing` | `float` | 1 while the tween is currently advancing, 0 when paused or settled at 0/1. Use as a gate for sound effects, "loading" indicators, or to suppress other animations while a transition is mid-flight. _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1` | How long `progress` takes to travel 0 → 1 (or 1 → 0). Common values: `0.3`–`0.6` for hover micro-interactions, `0.8`–`1.5` for section transitions, `2`–`3` for hero reveals. Pair with the upstream pulse source's `cooldownMs` (set ≥ duration) so the next pulse cannot fire mid-tween. (min: 0.05, max: 10, step: 0.05) |
| `ease` | easingCurve | `"easeOutCubic"` | Shape of the 0 → 1 curve. **Smart picker**: type to filter, click to apply. Common picks: `easeOutCubic` (UI default — fast in, soft tail), `power2.inOut` (symmetric ease — natural for reversible transitions), `back.out(1.7)` (gentle overshoot — playful), `expo.out` (whip-snap — dramatic reveals). Custom: `cubic-bezier(0.4, 0, 0.2, 1)`. |


## Use cases

- Section / page transitions on click, wheel, or threshold pulse — wire a `clickPulse` / `thresholdPulse.pulse` into `restart`, drive a `propertyAnimation` / `staggerWrite` from `progress` for the in-animation. (See `section-snap` demo.)
- Toggle-actions parity (`play / reverse / pause / resume / restart`) — separate pulse sources for each action map cleanly onto the five inputs.
- Hover reveal — pair `hover.hover` rising-edge through a `thresholdPulse` into `play`, falling-edge into `reverse`. Card content slides in on enter, slides out on leave.
- One-shot reaction to a velocity / proximity event — `thresholdPulse(rising)` from a velocity signal feeds `restart`; the tween plays a fixed-duration burst regardless of how long the underlying signal stays past threshold.

## See also

- [Event Tween](eventTween.md) — `eventTween`
- [Tween](tween.md) — `tween`
- [Event Listener](../inputs/eventListener.md) — `eventListener`
- [Load Pulse](../inputs/loadPulse.md) — `loadPulse`
- [Modal Toggle](../inputs/modalToggle.md) — `modalToggle`
- [Threshold Pulse](../inputs/thresholdPulse.md) — `thresholdPulse`
- [Property Animation](propertyAnimation.md) — `propertyAnimation`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |
| Mara Quill — Pinned Linear Pan | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-mara-quill) · [`faster-claude/catalog/animations/carousel-effects/mara-quill/mara-quill.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/mara-quill/) |
| Otis Roan — Pinned Linear Pan (Mint) | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-otis-roan) · [`faster-claude/catalog/animations/carousel-effects/otis-roan/otis-roan.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/otis-roan/) |
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |

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
