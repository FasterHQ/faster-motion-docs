# Gate

**Type:** `gate`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Blend a driven value toward a rest value under a 0..1 gate, with optional spring-smoothed threshold crossings

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |
| `gate` | `float` | Gate |
| `rest` | `float` | Rest |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `halflife` | float | `0` | Halflife (s) (min: 0, max: 2) |
| `rest` | float | `0` | Rest Value |

