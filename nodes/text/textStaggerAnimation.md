# Text Stagger Animation

**Type:** `textStaggerAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Split a text element into chars/words/lines and animate each piece with a staggered from→to progression. Collapses the canonical splitText + N× propertyAnimation pattern (16 chars × 3 channels = up to 48 nodes on blur-focus) into one authoring node. Channels map carries mixed float/string types like propertyAnimation. Compound: expands into `splitText` + N× `propertyAnimation` at load time (each per-child PA then expands to mk+pw via the fixed-point loop) — no runtime class.

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
| `count` | int | `1` | Child Count (min: 1) |
| `stagger` | float | `0.04` | Stagger (per child) (min: 0, max: 1) |
| `staggerFrom` | enum | `"start"` | Stagger From. Options: `start`, `end`, `center`, `edges`, `random` |
| `discrete` | bool | `false` | Discrete (instant flip per child) |
| `channels` | textStaggerChannels | `{"opacity":{"type":"float",...` | Channels |

