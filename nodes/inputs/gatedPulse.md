# Gated Pulse

**Type:** `gatedPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

AND-gate for pulses. Outputs `pulse=1` ONLY on a frame where the input `pulse` is rising AND `gate` is > 0.5. Replaces the `expression: pulse * gate` + `pulseOr` chain authors use to filter a pulse by a boolean state. Pure combinatorial logic with one frame of edge-detector memory.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | The pulse source. Rising-edge (0→1) is what propagates; non-rising frames don't fire even if the value stays at 1. _(unit: pulse)_ |
| `gate` | `float` | The boolean / threshold gate. The pulse only propagates on frames where this is > 0.5. _(unit: gate)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Single-frame `1` when the input pulse rises AND the gate is open. `0` otherwise. _(unit: pulse)_ |


## Parameters

_No configurable parameters._

## Use cases

- Drag-start pulse gated by per-element visibility — global drag-start pulse → gatedPulse (gate = viewportObserver.isVisible) → re-pluck only currently-visible cards (otis-roan carousel pattern).
- Conditional event handler — clickPulse → gatedPulse (gate = "is-ready" flag) → action. Suppresses clicks during a busy/loading state without dropping the source pulse.
- AND of two pulses (rising-edge convergence) — feed pulse A to `pulse`, pulse B's `isAbove` to `gate`. Fires only when both are concurrently active.

## See also

- [Pulse OR](pulseOr.md) — `pulseOr`
- [Threshold Pulse](thresholdPulse.md) — `thresholdPulse`
- [Event Listener](eventListener.md) — `eventListener`

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
