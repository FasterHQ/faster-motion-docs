# SM Auto Start

**Type:** `smAutoStart`  
**Category:** state-machine  
**Context:** Shared — works in both DOM and canvas graphs  

Auto-start latch for a state machine. Defaults `shouldRun` to 1 on construction so the SM begins running on the first frame. `stop()` flips the internal latch to 0, producing a falling edge on `SMLifecycleNode.shouldRun`. The reverse signal (start after stop) lives on the parameter / listener side.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `shouldRun` | `float` | Should Run |


## Parameters

_No configurable parameters._
