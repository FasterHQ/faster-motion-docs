# Distribution Nodes

Point distribution generators: grid, circle, linear, random, fibonacci spiral, path sampling. Feed into Generator node to create object clones.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Grid Distribution](gridDistribution.md) | `gridDistribution` | shared | Distribute points in a rows × cols grid centered at origin. |
| [Circle Distribution](circleDistribution.md) | `circleDistribution` | shared | Distribute points evenly around a circle. |
| [Linear Distribution](linearDistribution.md) | `linearDistribution` | shared | Distribute points along a line from start to end. |
| [Random Distribution](randomDistribution.md) | `randomDistribution` | shared | Distribute points randomly in a bounding box (seeded PRNG). |
| [Fibonacci Distribution](fibonacciDistribution.md) | `fibonacciDistribution` | shared | Golden angle spiral distribution (sunflower pattern). |
| [Path Distribution](pathDistribution.md) | `pathDistribution` | shared | Distribute points along a path via arc-length sampling. |
| [Generator](generator.md) | `generator` | canvas | Create display object clones at distribution positions. First node that creates visible shapes. |
| [Clone Slot](cloneSlot.md) | `cloneSlot` | canvas | Pre-declared clone slot for GeneratorNode. Gates clone visibility based on activeCount from generator. |
| [Instance Stagger Compute](instanceStaggerCompute.md) | `instanceStaggerCompute` | canvas | Per-instance staggered offset/scale animation. Proves Mat4 pipeline works for non-text domains. |
| [Instance Apply](instanceApply.md) | `instanceApply` | canvas | F264 Phase 2: Writes Mat4TransformBundle per-instance transforms to GeneratorNode clone STNs via SceneTransformNode.setPose. Decomposes 4×4 → 2D pose per clone — full port contract flow, no imperative HeadlessObject mutation. |
