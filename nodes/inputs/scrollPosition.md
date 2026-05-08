# Scroll Position

**Type:** `scrollPosition`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Owns a scroller's scroll position behind typed graph ports. Reads the target's scrollTop / scrollLeft each frame and publishes them on `scrollX` / `scrollY`. When `addX` / `addY` ports carry non-zero deltas, integrates them (with sub-pixel residue carry across frames so cumulative scroll matches cumulative input) into the scroller — one DOM write per evaluate(), so high-frequency upstream sources don't trigger a synchronous reflow on every input sample. Pair with `dragVelocity.frameDeltaX/Y` for swipe-to-scroll: drag → port → scrollPosition → DOM, fully graph-native, no element side-channels. Other writers (button "scroll to top", parallax-driven scroll) compose into the same node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `addX` | `float` | Add X (px) |
| `addY` | `float` | Add Y (px) |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `scrollX` | `float` | scrollLeft (px) |
| `scrollY` | `float` | scrollTop (px) |
| `positionX` | `float` | Position X (sub-pixel) |
| `positionY` | `float` | Position Y (sub-pixel) |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `"document"` | Scroll Target |
| `axis` | string | `"both"` | Axis |

