# Parameter Action

**Type:** `parameterAction`  
**Category:** data  
**Context:** Shared — works in both DOM and canvas graphs  

Compute parameter action (set, toggle, fire, increment, decrement)

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `trigger` | `float` | Trigger |
| `currentValue` | `float` | Current Value |
| `setValue` | `float` | Set Value |
| `eventCount` | `float` | Event Count |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `result` | `float` | Result |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `actionType` | enum | `"set"` | Action. Options: `set`, `toggle`, `fire`, `increment`, `decrement` |
| `amount` | float | `1` | Amount |

