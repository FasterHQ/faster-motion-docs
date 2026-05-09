# Click State Dispatcher

**Type:** `clickStateDispatcher`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Click N targets to set a state to one of N values, written to a single attribute on a write target. Compound: expanded into N eventListener + chained-ternary expression + pulseOr + latch + 1 domPropertyWrite. The latch holds the dispatched value, the write puts it on the writeTo target as a `data-*` attribute that CSS can match against. Also exposes `value` (latched float, for downstream graph computation) and `pulse` (rising-edge merged click pulse, for downstream triggers).

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Latched dispatched value — same float that gets written to `writeAttribute`, exposed as a port for downstream graph computation. Updates on each click. Equals the `initial` param before any click fires. Compound-aliased: at load time, the expander rewrites any wire from `<dispatcherId>.value` to point at the internal `<dispatcherId>__latch.held` (no runtime difference; aliasing is transparent to authoring). |
| `pulse` | `float` | Rising-edge pulse merged across all target listeners. Fires the frame any of the targets is clicked. Wire into `scrollTo.trigger`, `pulseTween.restart`, or any node that consumes a single click event regardless of which target. Compound-aliased: at load time, the expander rewrites this wire to point at the internal `<dispatcherId>__or` pulseOr (or the single `<dispatcherId>__evt0.fired` when there is exactly one target). _(unit: pulse)_ |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targets` | selectorList | `[]` | CSS selectors — one per state. Click on the Nth selector dispatches the Nth value. Up to 4 targets supported in a single compound (chain multiple compounds for more). |
| `values` | numberList | `[]` | Numbers — one per target. Click on `targets[i]` writes `values[i]` to the attribute. Leave empty for default `[0, 1, 2, …]` (one-to-one with target index). |
| `writeTo` | elementSelector | `""` | CSS selector for the element receiving the dispatched value. Typically a wrapper element your CSS reads via `[data-active="N"]` selectors. |
| `writeAttribute` | string | `"data-active"` | HTML attribute written to `writeTo`. Default `data-active`. Use `data-tab`, `data-mode`, `aria-current`, or any custom attribute. |
| `initial` | float | `0` | Value before any click. Typically `0` (matching `values[0]`) so the first state is selected on page load. The latch outputs this until the first click pulse fires. |
| `event` | domEvent | `"click"` | DOM event name that drives the dispatch. Default `click`. Use `mouseenter` for hover-driven tabs, `focus` for keyboard-navigable controls. |


## Use cases

- Tab UIs — `targets: [".tab-0", ".tab-1", ".tab-2"]`, `values: [0, 1, 2]`, `writeTo: ".tab-container"`. CSS uses `[data-active="N"]` to show/hide each tab's content.
- Carousel pagination dots — clicking a dot sets the carousel's current index. Wire the latch output downstream into a seek node if the carousel is animation-driven.
- Segmented controls — three-button toggles for view modes (grid / list / map). `values: ["grid", "list", "map"]` (with string values via custom expression — or use 0/1/2 indices and CSS attribute selectors).
- Gallery filters — click a category chip to filter shown items. Each chip is a target, each value is a category id; CSS attribute selector hides/shows.
- Accordion section selector — click a header to open the corresponding section. Same pattern; CSS expands `[data-active="N"] .section-N`.
- Click-to-scroll-to-pin-progress navigation — wire `value` into a `remap` (over a sibling pinAnchor's `pinTargetFlowTop` / `pinTargetFlowBottom`) and feed `remap.result` into `scrollTo.targetY`; wire `pulse` into `scrollTo.trigger`. Replaces imperative click-handler scripts.

## See also

- [Event Listener](eventListener.md) — `eventListener`
- [Latch](latch.md) — `latch`
- [Pulse OR](pulseOr.md) — `pulseOr`
- [Modal Toggle](modalToggle.md) — `modalToggle`
- [Indexed Dispatch](indexedDispatch.md) — `indexedDispatch`
- [Remap](../math/remap.md) — `remap`
- [Scroll To](../animation/scrollTo.md) — `scrollTo`

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
