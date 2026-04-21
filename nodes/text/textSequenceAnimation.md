# Text Sequence Animation

**Type:** `textSequenceAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Cycle through a sequence of strings based on progress and write the current text as the textContent of a target element. Compound: expanded into `textSequence + domPoseWrite` at load time — no runtime class.

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
| `texts` | string | `[]` | Text Sequence |

