# String Array Pick

**Type:** `stringArrayPick`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Pure picker — emits `array[floor(index)]` as a string. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback string returned when the resolved array is empty.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |
| `array` | `stringArray` | Array |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fallback` | string | `""` | Fallback (empty array) |

