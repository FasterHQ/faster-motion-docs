# String Array Concat

**Type:** `stringArrayConcat`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Pure data transform. Concatenates up to N stringArray inputs (in0..inN-1, default 8) into a single flat stringArray output. Complement to textDecompose for multi-source typewriter-style graphs: each source goes through its own textDecompose; this node stitches the per-source items[] into one indexable stream for textSequence. Unwired ports contribute nothing (default = empty array) so the node is safe to serialize with fewer connections than ports.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `items` | `stringArray` | Items |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `portCount` | int | `8` | Input port count (min: 2, max: 32) |

