# Bidirectional Snap

**Type:** `bidirectionalSnap`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Self-contained wheel-driven discrete-step navigator. Bundles observer + threshold pulses + counter + direction latch + initial-load pulse + indexed dispatcher into one author-facing node. Outputs an integer `activeIdx` that wraps in [0, count), forward / backward latches for direction-aware reveals, and per-section enter / exit pulse pairs (`enter_out{i}`, `exit_out{i}`) fired on every `activeIdx` edge. Compound — expands at load to ~8 primitives.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `activeIdx` | `float` | Active Idx |
| `forwardActive` | `float` | Forward |
| `backwardActive` | `float` | Backward |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | int | `1` | Section Count (min: 1, max: 256) |
| `mountSelector` | elementSelector | `""` | Mount Selector |
| `threshold` | float | `30` | Wheel Threshold (min: 1) |
| `cooldownMs` | int | `1300` | Cooldown (ms) (min: 0) |
| `tolerance` | float | `50` | Observer Tolerance (min: 0) |

