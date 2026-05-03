# Stagger Write

**Type:** `staggerWrite`  
**Category:** boundary  
**Context:** DOM — operates on HTML elements via CSS selectors  

Batched per-element stagger writer, multi-channel. One node animates N CSS properties across the elements matching a selector, with a shared per-element stagger window. F358: each property is one channel in the `channels` map — add as many as you want (e.g. `rotateX` + `color` + `opacity`) and they all share the same selector, totalStagger, staggerOrder, and progress driver. Replaces the older "two staggerWrites with the same selector and one property each" pattern with a single node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |
| `selector` | `string` | Selector |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `channels` | staggerChannels | `{}` | Channels |
| `totalStagger` | float | `0.3` | Total Stagger (min: 0, max: 1) |
| `staggerOrder` | enum | `"start"` | Order. Options: `start`, `end`, `center`, `edges`, `random`, `positionY`, `positionX` |

