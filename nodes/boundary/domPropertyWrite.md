# DOM Property Write

**Type:** `domPropertyWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write a float value to a single CSS property, transform component, data-attribute, scrollTop/scrollLeft, or textContent on a DOM element. Single-property sibling of `domPoseWrite` — use this when you need to drive ONE value (CSS variable, opacity, scrollTop, etc.); use `domPoseWrite` when you need a batched transform pose (translate / scale / rotate / skew). Custom properties (CSS variables like `--bento-col`) work — pass the full `--name` as the Property field; the runtime calls `el.style.setProperty(name, value + unit)`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Numeric value to write. Combined with the Unit (e.g. value=42 + unit=px → "42px") and assigned to the named property on the resolved element. For textContent mode, written verbatim (or formatted via the optional template). |
| `selector` | `string` | F357 — wireable selector. When connected (e.g. from `splitText.pieceSelector`), the wired value overrides the `CSS Selector` param at bind time. Unwired = the param value is used. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element this node writes to. Same picker as domPoseWrite. Multiple matches: only the first is written (use a forEach instance with `{ "fromScope": "selector" }` for per-element fan-out). |
| `propertyName` | cssProperty | `"opacity"` | Property name. CSS properties (camelCase or kebab-case both accepted): `opacity`, `borderRadius`, `backgroundPositionX`. Transform components: `translateX` / `scaleY` / `rotate` etc. — these batch through the transform accumulator. CSS custom properties: pass `--name` verbatim (e.g. `--bento-col`). Special: `textContent` writes element text; `data-foo` writes the attribute; `scrollTop` / `scrollLeft` write the scroll position. |
| `cssUnit` | enum | `"none"` | Unit suffix appended to the value when writing CSS. Use `none` for unitless properties (opacity, scaleX, custom-property numbers consumed via calc). Use `px` for translate / size / borderRadius. Use `deg` / `rad` for rotation / skew. Use `vw` / `vh` / `%` / `em` / `rem` for layout-relative writes (e.g. driving CSS variables that calc() against viewport).. Options: `none`, `px`, `%`, `deg`, `rad`, `em`, `rem`, `vw`, `vh` |
| `template` | string | `""` | Optional format template — `{value}` is substituted with the input value at write time. Bypasses Unit when set. Use for properties that need wrapper syntax: `circle({value}% at 50% 50%)` for clipPath, `polygon(... {value}% ...)` for gradients, etc. Leave empty for plain numeric writes. |


## Use cases

- CSS-variable driven layouts — animate `--bento-col` / `--accent-hue` / `--gradient-stop` and have CSS recompute the rest of the layout via `calc()` / `color-mix()`. Lets the graph stay tiny by offloading geometry to the cascade.
- One-off non-transform property writes — `opacity`, `borderRadius`, `filter` strength, `scrollTop` (for scroll-jacked elements), single data-attributes that the rest of the page reads.
- Texts that update with a number — wire a `counter` output into `textContent` mode for animated number displays without a separate counter writer.

## See also

- [DOM Pose Write](domPoseWrite.md) — `domPoseWrite`
- [Property Animation](../animation/propertyAnimation.md) — `propertyAnimation`
- [Scroll Tween](../animation/scrollTween.md) — `scrollTween`
- [Event Tween](../animation/eventTween.md) — `eventTween`
- [Clip Path Animation](../animation/clipPathAnimation.md) — `clipPathAnimation`
- [Stagger Animation](../text/staggerAnimation.md) — `staggerAnimation`
- [Counter Animation](../text/counterAnimation.md) — `counterAnimation`
- [Attribute Write](../attributes/attributeWrite.md) — `attributeWrite`

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
