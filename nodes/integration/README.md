# Integration Nodes

Graph composition and data flow: ForEach stamping, scene composition, parameter store read/write, float/value sources.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Data Read](dataRead.md) | `dataRead` | shared | Read any-typed value from ParameterStore |
| [Parameter Write](parameterWrite.md) | `parameterWrite` | shared | Compute a parameter's next value on a rising-edge trigger. Pure-compute — reads currentValue from a ParameterStore.out_<paramId> input, emits nextValue which the store commits through its writer-fanin input. |
| [For Each Scope](forEachScope.md) | `forEachScope` | shared | Per-iteration scope source materialised by `expandInstanceNodes` inside every forEach iteration. Replaces the F351 reserved-token substitution mechanism (`$match`, `$index`) with a port-driven model — template-body nodes wire from this node's outputs the same way they wire from any other producer. Authors do NOT write this node by hand; the loader emits one per iteration with constant per-iteration values. |
| [Float Source](floatSource.md) | `floatSource` | shared | Float value source — reads from connected input or set externally |
| [Value Source](valueSource.md) | `valueSource` | shared | Externally-set Vec2 value |
| [Parameter Read](parameterStoreRead.md) | `parameterStoreRead` | shared | Read a float parameter from ParameterStore |
| [Parameter Write](parameterStoreWrite.md) | `parameterStoreWrite` | shared | Write a float value to ParameterStore |
| [For Each](forEach.md) | `forEach` | shared | Stamp a preset per target object. Stamped nodes are read-only. |
| [Scene](sceneGraph.md) | `sceneGraph` | canvas | Composable scene root — encapsulates an entire .fmtion scene as a single node with promoted ports. |
| [Dirty Trigger](dirtyTrigger.md) | `dirtyTrigger` | shared | External dirtying entry point. No-op evaluate — triggers downstream re-evaluation. |
