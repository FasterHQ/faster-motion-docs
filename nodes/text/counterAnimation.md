# Counter Animation

**Type:** `counterAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Interpolate a number from min to max, format it, and write it as the textContent of a target element, driven by a 0..1 progress input. Compound: expanded into `counter + domPoseWrite` at load time — no runtime class.

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
| `min` | float | `0` | Min |
| `max` | float | `100` | Max |
| `decimals` | int | `0` | Decimals (min: 0, max: 10) |
| `format` | string | `"{value}"` | Format Template |
| `separator` | string | `""` | Thousand Separator |

