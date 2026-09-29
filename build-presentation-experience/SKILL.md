---
name: build-presentation-experience
description: Convert an existing PowerPoint/PPTX, PDF, or Word document into a source-grounded, presenter-operated, single-file HTML experience. Use when a speaker should reveal evidence, compare choices, filter conditions, inspect details, traverse a structure, or change source-supported inputs while explaining. Do NOT use for summaries, translations, ordinary websites, slide editing, dashboards, video or voice narration, or creating a new deck without a source document.
---

# Build Presentation Experience

Create a document-specific presentation experience that a human speaker operates. Share the
production process and interaction techniques across jobs; do not force documents through a
common screen template or renderer.

The deliverable is a portable HTML file, or HTML plus local assets in a ZIP. It works offline and
does not call an LLM at viewing time.

## Product test

An experience is not “a PowerPoint that moves.” An operation must change at least one of:

- the data or result the audience can inspect;
- the comparison or condition being considered;
- the visible structure, evidence, or decision path;
- the audience's understanding at that moment in the speaker's explanation.

Page turns, tabs, fades, zooms, and show/hide alone are Motion Presentation. Most source material
may remain explanation; do not invent interaction where the source affords none.

## Production modes — authoritative

Use exactly one mode. This section is the sole definition of modes and stopping points.

### CONTINUOUS_BUILD — default

Use when the user says to proceed, keep going, or produce the result. Perform all internal reviews,
build the signature mechanism, continue through the full experience, verify it, and present the
running whole result. Do not interrupt for routine design choices or internal artifacts.

### REVIEW_FIRST

Use when the user asks to review stages, the material is high-stakes, or the central experience
direction has not been accepted. Wait at:

1. **Stop 1 — Direction:** Document Story, fit, Experience Affordance Audit, and the signature
   moment with its chosen concept.
2. **Stop 2 — Mechanism:** the signature mechanism, working and branded on real source data.
3. **Stop 3 — Full experience:** the verified whole experience.

In CONTINUOUS_BUILD and QUICK_BUILD, Stops 1 and 2 are internal checks; Stop 3 is always human
review.

### QUICK_BUILD

Use when the user signals a deadline or asks for something fast or rough (“for tomorrow's
meeting”, “quickly”, “a first draft”). Depth drops; guardrails do not.

- Build one signature moment as a working mechanism. Everything else is guided explanation on the
  runtime kit.
- Choose one concept for the signature moment and record the strongest alternative in one line
  instead of comparing three.
- Limit audits to: source fidelity of every displayed number and claim, audience copy of every
  displayed string, and visual meaning of the signature mechanism.
- Run `scripts/verify.mjs`.
- Deliver with a short “not done in QUICK_BUILD” list: skipped audits and unbuilt mechanisms.

A calculation without source basis, a concept label needing authority, or any other genuine blocker
stops QUICK_BUILD exactly as it stops the other modes.

### Genuine blockers in every mode

At the beginning, if goal, audience, duration, or speaker role is missing, ask for all missing
context in one consolidated question, together with the fit result when it is not STRONG_FIT.
After that single intake, continue without repeated interruptions unless a genuine blocker
appears: the source is unreadable or materially incomplete; a material relationship has more than
one plausible interpretation; a calculation lacks a source-supported basis; a proposed concept
label needs human authority; or external transmission, purchase, publication, or another
permission boundary is involved. Never guess around a missing capability or unreadable content.

## Fit check — authoritative

This Skill is strongest where the source contains something to operate. Judge that before
designing, not after building. Count the source's operable structures: stated values with units,
options on a shared axis, explicit criteria, stated formulas or ranges, real sequences or
hierarchies, and dense figures worth inspecting. Record every structure you considered, with its
source page and, for each one you do not use, the reason it cannot carry an operation. A fit class
without that record is not a finding. Then classify:

- **STRONG_FIT** — data, comparison, filter, or calculation structures exist. Proceed.
- **PARTIAL_FIT** — only structural mechanisms (Traverse, Inspect, Accumulate, Resolve) are
  earned. Proceed, and say so in the first report.
- **NARRATIVE_ONLY** — an argument or vision with no operable structure, shown by the record above:
  every candidate considered and rejected for a stated reason. Before building, tell the user, show
  that record, and offer a **Guided Narrative** build or stopping. If no answer can be obtained, build the
  Guided Narrative and state that choice at the top of the result.

A Guided Narrative is a legitimate outcome, not a failed interactive build — and not a licence to
stop designing. Few operable structures do not excuse giving up on reorganising the argument. It
must still restructure the document's argument with **Traverse or Accumulate** so that the audience's
understanding changes in stages, and it still needs a signature moment that names its understanding
change, an opening, and a closing. A sequence of pages with transitions does not qualify. Do not call
it interactive, and do not add mechanisms to reach an interactivity quota.

## Signature moment — authoritative

Guardrails raise the floor; they do not create anything worth remembering. Every build therefore
has one **signature moment**: the point where the audience sees something the source document alone
could not show them — options held on one axis, the basis opened in place, a figure recalculated
from stated terms, an argument's structure assembled in front of them. Name it in one sentence from
the audience's side (“they see that …”) and design the whole experience to earn it: the story leads
into it, and the opening raises the question it answers.

