# Split Shape

**Type:** `splitShape`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Setup-only DOM shape splitter — fractures the path / polygon source shapes inside an `<svg>` into N polygon fragments at bind time, so per-piece animations (translate, rotate, scale, opacity) can target the pieces individually. Runs once: rejection-samples points inside the source-fill region, tessellates with d3-delaunay's Voronoi, boolean-intersects each cell with the union of source paths via `polygon-clipping` so adjacent pieces share their edges exactly (no gaps or overlap). Each fragment gets the class `ft-shatter-piece`. Mirror to `splitText`, but for SVG geometry — drop in any 2-path logo and shatter it into ~100 deterministic pieces without manually pre-fragmenting in a vector editor.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `pieceSelector` | `string` | Pieces Selector |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | SVG Target |
| `sourceSelector` | string | `"path, polygon"` | Source Selector |
| `fragments` | int | `100` | Fragments (min: 4) |
| `seed` | int | `1337` | Seed (min: 0) |

