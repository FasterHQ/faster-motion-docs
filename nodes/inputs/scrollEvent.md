# Scroll Event

**Type:** `scrollEvent`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

F349 — edge-pulse detector on a 0..1 progress signal. Emits 1-frame pulses on threshold crossings: `entered` (forward across startThreshold), `left` (forward across endThreshold), `enteredBack` (backward across endThreshold), `leftBack` (backward across startThreshold). Pair with `pulseTween` and/or `parameterAction(set/toggle)` to recover trigger-mode toggleActions semantics, or with `parameterAction(set, amount=1)` on `entered` only to recover an observe-once latch.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `entered` | `float` | Entered |
| `left` | `float` | Left |
| `enteredBack` | `float` | Entered Back |
| `leftBack` | `float` | Left Back |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `startThreshold` | float | `0` | Start Threshold (min: 0, max: 1) |
| `endThreshold` | float | `1` | End Threshold (min: 0, max: 1) |

