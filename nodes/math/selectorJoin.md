# Selector Join

**Type:** `selectorJoin`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Concatenate `prefix` + `suffix` into a single CSS selector string. The canonical helper for composing per-iteration selectors out of a `forEachScope.selector` (prefix) and a static descendant fragment (suffix), replacing the F351 embedded-token form `"$match .child"`.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `prefix` | `string` | Prefix |
| `suffix` | `string` | Suffix |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `selector` | `string` | Selector |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prefix` | string | `""` | Prefix |
| `suffix` | string | `""` | Suffix |

