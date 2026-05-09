# Physics Body Stagger

**Type:** `physicsBodyStagger`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Runtime-fanout compound — one node = N physicsBody instances + N DOM transform writes. Resolves N elements at bind time from a plain CSS selector and creates one body per element with shared params. Per-element radius via `shape.radiusFromCSS: "--bd"` reads each element's CSS variable (same convention `staggerAnimate` uses). Saves ~3N nodes for ball-drop / scatter patterns. For per-element heterogeneity beyond size (different bodyKind / restitution per element), drop down to primitive `physicsBody` + `domPoseWrite` pairs.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. Loader resolves at bind and registers all N bodies in this world. |
| `enabled` | `float` | When 0, all N bodies removed from broadphase (frozen at last pose). _(range: 0..1, unit: bool)_ |
| `progress` | `float` | Optional 0..1 driver. When wired AND `resetBelowProgress` param is set, every body re-snaps to its initial pose + zero velocity on the falling edge of progress crossing the threshold (i.e. when scrolling BACK up past the trigger). For the dental ball-drop pattern: pair with `physicsWorld.pauseBelowProgress` set to the same threshold. _(range: 0..1, unit: progress)_ |
| `targetCenterX` | `float` | IK-style target. When wired, overrides authored `initialX` so balls spawn centered on the wired source — typically `physicsStaticBody.centerX`. Eliminates the "two-vh-values out of sync" failure mode where the cup is at one viewport position and balls spawn at another. |
| `targetTopY` | `float` | IK-style target. When wired, overrides authored `initialY`. Spawn Y = targetTopY + targetTopOffset, so a small negative offset (e.g. -50px) drops balls in from just above the cup mouth. |
| `targetTopOffset` | `float` | Pixel offset added to `targetTopY` to compute spawn Y. Negative = above the cup mouth (default `-50`). Use to tune drop height without recomputing the cup geometry. |
| `targetMouthWidth` | `float` | Width of the target's mouth — wire from `physicsStaticBody.mouthWidth`. Drives `spawnPattern: "fanFromMouth"` to evenly distribute N balls across the mouth without hand-tuning per-ball spacing. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bodyIds` | `floatArray` | Per-element engine handle in match order. Wire to v2 `physicsApplyImpulse[index]` / `physicsCollisionPulse[index]` to address one specific ball inside the stagger. |
| `count` | `float` | Number of elements matched + bodies created. Useful for downstream `expression` / `arrayPick` consumers. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS selector matching N sibling elements (e.g. `".wu-ball"`). One body created per match in document order. |
| `shape` | physicsShape | `{"kind":"circle","radius":25}` | Shared shape across all N bodies. For circles, set `radiusFromCSS: "--bd"` to read each element's --bd CSS var as the diameter (halved internally for radius). Same per-element convention `staggerAnimate` uses. |
| `initialX` | string | `0` | Spawn X position (CSS units like "20vw" supported). Combine with `initialXSpacing` for evenly spaced fan-out. |
| `initialY` | string | `0` | Spawn Y position. Negative values like "-25vh" spawn balls above the viewport. |
| `initialXSpacing` | float | `0` | Adds `index * spacingPx` to each body's initial X. 0 = all at same X (jitter handles separation if non-zero). (step: 10) |
| `initialYSpacing` | float | `0` | Y Spacing per Index (px) (step: 10) |
| `jitterX` | float | `0` | Per-index deterministic hash → ±jitterX px on initial X. Same hash on rebind so balls land at the same spots. (min: 0, step: 10) |
| `jitterY` | float | `0` | Per-index deterministic hash → ±jitterY px on initial Y. Same hash on rebind so balls land at the same spots. (min: 0, step: 10) |
| `density` | float | `1` | Mass per unit area, applied to every ball. Lower = lighter (more bouncy / easier to push); higher = heavier (more momentum). (min: 0.001, step: 0.1) |
| `restitution` | float | `0.5` | 0 = no bounce, 1 = perfectly elastic, > 1 = energy-amplifying. Applied to every ball. (min: 0, max: 2, step: 0.05) |
| `friction` | float | `0.5` | Surface friction coefficient on every ball. 0 = ice (slides forever), 1 = typical solid. (min: 0, max: 2, step: 0.05) |
| `linearDamping` | float | `0` | Per-second exponential damping on linear velocity for every ball. Higher = settles faster. (min: 0, step: 0.05) |
| `angularDamping` | float | `0` | Per-second exponential damping on angular velocity for every ball. (min: 0, step: 0.05) |
| `lockRotation` | bool | `false` | When true, balls cannot rotate (locks angular DOF). Useful when ball labels need to stay upright. |
| `ccd` | bool | `false` | Continuous Collision Detection on every ball. Enables tunnelling-prevention for fast falls / small balls. Costs slightly more CPU. |
| `writeTransform` | enum | `true` | How the node writes per-frame body pose to each element. `Transform` (default) sets `style.transform = translate(x,y) rotate(r)` directly — fast, simple, but overwrites any inherited transform. Use `CSS Var` when bodies live INSIDE a transformed parent (carousel slot, scroll-pinned stage, FLIP layout) — author-CSS composes via `transform: translate(var(--phys-x), var(--phys-y)) rotate(var(--phys-r))` so the parent transform stays intact. `None` writes nothing; consume `bodyIds` and route to a custom DOM write chain. Legacy boolean values (`true` / `false`) are still accepted in JSON.. Options: `transform`, `cssVar`, `none` |
| `resetBelowProgress` | float | `null` | Falling-edge reset gate. When set (e.g. 0.75), every body re-snaps to its initial pose + zero velocity the frame `progress` drops below this threshold — fires once on scroll-up past the trigger, then the world stays paused (pair with physicsWorld.pauseBelowProgress at the same value). Leave blank to never reset; balls remain wherever they last fell. (min: 0, max: 1, step: 0.05) |
| `spawnPattern` | enum | `"explicit"` | Selects how the per-element X offset is computed. "explicit" uses the legacy `i * initialXSpacing` math. "fanFromMouth" reads the wired `targetMouthWidth` and the live element count, fanning N balls evenly across the mouth — `initialXSpacing` is ignored. Falls back to "explicit" when `targetMouthWidth` is unwired.. Options: `explicit`, `fanFromMouth` |


## Use cases

- Dental ball-drop — one stagger node creates 6 dynamic circles from `.wu-ball` siblings, each with its own radius via `--bd`. Replaces 6 physicsBody + 6 domPoseWrite nodes (12 → 1).
- Scatter / confetti — N badges fall under gravity into a target area. Authors set spawn jitter via `jitterX` / `jitterY` for organic randomness (deterministic per-index hash, no Math.random).
- Marble run — N marbles stream from above, hit static path colliders, settle. Stagger handles all N marbles uniformly; per-marble params come from CSS vars.

## See also

- [Physics World](physicsWorld.md) — `physicsWorld`
- [Physics Body](physicsBody.md) — `physicsBody`
- [Stagger Animation](../text/staggerAnimation.md) — `staggerAnimation`

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
