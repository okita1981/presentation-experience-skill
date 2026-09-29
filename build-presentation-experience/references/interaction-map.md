# Interaction Map

Convert accepted affordances into presenter-operable cues.

For every cue, record the five required fields in the production template and confirm:

- one explicit trigger;
- one focal change;
- one intended understanding change;
- a clear reverse or reset state;
- what persists afterward and why.

The Interaction Map may include multiple cues in one scene. It must not encode DOM tags, pixel
coordinates, or a reusable screen template.

## State rules

- Initial state never implies an unapproved default or recommendation.
- Persistent elements occupy stable, intentional positions.
- Retired elements do not reappear without a new source-supported reason.
- Reverse navigation reconstructs the prior semantic state, not merely the prior animation frame.
- Reset returns to the same opening state deterministically.
