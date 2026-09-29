# Source-grounded calculation and simulation

Use Calculate or Simulate only when the source supplies the necessary model.

## Calculation requirements

- identify each input and its source reference;
- preserve unit, period, scope, and label;
- state the formula internally and show it when comprehension requires it;
- define valid ranges from source evidence;
- update the result immediately and deterministically;
- distinguish a source value, computed result, scenario, and estimate.

Arithmetic directly expressed by the source may be computed. Missing cost, period, conversion,
duplication, or dependency may not be invented. Never present a range as a forecast when it is only
a user-controlled scenario.

Closing a stated shortfall by toggling measures is a calculation like any other: the gap, each
measure's contribution, and the remainder must each come from the source. Toggles must not imply
that contributions add up, are independent, or are exhaustive unless the source says so.

## Simulation requirements

Use few meaningful levers. Show what changed and what did not. Provide reset and compare-to-source
states. If source-supported ranges or outcome logic are absent, report that simulation is
unsupported and choose another mechanism.
