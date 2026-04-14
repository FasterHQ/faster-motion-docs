# SM Hit Test

**Type:** `smHitTest`  
**Category:** state-machine  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Translates pointer events + hit object IDs into per-target HitResult map for listener evaluation.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pointerDown` | `float` | Pointer Down |
| `pointerUp` | `float` | Pointer Up |
| `pointerX` | `float` | Pointer X |
| `pointerY` | `float` | Pointer Y |
| `hitObjectIds` | `any` | Hit Object IDs |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `hitResults` | `any` | Hit Results |
| `pointerX` | `float` | Pointer X |
| `pointerY` | `float` | Pointer Y |


## Parameters

_No configurable parameters._
