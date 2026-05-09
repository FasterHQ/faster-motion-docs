<!-- @tracks
  src/loader/expanders/instance-expand.ts
  src/loader/util/apply-param-overrides.ts
  src/loader/phases/01-param-overrides.ts
  src/core/GraphPort.ts
  src/core/GraphNode.ts
-->

# Authoring features

Patterns and JSON shapes that aren't tied to a specific node type. Recurring across real `.fmtion` files and called out in node tooltips, but never documented in one place.

> Adjacent references: [`fmtion-format.md`](fmtion-format.md), [`port-types.md`](port-types.md), [`param-types.md`](param-types.md), [`debugging.md`](debugging.md).

| Feature | Used for |
|---|---|
| [forEach + templates + `instanceOf`](#foreach--templates--instanceof-f351) | Stamping the same sub-graph N times (one per matched element). |
| [Wireable selectors](#wireable-selectors-f357) | Letting an upstream string wire override a static selector param at bind time. |
| [Multi-wire connections](#multi-wire-connections) | Fan-in: multiple sources feeding a single multi-input port. |
| [Feedback wires](#feedback-wires) | Breaking cycles for feedback loops the scheduler would otherwise reject. |
| [Parameter overrides](#parameter-overrides) | Per-breakpoint param tweaks without forking the whole node. |

---

## forEach + templates + `instanceOf` (F351)

The most common authoring shape after a primitive node. Lets you define a sub-graph once and stamp it across N matched elements (or a fixed instance count). Each instance becomes an isolated copy of the template, with per-iteration values flowing in via `forEachScope`.

### Mental model

- A **template** is a named sub-graph living under `domGraph.templates`. It's not in the runtime graph until something instantiates it.
- An **instance** is a node with `instanceOf: '<templateName>'` instead of `type:`. It carries a `forEach` CSS selector — the loader matches that selector at bind time and emits one expanded copy of the template per match.
- A **scope source** (`forEachScope`, automatically injected by the loader) carries the per-iteration values: the matched element's selector, its 0-based index, and the total match count. Template-body nodes pull from it like any other producer.
- Connections from the **outer instance node** override `overridable` ports declared on the template — the per-instance hookup.

### Template definition

```json
{
  "domGraph": {
    "templates": {
      "sectionSnap": {
        "overridable": [
          { "name": "enterPulse", "type": "string" },
          { "name": "exitPulse",  "type": "string" },
          { "name": "activeIdx",  "type": "string" }
        ],
        "nodes": [
          {
            "id": "tIn",
            "type": "pulseTween",
            "params": { "duration": 1.25, "ease": "easeInOutQuad" },
            "connections": {
              "restart": { "nodeId": "__scope__", "port": "enterPulse" }
            }
          },
          {
            "id": "cpr",
            "type": "clipPathReveal",
            "params": { "selector": { "fromScope": "selector" } },
            "connections": {
              "progress": { "nodeId": "tIn", "port": "progress" }
            }
          }
        ]
      }
    },
    "nodes": [ /* … */ ]
  }
}
```

`overridable[]` declares the ports the outer instance can hook into. References to them inside the template body use the reserved id `"__scope__"`.

### Instance node

```json
{
  "id": "section",
  "instanceOf": "sectionSnap",
  "forEach": ".snap-section",
  "connections": {
    "enterPulse":  { "nodeId": "snap", "port": "enter_out", "indexed": true },
    "exitPulse":   { "nodeId": "snap", "port": "exit_out",  "indexed": true },
    "activeIdx":   { "nodeId": "snap", "port": "activeIdx" }
  }
}
```

- `forEach: ".snap-section"` matches every element in the page. The loader emits one expanded copy per match.
- `connections.<key>` keys must each match a name in the template's `overridable[]`.
- No `forEach` (or the alternative `instanceCount: N`) means the instance materializes once. The validator warns when both are missing.

### Per-iteration scope: `forEachScope` and `{ fromScope }`

Inside a template body, any param value or connection can read from the scope:

```json
// Per-iteration selector (the matched element)
"params": { "selector": { "fromScope": "selector" } }

// Per-iteration index (0-based)
"connections": { "index": { "fromScope": "index" } }

// Total match count
"connections": { "count": { "fromScope": "count" } }
```

`{ fromScope: 'selector', prefix: '', suffix: ' .child' }` lets you compose a per-iteration selector by appending a static descendant fragment. This replaces the older F351 reserved-token form (`"$match .child"`) — use the prefix/suffix shape for any new authoring.

The loader emits one `forEachScope` node (id pattern `__scope__`) per iteration; everything in the template body wires from it the same way it wires from any producer.

### Indexed wires (`indexed: true`)

When the outer instance connects to a count-driven source like `indexedDispatch`, `pulseDispatch`, `pulseRouter`, or `bidirectionalSnap`, add `"indexed": true` on the connection:

```json
"connections": {
  "enterPulse": { "nodeId": "snap", "port": "enter_out", "indexed": true }
}
```

What this does: the editor draws ONE representative wire (to channel 0). The loader stamps separate wires to `enter_out0`, `enter_out1`, …, `enter_out{matchCount-1}` — one per matched element. The dispatch node's `count` param auto-derives from the forEach match count, so manual sizing isn't needed.

### Constraints

- **Connections from an instance must reference a template-declared `overridable` name.** Connecting to anything else is a load-time error (`[F351] instance "X" connects to "Y" but template "T" has no overridable port "Y"`).
- **Template-body nodes cannot reference outer-graph ids directly.** They route through `__scope__`. Direct references fail-loud.
- **`{ fromScope: 'selector' }` requires the instance to declare `forEach`.** Used in a non-forEach (instanceCount-only) instance, the loader throws `[F374] "{ fromScope: 'selector' }" used in non-forEach instance`.
- **Template recursion is rejected.** A template that references itself (directly or transitively) throws with the chain printed.
- **Templates are not exposed in the FVE picker.** They only materialize via instance nodes.

### When to reach for it

- You have N matched DOM elements and want each to run the same per-element animation graph.
- You want per-element values to fan out from a shared source (a wheel-driven counter dispatching pulses to N sections).
- You'd otherwise be hand-writing the same graph N times with edited ids.

If you want one node animating N elements with shared params (no per-element graph state), reach for a stagger writer instead — `staggerWrite`, `staggerAnimation`, etc. — those don't need templates.

---

## Wireable selectors (F357)

Several DOM-write nodes (`domPropertyWrite`, `domPoseWrite`, `domStringWrite`, `domColorWrite`, `domVariablesWrite`, `staggerWrite`) accept their CSS selector either as a static `params.selector` string OR as a wired `connections.selector` from an upstream string source.

```json
// Static (param)
{
  "id": "writer",
  "type": "domPropertyWrite",
  "params": { "selector": ".hero h1", "propertyName": "opacity" }
}

// Wired (connection takes precedence at bind time)
{
  "id": "writer",
  "type": "domPropertyWrite",
  "params": { "selector": "", "propertyName": "translateX" },
  "connections": {
    "selector": { "nodeId": "splitter", "port": "pieceSelector" }
  }
}
```

The wired value overrides the param at bind time. The most common pattern is wiring `splitText.pieceSelector` into a downstream stagger / write node so the selector tracks however `splitText` is configured (chars / words / lines) without the author duplicating the class name.

Detect it on a per-node MD: an input port named `selector` on a writer-type node is the wireable selector.

---

## Multi-wire connections

Most input ports accept exactly one wire. **Multi-input ports** (e.g. `pulseOr.pulses`) accept fan-in — multiple sources feeding the same input. The connection becomes an array:

```json
"connections": {
  "pulses": [
    { "nodeId": "pulseA", "port": "out" },
    { "nodeId": "pulseB", "port": "out" },
    { "nodeId": "pulseC", "port": "out" }
  ]
}
```

The runtime evaluates each frame and combines according to the consuming port's semantics (or-pulse, sum, max, etc. — see the consuming node's MD).

A non-multi port that receives an array is a load-time error. Whether a port is multi-input is recorded in metadata; the per-node MD's Inputs section is the source of truth.

---

## Feedback wires

The graph's evaluation order assumes a DAG — the scheduler refuses to register a cycle. To break a cycle that you intentionally want (a node's output feeds back into its own subtree, with a one-frame delay), mark the wire as `kind: 'feedback'`:

```json
"connections": {
  "clipWrite_0": {
    "nodeId": "stateApply",
    "port":   "clipTrackWrites",
    "kind":   "feedback"
  }
}
```

Effect: the wire is registered but excluded from the scheduler's cycle-detection pass. The reading node sees the previous frame's value, not this frame's. Used for feedback loops in physics, state machines, and accumulators.

Defaults to `'normal'` (an explicit `kind: 'normal'` is allowed but redundant). Most authoring graphs never need this — it's reserved for genuine feedback patterns.

---

## Parameter overrides

`overrides[]` on a node lets you tweak `params.<path>` per CSS media query, without forking the whole node. Resolved at LOAD time by `src/loader/util/apply-param-overrides.ts`; by the time `debug.validate()` runs, the overrides are baked into `params` and the field is gone from the in-memory node.

```json
{
  "id": "physics",
  "type": "physicsBodyStagger",
  "params": {
    "initialXSpacing": 24,
    "jitterX": 16,
    "jitterY": 40,
    "channels": {
      "--wu-ty": {
        "keyframes": [
          { "time": 0,    "value": 0 },
          { "time": 0.4,  "value": -100 },
          { "time": 0.7,  "value": -120 },
          { "time": 1,    "value": -120 }
        ]
      }
    }
  },
  "overrides": [
    {
      "when": "(min-width: 1101px) and (max-height: 950px)",
      "set": {
        "channels.--wu-ty.keyframes[2].value": -135,
        "channels.--wu-ty.keyframes[3].value": -135
      }
    },
    {
      "when": "(max-width: 1100px)",
      "set": {
        "initialXSpacing": 18,
        "jitterX": 12,
        "jitterY": 30
      }
    }
  ]
}
```

### Path grammar

Keys in `set` are dot-separated paths into `params`. Segments must match `[A-Za-z_$-][A-Za-z0-9_$-]*` for object keys or `[N]` for numeric array indices.

| Path | Meaning |
|---|---|
| `initialXSpacing` | Top-level param. |
| `channels.--wu-ty.value` | Nested object key (CSS-variable-style names allowed). |
| `keyframes[2].value` | Third keyframe's value (0-indexed). |
| `channels.--wu-ty.keyframes[3].value` | Combined nesting. |

Malformed paths fire `OVERRIDE_PATH_INVALID`; missing leaves fire `OVERRIDE_PATH_NOT_FOUND` ([`debugging.md`](debugging.md)).

### `when` semantics

A CSS media query string. Multiple overrides on one node evaluate top-to-bottom; later matching overrides win on conflicting paths (last-write-wins by path).

```json
"when": "(min-width: 768px)"
"when": "(max-width: 1100px) and (orientation: portrait)"
"when": ["(min-width: 768px)", "(prefers-reduced-motion: no-preference)"]   // AND
```

A malformed `when` fires `OVERRIDE_INVALID_WHEN` and is treated as always-match (so the page doesn't break) — but the warning is loud because the override is silently active on every breakpoint until fixed.

### `mergeStrategy: 'replace'`

Default behaviour: each `set` path is a leaf write, replacing the existing value at that path while leaving siblings untouched. Setting `mergeStrategy: 'replace'` replaces the **entire** sub-tree at the parent of the set path — used rarely, only when an override needs to prune branches the baseline carries.

### `activeWhen` vs `overrides`

| | `activeWhen` | `overrides` |
|---|---|---|
| Granularity | The whole node | Individual params on a node |
| What it does | Drops the node from the graph at load when query doesn't match | Patches `params` paths when query matches |
| Semantic | Topology mutation | Param mutation |
| Where to look | [`fmtion-format.md` envelope section](fmtion-format.md) | This page |

Use `activeWhen` when the node is irrelevant on a breakpoint. Use `overrides` when the node is needed on every breakpoint but its tuning differs.

---

## Source of truth

| Feature | Loader phase / TS source |
|---|---|
| forEach / templates / instanceOf | `src/loader/expanders/instance-expand.ts` |
| forEachScope + `fromScope` | Same (`SCOPE_ID = '__scope__'`, type `'forEachScope'`) |
| Wireable selectors | NodeMetadata input ports tagged `selector` of type `string` on writer nodes |
| Multi-wire connections | `MultiInputPort` in `src/core/GraphPort.ts` |
| Feedback wires | `SerializedGraphNode.connections[*].kind === 'feedback'` in `src/core/GraphNode.ts` |
| Parameter overrides | `src/loader/util/apply-param-overrides.ts` + phase `src/loader/phases/01-param-overrides.ts` |

The full TS shape of a serialized node, including every authoring field, lives in `SerializedGraphNode` at `src/core/GraphNode.ts:21`. When upstream extends that interface, this page should grow to match — there's no auto-extract here, just the periodic audit recipe described in [`debugging.md`'s "Source of truth"](debugging.md#source-of-truth) section.
