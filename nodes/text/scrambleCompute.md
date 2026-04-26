# Scramble Compute

**Type:** `scrambleCompute`  
**Category:** text  
**Context:** DOM — operates on HTML elements via CSS selectors  

Per-character scramble effect — outputs original or random character. Convention: progress=1 fully scrambled, progress=0 fully revealed; per-char threshold derived from index/count so leftmost char reveals first. F336 adds `speed` (cycle-rate multiplier on the 16Hz baseline flicker) and `revealDelay` (hold-on-scramble fraction at the high-progress end before any chars resolve). `charset` accepts preset names (`upperCase`, `lowerCase`, `upperAndLowerCase`, `01`, `symbols`) or any literal string.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `originalText` | string | `""` | Original Text |
| `charset` | string | `—` | Character Set |
| `speed` | float | `1` | Cycle Speed (min: 0) |
| `revealDelay` | float | `0` | Reveal Delay (0..1) (min: 0, max: 0.999) |

