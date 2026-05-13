# String Array Pick

**Type:** `stringArrayPick`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Pure picker — emits `array[floor(index)]` as a string. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback string returned when the resolved array is empty.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |
| `array` | `stringArray` | Array |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | int | `0` | Static index baked into the .fmtion. Used when the `Index` input port is unwired. Wire the port to override at runtime. (min: 0) |
| `fallback` | string | `""` | Fallback (empty array) |


## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| OBSCURA — Studio | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-obscura-studio) · [`faster-claude/catalog/animations/advanced-orchestration/obscura-studio/obscura-studio.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/obscura-studio/) |
| Editorial Lookbook | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-editorial-lookbook) · [`faster-claude/catalog/animations/scroll-animations/editorial-lookbook/editorial-lookbook.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/editorial-lookbook/) |

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
