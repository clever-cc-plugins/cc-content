# cc-content — Design: Closing Gaps Found in the HubSpot "Human+AI Content System" Prompt Collection

**Status:** Approved for implementation
**Date:** 2026-07-19
**Source:** Comparison of HubSpot x MATG's "The Human+AI Content System: 20 Prompts That
Multiply Creativity" against the current skill set of `cc-content` and `cc-concept`.
**Companion doc:** `cc-concept/docs/superpowers/specs/2026-07-19-hubspot-gap-closure-design.md`
(the same initiative's `cc-concept`-side changes — a new `cc-concept-performance-review`
skill and a `cc-concept-positioning` extension).

---

## 1. Purpose and scope

HubSpot's collection groups 20 prompts into four stages: IDEATION, CREATION,
DISTRIBUTION, OPTIMIZATION. Comparing each prompt against the existing `cc-content`
and `cc-concept` skill sets surfaced three gaps worth closing on the `cc-content` side
(the CREATION-stage product-photography prompts don't apply — both plugins are
text-only, no image generation):

1. **AI-to-Human Content Refinement** (HubSpot CREATION prompt) — no skill polishes
   an already-drafted piece to remove AI "tells." The closest existing logic is buried
   inside `cc-content-text` Step 8 (em-dash removal only) — too narrow and not
   reusable on drafts from other sources.
2. **OPTIMIZATION stage** (5 HubSpot prompts: Performance Pattern Recognition, Content
   Iteration Engine, ROI Calculator, Predictive Modeler, Competitive Intelligence) is
   entirely absent from `cc-content`. This design covers the content-piece-level slice
   of that gap; the strategic-concept-level slice is `cc-concept-performance-review`
   (companion doc).
3. **Multi-Format Content Atomization** (HubSpot CREATION prompt) — repurposing one
   core message across platforms isn't explicit anywhere; the closest fit,
   `cc-content-text`, only ever produces one format per run.

**In scope:** two new skills, one extension to an existing skill.

```
plugins/cc-content/skills/cc-content-humanize/SKILL.md            (new)
plugins/cc-content/skills/cc-content-performance-review/SKILL.md  (new)
plugins/cc-content/skills/cc-content-text/SKILL.md                (edit: atomization mode)
```

**Out of scope:** the CREATION-stage visual/photography prompts (Product-Accurate
Visual Brief, Lifestyle Scene Composition, Copy-Visual Sync) — no image generation in
this plugin family. DISTRIBUTION-stage prompts (Influencer Briefs, Community
Activation, Real-Time Response) — CPG/social-ops specific, lower value for a
general-purpose text plugin, not pursued this round.

---

## 2. New skill — `cc-content-humanize`

### 2.1 Frontmatter

`name: cc-content-humanize`. Trigger phrases: "humanize this", "make this sound less
AI", "remove AI tells from this", "this reads like ChatGPT wrote it", "polish this
draft to sound human". `allowed-tools: Read, Write, Bash`. `argument-hint: "[optional:
path to the draft to humanize]"`.

### 2.2 Design decisions

- **Input-source-agnostic.** Unlike `cc-content-text`'s narrow em-dash check (which
  only ever sees its own output), this skill takes **any** pasted or file-path draft,
  regardless of origin — the owner's own writing, another tool's output, or a
  `cc-content` skill's draft they want a second pass on.
- **Reuses the brand-voice context, not a new framework file.** No new `_shared/`
  file needed — humanization calibrates to the same loaded brand-voice context every
  other `cc-content` skill uses; the "pattern list" below is the skill's own
  domain knowledge, not a reusable framework other skills would select from.
- **Two-pass structure, mirroring `cc-content-text`'s draft/self-edit split:** Pass 1
  detects and lists AI markers (with counts), Pass 2 produces the rewritten text.
  Both are shown — the owner sees _what_ changed and _why_, not just the output.
