# Click Pulse

**Type:** `clickPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

DOM pointer-event listener that emits a single-frame `pulse` per fire on `selector`, with click metadata fan-out — `value` (param-or-wired), `x` / `y` (clientX/Y), and `matchIndex` (which selector match fired). `pulse` is the only pulse-coupled signal; all metadata holds at the last-fire value between pulses, so consumers gate on the rising edge to read fresh data. `eventType` selects between `click` / `dblclick` / `pointerdown` / `contextmenu` / `auxclick` etc.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `valueInput` | `float` | Optional override for the `value` param. When wired (and finite), the pulse emits this value instead of the param. Use when the per-click value is computed by the graph (timestamp, current state, etc.). |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Single-frame rising-edge spike per fire. Held at 0 between fires — the ONLY pulse-coupled signal on this node. _(unit: pulse)_ |
| `value` | `float` | `valueInput` if wired (and finite at fire time), otherwise the static `value` param. Held at the last-fire value between pulses. |
| `x` | `float` | clientX of the most-recent fire. Held at the last-fire value between pulses. |
| `y` | `float` | clientY of the most-recent fire. Held at the last-fire value between pulses. |
| `matchIndex` | `float` | Index of the matched element that fired (when selector matched multiple). Held between pulses so authors can branch on "which one fired last". |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector. Multiple matches all attach a listener; `matchIndex` reports which one fired. |
| `eventType` | eventTypeChooser | `"click"` | DOM event name. Click is the default; pointerdown fires on press; contextmenu = right-click. Custom event names are also accepted via the trailing input. |
| `value` | float | `0` | Scalar emitted on `value` output when `valueInput` is unwired. Use to embed a slide index / parameter delta into the click. |
| `preventDefault` | bool | `false` | When true, the listener calls `e.preventDefault()`. Useful for `<a>` nav links that should NOT trigger browser navigation. |


## Use cases

- Nav-link dispatch — one clickPulse per link with `value: <slideIndex>`. Sum the `value` outputs into `slideRouter.seekTo`.
- Button-driven state-machine triggers — click → pulse → SM parameter pulse.
- Cursor-aware reveals — read `x`/`y` to position a reveal centred on the click point.
- Multi-target dispatch — single clickPulse on `[data-tab]` (matches N tabs); read `matchIndex` to know which tab fired and route accordingly.
- Suppress-default nav — set `preventDefault: true` for hash-link / anchor-tag clicks that should NOT trigger browser navigation.

## See also

- [Wheel Gesture](wheelGesture.md) — `wheelGesture`
- [Observer](observer.md) — `observer`
- [Pulse Router](pulseRouter.md) — `pulseRouter`
- [Threshold Pulse](thresholdPulse.md) — `thresholdPulse`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Editorial Lookbook | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-editorial-lookbook) · [`faster-claude/catalog/animations/scroll-animations/editorial-lookbook/editorial-lookbook.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/editorial-lookbook/) |

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
