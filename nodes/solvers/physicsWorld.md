# Physics World

**Type:** `physicsWorld`  
**Category:** solvers  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

One rigid-body simulation world. Wire `gravity` from a `constantVec2` (or set the param), gate `paused` from a scroll-trigger threshold, and the world ticks every frame in play mode (skipped in seek). Bodies, static bodies, joints, and event listeners register with this world via their `world` connection — only ONE `physicsWorld` per scene. Lazy-loads the physics WASM module on first bind; scenes without any physicsWorld pay zero overhead. F236-compliant (reads ambient deltaTime; never an input port for time).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `gravity` | `vec2` | Gravity in px/s². Default (0, 0) = zero gravity (bodies float; only forces / impulses move them). Typical earth-like value: (0, 2200) if your y-axis points down. |
| `timeScale` | `float` | 1 = real-time, 0 = paused (same as `paused: true`), 0.5 = slow-mo, 2 = fast-forward. The world clamps sub-stepping to 16 sub-steps per frame regardless of timeScale. _(range: 0..4, unit: fraction)_ |
| `paused` | `float` | When non-zero, world.step is skipped this frame. Bodies retain their last pose. Use to gate simulation on a state-machine transition or any custom signal. For the canonical "start when scrolled into view" pattern, prefer the `progress` input + `pauseBelowProgress` param — saves a separate gate node. _(range: 0..1, unit: bool)_ |
| `progress` | `float` | Optional 0..1 driver. When wired AND `pauseBelowProgress` param is set, the world is paused while `progress < pauseBelowProgress` and runs above. Lets a single `scrollTrigger.progress` connection replace a separate `expression` gate node for the common scroll-driven start pattern. _(range: 0..1, unit: progress)_ |
| `pauseUntilStable` | `float` | Wait-for-upstream-stability gate. Wire this from any 0..1 stability signal (another `physicsWorld.isSettled`, an `expression`, etc.). World pauses while value < 1. Replaces empirical `pauseBelowProgress` thresholds with declarative "wait for THIS thing." Default 1 (= proceed) when unwired. Additive with `paused` and `pauseBelowProgress` — any one of them pausing pauses the world. _(range: 0..1, unit: bool)_ |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `world` | `any` | Opaque PhysicsWorldHandle for body/joint/drag/event nodes to consume. Wire this to their `world` input. Authors do not introspect. |
| `frameStepped` | `float` | Pulses 1.0 on the frame the world stepped, 0 otherwise. Use to chain effects to "we actually simulated" (e.g. fire a `pulseTween` once per step). |
| `bodyCount` | `float` | Body Count |
| `jointCount` | `float` | Joint Count |
| `isSettled` | `float` | 1 when every dynamic body has held linear speed below `settleSpeedThreshold` for at least `settleFrameCount` consecutive frames; 0 otherwise (or while paused). Wire into downstream effects gated on "the simulation has come to rest" — replaces empirical `pauseBelowProgress` magic numbers with a declarative primitive. _(range: 0..1, unit: bool)_ |
| `maxDynamicBodySpeed` | `float` | Live max linear speed across every dynamic body. Diagnostic + custom-settle authoring. |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pixelsPerMeter` | float | `100` | Default 100 (100 px = 1 m). Larger values make the engine treat the same pixel motion as smaller real-world distances; affects gravity feel + collision response. Tune only if your scene has very large/small bodies. (min: 1, max: 10000, step: 10) |
| `subSteps` | int | `4` | Solver passes per frame. 4 = engine default (good for most scenes). 8+ = high-stack stability. Cost scales linearly. (min: 1, max: 16) |
| `paramGravityX` | float | `0` | Used when the `gravity` input port is not wired. Number = raw px/s². Strings accepted: "1g" / "2.5g" / "earth" → resolved at load relative to `pixelsPerMeter`. (step: 100) |
| `paramGravityY` | float | `0` | Used when the `gravity` input port is not wired. Number = raw px/s² (earth-like for downward y at ppm=100: 2200). Strings accepted: "1g" / "2.5g" / "earth" → resolved at load relative to `pixelsPerMeter`. (step: 100) |
| `pauseBelowProgress` | float | `null` | Convenience scroll-driven gate. Wire `progress` (typically from `scrollTrigger.progress`) and set this threshold. World pauses while `progress < threshold`, runs above. For "wait for an upstream signal to be stable" patterns prefer the `pauseUntilStable` input port. Leave blank to use only the `paused` port for gating. (min: 0, max: 1, step: 0.05) |
| `frameSelector` | elementSelector | `null` | Optional CSS selector identifying the element whose coord system body coords are anchored to. Default null = body coords are viewport coords. Pair with `originAlignment` to declare whether body (0,0) is the frame top-left or center. |
| `originAlignment` | enum | `"topLeft"` | Where body-coord (0,0) maps to inside `frameSelector`. `topLeft` (default) for polyline shapes authored in the frame's top-left-origin coord system (dental cup pattern). `center` for demos that render bodies via writeTransform: "cssVar" against `left:50%;top:50%`-positioned elements (wheel-deck-blob endcap pattern). Honored by both the loader's shape conversion and runtime consumers like `physicsBodyLookup`.. Options: `topLeft`, `center` |
| `settleSpeedThreshold` | float | `1` | Speed below which a dynamic body counts as "stopped" for the `isSettled` output. Default 1 px/s (sub-pixel-per-second is empirically rest). Tighten (0.1) for ultra-precise rest detection; loosen (10) when restitution-driven micro-bounces would otherwise prevent settling. (min: 0, step: 0.1) |
| `settleFrameCount` | int | `5` | Number of consecutive frames every dynamic body must stay below `settleSpeedThreshold` before `isSettled` flips to 1. Default 5 (handles single-frame stalls during bounce reversals). 1 = instant detection; higher = stricter. (min: 1) |


## Use cases

- Drop balls into a circular bowl arc and watch them settle on the inside curve. Pair with a `pulseFromProgress` gate so the world stays paused until a scroll trigger crosses, then springs to life.
- Drag-and-throw labels: each label is a `physicsBody`, gravity holds them in place via a static floor; `physicsMouseDrag` (v2) gives users grab-and-fling interaction with collision-realistic neighbour bumps.
- Skeleton ragdoll: per-bone `physicsBody` capsules + `physicsJoint type: revolute` chain (v2). On state-machine transition fire `physicsApplyImpulse` to ragdoll the character.

## See also

- [Physics Body](physicsBody.md) — `physicsBody`
- [Physics Static Body](physicsStaticBody.md) — `physicsStaticBody`

## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Fractional CTO | scroll-animations | advanced | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/scroll-animations-technology-advisory) · [`faster-claude/catalog/animations/scroll-animations/technology-advisory/technology-advisory.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/scroll-animations/technology-advisory/) |
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
