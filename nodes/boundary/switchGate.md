# Switch Gate

**Type:** `switchGate`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  

Gates parentVisible for one child of a displayMode:switch group. Internal loader-generated node.

## Inputs

| Port | Type | Description |
|------|------|-------------|
| `parentVisible` | `bool` | Parent Visible |
| `activeChildIndex` | `float` | Active Child Index |


## Outputs

| Port | Type | Description |
|------|------|-------------|
| `visible` | `bool` | Visible |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `myIndex` | int | `0` | My Index (min: 0, max: 99999) |

