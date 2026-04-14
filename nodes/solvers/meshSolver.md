# Mesh Solver

**Type:** `meshSolver`  
**Category:** solvers  
**Context:** Shared — works in both DOM and canvas graphs  

Iterative mesh relaxation. Averages vertex positions toward neighbors.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `subSteps` | `float` | Iterations |
| `path` | `path` | Path |
| `stiffness` | `float` | Stiffness |
| `falloff` | `any` | Falloff |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `path` | `path` | Path |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `stiffness` | float | `0.5` | Stiffness (min: 0, max: 1) |
| `subSteps` | int | `4` | Iterations (min: 1, max: 32) |

