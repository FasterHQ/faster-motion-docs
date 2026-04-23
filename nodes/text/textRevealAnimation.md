# Text Reveal

**Type:** `textRevealAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Compound — progressively reveals text by character, word, sentence, or line, driven by a progress input. DOM-first: the translatable source lives in the HTML, the .fmtion carries only the animation recipe. `sourceFrom: element` (DEFAULT) reads `selector`.textContent at bind time. `sourceFrom: elements` reads textContent from every element matching `sourcesSelector` and cycles through them in document order (multi-word typewriter). `sourceFrom: param` is an escape hatch for non-translatable copy — prefer element/elements for anything user-facing. Default (char + prefixes + includeEmpty) gives classic typewriter; switch granularity for word/sentence/line reveals under the same node type. OPTIONAL `channels` + `variants` (same shape as variantStaggerAnimation) declare per-source side effects — e.g. a `color` channel with three hex values cycles the color at actual word boundaries regardless of word length or language. Each channel expands to one arrayPick + one writer; no more authoring colorKeyframe with hand-tuned times that drift across languages.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | Target selector (write) |
| `sourceFrom` | enum | `"element"` | Source. Options: `element`, `elements`, `param` |
| `sourceSelector` | elementSelector | `—` | Read selector (defaults to target) |
| `sourcesSelector` | elementSelector | `—` | Sources selector (N elements) |
| `source` | string | `—` | Source text |
| `granularity` | enum | `"char"` | Granularity. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"prefixes"` | Shape. Options: `prefixes`, `suffixes`, `atoms` |
| `includeEmpty` | bool | `true` | Start from blank (or between words) |
| `stripWhitespace` | bool | `false` | Strip whitespace-only entries |
| `separator` | string | `—` | Custom separator (overrides granularity) |
| `writeMode` | enum | `"textContent"` | Write mode. Options: `textContent`, `attribute`, `style` |
| `propertyName` | string | `"textContent"` | Property name |
| `channels` | string | `—` | Channels (per-source side effects) |
| `variants` | string | `—` | Variants (values per source index) |

