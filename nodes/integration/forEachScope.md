# For Each Scope

**Type:** `forEachScope`  
**Category:** integration  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Per-iteration scope source materialised by `expandInstanceNodes` inside every forEach iteration. Replaces the F351 reserved-token substitution mechanism (`$match`, `$index`) with a port-driven model — template-body nodes wire from this node's outputs the same way they wire from any other producer. Authors do NOT write this node by hand; the loader emits one per iteration with constant per-iteration values.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `selector` | `string` | Per-iteration matched-element CSS selector. Empty when the parent instance has no `forEach`. |
| `index` | `float` | 0-based iteration index. |
| `count` | `float` | Total iteration count for this forEach. |


## Parameters

_No configurable parameters._

## Use cases

- Inside a forEach template, wire `selector` into a writer's selector input port (replaces `"selector": "$match"`).
- Inside a forEach template, wire `index` into an indexed-aware consumer (e.g. `sectionAlphaGate.myIdx`) (replaces `"myIdx": "$index"`).
- For embedded selector composition (`"$match .child"`), wire `selector` into a `selectorJoin.prefix` and set `suffix: " .child"`.
- Custom overridables surface as additional output ports on the scope, carrying the per-iteration resolved value with the same name as the overridable.

## See also

- [For Each](forEach.md) — `forEach`
- [Selector Join](../math/selectorJoin.md) — `selectorJoin`

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
