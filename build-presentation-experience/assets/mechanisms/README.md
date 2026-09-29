# Mechanism parts

Worked implementations of individual mechanisms. **Parts, not screens.**

Each mechanism here has **two implementations that differ in form** — not in colour or spacing.
That is deliberate. One example becomes the answer; two make the choice visible and force you to
pick the one this document's claim actually needs.

## How to use these

Read the mechanism's file when you are about to build that mechanism. Take the technique — the
structure of the interaction, the state handling, what the markup has to guarantee. Then write it
into **this document's** composition, type, density, and brand.

## The data in these examples is invented

Every figure and label in these files comes from a constructed document written for rehearsing
the Skill — a fictional help-desk proposal. **No value here originates in any real source
document**, and none may. Copying a client's numbers into a reusable example spreads them into
everything built from it, which is exactly the contamination these files must not cause.

When you add or amend an example, invent its data.

## What these are not

- **Not a layout.** No example specifies a screen, a grid, a stage, or where anything sits on it.
- **Not a style.** Colours are CSS variables with placeholder names; type sizes are relative.
  Derive the real values from the source document.
- **Not a template to instantiate.** If two documents end up with the same screen, the fault is
  not in these files but in having skipped composition.
- **Not exhaustive.** Four mechanisms are covered. The other six are no less legitimate; they
  just have no worked example yet. Absence here is not a reason to avoid a mechanism, and
  presence here is not a reason to reach for one the source has not earned.

The prohibition in [../../references/interaction-patterns.md](../../references/interaction-patterns.md)
is unchanged: reuse behaviour, never composition. These files sit on the behaviour side of that
line, between `runtime/presentation-runtime.js` (navigation and state plumbing) and the screen
you design per document.

## These are unproven, and adding them was itself a change

No build has yet been made with these examples available. They exist because guardrails had been
accumulating while nothing showed what a good implementation looks like — but **adding material
to the Skill is the same move that produced that accumulation**, and it has to be held to the
same standard.

So they are on trial. On the next real document, record in the feedback log what these changed:
whether a mechanism was implemented better or merely faster, whether a form was chosen because
the claim needed it or because it was the one written down here, and whether anything on screen
exists because an example suggested it rather than because the source did. If the answer is that
they made no difference, say so and cut them.

The strongest test is to build the same source both with and without them and compare. Where
that is too expensive, compare against the previous build of the same document and write down
what actually differs.

## Files

| File | Mechanism | The two forms |
|---|---|---|
| [reveal.md](reveal.md) | Reveal | opens in flow beneath its origin / opens in an adjacent region that persists |
| [compare.md](compare.md) | Compare | all subjects at once in identical frames / one frame, subject swapped, difference retained |
| [calculate.md](calculate.md) | Calculate | figures react inside a sentence / inputs, rule and result as one reading path |
| [inspect.md](inspect.md) | Inspect | overview kept beside an enlarged detail / detail expands in place while the rest recedes |

Every example assumes the runtime kit is present and that the screen is rendered from state, not
mutated incrementally. Reverse navigation and Reset are correct only if you keep that discipline.
