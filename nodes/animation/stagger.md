# Stagger

**Type:** `stagger`  
**Category:** animation  
**Context:** Shared — works in both DOM and canvas graphs  

Per-element timing offset using Element Context (index, count)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `totalStagger` | float | `0.3` | Total Stagger (min: 0, max: 1) |
| `order` | enum | `"start"` | Order. Options: `start`, `end`, `center`, `edges`, `random` |

