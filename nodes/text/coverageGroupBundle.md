# Coverage Group Bundle

**Type:** `coverageGroupBundle`  
**Category:** text  
**Context:** Shared — works in both DOM and canvas graphs  

F356: Author-facing compound for a coverage group + N coverage ranges with self-aligning bundle reads. Expands at load to one `coverageGroup` + N `coverageRange` primitives with a shared `bundle` connection — no `bundleRead` intermediaries. Compound: no runtime class.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `attributes` | Bundle |
| `upstream` | `mat4Bundle` | Upstream |
| `charCount` | `float` | Char Count |
| `smWritesDone` | `any` | SM Writes Done |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `charTransforms` | `mat4Bundle` | Char Transforms |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `objectId` | string | `""` | Object Id |
| `flags` | int | `63` | Flags |
| `originX` | float | `0` | Origin X |
| `originY` | float | `0` | Origin Y |
| `invertOpacity` | bool | `false` | Invert Opacity |

