# Text Input

**Type:** `textInput`  
**Category:** inputs  
**Context:** Canvas — operates on canvas scene objects, bones, or skeletons  

Interactive text field with cursor and selection

## Inputs

_No inputs._

## Outputs

| Port | Type | Description |
|------|------|-------------|
| `text` | `string` | Text |
| `cursorPosition` | `float` | Cursor Position |
| `selectionStart` | `float` | Selection Start |
| `selectionEnd` | `float` | Selection End |
| `hasFocus` | `float` | Has Focus |
| `charCount` | `float` | Char Count |


## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetObjectId` | objectPicker | `""` | Target Object |
| `maxLength` | int | `0` | Max Length (min: 0) |
| `multiline` | bool | `false` | Multiline |
| `placeholder` | string | `""` | Placeholder |
| `readOnly` | bool | `false` | Read Only |

