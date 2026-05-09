# Threshold Map

**Type:** `thresholdMap`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Continuous float-to-string mapping over a single threshold. Emits `above` when input ≥ threshold, `below` otherwise — every frame, not just on crossing. Replaces the 2-node `expression(node('p') > X ? 1 : 0) → stringArrayPick { values: [below, above] }` pattern that recurs whenever a latched CSS property (`pointer-events`, `display`, `visibility`, `cursor`) needs to flip on/off based on a scalar driver. Distinct from `thresholdPulse`, which fires a one-shot pulse on crossing and is meant for event consumers.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `threshold` | `float` | Threshold (override) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `string` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `threshold` | float | `0.5` | Default threshold value. The `threshold` input port (when wired) overrides this per frame so a viewport-derived or animated threshold re-evaluates without a graph rewrite. (step: 0.01) |
| `below` | string | `""` | Output string when value < threshold (or ≤ when strict). Empty string is fine — common for clearing a CSS property by writing `''`. |
| `above` | string | `""` | Output string when value ≥ threshold (or > when strict). |
| `strict` | bool | `false` | When true, uses strict `>` comparison; when false (default), uses inclusive `≥`. Inclusive matches the intuition that "exactly at threshold" should already be on. |


## Use cases

- Drawer / modal pointer-events gate — `pointer-events: none` while the open progress is below 5%, `auto` once it crosses, so clicks during a partial open don't hit the half-revealed surface.
- Toggle `display: none` on a scroll-driven section once its progress passes 0 — without the typical "expression returns 0/1, then a pick" two-node chain.
- Cursor / accessibility hints that flip at a specific scrub value (`grab` ↔ `grabbing`).

## See also

- [Threshold Pulse](../inputs/thresholdPulse.md) — `thresholdPulse`
- [Expression](expression.md) — `expression`
- [String Array Pick](../text/stringArrayPick.md) — `stringArrayPick`
- [String Keyframe](../animation/stringKeyframe.md) — `stringKeyframe`

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
