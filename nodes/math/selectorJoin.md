# Selector Join

**Type:** `selectorJoin`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Concatenate `prefix` + `suffix` into a single CSS selector string. The canonical helper for composing per-iteration selectors out of a `forEachScope.selector` (prefix) and a static descendant fragment (suffix), replacing the F351 embedded-token form `"$match .child"`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `prefix` | `string` | String prepended to the suffix. Wired source overrides the `prefix` param. Typical wiring: `__scope__.selector`. |
| `suffix` | `string` | String appended to the prefix. Wired source overrides the `suffix` param. Typical author setting: a leading-space descendant combinator + class (e.g. `" .heading"`). |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `selector` | `string` | Concatenated `prefix + suffix` string. Wire into any node's wireable selector input port. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prefix` | string | `""` | Default value used when the prefix port is unwired. |
| `suffix` | string | `""` | Default value used when the suffix port is unwired. Typical: a leading-space descendant combinator (e.g. `" .child"`). |


## Use cases

- Per-iteration descendant selector — wire `prefix` from `__scope__.selector`, set `suffix: " .child"`. Output is `<scope-selector> .child` per iteration.
- Per-iteration attribute composition — wire `prefix` from `__scope__.selector`, set `suffix: "[data-id]"`.
- Author-time literal join — leave both inputs unwired, set both as params, get a constant selector output (rare; usually selectors are static and don't need a join).

## See also

- [For Each Scope](../integration/forEachScope.md) — `forEachScope`
- [Expression](expression.md) — `expression`

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
