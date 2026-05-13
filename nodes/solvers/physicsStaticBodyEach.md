# Physics Static Body (per element)

**Type:** `physicsStaticBodyEach`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-element static collider. Selector matches N DOM elements via `querySelectorAll`; spawns one static body per match, each tracking its element's live BCR. Per-frame translation-only resampling (translation-invariant — the engine preserves contact pairs across pose changes). Use when N elements share the same physics tuning but each needs its own body — per-letter colliders driven by `splitText`, per-card colliders in a forEach layout, etc.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Wire to the sibling `physicsWorld.world` output. Loader resolves the connection at bind and registers all N bodies in this world. |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bodyIds` | `floatArray` | Engine handles in document-order (matches the `querySelectorAll` order). Wire downstream into per-body consumers. |
| `count` | `float` | Number of matched elements / spawned bodies. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Multi-match CSS selector. Every element matched by `querySelectorAll` at bind time becomes its own body. |
| `mode` | enum | `"kinematic"` | Kinematic: rigid obstacle whose pose tracks the element BCR each frame; ball impacts cannot move it but it correctly pushes balls when CSS displaces it. Dynamic: spring-tethered to the element BCR; ball impacts knock it; spring pulls it back. Patrick Heng-style letter wobble uses Dynamic.. Options: `kinematic`, `dynamic` |
| `restitution` | float | `0.5` | Bounce coefficient. 0 = no bounce, 1 = perfectly elastic. (min: 0, max: 1, step: 0.05) |
| `friction` | float | `0.5` | Friction (min: 0, max: 2, step: 0.05) |
| `isSensor` | bool | `false` | When true, generates collision events but does not push other bodies. |
| `stiffness` | float | `80` | Dynamic mode only. Spring force per pixel of displacement from home. Higher = faster snap-back. (min: 0, step: 5) |
| `damping` | float | `8` | Dynamic mode only. Velocity-opposing damping. Higher = fewer wobble cycles before settling. (min: 0, step: 0.5) |
| `density` | float | `0.5` | Dynamic mode only. Mass per unit area. Lower = lighter / easier to knock. (min: 0.01, step: 0.1) |


## Use cases

- Per-letter physics — `splitText` produces N `.ft-split-char` elements; `physicsStaticBodyEach { selector: ".ft-split-char" }` gives one body per letter. When `cursorProximityWrite` shifts a letter via CSS transform, that letter's body tracks the new BCR — visual gaps become physical gaps and balls fall through them.
- Per-card colliders for a list layout where each card should bounce independently when knocked.
- Per-instance colliders downstream of `forEach`-expanded slides without authoring N nodes by hand.

## See also

- [Physics Static Body](physicsStaticBody.md) — `physicsStaticBody`
- [Physics Body Stagger](physicsBodyStagger.md) — `physicsBodyStagger`
- [Split Text](../text/splitText.md) — `splitText`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Studio Showreel | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-wheel-deck-blob) · [`faster-claude/catalog/animations/scroll-animations/wheel-deck-blob/wheel-deck-blob.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/wheel-deck-blob/) |

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
