# Visual-meaning audit

Audit every semantic visual claim as a combination, not as isolated styling:

> displayed words + role label + position + size + color + connection + motion

A phrase may be verbatim SOURCE and still become a false claim after a role label and a privileged
position are added. For example, placing a real SOURCE phrase under an invented “Before” label does
not preserve fidelity—the combined visual claim asserts a state relationship the phrase never did.

Classify each expression:

- A — SOURCE_GROUNDED: the source directly supports the relation.
- B — PRESENTER_SUPPORTING: stated presenter intent supports it.
- C — DECORATIVE_NONSEMANTIC: removing it changes no interpretation.
- D — MISLEADING_OR_UNSUPPORTED: it can imply an unsupported relation; block delivery.

Inspect lines, arrows, shared colors, size differences, proximity, grouping, whitespace separation,
ordering, movement, replacement, convergence, repeated words, and omitted subjects. Decorative
elements are allowed only when they do not connect content, assign category or priority, imply
sequence/state/causality, or change interpretation when removed.

Audit occurs during the full audit step defined in SKILL.md. Do not repair a D classification by
making it subtler; remove it or establish valid source/presenter support.