- **Detection list (Pass 1)** — scan for: em-dash parentheticals; overused
  transitions ("Moreover," "Furthermore," "In today's world"); formulaic
  intro-3 points-conclusion structures; generic AI phrases ("dive into," "unlock,"
  "elevate," "transform," unless the brand voice explicitly allows them); excessive
  colons/semicolons; too-perfect parallel structure; hedge words ("arguably,"
  "potentially," "seemingly").
- **Rewrite techniques (Pass 2)** — contractions and sentence-initial "And"/"But"
  where the brand voice allows casualness; varied sentence rhythm (short punchy mixed
  with longer natural ones); specific detail in place of generic examples; concrete
  time markers over vague ones ("last Tuesday" not "recently"); occasional
  parenthetical asides — all gated by the loaded brand-voice tone so a formal-voice
  project doesn't get casualisms it never asked for.
- **Single output, not three humanization-strength variants.** HubSpot's source
  prompt offers Light/Medium/Full versions; this skill produces one result calibrated
  to the loaded brand voice, consistent with every other `cc-content` skill's
  single-deliverable convention. If the owner wants a different strength, they ask
  for another pass — no multi-version output to maintain.

### 2.3 Step sequence

Follows the same shape as `cc-content-text`/`cc-content-linkedin-post`:

**Step 0 — Recall learnings** (silent, `[cc-content:*]` tags + cross-plugin).

**Step 1 — Load context.** Same context-table protocol as other `cc-content` skills.
Gates only on **brand voice** (the one thing this skill cannot calibrate without) —
missing organization background or audience does not block, since humanization
doesn't need them. Absent brand voice → ask once, same three-state pattern
(pause / continue-degraded) as `cc-content-text` Step 1.

**Step 2 — Get the draft.** Resolve from `$ARGUMENTS` (file path) → pasted text in
the request → ask: _"Paste the draft you want humanized, or give me a file path."_

**Step 3 — Detect (Pass 1).** Run the detection list above against the draft. Present
counts per marker type before rewriting, so the owner sees the diagnosis first.

**Step 4 — Rewrite (Pass 2).** Apply the rewrite techniques, gated by brand-voice
tone. Preserve every factual claim and the original structure's intent — this is a
style pass, not a content rewrite. Intervene as much as necessary but as little as
possible, same discipline as `cc-content-text` Step 8.

**Step 5 — Delimited output.**

```
─────────────────────────────────────────────
AI markers detected
─────────────────────────────────────────────
<marker type>: <count> — <brief example>
[...]
─────────────────────────────────────────────
Humanized draft
─────────────────────────────────────────────
<the rewritten text only>
─────────────────────────────────────────────
```

**Step 6 — Feedback.** Same two-phase auto-store + explicit-feedback pattern as every
other `cc-content` skill, tagged `[cc-content:cc-content-humanize]`.

---

## 3. New skill — `cc-content-performance-review`

### 3.1 Frontmatter

`name: cc-content-performance-review`. Trigger phrases: "review how this post
performed", "analyze content performance", "what worked in these posts", "help me
iterate on this based on the numbers", "content performance review".
`allowed-tools: Read, Write, Bash`. `argument-hint: "[optional: path to a file with
performance notes]"`.

### 3.2 Design decisions

- **No analytics API integration.** The skill reasons over whatever performance data
  the owner pastes in (impressions, engagement rate, CTR, conversions, qualitative
  notes like "comments mentioned X a lot") — consistent with the rest of the plugin
  family's pattern of working from user-supplied material, not live external data
  sources.
- **Piece-level altitude, not strategy-level.** This skill looks at structural and
  tonal patterns _within and across individual content pieces_ (hook style, framework
  used, persuasion principles applied, length, format) — it does not evaluate whether
  a positioning claim or channel allocation was validated. That's
  `cc-concept-performance-review` (companion doc) — the two are intentionally
  decoupled; either can run without the other.
