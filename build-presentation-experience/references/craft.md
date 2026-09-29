# Craft guide

Use these as techniques, never as a fixed composition.

## Mechanism craft

Worked implementations, two forms per mechanism, are in
[../assets/mechanisms/](../assets/mechanisms/README.md). The notes below are the rules; those
files are the code.

- Reveal: open detail beside or within its parent so context remains visible. Reveal one layer at
  a time and provide an obvious return.
- Compare: hold axis, unit, scale, and spatial anchors fixed. Change the compared subject, not the
  geometry. Use printed values for precision. When the claim is the difference itself, keep the
  difference visible — mark what was gained or lost rather than letting the earlier state simply
  disappear.
- Filter: keep criteria and resulting set visible. Show what entered or left; do not make the
  initial selection look recommended unless the source says so.
- Calculate: keep inputs, formula meaning, and output in one reading path. Inputs update the result
  immediately; reset returns exact source values.
- Simulate: use only a few consequential controls and source-supported ranges. Separate scenario
  exploration from prediction.
- Traverse: preserve orientation—current position, path covered, and available next direction. Do
  not imply progress where the source has only categories.
- Inspect: retain the overview while magnifying a detail. Make origin and return obvious.
- Accumulate: place confirmed items into stable, ordered positions. Do not form a decorative pile
  or imply that unrelated items add up.
- Resolve: bring forward only material genuinely earned earlier. Synthesis never proves causality
  by proximity alone.

When a measure only *addresses* something and the source does not claim it *resolves* it, hold the
quantity still and change only the marking. Shrinking a bar that stands for a volume says the
volume fell; an outline, a fill change, or an added label says it is being acted on. Keep the
encoded quantity answering to the source alone, and let state ride on top of it.

## Signature moment craft

- Raise the question before the moment answers it. The cue before the signature moment should leave
  the audience wanting exactly what the operation reveals.
- Give the moment the stage: the fewest competing elements, the largest share of the screen, and
  the one operation the speaker most wants to perform live.
- Let the result stay. What the moment revealed should remain available for the cues that follow,
  so later explanation can point back to it.
- Leave room for the speaker's pause after the change. Do not animate the next thing in.
- Prefer a moment the speaker can repeat in answer to a question (“and if we look at plan B…”) over
  one that only plays once.

## Narrative documents

When the fit is PARTIAL_FIT or NARRATIVE_ONLY, the strongest moments usually come from:

- inspecting the document's single most important figure, photograph, or diagram in place, with the
  overview kept visible;
- assembling the document's own argument structure step by step, so the audience can see where
  each point sits in the whole and return to any part on request;
- holding the document's stated principles or criteria on screen while later sections are checked
  against them, when the document itself makes that link.

Do not borrow a comparison, sequence, or conclusion the document does not make to create drama.

## Composition

- Give each cue one focal point and one dominant reading path.
- Use contrast in this order: position, scale, weight, then color.
- Keep supporting text subordinate; if a sentence must be read before continuing, reconsider it.
- Let whitespace separate meanings, not merely decorate a canvas.
- Recompose mobile layouts into a new reading order. Do not shrink a desktop stage.
- A grid column keeps its width when its content is `display:none`, so a hidden column can still push
  the stage past the viewport. Define the columns per state so hidden ones do not exist.

## Type and density

- Establish three roles: proposition, working evidence, and orientation/control.
- Prefer short, specific phrases over abstract taglines.
- Avoid more than one dense evidence region at a time; open additional detail on demand.
- Keep labels close to the objects they qualify; never split number, unit, and label.

## Enactment

When the source describes something the audience has experienced — an interruption, a wait, a
confusing form, a moment of friction — let them experience it again on screen instead of reading
about it: an article that a full-screen ad takes over, a wait that must elapse before the audience
can continue. Enactment turns an explanatory scene into a felt one.

- Re-create only what the source describes. Use abstract shapes rather than invented copy, brands,
  or people.
- Keep it short and under the speaker's control: one click starts it, the next click moves on.
- Follow it with the source's own point, so the feeling lands on the argument.

## Motion that carries meaning

Restraint is not the goal; unsupported meaning is the thing to avoid. A build with only fades reads
as a document. Where the source states a relation that is itself a movement, show the movement:

- **flow** — items travelling into the category the source assigns them to (reactions into the
  indicator they feed);
- **co-movement** — two quantities rising together when the source says one grows with the other;
- **shrink and share** — a quantity reduced and a stated part of it moving elsewhere;
- **growth on a shared scale** — bars that grow on one axis, so the difference forms in front of
  the audience.

Write down, for each motion, the relation it asserts and where the source states it. Never animate
a number counting toward a result the source cannot compute.

## Motion and presenter timing

Motion explains change, not polish.

- direct response: roughly 120–220 ms;
- local spatial change: roughly 300–600 ms;
- major scene reorganization: roughly 500–900 ms;
- longer than 1.2 s only for an intentional speaker pause.

The final state remains legible with reduced motion. Avoid simultaneous movement that creates
competing focal points or makes the speaker wait.

## Brand derivation

1. Identify actual background, text, accents, category colors, type roles, imagery, and rhythm.
2. Separate frequent decorative color from semantic color.
3. Build a small screen palette and verify contrast.
4. Use source-specific geometry and density; do not stop at swapping CSS variables.
5. Disclose a fallback when a logo or font cannot be used safely.
