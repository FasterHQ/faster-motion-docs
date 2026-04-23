# Text Decompose

**Type:** `textDecompose`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Pure text-data transform. Splits a source string into an array of strings by granularity (char/word/sentence/line) and optionally reshapes into a cumulative pyramid (prefixes/suffixes). Decouples the data-shape problem from animation — feed items[] into textSequence, variantStagger, or any index-driven consumer. Example: granularity=char, shape=prefixes on "Sunny" → ["S","Su","Sun","Sunn","Sunny"] (classic typewriter). The `text` input port takes priority over the static `text` param when wired, letting the node compose with DOM readers or accept a baked-in source.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `items` | `stringArray` | Items |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | `""` | Source text |
| `granularity` | enum | `"char"` | Granularity. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"atoms"` | Shape. Options: `atoms`, `prefixes`, `suffixes` |
| `includeEmpty` | bool | `false` | Prepend empty entry |
| `stripWhitespace` | bool | `false` | Strip whitespace-only entries |
| `separator` | string | `—` | Custom separator (overrides granularity) |

