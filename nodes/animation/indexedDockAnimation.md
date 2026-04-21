# Indexed Dock Animation

**Type:** `indexedDockAnimation`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Dock a source element onto the Nth child of a list, where N is derived from a 0..1 progress input. One authoring node replaces the canonical `domIndexedDock + domPoseWrite` chain. Used for typewriter cursors, tab underlines, focus rings, onboarding step indicators, carousel page dots — any "chrome follows active item in a list" pattern. Authors route offsetX to any CSS property via `channels` (default: translateX px). Compound: expanded into those two primitives at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sourceSelector` | elementSelector | `""` | Source (what docks) |
| `childSelector` | elementSelector | `""` | Children (the list) |
| `channels` | indexedDockChannels | `{"translateX":{"from":"offs...` | Channels |

