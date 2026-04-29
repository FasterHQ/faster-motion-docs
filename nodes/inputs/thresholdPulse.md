# Threshold Pulse

**Type:** `thresholdPulse`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Edge-detector / pulse generator. Watches `value` and fires a single-frame `pulse` when it crosses `threshold`. `mode: edge` (default) fires once per crossing then suppresses until value drops below `threshold − hysteresis` and re-crosses (debounce). `mode: auto` fires periodically paced by `cooldownMs` for as long as value stays past threshold (metronome). `direction` selects rising-only / falling-only / both. Continuous comparator output `isAbove` is raw (1 while past threshold, 0 otherwise) — useful as a gate when you do not want pulse semantics. First-frame past-threshold does NOT fire (cold-start state-snap, prevents spurious init pulses).

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
| `threshold` | float | `0` | Threshold |
| `mode` | enum | `"edge"` | Mode. Options: `edge`, `auto` |
| `direction` | enum | `"rising"` | Direction. Options: `rising`, `falling`, `both` |
| `hysteresis` | float | `0` | Hysteresis (min: 0) |
| `cooldownMs` | float | `0` | Cooldown (ms) (min: 0) |

