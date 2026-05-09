# Bone Transform

**Type:** `boneTransform`  
**Category:** skeleton  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Per-bone override-apply node — reads rest scalars from sibling restPoseBone, applies override/additive/constraintXform, outputs post-override world matrix

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `parentWorldMatrix` | `any` | Parent World Matrix |
| `restX` | `float` | Rest X |
| `restY` | `float` | Rest Y |
| `restRotation` | `float` | Rest Rotation |
| `restScaleX` | `float` | Rest Scale X |
| `restScaleY` | `float` | Rest Scale Y |
| `constraintXform` | `any` | Constraint Override |
| `constraintMask` | `float` | Constraint Mask |
| `overrideX` | `float` | Override X |
| `overrideY` | `float` | Override Y |
| `overrideRotation` | `float` | Override Rotation |
| `overrideScaleX` | `float` | Override Scale X |
| `overrideScaleY` | `float` | Override Scale Y |
| `overrideWorldX` | `float` | Override World X |
| `overrideWorldY` | `float` | Override World Y |
| `overrideWorldRotation` | `float` | Override World Rotation |
| `overrideWorldScaleX` | `float` | Override World Scale X |
| `overrideWorldScaleY` | `float` | Override World Scale Y |
| `additiveX` | `float` | Additive X |
| `additiveY` | `float` | Additive Y |
| `additiveRotation` | `float` | Additive Rotation |
| `additiveScaleX` | `float` | Additive Scale X |
| `additiveScaleY` | `float` | Additive Scale Y |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `worldMatrix` | `any` | World Matrix |
| `localMatrix` | `any` | Local Matrix |
| `x` | `float` | Local X |
| `y` | `float` | Local Y |
| `rotation` | `float` | Local Rotation |
| `scaleX` | `float` | Local Scale X |
| `scaleY` | `float` | Local Scale Y |
| `worldX` | `float` | World X |
| `worldY` | `float` | World Y |
| `worldRotation` | `float` | World Rotation |
| `worldScaleX` | `float` | World Scale X |
| `worldScaleY` | `float` | World Scale Y |


## Parameters

_No configurable parameters._

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
