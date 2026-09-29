# Compare

**Changes:** which subject or condition is active.
**Needs from the source:** items that are genuinely comparable on one stated axis, with the same
unit, period, and scope.

**Must not assert:** an ordering, a preference, or a magnitude relation the source does not
state. The geometry must not move when the subject changes — if the axis, scale, or anchor
shifts, the audience reads a difference that is yours, not the document's.

Check before building: do these items share a basis? Two figures from different periods, or one
measured per-user and one per-account, are not comparable however similar they look.

**Stops at:** the items must share axis, unit, period, and scope **in the source**. Two figures measured over different periods, or one per-user against one per-account, are not comparable however alike they look. If you are constructing the shared axis yourself, stop: the comparison is yours, not the document's.

---

## Form A — all subjects at once, in identical frames

Every subject is drawn in the same frame, at the same scale, simultaneously. Selection changes
only emphasis. Nothing animates, nothing is hidden, and the comparison is made by the eye rather
than by memory. This is Tufte's small multiples; it is the safest Compare there is.

```html
<div class="multiples" role="group" aria-label="部門別">
  <figure class="m" data-subject="sales" data-verify-box="m-sales">
    <figcaption>営業</figcaption>
    <div class="plot"><div class="fill" style="block-size:39%"></div></div>
    <p class="v"><b>39</b>%</p>
  </figure>
  <!-- identical markup per subject; only the caption and the value differ -->
</div>
```

```css
.multiples{ display:flex; gap:1.5em; align-items:flex-end; }
.m{ margin:0; flex:1; transition:opacity var(--step) ease; }
/* One scale for every frame. Never size a frame to its own value. */
.plot{ block-size:9em; display:flex; align-items:flex-end;
       border-block-end:1px solid var(--line); }
.fill{ inline-size:100%; background:var(--body); border:1px solid var(--line);
       transition:background var(--step) ease, border-color var(--step) ease; }
.m[data-state="dim"]{ opacity:.45; }
.m[data-state="on"] .fill{ background:var(--accent-soft); border-color:var(--accent); }
```

```js
// inside render({ state }):
root.querySelectorAll(".m").forEach((m) => {
  m.dataset.state = !state.subject ? "rest"
    : m.dataset.subject === state.subject ? "on" : "dim";
});
```

Dim rather than hide. A subject removed from the screen stops being a comparison and becomes a
claim about relevance.

---

## Form B — one frame, subject swapped, difference retained

A single frame; the subject changes on operation. What was there stays marked, so the audience
sees the *difference* rather than two separate states they must hold in their head. Use when the
document's point is the change itself, and when showing every subject at once would be too dense
to read.

```html
<div class="single" data-verify-box="single">
  <div class="plot">
    <div class="ghost" hidden></div>   <!-- the previous subject, kept visible -->
    <div class="fill"></div>
    <span class="delta" hidden></span>
  </div>
  <p class="subject-name"></p>
</div>
```

```css
.plot{ position:relative; block-size:9em; }
.fill,.ghost{ position:absolute; inset-block-end:0; inline-size:100%;
  transition:block-size var(--step) ease; }
.fill{ background:var(--accent-soft); border:1px solid var(--accent); }
/* The previous state is an outline, never a second solid: it is memory, not data. */
.ghost{ border:1px dashed var(--muted); background:none; }
.delta{ position:absolute; inset-inline-start:calc(100% + .6em); white-space:nowrap;
  font-size:.8em; color:var(--muted); }
```

```js
// inside render({ state }): `from` is the previously active subject, held in deck state.
const now = DATA[state.subject], was = state.from ? DATA[state.from] : null;
fill.style.blockSize = now.pct + "%";
ghost.hidden = !was;
if (was) ghost.style.blockSize = was.pct + "%";
delta.hidden = !was;
if (was) {
  const d = now.value - was.value;
  // Stated as the difference the source supports — no percentage change invented on top of it.
  delta.textContent = (d > 0 ? "+" : "") + d.toLocaleString("ja-JP") + UNIT;
}
```

The ghost is an outline, not a filled shape. Two solids read as two live values; an outline reads
as "where it was." And state the delta in the source's own unit — turning a difference of counts
into a percentage change is a new claim unless the source made it.

---

## Choosing between them

Form A when the audience should weigh several subjects against each other, and the set is small
enough to read at once. Form B when the claim is a movement between two states, or when the set
is too large to show at once — but note that Form B asks the audience to trust what is no longer
there, which is exactly why the ghost is not optional.
