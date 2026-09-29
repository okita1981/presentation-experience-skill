# Audience-facing copy

Source fidelity answers “is it true to the document?” Copy review answers “should the audience see
this exact wording here?” These are separate decisions.

## Lightweight review

Use the production-record template and complete the five required fields only. Add optional fields
when risk warrants them. For each displayed phrase, test:

- Can the speaker naturally use it in front of this audience?
- Is the viewpoint and referent clear without hidden production context?
- Is it needed on screen rather than better spoken?
- Does its label, position, size, or pairing create an extra claim?
- Would removing it make the explanation clearer?

Use one verdict:

- APPROVED_FOR_AUDIENCE
- REWRITE_REQUIRED
- PRESENTER_ONLY
- INTERNAL_LABEL_ONLY
- REMOVE

Only APPROVED_FOR_AUDIENCE enters audience HTML. In CONTINUOUS_BUILD this is an internal review;
in REVIEW_FIRST it is included within the next applicable stop, not a separate stop.

## Concept labels

Analysis may use hypotheses such as “before/after” or “problem/solution,” but a hypothesis is not
display copy. Display the relation only if the source states it, the presenter states it, or a
human approves the proposal.
