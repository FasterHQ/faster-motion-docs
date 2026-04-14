# Parameters

Parameters are the central control system in `.fmtion` files. They act as named variables that drive animations — scroll position, hover state, menu toggle, counter value, etc.

## Parameter Types

| Type | Description | Default |
|------|-------------|---------|
| `float` | Floating-point number | `0` |
| `int` | Integer number | `0` |
| `bool` | Boolean on/off state | `false` |
| `trigger` | One-shot event, auto-resets to false after firing | `false` |

## Path-Based Keys

Parameters use hierarchical forward-slash paths for organization:

```
hero/scrollProgress    → Hero section scroll progress (0-1)
hero/hovered           → Whether hero card is hovered
menu/open              → Menu open state
counter/value          → Numeric counter value
form/submit            → Form submission trigger
```

Paths are arbitrary strings — there's no enforced hierarchy. The slash convention is for human readability and grouping.

## Definition

```json
{
  "parameters": {
    "hero/scrollProgress": {
      "type": "float",
      "default": 0,
      "min": 0,
      "max": 1,
      "name": "Hero Scroll Progress"
    },
    "hero/hovered": {
      "type": "bool",
      "default": false
    },
    "counter/value": {
      "type": "int",
      "default": 0,
      "min": 0,
      "max": 100,
      "step": 1
    },
    "form/submit": {
      "type": "trigger",
      "default": false
    }
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"float" \| "int" \| "bool" \| "trigger"` | Yes | Parameter data type |
| `default` | `number \| boolean` | Yes | Initial value |
| `name` | `string` | No | Display name for editor UI |
| `min` | `number` | No | Minimum value (float/int only) |
| `max` | `number` | No | Maximum value (float/int only) |
| `step` | `number` | No | Step increment (float/int only) |
| `readOnly` | `boolean` | No | If true, cannot be modified at runtime |

## Reading and Writing Parameters

**In the graph:** Use `parameterStoreRead` and `parameterStoreWrite` nodes to read/write parameters from within the node graph.

**From DOM events:** Use `listeners[]` in the .fmtion file to bind DOM events (click, hover, etc.) to parameter changes.

**From inputs:** Use the `inputs[]` array to bind mouse position, scroll, time, or distance to parameters.

**From code:** The FM runtime exposes `setParameter(path, value)` and `getParameter(path)` on the loaded instance.
