# Color Array Pick

**Type:** `colorArrayPick`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Pure picker — emits `array[floor(index)]` as a Color. Index is clamped to [0, length-1]. Hex-string `values` param is parsed to Color at load time (zero parse cost on hot path). Used to drive a current-color output from a per-variant palette; pair with textReveal\s sourceIndex or variantStagger\s per-child index.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `index` | `float` | Index |
| `array` | `colorArray` | Array |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `color` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | int | `0` | Index (min: 0) |
| `fallbackHex` | string | `"#ffffff"` | Fallback (empty array) |

