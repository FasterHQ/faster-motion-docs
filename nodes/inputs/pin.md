# Pin

**Type:** `pin`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

F330/F340 pin engagement state machine. Reads engine handle (from sibling PinAnchorNode) + progress; runs the 3-state lifecycle: BEFORE (progress ≤ 0) = element natural inside spacer; PINNED (0 < progress < 1) = element position:fixed at viewport top; AFTER (progress ≥ 1) = element at bottom of spacer via padding-top. Spacer + handle ownership lives on PinAnchorNode (loader-emitted). Subsumes scrollPin.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `handle` | `any` | Pin Handle |
| `progress` | `float` | Progress |
| `rawProgress` | `float` | Raw Progress (unclamped) |
| `scrolledPx` | `float` | Auto-wired by the loader from the sibling ScrollTriggerNode's `scrolledPx` output. Lets the pin recover the trigger's ideal startPos scrollY as `currentScrollY - scrolledPx`, so the engage-time captured position matches what `transitionAfter` computes post-release regardless of which frame the engage transition fires on. |
| `topOverride` | `float` | Top Override |
| `leftOverride` | `float` | Left Override |
| `widthOverride` | `float` | Width Override |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `isEngaged` | `float` | 1 while in the PINNED phase, 0 in BEFORE or AFTER. Use to drive ancillary effects (z-index swaps, classes, opacity reveals) that should toggle on engagement. |
| `phase` | `float` | Numeric lifecycle phase: 0 = BEFORE (pre-engage), 1 = PINNED (engaged), 2 = AFTER (post-release). Flips on the same frame as the state transition, so downstream remappers stay aligned with the DOM-flow change. |
| `rectTop` | `float` | Rect Top |
| `rectLeft` | `float` | Rect Left |
| `rectWidth` | `float` | Rect Width |
| `rectHeight` | `float` | Rect Height |


## Parameters

_No configurable parameters._

## See also

- [Scroll Trigger](scrollTrigger.md) — `scrollTrigger`
- `pinAnchor` _(not in author-facing docs)_
- [Scroll Tween](../animation/scrollTween.md) — `scrollTween`

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