- **Reuses `_shared/storytelling-frameworks.md` and `_shared/persuasion-principles.md`**
  as the vocabulary for pattern-naming — e.g. "the two top-performing posts both used
  PAS with a Loss-Aversion opener" — rather than inventing a new taxonomy.
- **Output is a pattern summary plus iteration variants, not a scorecard.** The
  deliverable's point is forward action: 2–3 concrete next-piece variants, each
  keeping the identified winning elements and changing exactly one thing, so the
  owner can test isolated variables rather than guessing.

### 3.3 Step sequence

**Step 0 — Recall learnings** (silent).

**Step 1 — Load context.** Same protocol; gates on **brand voice** only (needed to
draft the iteration variants in Step 4); organization background and audience noted
silently if present.

**Step 2 — Gather the pieces and their data.** For each piece under review, collect:
the content itself (text, file path, or a summary if unavailable) and its performance
data as pasted by the owner. If the owner has only numbers and no content, proceed
with data-only analysis and note the limitation. If nothing is provided, ask:
_"Paste the piece(s) and whatever performance numbers or notes you have — impressions,
engagement rate, CTR, conversions, or just qualitative observations."_

**Step 3 — Identify patterns.** Compare pieces against each other (if 2+) or against
stated expectations (if 1). Name the structural/tonal elements correlated with
stronger results, using the shared frameworks' vocabulary where they apply. Flag
elements correlated with weaker results the same way. Do not fabricate a pattern from
a single data point — say so explicitly when the evidence is too thin to generalize.

**Step 4 — Generate iteration variants.** Produce 2–3 short concept-level variants
(not full drafts) for the next piece: each keeps the identified winning elements and
deliberately varies exactly one thing (a different hook trigger, a different
framework, a different persuasion principle) so results stay attributable. Offer to
hand one off to a drafting skill (`cc-content-linkedin-post`, `cc-content-blog-article`,
`cc-content-text`) once chosen — do not auto-draft.

**Step 5 — Delimited output.**

```
─────────────────────────────────────────────
Performance review — <N> piece(s)
─────────────────────────────────────────────
Winning elements: <list, with evidence>
Weak elements:     <list, with evidence>
Confidence:        <note if evidence is thin>
─────────────────────────────────────────────
Iteration variants for next piece
─────────────────────────────────────────────
Variant 1: <what's kept> / <the one thing changed>
Variant 2: …
─────────────────────────────────────────────
```

**Step 6 — Feedback.** Standard two-phase pattern, tagged
`[cc-content:cc-content-performance-review]`.

---

## 4. Extension — `cc-content-text` atomization mode

### 4.1 Design decisions

- **Detection, not a separate skill.** The trigger is a request shape
  ("repurpose this across formats," "turn this into a thread and a newsletter and a
  LinkedIn post," "atomize this into multiple formats") recognized at the top of the
  existing flow — this is deliberately **not** a new skill, since it reuses every
  existing step (context load, briefing check, framework/persuasion selection,
  draft, self-edit) just run once per target format instead of once total.
- **Format list comes from the owner, not a hardcoded matrix.** Ask which formats are
  wanted; for each, apply Tier A/B/C routing (Step 2) exactly as today — so a
  requested LinkedIn variant still routes to `cc-content-linkedin-post` if that's a
  better fit, rather than this skill drafting it inline.
- **One core message, N drafts.** The atomization input (core message, key value
  proposition, proof points, CTA) is captured once in the existing Step 4, then reused
  across every format's Steps 5–9 — keeping the message consistent while letting
  structure, length, and tone flex per format's own conventions.

### 4.2 Step sequence changes

**New Step 1.5 (after Step 1, before Step 2) — Detect atomization requests.** If the
owner's request names 2+ target formats or explicitly asks to "repurpose"/"atomize"/
"turn this into multiple formats," switch to atomization mode:

> "Which formats do you want this in? (e.g. LinkedIn post, Twitter/X thread,
> newsletter, blog post, email) I'll draft each from the same core message."

