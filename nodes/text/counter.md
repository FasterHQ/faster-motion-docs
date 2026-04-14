# Counter

**Type:** `counter`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Animated number counter — interpolates min→max with formatting (decimals, separator, template).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `min` | float | `0` | Min |
| `max` | float | `100` | Max |
| `decimals` | int | `0` | Decimals (min: 0, max: 10) |
| `separator` | string | `""` | Thousand Separator |
| `format` | string | `"{value}"` | Format Template |

