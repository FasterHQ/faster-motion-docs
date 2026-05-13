# Latch

**Type:** `latch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Sample-and-hold on rising-edge `pulse`. Captures the live `value` at the pulse moment and freezes it on `held`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Live signal being sampled. Whatever this reads at the moment `pulse` rises gets captured into `held`. |
| `pulse` | `float` | Trigger. On rising edge (0 → >0), the current `value` is captured. While not pulsing, `held` keeps the previous capture. |
| `reset` | `float` | On rising edge, restores `held` to the `initial` param. Use to clear the latch back to a known starting point. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `held` | `float` | Most recently captured value (or `initial` before the first pulse). Stays constant between pulses. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initial` | float | `0` | Output value before the first pulse arrives, and after each `reset` rising edge. Example: 0 for "neutral until snapshotted", 0.5 for centered remapped progress. |


## Use cases

- Snapshot at spawn — capture cursor X / Y / scroll position when a particle, flair, or trail item is born; downstream animation reads the held value as a fixed start point.
- Freeze a live signal — preserve "the value at the moment X happened" while the source keeps changing.
- Step-and-hold sample — the float counterpart of a sample-and-hold ADC, useful for stepped numeric outputs.

## See also

- [Click State Dispatcher](clickStateDispatcher.md) — `clickStateDispatcher`
- [Modal Toggle](modalToggle.md) — `modalToggle`
- [Event Listener](eventListener.md) — `eventListener`
- [Pulse OR](pulseOr.md) — `pulseOr`
- [Direction Latch](directionLatch.md) — `directionLatch`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
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
