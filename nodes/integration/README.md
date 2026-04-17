# Integration Nodes

Graph composition and data flow: ForEach stamping, scene composition, parameter store read/write, float/value sources.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Data Read](dataRead.md) | `dataRead` | shared | Read any-typed value from ParameterStore |
| [Parameter Write](parameterWrite.md) | `parameterWrite` | shared | Apply an action to a parameter on a rising-edge trigger. Wire an eventListener.fired into this node to express "event → set/toggle/fire/increment/decrement parameter" entirely on the graph canvas. |
| [Float Source](floatSource.md) | `floatSource` | shared | Float value source — reads from connected input or set externally |
| [Value Source](valueSource.md) | `valueSource` | shared | Externally-set Vec2 value |
| [Parameter Read](parameterStoreRead.md) | `parameterStoreRead` | shared | Read a float parameter from ParameterStore |
| [Parameter Write](parameterStoreWrite.md) | `parameterStoreWrite` | shared | Write a float value to ParameterStore |
| [For Each](forEach.md) | `forEach` | shared | Stamp a preset per target object. Stamped nodes are read-only. |
| [Scene](sceneGraph.md) | `sceneGraph` | canvas | Composable scene root — encapsulates an entire .fmtion scene as a single node with promoted ports. |
| [Dirty Trigger](dirtyTrigger.md) | `dirtyTrigger` | shared | External dirtying entry point. No-op evaluate — triggers downstream re-evaluation. |
