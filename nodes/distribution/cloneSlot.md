# Clone Slot

**Type:** `cloneSlot`  
**Category:** distribution  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Pre-declared clone slot for GeneratorNode. Gates clone visibility based on activeCount from generator.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `activeCount` | `float` | Active Count |
| `positions` | `any` | Positions |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `active` | `bool` | Active |
| `cloneId` | `any` | Clone ID |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `slotIndex` | int | `0` | Slot Index |
| `sourceObjectId` | objectPicker | `""` | Source Object |
| `generatorNodeId` | string | `""` | Generator |

