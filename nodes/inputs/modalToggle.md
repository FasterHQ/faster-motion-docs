# Modal Toggle

**Type:** `modalToggle`  
**Category:** inputs  
**Context:** Shared — works in both DOM and canvas graphs  

Open-on-click / close-on-click toggle that latches a 0/1 state and writes it to one or more `data-*` attributes. Compound: expanded into eventListener + pulseOr + latch + domPropertyWrite per open target. Each `openTarget` receives the same attribute write so popup / trigger / backdrop / overlay all flip in sync.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `openTriggers` | selectorList | `[]` | Open Triggers |
| `closeTriggers` | selectorList | `[]` | Close Triggers |
| `openTargets` | selectorList | `[]` | Open Targets |
| `openAttribute` | string | `"data-open"` | Attribute |
| `openEvent` | domEvent | `"click"` | Open Event |
| `closeEvent` | domEvent | `"click"` | Close Event |
| `cssVarWrites` | string | `[]` | CSS Var Writes |

