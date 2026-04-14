# Solvers Nodes

Iterative solvers: value accumulation, mesh relaxation, distance constraint solving, rigid body physics (Planck.js/Box2D), and physics body readout.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Value Solver](valueSolver.md) | `valueSolver` | shared | Generic float accumulation with temporal feedback. Value moves toward target at given rate. |
| [Mesh Solver](meshSolver.md) | `meshSolver` | shared | Iterative mesh relaxation. Averages vertex positions toward neighbors. |
| [Constraint Solver](constraintSolver.md) | `constraintSolver` | shared | Multi-pass distance constraint solving. Maintains rest lengths between connected points. |
| [Physics World](physicsWorld.md) | `physicsWorld` | canvas | Rigid body physics simulation via Planck.js (Box2D). Lazy-loaded. |
| [Physics Body Read](physicsBodyRead.md) | `physicsBodyRead` | canvas | Extract per-body x/y/rotation from PhysicsWorldNode output. |
