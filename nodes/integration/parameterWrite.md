# Parameter Write

**Type:** `parameterWrite`  
**Category:** integration  
**Context:** Shared — works in both DOM and canvas graphs  

Compute a parameter's next value on a rising-edge trigger. Pure-compute — reads currentValue from a ParameterStore.out_<paramId> input, emits nextValue which the store commits through its writer-fanin input.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `currentValue` | `any` | Current Value |
| `delta` | `float` | Delta |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `nextValue` | `any` | Next Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `parameterId` | string | `""` | Parameter Id |
| `action` | enum | `"set"` | Action. Options: `set`, `toggle`, `fire`, `increment`, `decrement` |
| `value` | string | `false` | Value |


## Used in

Animations from the [faster-claude catalog](https://git.fasterhq.com/faster-marketplace/animations) that wire this node. Each entry runs in production and is the QA'd reference for the pattern.

| Animation | Category | Complexity | Sources |
|-----------|----------|------------|---------|
| Accordion Expand | click-triggers | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/click-triggers-accordion-expand) · [`faster-claude/catalog/animations/click-triggers/accordion-expand/accordion-expand.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/click-triggers/accordion-expand/) |
| Card Lift on Hover | hover-interactions | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-card-lift) · [`faster-claude/catalog/animations/hover-interactions/card-lift/card-lift.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/card-lift/) |
| Toggle Switch | click-triggers | beginner | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/click-triggers-toggle-switch) · [`faster-claude/catalog/animations/click-triggers/toggle-switch/toggle-switch.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/click-triggers/toggle-switch/) |
| 3D Tilt Parallax Card | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-tilt-parallax-card) · [`faster-claude/catalog/animations/hover-interactions/tilt-parallax-card/tilt-parallax-card.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/tilt-parallax-card/) |
| Cursor Follow Element | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-cursor-follow) · [`faster-claude/catalog/animations/hover-interactions/cursor-follow/cursor-follow.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/cursor-follow/) |
| Feature Spotlight | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-feature-spotlight) · [`faster-claude/catalog/animations/hover-interactions/feature-spotlight/feature-spotlight.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/feature-spotlight/) |
| Image Reveal on Hover | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-image-reveal) · [`faster-claude/catalog/animations/hover-interactions/image-reveal/image-reveal.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/image-reveal/) |
| Interactive Glow Card | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-glow-card) · [`faster-claude/catalog/animations/hover-interactions/glow-card/glow-card.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/glow-card/) |
| Interactive Showcase | advanced-orchestration | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/advanced-orchestration-interactive-showcase) · [`faster-claude/catalog/animations/advanced-orchestration/interactive-showcase/interactive-showcase.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/advanced-orchestration/interactive-showcase/) |
| Magnetic Button | hover-interactions | moderate | [preview](https://app.fasterhq.com/studio/marketplace/catalog/animation-preview/hover-interactions-magnetic-button) · [`faster-claude/catalog/animations/hover-interactions/magnetic-button/magnetic-button.fmtion`](https://git.fasterhq.com/faster-marketplace/animations/src/branch/main/hover-interactions/magnetic-button/) |

_…and 13 more in the catalog._

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
