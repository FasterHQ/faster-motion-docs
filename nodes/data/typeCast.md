# Type Cast

**Type:** `typeCast`  
**Category:** data  
**Context:** Shared — works in both DOM and canvas graphs  

Explicit AnyType → typed boundary (float, string, bool, color).

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `any` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `float` | `float` | Float |
| `string` | `string` | String |
| `bool` | `bool` | Bool |
| `color` | `color` | Color |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetType` | enum | `"float"` | Target Type. Options: `float`, `string`, `bool`, `color` |

