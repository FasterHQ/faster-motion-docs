# Text Split

**Type:** `textSplit`  
**Category:** text  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Split text into chars/words/lines with glyph metrics for per-element animation

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `fontSize` | `float` | Font Size |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `count` | `float` | Count |
| `glyphPositions` | `attributes` | Glyph Positions |
| `bundle` | `mat4Bundle` | Bundle |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `splitMode` | enum | `"chars"` | Split Mode. Options: `chars`, `words`, `lines`, `sentences` |
| `textId` | objectPicker | `—` | Text Object |

