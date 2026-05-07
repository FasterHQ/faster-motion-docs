# Wiggle String Write

**Type:** `wiggleStringWrite`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Damped-oscillation per-element writer — like plucking a guitar string with characters tied to it as beads. On each rising-edge `trigger`, every matched element traces its own damped sinusoid `A·e^(-decay·t)·sin(ω·t + i·phaseSpread)` where `i` is the element index. Adjacent elements oscillate slightly out of phase (controlled by `phaseSpread`), giving a "chord struck" feel — independent wiggle per char that stays loosely synchronised across the row. After `duration` seconds the node stops writing and chars return to rest. Use as a one-shot reaction to a hover/click pulse without any progress driver.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `amplitudeInput` | `float` | Amplitude |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Selector |
| `property` | cssProperty | `"translateY"` | Property |
| `cssUnit` | enum | `"px"` | Unit. Options: `px`, `%`, `rem`, `em`, `deg`, `rad`, `none` |
| `amplitude` | float | `16` | Amplitude |
| `frequency` | float | `5` | Frequency (Hz) (min: 0.1) |
| `decay` | float | `6` | Decay (1/s) (min: 0.1) |
| `phaseSpread` | float | `0.4` | Phase Spread (rad) |
| `duration` | float | `1.2` | Duration (s) (min: 0.1) |

