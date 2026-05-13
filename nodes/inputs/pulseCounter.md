# Pulse Counter

**Type:** `pulseCounter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Pulse-driven integer counter with optional wrap-around. Each rising edge of `pulse` advances `index` by `step`; rising edge of `reset` returns `index` to `start`. With `wrap` enabled, output is folded into `[start, start + max)` via positive modulo (negative steps wrap correctly too). The current `index` is published every frame; downstream consumers (`pulseRouter`, expressions, `parameterReadFloat`) read it like any other numeric source.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Rising-edge trigger. Each 0 → 1 transition advances `index` by `step`. Wire from a `thresholdPulse`, `clickPulse`, `scrollEvent`, or any pulse-emitting source. _(unit: pulse)_ |
| `reset` | `float` | Rising-edge trigger that resets `index` to `start`. While held high, pulses are absorbed (counter stays at `start`). _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | The current counter value, post-wrap. Read this with `parameterReadFloat`, an expression `node('idx')`, or wire directly into `pulseRouter.index`. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | int | `0` | Initial value of the counter. The reset input also returns to this value. Most use cases use `0`. |
| `step` | int | `1` | How much each pulse advances the counter. Default `1`. Use `-1` for reverse counting; with `wrap: true`, this counts down with positive modulo wrap. |
| `wrap` | bool | `true` | When ON, output is folded into `[start, start + max)` — so a counter with `max: 5` cycles through `0, 1, 2, 3, 4, 0, 1, ...`. When OFF, the counter grows unbounded. |
| `max` | int | `10` | Number of distinct values when wrap is on. For an N-section navigation, set `max: N`. Ignored when wrap is off. (min: 1) |


## Use cases

- Section-snap navigation — wire a wheel/touch threshold-pulse → counter (`max: 5`, `wrap: true`) → per-section gate expressions for full-screen `<section>` carousels (see `section-snap` demo).
- Round-robin spawn — pair with `pulseRouter` (matching `count`) to demultiplex one event into N output channels (cursor trail, ripple particles, click-spawned animations).
- Carousel / slider step — clicks on `next` / `prev` buttons feed `pulse` / `reset` to track the active slide index.
- Sample-and-cycle — bump a parameter that other nodes read as a state index without authoring a real state machine.

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
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
