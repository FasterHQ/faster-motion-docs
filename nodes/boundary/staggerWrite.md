# Stagger Write

**Type:** `staggerWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Batched stagger animation — one node handles all elements matching a selector with per-element timing offset

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | CSS Selector |
| `propertyName` | string | `"opacity"` | Property |
| `cssUnit` | enum | `"none"` | Unit. Options: `none`, `px`, `%`, `deg`, `vw`, `vh` |
| `from` | float | `0` | From |
| `to` | float | `1` | To |
| `ease` | string | `"linear"` | Easing |
| `totalStagger` | float | `0.3` | Total Stagger (min: 0, max: 1) |
| `staggerOrder` | enum | `"start"` | Order. Options: `start`, `end`, `center`, `edges`, `random` |

