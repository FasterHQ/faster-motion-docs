# Split Text

**Type:** `splitText`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Setup-only DOM text splitter — wraps every word / character / line of the target element's text content in its own `<span>` so per-piece animations (rotateX, opacity, color, position) can target the pieces individually. Runs once at bind time; the spans persist for the page lifetime. Each span gets a class based on the split mode: `ft-split-word`, `ft-split-char`, or `ft-split-line` — use these in downstream selectors (e.g. `.headline .ft-split-char` for `staggerWrite`).

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
| `selector` | elementSelector | `""` | Target |
| `mode` | enum | `"words"` | Split Mode. Options: `words`, `chars`, `lines` |

