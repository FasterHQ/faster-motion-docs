# Timeline

**Type:** `timeline`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Playback clock that emits a 0..1 `progress` over `duration` seconds. Self-advances when `autoplay`; can be externally driven by `play` / `pause` / `seek` pulses or a `progress` input.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | External 0..1 driver. When wired, the timeline mirrors this value instead of self-advancing — `duration` and `autoplay` are ignored. Use to bind playback to scroll position, parameter value, or another normalized signal. _(range: 0..1, unit: progress)_ |
| `play` | `float` | Pulse trigger. Rising edge starts (or resumes) playback from the current time. _(unit: pulse)_ |
| `pause` | `float` | Pulse trigger. Rising edge pauses playback at the current time. Use `play` to resume. _(unit: pulse)_ |
| `seek` | `float` | Pulse trigger. Rising edge resets playback to time 0 and pauses. Wire from a button or trigger source. _(unit: pulse)_ |
| `gate` | `float` | Hold input. While > 0 the timeline is allowed to advance; when 0, advance is paused (current time held). Use for conditional playback (only advance while a parameter is true). _(range: 0..1, unit: gate)_ |
| `reset` | `float` | Pulse trigger. Rising edge restarts playback — sets currentTime back to 0, resets iteration count, and (if `autoplay`) immediately resumes. Use for loop-on-trigger patterns: each pulse spawns a fresh playback (cursor trail, ripple, particle burst). _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | 0..1 normalized playback position. Wire into tween, multiKeyframe, or any node expecting a 0..1 driver. _(range: 0..1, unit: progress)_ |
| `currentTime` | `float` | Absolute playback time in milliseconds (0 → duration × 1000). Use when an output needs raw time rather than progress. _(unit: milliseconds)_ |
| `isPlaying` | `float` | 1 while the timeline is actively advancing, 0 when paused or completed. Use to gate other animations off playback state. _(range: 0..1, unit: gate)_ |
| `isComplete` | `float` | 1 once the final iteration finishes (only meaningful for non-infinite timelines), 0 otherwise. Wire to trigger follow-up animations. _(range: 0..1, unit: gate)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration` | float | `1` | How long one iteration takes in seconds. Example: 1 for a quick reveal, 3 for a longer animation, 0.3 for a subtle hover effect. (min: 0, max: 60, step: 0.1) |
| `iterations` | int | `1` | How many times to play. 1 = play once and stop. 0 = infinite loop. Higher values = play N times then stop. (min: 0, max: 100, step: 1) |
| `pingPong` | bool | `false` | When on, the timeline plays forward then backward then forward again etc. Each pingPong pass counts as one iteration. Useful for breathing / pulsing animations. |
| `timeScale` | float | `1` | Playback rate multiplier. 1 = normal speed; 2 = 2× faster; 0.5 = half speed; -1 = play in reverse. Combine with autoplay for unusual playback rates. (min: -10, max: 10, step: 0.1) |
| `delay` | float | `0` | Seconds to wait after `play` (or autoplay start) before progress begins advancing. Example: 0.2 for a brief hold before the animation kicks in. (min: 0, max: 10, step: 0.1) |
| `autoplay` | bool | `true` | When on, playback starts automatically at load. When off, the timeline waits for an external `play` pulse. Default: on. |


## Use cases

- Time-driven animation — feed `progress` output into one or more tween nodes for a duration-based reveal, loop, or one-shot effect.
- Externally driven clock — wire `progress` input from `scrollTrigger` for scroll-bound playback, or from a parameter for app-driven sequencing.
- Looping & ping-pong — set `iterations: 0` for infinite loop, enable `pingPong` for back-and-forth playback.

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Loop Animation | keyframe-sequences | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/keyframe-sequences-loop-animation) · [`faster-claude/catalog/animations/keyframe-sequences/loop-animation/loop-animation.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/keyframe-sequences/loop-animation/) |
| Agency Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-agency-portfolio) · [`faster-claude/catalog/animations/advanced-orchestration/agency-portfolio/agency-portfolio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/agency-portfolio/) |
| Breathing Hero | time-auto-loops | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/time-auto-loops-breathing-hero) · [`faster-claude/catalog/animations/time-auto-loops/breathing-hero/breathing-hero.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/time-auto-loops/breathing-hero/) |
| Course Catalog | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-course-catalog) · [`faster-claude/catalog/animations/advanced-orchestration/course-catalog/course-catalog.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/course-catalog/) |
| Dashboard Story | scroll-layouts | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-layouts-dashboard-story) · [`faster-claude/catalog/animations/scroll-layouts/dashboard-story/dashboard-story.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-layouts/dashboard-story/) |
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |
| Gravitational Orbit | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-gravitational-orbit) · [`faster-claude/catalog/animations/distance-proximity/gravitational-orbit/gravitational-orbit.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/gravitational-orbit/) |
| Loading States | time-auto-loops | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/time-auto-loops-loading-states) · [`faster-claude/catalog/animations/time-auto-loops/loading-states/loading-states.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/time-auto-loops/loading-states/) |
| Neon Grid | time-auto-loops | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/time-auto-loops-neon-grid) · [`faster-claude/catalog/animations/time-auto-loops/neon-grid/neon-grid.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/time-auto-loops/neon-grid/) |
| Neural Constellation | distance-proximity | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/distance-proximity-neural-constellation) · [`faster-claude/catalog/animations/distance-proximity/neural-constellation/neural-constellation.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/distance-proximity/neural-constellation/) |

_…and 7 more in the catalog._

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
