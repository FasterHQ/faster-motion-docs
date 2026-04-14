# Constraint Solver

**Type:** `constraintSolver`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Multi-pass distance constraint solving. Maintains rest lengths between connected points.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `subSteps` | `float` | Iterations |
| `path` | `path` | Path |
| `compliance` | `float` | Compliance |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `compliance` | float | `0` | Compliance (min: 0, max: 10) |
| `subSteps` | int | `8` | Iterations (min: 1, max: 64) |

