# DOM String Write

**Type:** `domStringWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Write a string value to one or more DOM elements — CSS style property (including custom properties like `--name`), HTML/SVG attribute, or `textContent`. String sibling of `domPropertyWrite` (which writes floats); `domPoseWrite` is the multi-property unified writer when you need both float + string + color in one batched write. Resolves the selector via querySelectorAll; comma-listed selectors write to every match.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | String value to write. Empty string clears the property; verbatim strings (CSS fragments, HTML attribute values, plain text) all pass through. |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the element(s) this node writes to. Same picker as domPropertyWrite / domPoseWrite. Comma-list a selector (`.a, .b`) to write the same value to every match in a single batched update. |
| `propertyName` | cssProperty | `"textContent"` | Property / attribute name. CSS properties (camelCase or kebab): `pointerEvents`, `display`, `clipPath`, `backgroundImage`. Custom properties: pass `--name` verbatim. SVG attributes (`d`, `points`, `viewBox`) and HTML data-attributes are auto-detected. `textContent` writes the element's text. Override the auto-detection with the Write Mode field. |
| `writeMode` | enum | `""` | How to write the property. `Auto` infers from the property name (textContent → text, SVG attrs / data-* → attribute, everything else → style). Force `style` for custom CSS properties; force `attribute` for non-data-prefixed HTML attributes (`alt`, `title`, `aria-label`).. Options: ``, `style`, `attribute`, `textContent` |


## Use cases

- Write the active carousel slot's metadata text (title / camera / location) to its display label — wire a `stringArrayPick.value` into `value`, set `propertyName` to `textContent`.
- Latched CSS string properties (`pointer-events`, `display`, `visibility`, `cursor`) gated by a `thresholdMap` — `value: pe-gate.result`, `propertyName: pointerEvents`, `writeMode: style`.
- Animated SVG `d` attribute or any HTML attribute the page reads — `propertyName: d`, auto-inferred `attribute` write mode.
- CSS custom properties whose values are strings (e.g. `--current-mood: "calm"`) — set `propertyName: --current-mood`, `writeMode: style`.

## See also

- [DOM Property Write](domPropertyWrite.md) — `domPropertyWrite`
- [DOM Pose Write](domPoseWrite.md) — `domPoseWrite`
- [Threshold Map](../math/thresholdMap.md) — `thresholdMap`
- [String Array Pick](../text/stringArrayPick.md) — `stringArrayPick`
- [String Op](../math/stringOp.md) — `stringOp`

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
