# Multi-Attribute Read

**Type:** `multiAttrRead`  
**Category:** boundary  
**Context:** Shared — works in both DOM and canvas graphs  
**Dynamic Ports:** Yes — ports may be added/removed at runtime  

Reads N attributes from each element matching a selector in a single querySelectorAll pass, emits one stringArray output per attribute. Replaces N domStringArrayRead nodes that each re-query the same selector for one attribute (common in per-card metadata pipelines: title / camera / stock / location / year / type / overview, etc.). Output port names are author-chosen; the attribute strings can be data-attrs, HTML attrs, or `textContent` for the element's text. Static read at bind time; document-order matches.

## Inputs

_No inputs._

## Outputs

_No outputs._

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | elementSelector | `""` | CSS Selector |
| `attributes` | attrMap | `{"title":"data-title"}` | Attributes (output port → attribute name) |

