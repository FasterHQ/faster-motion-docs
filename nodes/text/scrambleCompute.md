# Scramble Compute

**Type:** `scrambleCompute`  
**Category:** text  
**Context:** DOM — operates on HTML elements via CSS selectors  

Per-character scramble effect — outputs original or random character. Convention: progress=1 fully scrambled, progress=0 fully revealed; per-char threshold derived from index/count so leftmost char reveals first. F336 adds `speed` (cycle-rate multiplier on the 16Hz baseline flicker) and `revealDelay` (hold-on-scramble fraction at the high-progress end before any chars resolve). `charset` accepts preset names (`upperCase`, `lowerCase`, `upperAndLowerCase`, `01`, `symbols`) or any literal string.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `originalText` | string | `""` | Original Text |
| `charset` | string | `—` | Character Set |
| `speed` | float | `1` | Cycle Speed (min: 0, step: 0.1) |
| `revealDelay` | float | `0` | Reveal Delay (0..1) (min: 0, max: 0.999, step: 0.05) |


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
