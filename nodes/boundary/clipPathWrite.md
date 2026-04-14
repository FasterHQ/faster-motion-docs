# Clip Path Write

**Type:** `clipPathWrite`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Serializes ClipPathPoints to CSS polygon() and writes to target element clip-path. Dirty-checks the serialized string to skip redundant DOM writes.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `points` | `clipPathPoints` | Points |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |

