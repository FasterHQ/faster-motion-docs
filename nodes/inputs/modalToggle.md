# Modal Toggle

**Type:** `modalToggle`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Open-on-click / close-on-click toggle that latches a 0/1 state and writes it to one or more `data-*` attributes. Compound: expanded into eventListener + pulseOr + latch + domPropertyWrite per open target. Each `openTarget` receives the same attribute write so popup / trigger / backdrop / overlay all flip in sync.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `openTriggers` | selectorList | `[]` | CSS selectors that fire the open pulse on click. Each row is one selector — add as many as you need (up to 4). Each is bound an event listener; firing latches state to 1. |
| `closeTriggers` | selectorList | `[]` | CSS selectors that fire the close pulse on click. Common: a close button (`.modal-close`) and a backdrop click-out target (`.modal-backdrop`). Leave empty for an open-only one-way latch. |
| `openTargets` | selectorList | `[]` | CSS selectors that receive the `openAttribute` write. The popup itself, the trigger button (so it can highlight), and any backdrop / body lock element are typical entries. All flip together. |
| `openAttribute` | string | `"data-open"` | HTML attribute written to each `openTarget`. Default `data-open`. Use `data-active`, `data-state`, `aria-expanded` or any custom attribute your CSS reads. |
| `openEvent` | domEvent | `"click"` | DOM event name for the open triggers. Default `click`. Use `mouseenter` for hover-open, `focus` for keyboard-open, etc. |
| `closeEvent` | domEvent | `"click"` | DOM event name for the close triggers. Default `click`. Useful as `mouseleave` paired with `mouseenter` on open. |
| `cssVarWrites` | string | `[]` | Optional list of `{target, name}` pairs. Each emits an additional unitless write of the 0/1 latch state to a CSS custom property (e.g. `--menu-open`). Use when CSS animations are driven by `var(--x)` instead of (or in addition to) the data-attribute selector. Edit as raw JSON for now: `[{"target":".ds-page","name":"--menu-open"}]`. |


## Use cases

- Modal / drawer open-close — `openTriggers: [".btn-open"]`, `closeTriggers: [".close-x", ".backdrop"]`. Each click on the open trigger sets `data-open=1` on every `openTarget`; each click on a close trigger resets to 0. Pair with a CSS `[data-open="1"]` rule for visibility / clip-path animation.
- Dropdown menu open-close — same shape, smaller scope. Common pattern in nav menus, account dropdowns, language switchers.
- Mobile hamburger overlay — `openTriggers: [".hamburger"]`, `closeTriggers: [".overlay-backdrop"]`, `openTargets: [".overlay", ".hamburger", "body"]`. The body write lets CSS lock scroll while open.
- Popover / tooltip on click — for click-toggled popovers, the same 0/1 latch pattern fits.

## See also

- [Event Listener](eventListener.md) — `eventListener`
- [Pulse Tween](../animation/pulseTween.md) — `pulseTween`
- [Click State Dispatcher](clickStateDispatcher.md) — `clickStateDispatcher`
- [Event Tween](../animation/eventTween.md) — `eventTween`

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
