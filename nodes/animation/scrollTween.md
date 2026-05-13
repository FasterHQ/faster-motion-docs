# Scroll Tween

**Type:** `scrollTween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  
**Compound:** Yes — expanded by the loader at load time into a graph of primitive nodes  

Animate one or more CSS properties on a target element, driven by scroll progress between two edges of a trigger element. Compound: expanded into `scrollTrigger + propertyAnimation` (which itself expands to `multiKeyframe + domPoseWrite`) — no runtime class. Use this in place of manually wiring `scrollTrigger.progress → tween → domPropertyWrite` for every property. Channels accept EITHER the terse `{from, to, cssUnit?, ease?}` shape (hand-authored / AI-generated) OR the standard `{cssUnit?, keyframes: [{time, value, ease?}]}` shape (FVE-edited) — both expand to the same runtime nodes.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element whose scroll position drives the tween. The trigger window is determined by where this element's edges meet the viewport (per Scroll Edges below). Examples: `.hero`, `#chapter-1`, `.services-track`. |
| `target` | elementSelector | `""` | CSS selector for the element whose CSS properties are animated. Leave empty to animate the trigger element itself. Use a separate target when the trigger is a tall scroll-range wrapper and the moving element is inside it. |
| `startEdge` | scrollEdges | `"top bottom"` | Visual two-marker picker for Start Edge (progress = 0) and End Edge (progress = 1). Drag markers to set viewport position; click element-edge lines to choose which edge of the trigger element is tracked. Optional `+= N vh / px / %` offset suffix shifts the marker by an absolute amount. |
| `channels` | propertyAnimationChannels | `{"opacity":{"cssUnit":"none...` | CSS properties to animate. Each channel = one CSS property + a keyframe list. Custom properties (`--name`) supported. The tween scrubs across the trigger window — keyframe `time` values are 0..1 progress through that window. Optional per-channel `template: "blur({value}px)"` wraps the float output into a CSS string so a single channel can drive complex CSS values like `filter`, `clip-path`, or `mask-image` end-to-end through the graph (the unit must be baked into the template — `cssUnit` and `template` are mutually exclusive). |


## Use cases

- One-line scroll-driven property animations — pin a hero, fade a nav, scrub a parallax. Replaces the trio scrollTrigger + tween + domPropertyWrite for every animated property.
- Multi-channel scroll-tweens — a single node can drive translateY + opacity + scale on the same target across the same trigger window. Each channel carries its own from/to/ease/cssUnit.
- Coordinated reveal sections — `selector` is the section, `target` is the inner element, `startEdge: "top bottom"` / `endEdge: "top top"` runs the tween while the section enters the viewport.

## See also

- [Scroll Trigger](../inputs/scrollTrigger.md) — `scrollTrigger`
- [Property Animation](propertyAnimation.md) — `propertyAnimation`
- [Expression](../math/expression.md) — `expression`
- [DOM Property Write](../boundary/domPropertyWrite.md) — `domPropertyWrite`
- [Pin](../inputs/pin.md) — `pin`

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
