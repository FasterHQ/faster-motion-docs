# String Equals

**Type:** `stringEquals`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

F316: Outputs 1 when both string inputs are non-null and strictly equal, 0 otherwise. Null/undefined always evaluates to 0 (fail-safe). `b` input accepts a literal via setLiteralB() when unwired.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `a` | `string` | A |
| `b` | `string` | B |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `literalB` | string | `—` | Literal B |

