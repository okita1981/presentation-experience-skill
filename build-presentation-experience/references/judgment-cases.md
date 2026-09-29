# Judgment cases

Guardrails say what must not happen. These cases show judgments — what was chosen for a particular
source, what happened, and why. Read them for the reasoning. **Never copy a layout, scene, or
composition from them**; none of the runs below reached “ready to show people.”

Each case: the source situation · the decision · the outcome · the lesson · where the lesson stops.

## From this Skill's own runs

### 1. One element changing beats pages replacing pages

- **Source situation:** a proposal deck whose own argument described one thing changing over time.
- **Decision:** the first build replaced one screen with the next. The rebuild kept a single
  persistent element on screen and changed it cue by cue.
- **Outcome:** the first build read as “a PowerPoint that moves a bit.” The rebuild was judged
  clearly better in that part, and the overall feel was received well.
- **Lesson:** continuity of one object lets the audience follow change; replacement makes them
  start again on every screen.
- **Stops at:** the source must actually describe the change. Carrying an element forward also
  asserts that it still matters.

### 2. A verbatim phrase can still become a false claim

- **Source situation:** the same deck, containing a real phrase from the document.
- **Decision:** the phrase was promoted to a headline concept and placed under a stage label the
  Skill had invented (a “before”-type word).
- **Outcome:** rejected at human review, together with other unnatural wording and overlaps. Every
  word traced to the source; the label and position added a relationship the document never made.
- **Lesson:** audit words, label, position, and size as one claim. Fidelity of the string alone
  cannot catch this.
- **Stops at:** a stage framing is fine when the source states it, the presenter states it, or a
  human approves it.

### 3. Correct restraint is not the same as a memorable result

- **Source situation:** an 18-page strategy-and-KPI document with objectives, a three-part
  strategy, a stated concept, KPI groups, and no actual values, targets, or formula.
- **Decision:** Traverse and Accumulate for the strategy path, Inspect for the KPI groups, Resolve
  back to the stated concept. Calculate and Simulate were rejected because nothing supported them.
- **Outcome:** a complete offline experience, judged acceptable and not off-target — but “so-so.”
- **Lesson:** the restraint was right; it was not enough. *Interpretation, not a recorded human
  finding:* the build had no single moment designed to be remembered. That gap is why the Skill
  now requires a signature moment and three concepts before building.
- **Stops at:** do not answer “so-so” by adding calculation the source does not support.

### 4. Faithful and safe still read as a document until something moves

- **Source situation:** a 10-page pitch deck for an ad-quality metric, presented to executives. It
  described intrusive ads, three indicators, and a value-based revenue model with stated ranges.
- **Decision:** the first build kept every guardrail and showed the signature moment (savings and
  fee on one scale), but every other scene faded in text cards.
- **Outcome:** the presenter's verdict was that it still became an explanatory deck, with no motion.
  The revision re-enacted the ad interruption on a phone, sent reactions flowing into their
  indicators, moved the old and new revenue models, and grew the signature bars on the shared scale
  — each motion tied to a relation the source states.
- **Lesson:** the visual-meaning rules forbid unsupported motion, not motion. Read them as “every
  motion needs a stated relation”, then look for the relations that are movements.
- **Stops at:** a score or total counting up is still forbidden when the source gives no formula.

### 5. An argument deck with no numbers can still earn a signature moment

- **Source situation:** a 15-page, image-only persuasive deck about a generation, with no values or
  formulas, but with a stated 2×2 placement, a stated sequence, and stated inconvenience → skill pairs.
- **Decision:** classed as a qualitative STRONG_FIT rather than NARRATIVE_ONLY. The signature moment
  lets the speaker switch the two axes on one at a time: each axis alone keeps two generations, both
  keep one. An enactment (pressing REC at the moment a DJ stops talking) and a walked process path
  carried the rest.
- **Outcome:** recorded here before human review; see the feedback log for the verdict.
- **Lesson:** filtering on stated qualitative placements is a real mechanism; the understanding change
  is a relation that only appears when criteria combine.
- **Stops at:** do not place items at precise coordinates inside a quadrant, and do not fill a
  quadrant the source leaves empty.

### 6. A shared renderer flattens every document

- **Source situation:** many documents, before this Skill existed.
- **Decision:** parse each document into a plan and draw it with common components.
- **Outcome:** structurally valid output, repeatedly not something anyone wanted to present.
- **Lesson:** a common renderer can only draw what it was built to draw; the document's own logic,
  brand, and order of explanation are what get lost. Share behaviour, not composition.
- **Stops at:** behaviour plumbing (navigation, reset, keyboard, reduced motion) is safe to share —
  see `assets/runtime/presentation-runtime.js`.

### 7. A figure written into a cue from memory survives until something computes it

- **Source situation:** a rehearsal on a constructed test document, not client work. Plans each
  covered a subset of inquiry categories, and a cue line named how many inquiries a plan leaves
  untouched.
- **Decision:** the cue was drafted with the figure estimated in prose, intending to confirm it at
  the audit.
- **Outcome:** the figure was wrong by more than a factor of two — it accounted for two categories
  when four were left untouched. Nothing caught it until the mechanism was implemented against the
  category data, several steps later.
- **Lesson:** compute a figure at the moment you write it into a cue, from the source values
  themselves. A cue line carrying a number is audience-facing copy; estimating it defers a fidelity
  error to a stage that may never look at it again.
- **Stops at:** this concerns figures you state, not the story. It does not require building a
  mechanism before writing the cue — only arithmetic against the source at the time of writing.
- *Rehearsal on a constructed document; no human reviewed it as client work. The failure mode is
  real, the setting was not.*

## Established techniques from outside this project

These are well-known ideas in information design, stated as techniques. Apply them only where the
source supports the relation they display.

- **Reactive numbers in explanatory text** (Bret Victor, *Explorable Explanations*, 2011): a figure
  inside a sentence can be adjusted, and the dependent figures in the same sentence update. Here it
  suits Calculate only when the source states the formula and the range.
- **Overview first, zoom and filter, then details on demand** (Ben Shneiderman, 1996): keep the
  whole visible while one part is opened. Here it suits Inspect, Reveal, and Filter, and answers
  audience questions without leaving the overview.
- **Small multiples** (Edward Tufte): the same frame, scale, and axis repeated for each option, so
  only the data differs. Here it suits Compare; change the subject, never the geometry.

## Adding a case

After every human review, add at most one case, in the same five parts. Record the reviewer's words
where possible, mark your own interpretation as interpretation, and state where the lesson stops.
Do not add a case that exists only to justify a layout.
