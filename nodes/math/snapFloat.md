# Snap Float

**Type:** `snapFloat`  
**Category:** math  
**Context:** Shared — works in both DOM and canvas graphs  

Pure 1D nearest-from-list quantizer. Snaps the input to whichever entry of `values` is closest. Empty `values` = passthrough. For magnetic-snap behaviour (eased approach to the snapped target) compose `snapFloat → smoothing(mode:exponential)` — the inlined `smooth` param this node used to expose was a duplicate of SmoothingNode and was removed in the smoothing-family unification.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `value` | `float` | Value |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `snapped` | `float` | Snapped |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `values` | string | `[]` | Snap Targets |

