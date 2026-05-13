# Velocity Pluck

**Type:** `velocityPluck`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Single-shot pendulum pluck with velocity-derived shape. On each rising-edge `trigger`, samples `velocity`, then runs a two-stage tween: stage 1 swings out 0 → -peakRot over `M = swingOutBase + swingOutVelTerm·e` seconds with power2.out ease; stage 2 elastic-returns -peakRot → 0 over `P = returnBase + returnVelTerm·e` seconds with elastic.out and period `periodBase - periodVelTerm·e`. Here e = clamp(|velocity| / normalisationVel, 0, 1) and peakRot interpolates from `peakRotMin` to `peakRotMax` by e. The signed `rotation` output (degrees) carries the velocity sign, so left-drag and right-drag produce opposite directions. Pair with `viewportObserver.enterPulse` for "pluck on visibility entry" patterns (e.g. carousel cards swing on the rod as they pan into view), or with any pulse source for one-shot reactive animations whose magnitude scales with input speed.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Rising-edge pulse. Each 0→1 transition restarts the pluck and re-samples `velocity`. Mid-flight triggers replace the in-progress animation. _(unit: pulse)_ |
| `velocity` | `float` | Live velocity signal — the value at the moment `trigger` rises is latched and used to derive peak rotation, durations, and elastic period for that pluck. Sign drives rotation direction. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `rotation` | `float` | Signed rotation in degrees. 0 when idle. Wire into `domPropertyWrite` (CSS variable, transform component) for the visible swing. _(unit: degrees)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `normalisationVel` | float | `3000` | Velocity at which the pluck reaches its maximum amplitude / longest durations / fastest oscillation. Above this, no further growth (e is clamped to 1). 3000 px/sec matches typical fast carousel drags. (min: 1, step: 100) |
| `peakRotMin` | float | `1` | Pluck amplitude at zero velocity. >0 so a tap with no movement still produces a small visible nudge. 1 = subtle. (step: 0.5) |
| `peakRotMax` | float | `9` | Pluck amplitude at saturated velocity. Total range = `peakRotMin` → `peakRotMax`. 9 deg = strong but not cartoonish. (step: 0.5) |
| `swingOutBase` | float | `0.25` | Stage-1 duration at zero velocity. Power2.out ease 0 → -peakRot. (min: 0.01, step: 0.05) |
| `swingOutVelTerm` | float | `0.15` | Added to swingOutBase scaled by e. Higher velocity = slightly slower swing-out (heavier feel). (step: 0.05) |
| `returnBase` | float | `1` | Stage-2 elastic-return duration at zero velocity. (min: 0.01, step: 0.1) |
| `returnVelTerm` | float | `5` | Added to returnBase scaled by e. Higher velocity = much slower settle (more visible ringing). 5 = the default; settles in ~6s for a 9° pluck. (step: 0.1) |
| `periodBase` | float | `0.4` | Elastic.out period at zero velocity. Higher = slower oscillation. Period 0.4 with amplitude 1 gives a relaxed wobble. (min: 0.01, step: 0.05) |
| `periodVelTerm` | float | `0.3` | Subtracted from periodBase scaled by e. Higher velocity = shorter period = faster oscillation, more "energy" in the wobble. (step: 0.05) |


## Use cases

- Per-card pluck on viewport entry — forEach `viewportObserver` per card → enterPulse → velocityPluck (velocity wired from the carousel's scroll-velocity source) → domPropertyWrite to a CSS rotation variable. Each card animates on its own clock with its own velocity-at-entry.
- Default tuning (normalisationVel=3000, peakRotMin=1, peakRotMax=9, swingOutBase=0.25, swingOutVelTerm=0.15, returnBase=1.0, returnVelTerm=5, periodBase=0.4, periodVelTerm=0.3) reproduces the canonical "rod-and-ring" carousel pluck — strong response on fast drags, subtle on slow ones, settles in 1–6s depending on velocity.
- Click pulse → reactive shake — wire `clickPulse.pulse` into `trigger`, a fixed velocity into `velocity` (or velocity from a pointerVelocity source for scaled response). Single node replaces a swing-out + elastic-return chain.

## See also

- [Viewport Observer](../inputs/viewportObserver.md) — `viewportObserver`
- [Latch](../inputs/latch.md) — `latch`
- [Pulse Tween](pulseTween.md) — `pulseTween`
- [Smoothing](../math/smoothing.md) — `smoothing`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Otis Roan — Pinned Linear Pan (Mint) | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-otis-roan) · [`faster-claude/catalog/animations/carousel-effects/otis-roan/otis-roan.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/otis-roan/) |

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
