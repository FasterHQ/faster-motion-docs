# Text Stagger Animation

**Type:** `textStaggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Splits a text element into chars / words / lines and animates each piece from a single 0..1 progress signal with staggered start times. One authoring node replaces the splitText + per-piece tween chain. Channels are author-friendly `{from, to, ease, unit}` ranges (numeric) or CSS-fragment ranges (`blur(16px) → blur(0px)`, `inset(0 100% 0 0) → inset(0 0% 0 0)` — the runtime tokenizes numeric tokens and lerps each independently). Compound: expands at load time to `splitText` + 1× `staggerWrite` (continuous mode) — runtime stays at 2 nodes regardless of piece count. Discrete mode (instant flip per piece, typewriter-style) falls back to `splitText` + N× `propertyAnimation` and requires `count` (since N keyframe-shaped children must be emitted up front). `totalStagger` is the fraction of progress consumed by spreading start times across pieces; runtime reads piece count dynamically from splitText, so editing the heading text does not require a graph edit.

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
| `splitMode` | enum | `"chars"` | Split Mode. Options: `chars`, `words`, `lines` |
| `totalStagger` | float | `0.4` | Total Stagger (min: 0, max: 1) |
| `staggerFrom` | enum | `"start"` | Stagger From. Options: `start`, `end`, `center`, `edges`, `random` |
| `discrete` | bool | `false` | Discrete — instant flip per piece |
| `count` | int | `—` | Child Count (min: 1) |
| `channels` | textStaggerChannels | `{"opacity":{"type":"float",...` | Channels |

