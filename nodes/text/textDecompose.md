# Text Decompose

**Type:** `textDecompose`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

Pure text-data transform. Splits one or more source strings into an array of strings by granularity (char/word/sentence/line) and optionally reshapes into a cumulative pyramid (prefixes/suffixes). Decouples the data-shape problem from animation — feed items[] into textSequence, variantStagger, or any index-driven consumer. Example: granularity=char, shape=prefixes on "Sunny" → ["S","Su","Sun","Sunn","Sunny"] (classic typewriter). Input precedence (highest wins): `sources` stringArray port (multi-source — typically wired from domStringArrayRead for i18n cycles), `sources` string[] param, `text` string port (single-source wire), `text` string param. Multi-source mode decomposes each entry and concatenates — one graph chain types through every word in order.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `sources` | `stringArray` | Sources |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `items` | `stringArray` | Items |
| `count` | `float` | Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | `""` | Source text (fallback) |
| `granularity` | enum | `"char"` | Granularity. Options: `char`, `word`, `sentence`, `line` |
| `shape` | enum | `"atoms"` | Shape. Options: `atoms`, `prefixes`, `suffixes` |
| `includeEmpty` | bool | `false` | Prepend empty entry |
| `stripWhitespace` | bool | `false` | Strip whitespace-only entries |
| `separator` | string | `—` | Custom separator (overrides granularity) |

