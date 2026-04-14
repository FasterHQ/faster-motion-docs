# Data Nodes

Data flow utilities: parameter actions (set, toggle, fire, increment), data source reads, and type casting between port types.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Parameter Action](parameterAction.md) | `parameterAction` | shared | Compute parameter action (set, toggle, fire, increment, decrement) |
| [Data Source](dataSource.md) | `dataSource` | shared | Read a DataRecord field directly into the graph. |
| [Type Cast](typeCast.md) | `typeCast` | shared | Explicit AnyType → typed boundary (float, string, bool, color). |
