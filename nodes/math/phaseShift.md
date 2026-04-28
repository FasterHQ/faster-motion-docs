# Phase Shift

**Type:** `phaseShift`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Per-clone phase shift of a shared 0..1 progress signal. Computes `(progress + index/count) % 1`, wrapping the result into [0, 1) so it can drive any node that consumes a normalized progress (staggerWrite, multiKeyframe, propertyAnimation). Replaces the inline `((node('progress') + ($index / node('count'))) % 1)` expression that recurs in any forEach-instanced template that needs each clone to ride a different phase of one shared clock.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `index` | `float` | Index |
| `count` | `float` | Count |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | float | `0` | Index (baseline) |
| `count` | float | `1` | Count (baseline) |

