# Faster Motion Documentation — Agent Instructions

This repo is the reference documentation for authoring `.fmtion` animation files.

## Quick Start for Agents

1. **Read `node-registry.json`** — Machine-readable registry of all 200+ graph nodes with their ports, types, defaults, and parameters. This is the single source of truth for what nodes exist and how to wire them.

2. **Read `fmtion-format.md`** — The `.fmtion` JSON file structure. Understand the root-level fields (meta, parameters, dom, canvas, etc.) and how the domGraph section defines node graphs.

3. **Read `port-types.md`** — The 10 port types (float, vec2, bool, color, transform, string, path, attributes, mat4Bundle, any) and their compatibility rules.

4. **Read `patterns/`** — Common wiring recipes showing how to connect nodes for real-world animations (scroll-driven, hover, stagger, etc.).

5. **Read individual node docs in `nodes/<category>/<type>.md`** for detailed port and parameter info on specific nodes.

## Key Rules for .fmtion Authoring

- Every graph node needs a unique `id` (string)
- Wires connect `sourceNodeId.outputPortName` → `targetNodeId.inputPortName`
- Port types must be compatible (same type, or one side is `any`)
- Parameters use hierarchical path keys: `"hero/scrollProgress"`, `"menu/open"`
- The `domGraph.nodes[]` array holds serialized graph nodes for DOM animation graphs
- Canvas areas have their own graph (`canvas[].graph.nodes[]`)

## Do NOT

- Do not document or reference internal FM implementation details
- Do not reference GraphNode base class, Scheduler, Module, Graph internals, or renderer internals (WASM, WebGL, FmRustRenderer, HeadlessRenderer, SceneRenderNode pipeline, DOM batching)
- This documentation is about AUTHORING .fmtion files, not building the FM runtime
