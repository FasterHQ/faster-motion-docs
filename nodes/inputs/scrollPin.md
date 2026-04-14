# Scroll Pin

**Type:** `scrollPin`  
**Category:** inputs  
**Context:** DOM — operates on HTML elements via CSS selectors  

Pin a DOM element to fixed position while scroll progress is within range

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `progress` | `float` | Progress |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `pinProgress` | `float` | Pin Progress |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | string | `""` | Element to Pin |
| `pinSpacing` | bool | `true` | Add Spacer |

