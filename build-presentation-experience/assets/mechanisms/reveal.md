# Reveal

**Changes:** what depth or basis the audience can reach.
**Needs from the source:** a hidden detail, evidence, or layer that genuinely sits beneath a
stated figure or claim.

**Must not assert:** that the revealed detail *explains* or *causes* the headline unless the
source says so. Opening a breakdown beneath a total says "this is what it is made of." Opening a
different metric beneath it says "this is why" — which is a claim the source may not make.

Reveal one layer at a time, and make the way back obvious. Two layers deep is almost always a
sign the story, not the mechanism, needs work.

**Stops at:** there must be a real layer underneath. If opening it produces more prose, a restatement, or a *different* metric rather than what the figure is made of, this is not Reveal — and a breakdown that does not sum to its total is a source problem to raise, not a display to build.

---

## Form A — opens in flow, beneath its origin

The basis appears directly under the figure it belongs to and pushes what follows down. Nothing
overlays, nothing is hidden, and the origin stays visible above its own detail. Use when the
basis is short and belongs to one figure.

```html
<div class="fig" data-verify-box="fig-escalated">
  <button class="fig-head" type="button" aria-expanded="false" aria-controls="basis-escalated"
          data-reveal="escalated" data-verify-action="reveal-escalated">
    <span class="fig-n">1,320</span><span class="fig-u">件 / 月</span>
    <span class="fig-label">二次対応へ回った件数</span>
    <span class="fig-cue" aria-hidden="true">内訳</span>
  </button>
  <div class="basis" id="basis-escalated" data-open="0">
    <!-- rows come from the source; this is the container, not the content -->
  </div>
</div>
```

No `hidden` attribute: the panel's open state is `data-open`, rendered from deck state like
everything else.

```css
.fig-head{ display:flex; align-items:baseline; gap:.5em; width:100%; text-align:left;
  font:inherit; background:none; border:0; padding:.4em 0; cursor:pointer; }
.fig-n{ font-size:2.4em; font-weight:600; font-variant-numeric:tabular-nums; }
.fig-u,.fig-label{ color:var(--muted); }
.fig-cue{ margin-left:auto; font-size:.8em; color:var(--accent); }
.fig-head[aria-expanded="true"] .fig-cue{ visibility:hidden; }

/* Height is animated, not opacity: the basis grows out of its origin.
   The open state is a plain `block-size:auto`, so it is correct with or without animation. */
.basis{ block-size:0; overflow:hidden; }
.basis[data-open="1"]{ block-size:auto; }

/* Animation is an enhancement. Where interpolate-size is unsupported the panel simply appears,
   which is a fine disclosure and never a broken one. */
@supports (interpolate-size: allow-keywords){
  :root{ interpolate-size:allow-keywords; }
  .basis{ transition:block-size var(--step) ease; }
}
@media (prefers-reduced-motion: reduce){ .basis{ transition:none; } }
```

```js
// State lives in the deck, so back-navigation and Reset restore it for free.
root.querySelectorAll("[data-reveal]").forEach((b) => {
  b.addEventListener("click", () => {
    const key = b.dataset.reveal;
    deck.setState({ open: deck.state.open === key ? null : key });
  });
});

// inside render({ state }):
root.querySelectorAll("[data-reveal]").forEach((b) => {
  const on = state.open === b.dataset.reveal;
  b.setAttribute("aria-expanded", String(on));
  const panel = document.getElementById(b.getAttribute("aria-controls"));
  panel.dataset.open = on ? "1" : "0";
  panel.inert = !on;    // clipped content stays out of tab order and off the a11y tree
});
```

`inert` is the part people skip. A panel collapsed with `overflow:hidden` is still focusable and
still read aloud; its content is invisible but not gone.

> **Do not reach for the `grid-template-rows: 0fr → 1fr` trick here.** It is the widely-quoted
> way to animate to an unknown height, and it was tried first. In an isolated element it worked;
> dropped into a real cue it resolved to `0px` and stayed there, with the selector matching, the
> rule applying, and no error anywhere. A disclosure that silently never opens is a bad failure
> mode to ship. `block-size:auto` is correct whether or not the animation is supported.

---

## Form B — opens in an adjacent region that persists

The detail appears in a region beside the stage and stays there while the speaker moves between
origins. The origin that produced it stays marked. Use when the speaker will open several bases
in turn and wants each to remain comparable to the last.

```html
<div class="stage-with-basis">
  <div class="figs">
    <button type="button" data-reveal="weekday" data-verify-action="reveal-weekday">…</button>
    <button type="button" data-reveal="evening" data-verify-action="reveal-evening">…</button>
  </div>
  <aside class="basis-region" id="basis-region" aria-live="polite" data-verify-box="basis">
    <!-- one basis at a time; empty until the speaker opens one -->
  </aside>
</div>
```

```css
.figs [data-reveal][aria-pressed="true"]{ box-shadow:inset 3px 0 0 var(--accent); }
.basis-region{ opacity:0; transition:opacity var(--step) ease; }
.basis-region[data-on="1"]{ opacity:1; }
```

```js
// inside render({ state }):
const open = state.open;
region.dataset.on = open ? "1" : "0";
region.replaceChildren(open ? buildBasis(open) : "");   // rebuilt from state, never appended to
root.querySelectorAll("[data-reveal]").forEach((b) => {
  b.setAttribute("aria-pressed", String(b.dataset.reveal === open));
});
```

`aria-live="polite"` matters here: the detail appears away from the control that summoned it, so
a screen-reader user is otherwise told nothing happened.

---

## Choosing between them

Form A keeps origin and basis in one reading path and suits a single figure that carries the
cue. Form B suits a cue where two or three figures are opened in turn and the speaker wants the
last one still on screen. Form B costs more attention — the audience's eye leaves the figure —
so do not reach for it when one figure is doing the work.
