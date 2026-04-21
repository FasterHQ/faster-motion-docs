# Text Scramble Animation

**Type:** `textScrambleAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Scramble a single character — cycles through a charset and settles on the original, driven by a 0..1 progress input. Authors pick one or more string write targets via `channels` (textContent, attribute like aria-label / title / data-*, CSS style property, CSS custom var). Compound: expands to `scrambleCompute` + one `domStringWrite` per channel at load time — no runtime class.

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
| `channels` | stringChannels | `{"textContent":{"propertyNa...` | Channels |

