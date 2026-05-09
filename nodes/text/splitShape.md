# Split Shape

**Type:** `splitShape`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Setup-only DOM shape splitter — fractures the path / polygon source shapes inside an `<svg>` into N polygon fragments at bind time, so per-piece animations (translate, rotate, scale, opacity) can target the pieces individually. Runs once: rejection-samples points inside the source-fill region, tessellates with d3-delaunay's Voronoi, boolean-intersects each cell with the union of source paths via `polygon-clipping` so adjacent pieces share their edges exactly (no gaps or overlap). Each fragment gets the class `ft-shatter-piece`. Mirror to `splitText`, but for SVG geometry — drop in any 2-path logo and shatter it into ~100 deterministic pieces without manually pre-fragmenting in a vector editor.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Number of polygon fragments produced. May differ slightly from the `fragments` param if the boolean-clip splits a Voronoi cell into multiple pieces along concave outline crossings (rare for stylized brand marks). |
| `pieceSelector` | `string` | Live CSS selector targeting the polygon fragments — format `<target> .ft-shatter-piece`. Wire into a downstream `staggerWrite` / `domPoseWrite` `selector` input port to keep the consumer in lockstep with the fragments without manually typing the class name. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector matching an `<svg>` element. Its descendant `path` / `polygon` shapes (controlled by `Source Selector` below) define the fracturable region — sites land inside their union fill, fragments are clipped to their union outline. Source shapes are auto-hidden via `visibility: hidden` after fracture (kept in DOM as hit-test geometry only). |
| `sourceSelector` | string | `"path, polygon"` | CSS selector for the source shapes inside the SVG whose union defines the fracturable region. Defaults to `path, polygon` (covers >90% of stylized logos). Tweak if your SVG uses other geometries — e.g. `path, polygon, .logo-shape`. Source elements must implement `getTotalLength()` + `isPointInFill()` (i.e. SVGGeometryElement subclasses). |
| `fragments` | int | `100` | Target number of polygon fragments. Higher counts = finer fracture, more elements to animate. ~80–120 reads as classic shatter; >200 starts looking like a fine mosaic. Performance ceiling is roughly 500 pieces before per-frame transform writes become visible on a typical viewport. (min: 4, step: 1) |
| `seed` | int | `1337` | RNG seed for deterministic fracture — same seed always produces the same break pattern across reloads. Bump if you want a different look without changing fragment count. (min: 0, step: 1) |


## Use cases

- Brand-logo shatter / reassemble — pair with `staggerWrite` (translate + rotate + scale + opacity, random per-element from-values, ease `power4.inOut`) and a ping-pong `timeline` for forever-looping logo entrance / exit. Fragment count ~100, `staggerOrder: 'start'` for spatial sweep direction.
- Click-to-shatter interactions — wire a `clickPulse` → `pulseTween` → `staggerWrite` so the logo bursts apart on click and reassembles on the next pulse.
- Scroll-driven explode — feed `scrollTrigger.progress` into `staggerWrite` so the logo pieces fly apart as the user scrolls past a hero section.
- Generic shape fracturing — works on any SVG with one or more `<path>` / `<polygon>` source shapes (set `sourceSelector` if your SVG uses other element types). The fracture is deterministic given a `seed` — same seed always produces the same break pattern.

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
