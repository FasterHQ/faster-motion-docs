# Float Array Pick

**Type:** `floatArrayPick`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Pure picker — emits `array[floor(index)]` as a float. Index is clamped to [0, length-1]. The `array` input port wins when wired (non-empty); otherwise falls back to the `values` param. Fallback float returned when the resolved array is empty. Pair with textDecompose.itemSources (or any float-array source) to drive per-index side effects.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |
| `array` | `floatArray` | Array |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | int | `0` | Index (min: 0) |
| `fallback` | float | `0` | Fallback (empty array) |

