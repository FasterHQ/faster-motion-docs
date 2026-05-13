# Pulse OR

**Type:** `pulseOr`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Fires `pulse=1` for a single frame whenever ANY input pulse has a rising edge. Replaces the boilerplate `Math.max(node('a'), node('b'), …)` expression + thresholdPulse pair authors use to combine multiple trigger sources.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `a` | `float` | Trigger input. _(unit: pulse)_ |
| `b` | `float` | Trigger input. _(unit: pulse)_ |
| `c` | `float` | Trigger input. _(unit: pulse)_ |
| `d` | `float` | Trigger input. _(unit: pulse)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | `1` on the frame when any input has a rising edge, `0` otherwise. _(unit: pulse)_ |


## Parameters

_No configurable parameters._

## Use cases

- Combine load-pulse with a per-section gate-rising pulse to fire chars stagger both at load and on each backward arrival.
- OR keyboard navigation pulses with wheel pulses to drive a single counter from multiple input channels.

## See also

- [Event Listener](eventListener.md) — `eventListener`
- [Threshold Pulse](thresholdPulse.md) — `thresholdPulse`
- [Pulse Router](pulseRouter.md) — `pulseRouter`
- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| OBSCURA — Studio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura-studio) · [`faster-claude/catalog/animations/advanced-orchestration/obscura-studio/obscura-studio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura-studio/) |
| Otis Roan — Pinned Linear Pan (Mint) | carousel-effects | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/carousel-effects-otis-roan) · [`faster-claude/catalog/animations/carousel-effects/otis-roan/otis-roan.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/carousel-effects/otis-roan/) |
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
