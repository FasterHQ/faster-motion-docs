# Bundles Nodes

Transform bundle infrastructure: time context, cycle clocks, and Mat4 transform bundle merge/mask operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Time Context](timeContext.md) | `timeContext` | canvas | Exposes scheduler ambient time (deltaTime, elapsed, frame) as output ports. Clock node — feed into CycleClock or directly into a time consumer. |
| [Cycle Clock](cycleClock.md) | `cycleClock` | canvas | Accumulates ambient scheduler deltaTime into a normalized 0..1 cycle progress. The canonical "looping clock" — drives any consumer that takes a 0..1 progress (textRevealAnimation, propertyAnimation, staggerAnimation) when you want continuous motion not gated by scroll or user input. No input ports: clock nodes read ambient time directly (F236), so they keep ticking even when the rest of the graph is idle. |
| [Transform Bundle Merge](transformBundleMerge.md) | `transformBundleMerge` | canvas | FR-1: Compose per-element transform bundles via matrix multiplication or alternative blend modes. Multi-connection input accepts N wires. |
| [Transform Bundle Mask](transformBundleMask.md) | `transformBundleMask` | canvas | Apply a per-element transform bundle only to elements in [from, to] with optional edge falloff. Outside the range, elements pass through as identity. |
