# Text Sequence Animation

**Type:** `textSequenceAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Cycle through a sequence of strings based on progress. textSequence emits both the current string (`text`) and its position in the array (`index`, float). Authors pick any number of output targets via `channels`: `from: "text"` routes the string to any DOM string target (textContent, aria-label, CSS var, title, data-*, etc.), `from: "index"` routes the position float to any numeric CSS property (opacity gating, slide offset, step-in indicator). Compound: expands into `textSequence + one domPoseWrite + N domStringWrites` at load time — no runtime class.

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
| `channels` | textSequenceChannels | `{"textContent":{"from":"tex...` | Channels |