That sentence must name what is **not visible before the operation and understood after it**, as
one of four kinds: a **relation**, a **difference**, a **change**, or a **calculated result**. State
the kind and the before/after understanding explicitly. A concept that cannot state them is
disqualified at once, however striking it looks: scale, motion, colour, or surprise without a named
understanding change is spectacle, not a signature moment.

Before choosing its form, write **three concepts** that differ in what the audience does or sees —
a different mechanism, a different object operated, or a different order of reveal; never colour or
layout variants of one idea. For each, note the kind of understanding change (relation, difference,
change, or calculated result) with its before/after, the source support, how easily the speaker can
use it, and what it shows that the document cannot. Generate first, then apply the guardrails when
choosing: a concept that needs unsupported data, or that cannot state its understanding change, is
disqualified at that point, not self-censored before it is written down. Record the two unchosen concepts in one line each.

Before Stop 3, run an **ambition review**: look at the running result as the client would. If you
cannot name what they will remember, return to the signature moment. Do not add decoration.

## Required workflow

1. Read the entire source; run the single intake for missing context.
2. Map source structure, brand signals, atomic numbers/labels, images, and coverage; run the fit
   check.
3. Write the Document Story around the audience's decision, not page order.
4. Audit affordances: Reveal, Compare, Filter, Calculate, Simulate, Traverse, Inspect, Accumulate,
   and Resolve. Mark unsupported mechanisms as unavailable.
5. Choose the signature moment from three concepts.
6. Define speaker cues: **speaker line → operation → visible change → understanding change**.
7. Review audience-facing copy internally. Only approved copy may appear on screen.
8. At Stop 1 when REVIEW_FIRST; otherwise continue.
9. Build the signature mechanism first as working branded HTML on the runtime kit, not a wireframe.
   If another mechanism carries higher source-fidelity risk, build it next before continuing.
10. At Stop 2 when REVIEW_FIRST; otherwise continue.
11. Build an opening, the full experience, and a closing. Preserve whole-document logic.
12. Audit source fidelity, visual meaning, copy, brand, and coverage.
13. Verify desktop, mobile, keyboard, reverse/reset, reduced motion, console, and network behavior.
14. Run the ambition review.
15. Present the complete result for Stop 3 human review; package only after review fixes.

QUICK_BUILD follows the same order with the reduced scope defined above.
Detailed execution: [references/workflow.md](references/workflow.md).

## Audience and evidence policy — authoritative

- Audience-facing text must be natural, necessary, specific, and usable by the speaker.
- “It appears in the source” does not by itself justify displaying it.
- Internal labels, production terminology, provenance classes, page numbers, and audit language are
  not audience-facing copy.
- Keep evidence and provenance in the production record by default. Show a source/evidence control
  only when the user requests it or opening the basis is an approved experience mechanism.
- Do not add a conceptual role such as before/after, cause/effect, problem/solution, input/output,
  or old/new unless the source states it, the presenter states it, or a human approves it.

Use [references/audience-copy.md](references/audience-copy.md) for the lightweight copy review.

## Opening and closing

Every full experience needs a quiet opening that establishes the source brand and central question,
and a closing that lets the speaker land the source's actual conclusion or next action. Neither is a
decorative title/end slide. Do not invent a tagline, grand convergence, or call to action.

## Hard guardrails

The complete, non-duplicated guardrails and acceptance conditions live in
[references/quality-gates.md](references/quality-gates.md). Read them before building and before
final review. In particular:

- add no unsupported fact, number, formula, causal link, category, or conclusion;
- let no line, color, size, proximity, motion, connection, or convergence create unsupported meaning;
- never solve a language problem with styling or motion;
- reuse interaction techniques, not a fixed composition or generic renderer;
- technical success never proves presentation quality;
- only the human may decide that the result is ready to show people.

## Working references

- Source and provenance: [references/source-fidelity.md](references/source-fidelity.md)
- Story and cues: [references/presenter-experience.md](references/presenter-experience.md)
- Affordance choice: [references/experience-affordance.md](references/experience-affordance.md)
- Interaction map: [references/interaction-map.md](references/interaction-map.md)
- Source-grounded calculation: [references/source-grounded-calculation.md](references/source-grounded-calculation.md)
- Craft techniques: [references/craft.md](references/craft.md)
- Judgment cases — decisions that worked or failed, and why: [references/judgment-cases.md](references/judgment-cases.md)
- Visual-meaning audit: [references/visual-meaning.md](references/visual-meaning.md)

Use [assets/production-record-template.md](assets/production-record-template.md) for compact working
records and [assets/feedback-log-template.md](assets/feedback-log-template.md) for human feedback.
Build navigation, keyboard and clicker input, reset, timers, and reduced motion on
`assets/runtime/presentation-runtime.js`, inlined into the delivered HTML. It is behaviour only;
composition is still designed per document.

Before building a mechanism, read its worked implementation in
[assets/mechanisms/](assets/mechanisms/README.md) — Reveal, Compare, Calculate, and Inspect, each
in two forms that differ in kind. Take the technique and the state handling; write the composition,
type, density, and brand from this document. They are parts, not screens.
Run `node scripts/validate-skill.mjs` after editing this Skill and `node scripts/verify.mjs <html>`
against a completed experience when Playwright is available.

## Current status

`DRAFT_SKILL_SKELETON_NOT_YET_PROVEN`

Two different real documents have been attempted. Direction improved, but neither establishes
repeatable presentable quality. Do not copy their HTML as a success template and do not describe
this Skill as proven, reusable, or production-ready.
