# Section Alpha Gate

**Type:** `sectionAlphaGate`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Per-section alpha + z-index gate for layered scroll-snap or carousel slide patterns. Writes `--alpha` (0/1) and `--z` (activeZ / inactiveZ) on `selector` based on whether `myIdx` matches the current `activeIdx`. When `exitPlaying` is wired (typical), the section stays at alpha=1 throughout its own exit fade so the outgoing section doesn't snap to invisible the instant `activeIdx` flips. Compound — expands at load to two expression nodes + two `domPropertyWrite` nodes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `activeIdx` | `float` | Active Idx |
| `exitPlaying` | `float` | Exit Playing |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `myIdx` | int | `0` | My Index (min: 0) |
| `activeZ` | int | `100` | Active Z |
| `inactiveZ` | int | `0` | Inactive Z |
| `alphaPropertyName` | string | `"--alpha"` | Alpha Variable |
| `zPropertyName` | string | `"--z"` | Z Variable |

