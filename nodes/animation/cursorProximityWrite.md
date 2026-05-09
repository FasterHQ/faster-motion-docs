# Cursor Proximity Write

**Type:** `cursorProximityWrite`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

DOM-side radial-push writer. Treats the cursor as a solid ball and shoves each matched element AWAY from it along the unit vector connecting them. Each char/icon/cell gets three CSS vars written every frame — `--cursor-shift` (horizontal push px), `--cursor-lift` (vertical push px), `--cursor-tilt` (signed rotation deg) — so author-side CSS can compose them into any transform recipe. Per-element damped-spring physics gives an elastic settle: chars bounce back when the cursor moves away. Captures rest centres ONCE at bind time relative to `scopeSelector` (when set) so per-frame work is one BCR read for the scope plus pure math per element. Off-screen scopes cull the entire write loop.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `cursorX` | `float` | Cursor x in document coordinates (px). Wire from `pointer.x`. _(unit: pixels)_ |
| `cursorY` | `float` | Cursor y in document coordinates (px). Wire from `pointer.y`. _(unit: pixels)_ |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector for the elements to push. Each match becomes a bead in the row that the cursor pushes around. Author-side CSS reads `--cursor-shift` / `--cursor-lift` / `--cursor-tilt` and composes them into the element transform (e.g. `transform: translate(var(--cursor-shift), var(--cursor-lift)) rotate(var(--cursor-tilt))`). |
| `scopeSelector` | elementSelector | `""` | Optional ancestor selector. When set, rest centres are captured ONCE at bind relative to this element's BCR; per frame only the scope's BCR is read (1 layout flush instead of N). Use this when matched elements live inside a moving parent (carousel slot, scroll-pinned panel, FLIP layout) — the cached offsets stay correct because the parent translation applies to both cursor and elements equally. Off-screen scope skips the entire write loop. Leave empty to fall back to per-frame BCR per element (slow for 10+ elements). |
| `radius` | float | `130` | Solid-ball radius. Elements within this distance of the cursor get pushed; outside, they sit at rest. Falloff is linear from 1.0 at cursor centre to 0 at the radius edge. (min: 1, step: 5) |
| `pushAmount` | float | `55` | Peak radial-push magnitude in px. Each element is displaced AWAY from the cursor along the unit vector connecting them, scaled by the linear falloff. Element directly above cursor goes UP by this amount; element to the right goes RIGHT, etc. — the cursor acts like a solid ball pushing the row aside. (step: 1) |
| `tiltAmount` | float | `18` | Peak signed rotation in degrees, at cursor centre. Chars to the left of the cursor tilt one way, right the other (sign from horizontal component of push direction). (step: 1) |
| `stiffness` | float | `220` | Spring stiffness (Hooke). Higher = snappier return. Typical 80–300. (min: 1, step: 5) |
| `damping` | float | `18` | Spring damping. Lower = more overshoot/oscillation. Critical damping is `2·sqrt(stiffness)` (~30 for stiffness 220). Pick lower (15–22) for visible spring feel; higher (30+) for smooth no-overshoot. (min: 0, step: 1) |


## Use cases

- Title hover splat — chars push outward from the cursor with a tilt, snap back on lift-off. Pair with `pointer.x` / `pointer.y`. Set `scopeSelector` to the title container so rest centres are stable across slide transitions.
- Icon row hump — icons within `radius` of the cursor get pushed sideways, leaving a wake. Decrease `pushAmount` for subtle, increase `tiltAmount` for dramatic angle play.
- Card grid jiggle — cards lean away from the cursor as it scrubs across, settling with a spring tail when the pointer leaves.

## See also

- [Pointer](../inputs/pointer.md) — `pointer`
- [Mesh Attractor](../effects/meshAttractor.md) — `meshAttractor`
- [Wiggle String Write](wiggleStringWrite.md) — `wiggleStringWrite`

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
