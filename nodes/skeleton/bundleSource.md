# Bundle Source

**Type:** `bundleSource`  
**Category:** skeleton  
**Context:** Shared — works in both DOM and canvas graphs  

Graph-native publisher of an externally-built AttributeBundle. Used for scene-level multi-clip APBs whose rest baseline is computed dynamically (no Skeleton involved). Caller (scene-subgraph) calls bind(bundle) at synthesis time.

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `attributes` | Bundle |


## Parameters

_No configurable parameters._
