# Tween

**Type:** `tween`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Stateless A→B interpolation with easing — pure function of `progress`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Drive value 0..1. At 0, output = `From`; at 1, output = `To`. Wire from a timeline, scrollTrigger, or any normalized signal. |
| `from` | `float` | Optional dynamic override of the `From` param. When wired, the tween starts at this incoming value instead of the static param. Use to vary the start per spawn (e.g. wire from a Latch holding the cursor X). |
| `to` | `float` | Optional dynamic override of the `To` param. When wired, the tween ends at this incoming value instead of the static param. Use for per-spawn variety: wire `randomFloat` for random rotation / scale / fall distance. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Interpolated value between `from` and `to`, shaped by `ease`. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `from` | float | `0` | Output value when `progress` = 0. Any number — units are whatever the consumer expects (px, deg, opacity 0..1, etc). Example: 0 for fade-in opacity, -100 for off-screen-left translate. |
| `to` | float | `1` | Output value when `progress` = 1. Example: 1 for fully visible opacity, 200 for translate-200px-right, 360 for one full rotation in degrees. |
| `ease` | easingCurve | `"linear"` | Easing curve shaping how `value` interpolates from `from` to `to`. Pick a preset (linear / power / elastic / back / bounce / cubic-bezier) — easings accept parameters via `name(arg1, arg2)` syntax. Example: "elastic.out(1, 0.3)", "back.in(0.4)", "power2.out". |


## Use cases

- One-shot value animation — wire a `timeline` or `scrollTrigger` progress into a tween mapping `from→to` with an easing curve.
- Property remap — rescale a 0..1 input (`mouseVelocity.magnitude`, `scroll`) into a domain-specific range (e.g. -200..200 px) with a non-linear curve.

## See also

- [Pulse Tween](pulseTween.md) — `pulseTween`
- [Event Tween](eventTween.md) — `eventTween`
- [Color Tween](colorTween.md) — `colorTween`
- [Remap](../math/remap.md) — `remap`

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
