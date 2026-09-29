# Workflow

SKILL.md is authoritative for production modes, stops, blockers, and evidence-display policy.
The same is true of the fit check and the signature moment. This file describes how to execute
the work; it does not redefine those rules.

## 1. Read and frame

Read every source page before composing. Record:

- goal, audience, duration, and speaker role;
- central question, source conclusion, and decision sought;
- source sections and page coverage;
- atomic text, number + unit + label groups, images, diagrams, and tables;
- repeated brand signals: typography, palette, spacing, imagery, marks, and tone.

If any required context is missing, follow the blocker rule in SKILL.md.

Then run the fit check. List every operable structure you considered, each with its source page
and, for each one you will not use, the reason it cannot carry an operation; then give the fit
class. NARRATIVE_ONLY is only valid with that list attached. Put the fit into the single intake question when it is not STRONG_FIT, so the user
can choose a Guided Narrative or stop before any design work starts.

## 2. Document Story

Write the shortest coherent chain from the audience's starting understanding to the requested
decision. Do not mirror page order by default. Each story stage must cite source material and state
why it is needed.

## 3. Affordance Audit

For each meaningful source structure, select an earned mechanism or EXPLANATION_ONLY. Record only
the five required fields in the production template. Prefer one strong mechanism over many weak
ones.

## 3b. Signature moment

Write the moment in one sentence from the audience's side, then three concepts for it:

| Concept | What the audience does or sees | Kind of change | Not visible before → understood after | Source support | Speaker ease | What the document alone cannot show |
|---|---|---|---|---|---|---|

Kind of change is one of relation, difference, change, or calculated result. A concept whose
before → after cell cannot be filled is disqualified before any other comparison.

The three must differ in mechanism, object operated, or order of reveal. Write all three before
judging any of them; then choose, disqualifying any concept that needs unsupported data. Keep the
unchosen two as one line each in the production record — they are the fallback if the chosen one
fails at Stop 2 or in the ambition review.

For a Guided Narrative, the moment is usually the document's key figure opened for inspection, or
its argument assembled step by step; the build as a whole must reorganise the argument with
Traverse or Accumulate, not replay pages. See [craft.md](craft.md) and
[judgment-cases.md](judgment-cases.md).

## 4. Cue and copy design

Each cue must specify:

1. what the speaker says;
2. what they operate;
3. what visibly changes;
4. what the audience understands afterward.

Review only text that will actually appear. Unapproved, presenter-only, and internal labels never
enter audience HTML.

## 5. Signature mechanism

Build the signature moment first, with real source data, brand, behavior, reverse/reset, and both
desktop and mobile layouts. A wireframe does not satisfy this check. If a different mechanism
carries higher source-fidelity risk (usually Calculate or Simulate), build and check it next.

If the signature mechanism does not land when running, switch to a recorded alternative concept
rather than polishing the weak one.

## 6. Full build

Create a quiet opening, preserve whole-document logic, and end at the source's actual landing.
Carry forward only elements whose continued presence helps the speaker. Recompose for mobile; do
not merely scale the desktop canvas.

Before calling the build done, check each scene for moments that are only text on cards. Where the
source describes an experience or states a relation that moves, use enactment or meaningful motion
from [craft.md](craft.md) rather than leaving the scene static.

Start from `assets/runtime/presentation-runtime.js`: paste it into an inline script and give it the
cue ids, the initial mechanism state, and a `render()` that sets the whole stage from the cue index
and state. Render the full state for each cue rather than adding the next element; that is what
makes back navigation and Reset correct. Schedule delays with its `later()` so Reset cancels them.
The runtime wires keyboard and clicker keys and sets `data-cue`, `data-motion`, and
`data-verify-settle-ms`. Express reduced-motion differences in CSS under `[data-motion="reduce"]`,
not as classes or text that `render()` writes only in reduced mode; otherwise the reduced-motion end
state differs from the normal one.

Size vertical space with the viewport height, not only the width (for example
`clamp(…, 17vh, …)` or `min(2.6vw, 4.6vh)` for headings), so a scene that fits a tall screen does not
spill on a 16:9 laptop.

Instrument the HTML for verification:

- data-presentation-root on the experience root (set by the runtime);
- data-cue on that root for the current cue (set by the runtime);
- data-verify-next, data-verify-prev, data-verify-reset on controls;
- data-verify-box on collision-sensitive audience elements;
- data-verify-overlap=allow only for intentional overlap;
- optional data-verify-settle-ms and data-state-hash.

The bundled verifier exercises cue navigation only. Mark mechanism controls such as comparison
switches, sliders, filters, reveals, and inspectors with data-verify-action for future or
project-specific tests, and list every unexercised control in the verification report. Never infer
that cue-navigation success proves those mechanisms work.

## 7. Audit and verify

Run source, copy, visual-meaning, brand, and coverage audits. Then run:

    node scripts/verify.mjs path/to/experience.html

If Playwright is unavailable, the verifier reports a blocker. That is not a reason to skip
verification — it is a reason to do it by hand and say so. This is the common case in a hosted
environment, so treat the manual route as normal rather than exceptional.

**Manual equivalent.** Open the file in whatever browser tool you have and check, at a desktop
width and at 375px:

- **Collisions.** For every cue, and for every state of every mechanism, compare the bounding
  boxes of visible `[data-verify-box]` elements pairwise and confirm no unintended overlap.
  Narrow widths are where this actually breaks.
- **No horizontal scroll.** `document.documentElement.scrollWidth` must not exceed
  `window.innerWidth`.
- **Text fits.** No element where `scrollWidth` exceeds `clientWidth`.
- **Offline.** No entry in `performance.getEntriesByType("resource")` outside
  `file:`, `data:`, `blob:`, `about:`.
- **Console.** No errors and no page errors.
- **Reverse and Reset.** Navigate forward through every cue, then back; Reset must return the
  opening state exactly, including mechanism state.
- **Keyboard.** Arrow keys advance and reverse after a control has been clicked and holds focus;
  every operable control is reachable by Tab with visible focus.
- **Reduced motion.** The end state of every cue is complete and legible with motion suppressed.
- **Accessible names.** Every control reports a name; a button whose text sits in nested spans
  can come out nameless.

Drive this from the DOM rather than from screenshots. A preview pane can show a stale frame, and
a screenshot taken mid-transition reads as a defect that is not there — both have happened here.
Measure after the transition has settled.

**Report which route you took.** "Checked manually against the DOM because Playwright was not
available" is an honest result. "Verified" without saying how is not.

## 7b. Ambition review

Open the running result as the client would, from the opening, without the production record.
Answer three questions in the production record:

1. What will they remember? Name it in one sentence, and name the relation, difference, change, or
   calculated result they understood only after the operation. Being impressed by the effect alone
   does not count.
2. Is that the signature moment? If not, which moment is it, and should it be?
3. What in the result is merely competent — correct, but no better than the source?

If question 1 has no answer, return to the signature moment and its recorded alternatives. Do not
answer it with added motion, colour, or decoration.

## 8. Human review and packaging

At the final review, show the running whole experience, not records or wireframes. Ask the human to
rate the eight feedback dimensions using the supplied template, including what would have made the
result impressive. Fix defects, rerun verification,
then export the offline HTML or ZIP.
