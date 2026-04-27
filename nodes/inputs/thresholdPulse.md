# Threshold Pulse

**Type:** `thresholdPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Emits a single-frame pulse when `value` crosses `threshold`. `mode` chooses semantics: `edge` (default) fires once per crossing then suppresses until value drops below `threshold - hysteresis` and re-crosses; `auto` fires periodically paced by `cooldownMs` for as long as value stays past threshold. `direction` selects rising / falling / both. Continuous comparator output `isAbove` is raw (not gated). First-frame above-threshold does NOT fire (cold-start state-snap).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `threshold` | `float` | Threshold |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pulse` | `float` | Pulse |
| `isAbove` | `float` | Is Above |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | enum | `"edge"` | Mode. Options: `edge`, `auto` |
| `direction` | enum | `"rising"` | Direction. Options: `rising`, `falling`, `both` |
| `hysteresis` | float | `0` | Hysteresis (min: 0) |
| `cooldownMs` | float | `0` | Cooldown (ms) (min: 0) |

