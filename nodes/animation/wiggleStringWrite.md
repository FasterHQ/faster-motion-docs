# Wiggle String Write

**Type:** `wiggleStringWrite`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Damped-oscillation per-element writer — like plucking a guitar string with characters tied to it as beads. On each rising-edge `trigger`, every matched element traces its own damped sinusoid `A·e^(-decay·t)·sin(ω·t + i·phaseSpread)` where `i` is the element index. Adjacent elements oscillate slightly out of phase (controlled by `phaseSpread`), giving a "chord struck" feel — independent wiggle per char that stays loosely synchronised across the row. After `duration` seconds the node stops writing and chars return to rest. Use as a one-shot reaction to a hover/click pulse without any progress driver.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Rising-edge trigger. Each 0→1 transition (re-)plucks the string from the current frame, replacing any previous oscillation. _(unit: pulse)_ |
| `amplitudeInput` | `float` | Optional dynamic amplitude override (px when property is translateX/Y, deg for rotate, etc.). Falls back to the `amplitude` param when wired value is NaN/zero. _(unit: unit)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the chars/elements to wiggle. Each match becomes one bead on the string. |
| `property` | cssProperty | `"translateY"` | CSS property to write. Transform components (translateX/Y, rotate, scaleX/Y) route through the transform accumulator and compose with other writers; non-transform props write directly to inline style. |
| `cssUnit` | enum | `"px"` | Unit. Options: `px`, `%`, `rem`, `em`, `deg`, `rad`, `none` |
| `amplitude` | float | `16` | Initial peak displacement at t=0. (step: 1) |
| `frequency` | float | `5` | Oscillation frequency in Hz. 5Hz = 5 cycles/sec, ~2.5 cycles in a 0.5s decay window. (min: 0.1, step: 0.5) |
| `decay` | float | `6` | Exponential decay rate. After t=3/decay seconds amplitude is ~5% of initial. Higher = snappier dampening. (min: 0.1, step: 0.5) |
| `phaseSpread` | float | `0.4` | Per-element phase offset in radians. 0 = all chars in perfect sync, 2π = neighbours one full cycle apart. Tune to taste — 0.3-0.5 gives the "tied to a string" loose-coupling look. (step: 0.05) |
| `duration` | float | `1.2` | Hard cap after which the node stops writing and chars rest at 0. Should be ≥ 3/decay so the visible oscillation completes. (min: 0.1, step: 0.1) |


## Use cases

- Title hover wiggle — hover-rise pulse fires the chord; chars wiggle vertically with phase-spread for a guitar-string-struck feel.
- Cursor-over reaction — clickPulse on a button → wiggle the label chars with a small amplitude burst.
- Notification arrival — a one-shot pluck on each new toast, chars settle on their own.

## See also

- [Stagger Write](../boundary/staggerWrite.md) — `staggerWrite`
- [Pulse Tween](pulseTween.md) — `pulseTween`
- [Threshold Pulse](../inputs/thresholdPulse.md) — `thresholdPulse`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Editorial Portfolio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura) · [`faster-claude/catalog/animations/advanced-orchestration/obscura/obscura.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura/) |
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
