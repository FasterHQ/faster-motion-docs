# For Each Scope

**Type:** `forEachScope`  
**Category:** integration  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Per-iteration scope source materialised by `expandInstanceNodes` inside every forEach iteration. Replaces the F351 reserved-token substitution mechanism (`$match`, `$index`) with a port-driven model — template-body nodes wire from this node's outputs the same way they wire from any other producer. Authors do NOT write this node by hand; the loader emits one per iteration with constant per-iteration values.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `selector` | `string` | Selector |
| `index` | `float` | Index |
| `count` | `float` | Count |


## Parameters

_No configurable parameters._
