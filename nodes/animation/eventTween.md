# Event Tween

**Type:** `eventTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Time-based tween triggered by a DOM event. `onEvent` starts the play pulse; optional `offEvent` reverses it (e.g. `mouseenter`/`mouseleave` for hover toggles). Compound: expanded into `eventListener + (eventListener?) + pulseTween + propertyAnimation` — no runtime class. Use this in place of CSS transitions when authoring graph-driven interactions. Channels accept EITHER the terse `{from, to, cssUnit?, ease?}` shape (hand-authored / AI-generated) OR the standard `{cssUnit?, keyframes: [{time, value, ease?}]}` shape (FVE-edited).

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `trigger` | elementSelector | `""` | CSS selector for the element that emits the DOM event. Click / hover events are bound to this element. |
| `target` | elementSelector | `""` | CSS selector for the element whose CSS properties are animated. Leave empty to animate the event source itself. |
| `onEvent` | domEvent | `"click"` | DOM event name that drives the play pulse. Most common: `click`, `mouseenter`, `pointerdown`, `focus`. Pick from the list or type a custom event. |
| `offEvent` | domEvent | `""` | Optional DOM event name that drives the reverse pulse. Leave empty for one-shot animations. Pair with `onEvent` for toggles: `mouseenter` / `mouseleave` for hover, `focus` / `blur` for focus rings. |
| `duration` | float | `0.3` | Animation duration in seconds. The internal pulseTween clock advances 0→1 over this duration; channel keyframes interpolate across that 0..1 window. |
| `ease` | easingCurve | `"easeOutCubic"` | Easing curve applied to the pulseTween clock. Per-keyframe eases on individual channels stack on top of this overall curve. |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | CSS properties to animate. Each channel = one CSS property + a keyframe list. Custom properties (`--name`) supported. Optional per-channel `template: "blur({value}px)"` wraps the float output into a CSS string (mutually exclusive with `cssUnit`). |


## Use cases

- Hover toggles — `onEvent: mouseenter`, `offEvent: mouseleave`. Forward on enter, reverse on leave. Replaces `transition: <prop> Xs ease` CSS for graph-driven interactions.
- One-shot click reveals — `onEvent: click`, omit `offEvent`. Animates from `from` to `to` once and stays. Pair with a downstream gate node if you need it to reset.
- Modal / drawer open-close — set `trigger` to a button, `target` to the modal root, declare opacity / translate / clip-path channels. One node replaces 4-5 imperative wiring nodes.

## See also

- [Event Listener](../inputs/eventListener.md) — `eventListener`
- [Pulse Tween](pulseTween.md) — `pulseTween`
- [Property Animation](propertyAnimation.md) — `propertyAnimation`
- [DOM Property Write](../boundary/domPropertyWrite.md) — `domPropertyWrite`

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
