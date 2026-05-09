# Faster Motion Documentation — Agent Instructions

This repo is the reference documentation for authoring `.fmtion` animation files.

## Quick Start for Agents

1. **Read `node-registry.json`** — Machine-readable registry of all 200+ graph nodes with their ports, types, defaults, and parameters. This is the single source of truth for what nodes exist and how to wire them.

2. **Read `fmtion-format.md`** — The `.fmtion` JSON file structure. Understand the root-level fields (meta, parameters, dom, canvas, etc.) and how the domGraph section defines node graphs.

3. **Read `port-types.md`** — The 10 port types (float, vec2, bool, color, transform, string, path, attributes, mat4Bundle, any) and their compatibility rules. **Read `param-types.md`** — The JSON shape of every `params.<key>` value an author writes (selectors, channel maps, geometry, physics, expressions, etc.). Different from port types.

4. **Read `patterns/`** — Common wiring recipes showing how to connect nodes for real-world animations (scroll-driven, hover, stagger, etc.).

5. **Read individual node docs in `nodes/<category>/<type>.md`** for detailed port and parameter info on specific nodes.

6. **Read `debugging.md`** when an animation isn't behaving as authored. Documents `window.FasterMotion.debug` (especially `debug.validate()`) plus every stable warning code with cause + fix.

7. **Read `authoring-features.md`** for cross-cutting authoring patterns that aren't tied to a specific node — `forEach` + `templates` + `instanceOf`, wireable selectors, multi-wire connections, feedback wires, and per-breakpoint parameter overrides.

8. **Read `internal-nodes.md`** when a runtime error / `debug.dump()` references a node type you don't recognise from the per-node tree. Lists every loader-emitted internal node with its description so you can map runtime references back to the authoring primitive that emitted them.

9. **Read `compounds.md`** before authoring with any node flagged `**Compound:** Yes` in its MD. Explains what compounds are, the authoring rules (don't wire into their internals), and indexes every author-facing compound currently shipped.

## Key Rules for .fmtion Authoring

- Every graph node needs a unique `id` (string)
- Wires connect `sourceNodeId.outputPortName` → `targetNodeId.inputPortName`
- Port types must be compatible (same type, or one side is `any`)
- Parameters use hierarchical path keys: `"hero/scrollProgress"`, `"menu/open"`
- The `domGraph.nodes[]` array holds serialized graph nodes for DOM animation graphs
- Canvas areas have their own graph (`canvas[].graph.nodes[]`)

## Per-node supplements

Most node MDs are 100% auto-generated from `NodeMetadata.ts`. When a node needs prose the metadata can't carry — `expression`'s syntax, future complex param schemas, etc. — drop a hand-authored MD at `supplements/<type>.md`. The generator inlines it after the auto-generated sections (Use cases / See also) and before the envelope, so an agent reading the per-node page sees one continuous document.

Each supplement carries an `<!-- @tracks ... -->` block declaring the FM source paths it tracks; the drift checker treats it identically to the top-level hand-authored docs.

Currently shipped supplements: `supplements/expression.md`.

## Drift checks

Three docs are hand-authored prose pinned to FM source via SHA-256 signatures: `param-types.md`, `debugging.md`, `authoring-features.md`. Each declares its dependencies in an `@tracks` block at the top of the file; signatures live in `signatures/<doc>.sig`.

`scripts/check-doc-signatures.mjs` runs automatically inside `generate-docs.mjs`. When a tracked FM source path changes, the regen output prints:

```
⚠ <doc>.md — DRIFT
    Tracked source changed since last bless.
    Re-read these paths and decide whether <doc>.md needs new prose:
      …
    Re-bless after review: node scripts/check-doc-signatures.mjs --bless <doc>.md
```

The expected agent workflow on drift:
1. Read the listed FM source paths.
2. Edit the doc's prose if (and only if) the upstream change affects what the doc claims.
3. Re-bless: `node scripts/check-doc-signatures.mjs --bless <doc>.md`.
4. Stage both the doc edits (if any) and the updated `signatures/<doc>.sig`.

A drifted signature with no doc edit is acceptable when the upstream change is unrelated to what the doc covers — the bless re-acknowledges the new source state. Bless without re-reading defeats the point.

## Do NOT

- Do not document or reference internal FM implementation details
- Do not reference GraphNode base class, Scheduler, Module, Graph internals, or renderer internals (WASM, WebGL, FmRustRenderer, HeadlessRenderer, SceneRenderNode pipeline, DOM batching)
- This documentation is about AUTHORING .fmtion files, not building the FM runtime
