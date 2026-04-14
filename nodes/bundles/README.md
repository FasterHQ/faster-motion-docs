# Bundles Nodes

Transform bundle infrastructure: time context, cycle clocks, and Mat4 transform bundle merge/mask operations.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Time Context](timeContext.md) | `timeContext` | canvas | Exposes scheduler ambient time (deltaTime, elapsed, frame) as output ports. Clock node — feed into CycleClock or directly into a time consumer. |
| [Cycle Clock](cycleClock.md) | `cycleClock` | canvas | Accumulates ambient scheduler deltaTime into a cycle progress [0, 1]. Drives time-dependent modifier compute nodes. Supports duration, iterations, ping-pong. No input ports — clock nodes read ambient time directly (F236). |
| [Transform Bundle Merge](transformBundleMerge.md) | `transformBundleMerge` | canvas | FR-1: Compose per-element transform bundles via matrix multiplication or alternative blend modes. Multi-connection input accepts N wires. |
| [Transform Bundle Mask](transformBundleMask.md) | `transformBundleMask` | canvas | Apply a per-element transform bundle only to elements in [from, to] with optional edge falloff. Outside the range, elements pass through as identity. |
