# Counter Animation

**Type:** `counterAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Interpolate a number from min to max (formatted via template, decimals, thousand separator) driven by a 0..1 progress input. Authors pick any number of output targets via `channels`: `from: "text"` writes the formatted string to any DOM string target (textContent, aria-valuetext, CSS var, title, data-*, etc.), `from: "value"` routes the raw float to any numeric CSS property (opacity, translateY, scale, rotate, width, …). One compound can show the number AND animate motion simultaneously from the same count. Compound: expands into `counter + one domPoseWrite + N domStringWrites` at load time — no runtime class.

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
| `channels` | counterChannels | `{"textContent":{"from":"tex...` | Channels |

