# Interaction techniques, not templates

Reusable code may implement focus management, state transitions, reset, keyboard control, reduced
motion, deterministic formatting, safe escaping, and offline packaging.

That reusable code ships as `assets/runtime/presentation-runtime.js`: cue navigation, keyboard and
clicker input, reset of cue and mechanism state, cancellable timers, reduced-motion detection, and
the verifier markers. Use it instead of rewriting this plumbing for each document, so production
time goes to the source-specific design. Do not extend it with layouts, scene types, or styling.

Do not reuse a finished scene layout, card system, chapter skeleton, generic dashboard, or prior
HTML composition as the answer to a new document. The mechanism's visual composition must follow
the new source's logic, brand, and presenter task.

Craft guidance for each mechanism is in [craft.md](craft.md).
