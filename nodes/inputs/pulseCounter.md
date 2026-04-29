# Pulse Counter

**Type:** `pulseCounter`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Pulse-driven integer counter with optional wrap-around. Each rising edge of `pulse` advances `index` by `step`; rising edge of `reset` returns `index` to `start`. With `wrap` enabled, output is folded into `[start, start + max)` via positive modulo (negative steps wrap correctly too). The current `index` is published every frame; downstream consumers (`pulseRouter`, expressions, `parameterReadFloat`) read it like any other numeric source.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `reset` | `float` | Reset |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | int | `0` | Start |
| `step` | int | `1` | Step |
| `wrap` | bool | `true` | Wrap Around |
| `max` | int | `10` | Wrap Range (min: 1) |

