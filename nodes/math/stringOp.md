# String Op

**Type:** `stringOp`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Typed String→String operation (uppercase, trim, replace, template, etc.).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `string` | Value |
| `operand` | `string` | Operand |
| `length` | `float` | Length |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `string` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `operation` | enum | `"uppercase"` | Operation. Options: `uppercase`, `lowercase`, `trim`, `trimStart`, `trimEnd`, `padStart`, `padEnd`, `removeLeadingZeros`, `replace`, `template` |

