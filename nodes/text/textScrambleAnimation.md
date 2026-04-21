# Text Scramble Animation

**Type:** `textScrambleAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Scramble a single character at a target selector — cycles through a charset and settles on the original character, driven by a 0..1 progress input. One compound per character (use one per DOM element; author a multiKeyframe to drive all of them from one scroll/hover source). Compound: expanded into `scrambleCompute + domStringWrite` at load time — no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target Selector |
| `originalText` | string | `""` | Original Character |
| `charset` | string | `"ABCDEFGHIJKLMNOPQRSTUVWXYZ...` | Character Set |
| `count` | int | `8` | Total Characters (min: 1) |
| `index` | int | `0` | Character Index (min: 0) |

