# Text Reveal

**Type:** `textRevealAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Progressively reveals text by character, word, sentence, or line, driven by a progress input. DOM-first: the translatable source lives in the HTML, the .fmtion carries only the animation recipe. `sourceFrom: element` (DEFAULT) reads `selector`.textContent at bind time. `sourceFrom: elements` reads textContent from every element matching `sourcesSelector` and cycles through them in document order (multi-word typewriter). `sourceFrom: param` is an escape hatch for non-translatable copy — prefer element/elements for anything user-facing. Default (char + prefixes + includeEmpty) gives classic typewriter; switch granularity for word/sentence/line reveals under the same node type. `cycleMode: pingPong` (multi-source only) makes each phrase type forward then delete backward before the next phrase begins from empty — native author-level type+delete typewriter cycle, no progress remap needed. OPTIONAL `channels` + `variants` (same shape as variantStaggerAnimation) declare per-source side effects — e.g. a `color` channel with three hex values cycles the color at actual word boundaries regardless of word length or language. Compound: expands to `textDecompose` + `textSequence` + `domStringWrite` (+ optional channel writers) at load time — no runtime class.

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
| `sourceFrom` | enum | `"element"` | Source. Options: `element`, `elements`, `param` |
| `sourceSelector` | elementSelector | `—` | Read Selector (defaults to target) |
| `sourcesSelector` | elementSelector | `—` | Sources Selector (N elements) |
| `source` | string | `—` | Source Text |
| `granularity` | enum | `"char"` | Granularity. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"prefixes"` | Shape. Options: `prefixes`, `suffixes`, `atoms` |
| `includeEmpty` | bool | `true` | Start from blank |
| `stripWhitespace` | bool | `false` | Strip Whitespace-Only Entries |
| `separator` | string | `—` | Custom Separator |
| `writeMode` | enum | `"textContent"` | Write Mode. Options: `textContent`, `attribute`, `style` |
| `propertyName` | cssProperty | `"textContent"` | Property Name |
| `cycleMode` | enum | `"forward"` | Cycle Mode. Options: `forward`, `pingPong` |
| `channels` | textRevealChannels | `—` | Channels |
| `variants` | textRevealVariants | `—` | Variants |

