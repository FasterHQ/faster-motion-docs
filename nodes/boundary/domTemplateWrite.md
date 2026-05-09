# DOM Template Write

**Type:** `domTemplateWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Combines N float inputs into one CSS string via a `{name}` template, then writes that string to a DOM element's style / attribute / textContent. One node replaces the pattern of N propertyAnimation channels each writing its own CSS variable plus a CSS `var()` recipe in the renderer — the graph emits the fully formed string and the CSS just consumes it. Use when one CSS property takes multiple animated components in one string: `filter: blur(...) brightness(...)`, `clip-path: polygon(...)`, `mask-image`, `transform-origin`.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `propertyName` | cssProperty | `"filter"` | CSS Property |
| `template` | string | `"blur({blur}px) brightness(...` | CSS string with `{name}` placeholders. Each placeholder must match a declared input port name. Bake any unit (`px`, `%`, `deg`) into the template directly: `blur({blur}px)`. |
| `inputs` | stringFloatMap | `{"blur":{"type":"float"},"b...` | Map of port name → input type (always float). Each entry materializes a float input port that substitutes the matching `{name}` placeholder. |
| `writeMode` | enum | `""` | Write Mode. Options: ``, `style`, `attribute`, `textContent` |
| `precision` | int | `4` | Number of decimal places to format each substituted float as. Default 4 — matches CSSOM rounding and avoids 17-digit float noise. (min: 0, max: 8, step: 1) |


## Use cases

- Multi-component filter — `filter: blur({blur}px) brightness({bright})` driven by two channel outputs in one DOM write, no helper CSS variables.
- Animated polygon clip-path — `polygon({a}% 0, 100% {b}%, ...)` with each vertex driven independently.
- CSS mask-image with animated stops — `linear-gradient(black {a}%, transparent {b}%)`.

## See also

- [DOM String Write](domStringWrite.md) — `domStringWrite`
- [DOM Property Write](domPropertyWrite.md) — `domPropertyWrite`
- [DOM Pose Write](domPoseWrite.md) — `domPoseWrite`

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
