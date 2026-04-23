# Text Reveal

**Type:** `textRevealAnimation`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Compound — progressively reveals a source string by character, word, sentence, or line, driven by a progress input. Replaces hand-rolled `textSequenceAnimation` with a baked `texts: ["","s","st","sta",...]` array: authors set `source` and `granularity`, the loader expands to textDecompose + textSequence + domStringWrite so i18n swaps and granularity changes edit one param, not an array. Default (char + prefixes) gives classic typewriter; word/sentence/line give the corresponding reveal without separate node types.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Target selector |
| `source` | string | `""` | Source text |
| `granularity` | enum | `"char"` | Granularity. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"prefixes"` | Shape. Options: `prefixes`, `suffixes`, `atoms` |
| `includeEmpty` | bool | `true` | Start from blank |
| `stripWhitespace` | bool | `false` | Strip whitespace-only entries |
| `separator` | string | `—` | Custom separator (overrides granularity) |
| `writeMode` | enum | `"textContent"` | Write mode. Options: `textContent`, `attribute`, `style` |
| `propertyName` | string | `"textContent"` | Property name |

