# Calculate

**Changes:** a result, from inputs the audience moves.
**Needs from the source:** a stated formula, or an arithmetic relation the source makes explicit,
**and** stated ranges for every input.

**Must not assert:** precision, a forecast, or a relation the source does not state. This is the
mechanism most likely to put a number on screen that the document never supported, and the
audience will believe it because it moved. Read
[../../references/source-grounded-calculation.md](../../references/source-grounded-calculation.md)
before building either form.

Before writing any of this, answer: where does the source state this formula? If the answer is
"it follows from the numbers being there," stop — that is the fabrication this rule exists to
prevent.

**Stops at:** the source must state the formula *and* the valid range of every input. Absent either, this is not a Calculate — report that and choose another mechanism. A relation that merely follows from two numbers being present is the fabrication this rule exists to prevent.

---

## Form A — figures react inside a sentence

The input sits in the prose, and the dependent figures in the same sentence update as it moves.
The claim stays a sentence; only its quantities are live. Use when the relation is simple enough
to state in one line and the point is that the sentence stays true across the range.

```html
<p class="live">
  一次解決率が
  <input class="inline-n" type="range" id="rate" min="45" max="70" step="1" value="45"
         aria-label="一次解決率" data-own-keys data-verify-action="rate">
  <output for="rate"><b id="rate-v">45</b>%</output>
  のとき、二次対応へ回るのは月
  <b id="esc-v">1,320</b>件です。
</p>
<p class="rule">月間2,400件 × (100 − 一次解決率)｜出所：上期集計</p>
```

```css
.live{ font-size:1.15em; line-height:2; }
.inline-n{ inline-size:7em; vertical-align:middle; accent-color:var(--accent); }
.live b{ font-variant-numeric:tabular-nums; font-weight:600; }
.rule{ font-size:.8em; color:var(--muted); }
```

```js
// `data-own-keys` on the slider stops arrow keys advancing the deck while it has focus.
rate.addEventListener("input", () => deck.setState({ rate: Number(rate.value) }));

// inside render({ state }):
rate.value = state.rate;                       // rendered from state, so Reset restores it
rateV.textContent = state.rate;
// TOTAL comes from the source; the arithmetic is the source's own, stated above the control.
escV.textContent = Math.round(TOTAL * (100 - state.rate) / 100).toLocaleString("ja-JP");
```

Three things carry the honesty here: the rule is printed where the audience can read it, the
range stops at the values the source supports, and the output is rounded to the source's
precision rather than the slider's.

---

## Form B — inputs, rule and result as one reading path

Inputs, the rule in words, and the result are three zones the eye crosses in order. Use when the
speaker must be able to point at the basis — a client asking "where does that come from" gets an
answer without leaving the screen.

```html
<div class="calc" data-verify-box="calc">
  <div class="inputs">
    <label>一次解決率
      <input type="range" id="r" min="45" max="70" step="1" data-own-keys
             data-verify-action="rate">
      <output for="r"><b>45</b>%</output>
    </label>
  </div>
  <p class="rule" aria-hidden="true">月間件数 × (100 − 一次解決率) ÷ 100</p>
  <div class="result">
    <b id="out">1,320</b><span class="u">件 / 月</span>
    <span class="prov">上期集計より</span>
  </div>
  <button type="button" data-verify-action="calc-reset">資料の値に戻す</button>
</div>
```

```css
.calc{ display:grid; gap:.8em; }
.rule{ font-size:.85em; color:var(--muted); font-variant-numeric:tabular-nums; }
.result b{ font-size:2.6em; font-weight:600; font-variant-numeric:tabular-nums; }
.result .u{ color:var(--muted); margin-inline-start:.2em; }
.prov{ display:block; font-size:.75em; color:var(--muted); }
/* The source's own value is marked, so a moved input is never mistaken for the document. */
.calc[data-touched="1"] .result b::after{
  content:"（試算）"; font-size:.32em; color:var(--muted); margin-inline-start:.4em;
}
```

```js
// inside render({ state }):
calc.dataset.touched = state.rate === SOURCE_RATE ? "0" : "1";
```

The `（試算）` marker is the part that matters. The moment an input leaves the source's own
value, the number on screen is a scenario, and it has to say so — otherwise the speaker is
quoting a figure the document never published.

---

## Choosing between them

Form A when the relation is one sentence and the sentence is the claim. Form B when the speaker
needs the basis visible, or when the result is the thing being discussed rather than the sentence
around it. Neither is acceptable without the rule on screen and the range from the source — if
you cannot supply both, this is not a Calculate, and the honest outcome is to say so.
