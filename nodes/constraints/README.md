# Constraints Nodes

Position, rotation, and transform constraints that enforce spatial relationships between objects: follow, aim, distance clamp, drag, path follow, camera bounds.

| Node | Type | Context | Description |
|------|------|---------|-------------|
| [Translation Follow](translationFollow.md) | `translationFollow` | shared | Constrain position to follow a source position |
| [Transform Follow](transformFollow.md) | `transformFollow` | shared | Copy transform components from source to target |
| [Distance Clamp](distanceClamp.md) | `distanceClamp` | shared | Clamp distance between two positions |
| [Auto Orient](autoOrient.md) | `autoOrient` | shared | Orient rotation based on movement velocity |
| [Bone Aim](boneAim.md) | `boneAim` | canvas | Aim bone at target position |
| [Camera Follow](cameraFollow.md) | `cameraFollow` | shared | Smoothly follow target with deadzone and lookahead |
| [Camera Bounds](cameraBounds.md) | `cameraBounds` | shared | Clamp camera position and zoom to bounds |
| [Draggable](draggable.md) | `draggable` | shared | Wrap a DOM element or canvas object as draggable, with optional inertia. Outputs current position + drag state + velocity, suitable for driving any downstream graph node. Set `direction` to lock to an axis. |
| [Scroll Constraint](scroll.md) | `scroll` | shared | Scrollable container with bounds and momentum |
| [Scroll Bar](scrollBar.md) | `scrollBar` | shared | Scroll bar indicator that tracks scroll position |
| [Path Follow](pathFollow.md) | `pathFollow` | shared | Follow a path curve at given progress |
