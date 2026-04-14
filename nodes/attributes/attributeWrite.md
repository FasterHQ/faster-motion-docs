# Attribute Write

**Type:** `attributeWrite`  
**Category:** attributes  
**Context:** Shared — works in both DOM and canvas graphs  

Stamp a named attribute onto an AttributeBundle

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `attributes` | Bundle |
| `values` | `any` | Values |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `bundle` | `attributes` | Bundle |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `attributeName` | string | `""` | Attribute Name |
| `attributeType` | enum | `"float"` | Attribute Type. Options: `float`, `vec2`, `vec3`, `color`, `string` |

