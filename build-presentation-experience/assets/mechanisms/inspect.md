# Inspect

**Changes:** what detail is legible, while the whole stays available.
**Needs from the source:** an image, diagram, table, or dense object that genuinely rewards a
closer look.

**Must not assert:** that the inspected part is the important one. Enlarging something says "this
matters most" — which is a claim, and it needs the source or the speaker behind it. Inspecting
three regions in turn is safer than enlarging one and leaving it.

The rule that makes this Inspect rather than a slideshow: **the overview never leaves.** The
moment the whole disappears, the audience has navigated somewhere, and orientation is gone.

**Stops at:** the object must genuinely reward magnification, and the overview must be able to stay on screen. A sparse figure gains nothing from being enlarged, and once the whole disappears this is navigation, not Inspect.

---

## Form A — overview kept beside an enlarged detail

The whole is held at reduced scale with the active region marked on it; the detail renders large
alongside. The audience always knows where they are looking, because they can see both. Use for
diagrams and images where the region's position within the whole is part of the meaning.

```html
<div class="inspect" data-verify-box="inspect">
  <div class="whole">
    <img src="data:image/png;base64,…" alt="工程図の全体">
    <button class="locator" type="button" data-region="step3"
            style="--x:46%;--y:22%;--w:18%;--h:30%"
            aria-label="工程3を拡大" data-verify-action="inspect-step3"></button>
  </div>
  <div class="detail" data-verify-box="detail" aria-live="polite">
    <!-- the same asset, positioned and scaled to the region -->
  </div>
</div>
```

```css
.inspect{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.4fr); gap:1.5em; }
.whole{ position:relative; }
.whole img{ inline-size:100%; display:block; }
.locator{ position:absolute; inset-block-start:var(--y); inset-inline-start:var(--x);
  inline-size:var(--w); block-size:var(--h); padding:0; cursor:pointer;
  background:none; border:1px solid var(--muted);
  transition:border-color var(--step) ease, background var(--step) ease; }
.locator[aria-pressed="true"]{ border-color:var(--accent); background:color-mix(in srgb,var(--accent) 12%,transparent); }

/* The detail is the same image scaled up and offset, not a second asset. */
.detail{ overflow:hidden; }
.detail img{ transform-origin:0 0; transition:transform var(--step) ease; }
```

```js
// inside render({ state }): scale and offset derive from the region, so no second file is needed.
const r = REGIONS[state.region];
detailImg.style.transform = r
  ? `scale(${100 / parseFloat(r.w)}) translate(-${r.x}, -${r.y})`
  : "none";
root.querySelectorAll(".locator").forEach((b) => {
  b.setAttribute("aria-pressed", String(b.dataset.region === state.region));
});
```

One asset, transformed. Exporting a second cropped image means two things can drift apart, and
the crop stops being traceable to the original.

---

## Form B — detail expands in place while the rest recedes

The object stays exactly where it is; its surroundings drop back without vanishing. Nothing moves
to a second region, so the audience's eye never relocates. Use for tables and lists, where the
detail belongs in the row it came from.

```html
<table class="rows" data-verify-box="rows">
  <tr data-row="account">
    <th scope="row">
      <button type="button" data-inspect="account" aria-expanded="false"
              data-verify-action="inspect-account">アカウント・パスワード</button>
    </th>
    <td class="n">864</td>
    <td class="more"><!-- the columns the source has, revealed at this row --></td>
  </tr>
</table>
```

```css
.rows tr{ transition:opacity var(--step) ease; }
/* Recede, never hide: a hidden row says the set changed, which it did not. */
.rows[data-active] tr:not([data-state="on"]){ opacity:.4; }
.rows tr[data-state="on"] td.n{ font-size:1.6em; }
.rows td.more{ inline-size:0; overflow:hidden; transition:inline-size var(--step) ease; }
.rows tr[data-state="on"] td.more{ inline-size:16em; }
@media (max-width:820px){
  /* Side-by-side detail cannot survive a narrow screen; it becomes a row beneath its own row. */
  .rows tr[data-state="on"] td.more{ display:block; inline-size:auto; }
}
```

```js
// inside render({ state }):
rows.toggleAttribute("data-active", Boolean(state.row));
root.querySelectorAll("[data-row]").forEach((tr) => {
  const on = tr.dataset.row === state.row;
  tr.dataset.state = on ? "on" : "off";
  tr.querySelector("[data-inspect]").setAttribute("aria-expanded", String(on));
});
```

Dimming the other rows is not decoration: it keeps the set intact while making one row legible.
Removing them would say the others stopped being part of the total.

---

## Choosing between them

Form A when position within the whole carries meaning — a step in a diagram, a region of a
photograph. Form B when the detail belongs to a row and moving the eye away would break the
reading. Both fail the same way: if the overview stops being visible, it is no longer Inspect,
and the audience has to rebuild their bearings when they come back.
