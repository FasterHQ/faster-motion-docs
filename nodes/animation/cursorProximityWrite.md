# Cursor Proximity Write

**Type:** `cursorProximityWrite`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

DOM-side radial-push writer. Treats the cursor as a solid ball and shoves each matched element AWAY from it along the unit vector connecting them. Each char/icon/cell gets three CSS vars written every frame — `--cursor-shift` (horizontal push px), `--cursor-lift` (vertical push px), `--cursor-tilt` (signed rotation deg) — so author-side CSS can compose them into any transform recipe. Per-element damped-spring physics gives an elastic settle: chars bounce back when the cursor moves away. Captures rest centres ONCE at bind time relative to `scopeSelector` (when set) so per-frame work is one BCR read for the scope plus pure math per element. Off-screen scopes cull the entire write loop.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `cursorX` | `float` | Cursor X |
| `cursorY` | `float` | Cursor Y |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector |
| `scopeSelector` | elementSelector | `""` | Scope Container |
| `radius` | float | `130` | Radius (px) (min: 1) |
| `pushAmount` | float | `55` | Push (px) |
| `tiltAmount` | float | `18` | Tilt (deg) |
| `stiffness` | float | `220` | Stiffness (min: 1) |
| `damping` | float | `18` | Damping (min: 0) |

