# Drag Input

**Type:** `dragInput`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

DEPRECATED for new authoring — prefer `dragVelocity` (passive sensor) wired into a `scrollPosition` or a translateX expression. `dragInput` wraps the internal Draggable utility, which physically translates the bound element via inline `transform` writes to drive its own progress reading. That hijacks the element: it can't coexist with a pinned section, an existing transform, or another node that needs the same DOM space. Kept as a stable boundary input for legacy `.fmtion` files; new graphs should not introduce it. Boundary input: binds pointer events to a DOM element and maps drag offset to 0-1 progress on the configured axis. Supports parent-bounded range and inertia throw.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `externalProgress` | `float` | External Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `axis` | enum | `"x"` | Axis. Options: `x`, `y` |
| `bounds` | enum | `"parent"` | Bounds. Options: ``, `parent`, `window` |
| `inertia` | bool | `—` | Inertia |
| `accumulate` | bool | `false` | When true, drag offset PERSISTS across drag sessions — each new drag continues from the previous drag-end offset instead of resetting to 0. Right for swipe-pan carousels and "scrub-forever" patterns. Default false matches slider/knob behaviour where each touch is a fresh delta from origin. |


## See also

- [Drag Velocity](dragVelocity.md) — `dragVelocity`
- [Scroll Position](scrollPosition.md) — `scrollPosition`

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