Collect the format list, then run **Step 2's Tier A/B/C routing per format**: any
format with a dedicated skill gets the same routing offer as today (per-format, not
once globally); the rest proceed through this skill's own drafting steps.

**Step 4 (existing) — Get the content idea, audience, and length target.** In
atomization mode, this is asked **once** and reused across all formats — the core
message must stay identical; only structure and length vary per format.

**Steps 5–9 (existing) — run once per format** that wasn't routed away in Step 1.5.
Each format gets its own framework selection (Step 5), persuasion selection (Step 6),
draft (Step 7), self-edit (Step 8), since a press-release framework doesn't fit a
Twitter thread.

**Step 9 output** — present all non-routed formats in sequence, each in its own
delimited block, plus a summary line listing which formats were routed to a dedicated
skill instead ("LinkedIn → routed to `/cc-content-linkedin-post`; drafted here:
newsletter, Twitter/X thread").

**Step 10 (existing) — Feedback.** Runs once for the whole atomization batch, not
per-format — same tag, same qualification rules.

---

## 5. File layout and config updates

Two new skill directories, one edited file:

```
plugins/cc-content/skills/cc-content-humanize/SKILL.md            (new)
plugins/cc-content/skills/cc-content-performance-review/SKILL.md  (new)
plugins/cc-content/skills/cc-content-text/SKILL.md                (edited)
```

`CLAUDE.md`'s **Key Config Files** table is not hand-edited — `scripts/sync-config-table.sh`
owns it via the pre-commit hook. `README.md`'s skill table gets both new skills added
by hand (that table isn't script-managed).

No new `_shared/` files, no `allowed-tools` changes, no marketplace.json changes (the
plugin is already referenced via `git-subdir` at the `plugins/cc-content/` directory
level, so new skill subdirectories are picked up automatically).

---

## 6. Verification

Fixtures to run manually post-implementation:

**Fixture A — humanize detects and removes markers.** Feed `cc-content-humanize` a
draft with 3+ em-dash parentheticals and 2+ generic AI phrases ("unlock," "elevate").
Expected: Pass 1 reports accurate counts; Pass 2's output contains none of the
detected markers; every factual claim from the input survives in the output.

**Fixture B — humanize respects brand voice.** Run twice against the same draft with
two different loaded brand-voice contexts (one formal, one casual). Expected: the
casual-voice run introduces contractions/sentence-initial "And"/"But"; the formal-voice
run does not, even though both remove the same AI markers.

**Fixture C — performance-review with two pieces.** Provide two LinkedIn posts with
engagement numbers where one clearly outperforms the other, both using named
frameworks from `storytelling-frameworks.md`. Expected: the winning framework/hook
pattern is named with evidence; iteration variants each change exactly one variable
from the winning piece.

**Fixture D — performance-review with thin evidence.** Provide a single piece with no
comparison point. Expected: the skill explicitly flags that the evidence is too thin
to generalize a pattern, rather than fabricating one.

**Fixture E — atomization routes correctly.** Ask `cc-content-text` to "turn this
announcement into a LinkedIn post, a Twitter thread, and a newsletter." Expected:
LinkedIn is routed to `/cc-content-linkedin-post` per Step 1.5/Tier A; the thread and
newsletter are drafted inline, each with its own framework choice, and the summary
line correctly reports the routing.

**Fixture F — atomization keeps the core message constant.** In Fixture E's run,
verify the same value proposition and proof points appear (adapted in length/structure
only) in both the drafted thread and the drafted newsletter.

---

## 7. Traceability

| Gap (HubSpot prompt)                                       | Where addressed                      |
| ---------------------------------------------------------- | ------------------------------------ |
| AI-to-Human Content Refinement System                      | §2 (`cc-content-humanize`)           |
| Performance Pattern Recognition / Content Iteration Engine | §3 (`cc-content-performance-review`) |
| Multi-Format Content Atomization Engine                    | §4 (`cc-content-text` extension)     |
