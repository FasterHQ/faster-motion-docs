# Threshold Map

**Type:** `thresholdMap`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Continuous float-to-string mapping over a single threshold. Emits `above` when input ≥ threshold, `below` otherwise — every frame, not just on crossing. Replaces the 2-node `expression(node('p') > X ? 1 : 0) → stringArrayPick { values: [below, above] }` pattern that recurs whenever a latched CSS property (`pointer-events`, `display`, `visibility`, `cursor`) needs to flip on/off based on a scalar driver. Distinct from `thresholdPulse`, which fires a one-shot pulse on crossing and is meant for event consumers.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `threshold` | `float` | Threshold (override) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `string` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `threshold` | float | `0.5` | Threshold |
| `below` | string | `""` | Below |
| `above` | string | `""` | Above |
| `strict` | bool | `false` | Strict (>) |

