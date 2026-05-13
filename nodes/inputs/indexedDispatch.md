# Indexed Dispatch

**Type:** `indexedDispatch`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Edge dispatcher for an externally-owned integer index. Whenever `index` rises or falls to a different integer, fires a single-frame pulse pair: `exit_out{prev}` for the slot we leave and `enter_out{curr}` for the slot we enter. First evaluate fires only the initial enter (no prior slot exists). Sink-agnostic — routes pulses, not values.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Externally-owned integer index. Wire from `bidirectionalCounter.value`, `pulseCounter.value`, or any int producer. Edge-detected each evaluate; same value across frames produces no enter/exit output. |
| `reset` | `float` | Rising-edge clears the remembered previous index so the next non-equal `index` fires only an `enter_out{curr}` (mirroring first-frame semantics). _(unit: pulse)_ |
| `direction` | `float` | Optional ±1 direction signal — typically wired from `directionLatch.direction`. When wired, drives the `forwardActive` / `backwardActive` passthrough outputs so a single dispatcher can serve as the public face of a bidirectional snap navigator (no internal-node id leakage to consumers). |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `activeIdx` | `float` | Rounded integer of the current `index` input. Lets downstream consumers wire `dispatch.activeIdx` instead of poking the upstream counter directly. |
| `forwardActive` | `float` | `1` when `direction > 0`, else `0`. 0 when `direction` is unwired (default). |
| `backwardActive` | `float` | `1` when `direction < 0`, else `0`. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `1` | Number of channel pairs. Auto-derived from `forEach` match count when wired indexed — manual setting is only needed for non-forEach hand-wired graphs. Each channel materialises `enter_out{i}` and `exit_out{i}`. (min: 1, max: 256) |


## Use cases

- Section-snap, vertical carousel, scroll-spy — wheel/keyboard moves a single integer cursor; the previous and next slot both need their own enter/exit tween fired from the same edge.
- State-machine layer cross-fade on canvas — `currentLayerIdx` flip fires `exit_out{old}` to ramp out the leaving layer + `enter_out{new}` to ramp in the entering layer.
- Sprite / outfit / weapon variant swap — variant-index change cross-fades the old and new visual chains via paired pulses.
- Tab strip, accordion — active-tab change drives previous tab's collapse and next tab's expand from a single index input.

## See also

- [Pulse Dispatch](pulseDispatch.md) — `pulseDispatch`
- [Pulse Router](pulseRouter.md) — `pulseRouter`
- [Bidirectional Counter](bidirectionalCounter.md) — `bidirectionalCounter`
- [Direction Latch](directionLatch.md) — `directionLatch`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
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
