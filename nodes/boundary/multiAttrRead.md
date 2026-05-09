# Multi-Attribute Read

**Type:** `multiAttrRead`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Reads N attributes from each element matching a selector in a single querySelectorAll pass, emits one stringArray output per attribute. Replaces N domStringArrayRead nodes that each re-query the same selector for one attribute (common in per-card metadata pipelines: title / camera / stock / location / year / type / overview, etc.). Output port names are author-chosen; the attribute strings can be data-attrs, HTML attrs, or `textContent` for the element's text. Static read at bind time; document-order matches.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `attributes` | attrMap | `{"title":"data-title"}` | Map of output-port-name → DOM attribute name. Each key becomes a stringArray output port that emits one entry per matched element. Special value "textContent" reads the element's text content instead of an attribute. Author-chosen port names (`title`, `year`, `camera`, …) decouple output identity from raw attribute name. |


## Use cases

- Carousel / deck cards with N distinct metadata fields per card — wire each output stringArray to its own stringArrayPick (driven by the active-slot index) then to a domStringWrite for the drawer / inspector panel.
- Drop-in collapse for chains of N domStringArrayRead nodes with identical selector but different attribute names — same results, one DOM walk.

## See also

- [DOM String Array Read](domStringArrayRead.md) — `domStringArrayRead`
- [DOM Attribute Read](domAttributeRead.md) — `domAttributeRead`
- [String Array Pick](../text/stringArrayPick.md) — `stringArrayPick`
- [Text Decompose](../text/textDecompose.md) — `textDecompose`

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
