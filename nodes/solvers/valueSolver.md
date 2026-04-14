# Value Solver

**Type:** `valueSolver`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Generic float accumulation with temporal feedback. Value moves toward target at given rate.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `subSteps` | `float` | Sub Steps |
| `target` | `float` | Target |
| `rate` | `float` | Rate |
| `initialValue` | `float` | Initial Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | float | `0` | Initial Value |
| `rate` | float | `1` | Rate (min: 0, max: 100) |
| `subSteps` | int | `1` | Sub Steps (min: 1, max: 16) |

