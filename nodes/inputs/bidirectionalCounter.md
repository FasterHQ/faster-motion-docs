# Bidirectional Counter

**Type:** `bidirectionalCounter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Clamped integer counter with separate `increment` and `decrement` inputs. Counter never grows past `max` or below `min` — out-of-range pulses are silently absorbed inside the node, so the visible `value` always reflects bounds. Sister of `pulseCounter`, but bidirectional and clamped. Avoids the `cDn − cUp` two-counter-subtract hack and its over-scroll drift bug at boundaries.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `increment` | `float` | Rising-edge trigger. Advances counter by `step`, clamped at `max`. _(unit: pulse)_ |
| `decrement` | `float` | Rising-edge trigger. Advances counter by `-step`, clamped at `min`. _(unit: pulse)_ |
| `reset` | `float` | Rising-edge trigger. Returns counter to `start`. _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Current counter value. Always in [`min`, `max`]. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | int | `0` | Initial value (and reset target). |
| `min` | int | `0` | Lower clamp bound. |
| `max` | int | `10` | Upper clamp bound. |
| `step` | int | `1` | Magnitude of each increment / decrement. (min: 1) |


## Use cases

- Section-snap navigation — wire wheel-down pulse to `increment`, wheel-up to `decrement`. `value` is the active section index, always in [0, N-1] with no boundary drift.
- Hover-driven step counter — `enter` and `leave` pulses with `min: 0, max: 1` give a clean 0/1 binary state.
- Click-driven page navigator — Next/Prev button pulses with bounded counter.

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
