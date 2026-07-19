# cc-content HubSpot Gap Closure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new skills (`cc-content-humanize`, `cc-content-performance-review`) and extend `cc-content-text` with an atomization mode, closing three gaps found by comparing HubSpot's "Human+AI Content System" 20-prompt collection against the current `cc-content` skill set.

**Architecture:** Two new Markdown skill files under `plugins/cc-content/skills/`, one edited existing skill file. No new `_shared/` files. No compiled code, no unit-test runner — "tests" are structural assertions (`python3` frontmatter parse, `grep` marker checks) plus manual fixture runs from the design doc (spec §6).

**Tech Stack:** Markdown (skill files), `prettier` (repo's PostToolUse formatter), `python3` (frontmatter/YAML validity checks), `gitleaks` (pre-commit secret scan).

## Global Constraints

- **Design source of truth:** `docs/superpowers/specs/2026-07-19-hubspot-gap-closure-design.md`. Every task traces to it.
- **Repo layout standard:** `marketplace/docs/cc-plugin-repo-guideline.md` — do not deviate.
- **Plugin name:** `cc-content` (already scaffolded). Skills invoked by bare name, never namespaced.
- **No secrets** committed. **No `--force`** flags. Fix root causes.
- **Do not copy skill/plugin files between repos.**
- **`cc-content-humanize` gates only on brand voice** — organization background and audience never block.
- **`cc-content-performance-review` gates only on brand voice** — same rule; no analytics API integration, reasons only over owner-supplied data.
- **`cc-content-text` atomization mode is detection-based**, not a new skill — reuses every existing step, run once per target format.
- **CLAUDE.md's Key Config Files table is never hand-edited** — the pre-commit `sync-config-table.sh` hook owns it. Pre-populate descriptions before committing so the hook doesn't write a `TODO` row.
- **Learnings tags:** `[cc-content:cc-content-humanize]` and `[cc-content:cc-content-performance-review]` respectively — never write to another plugin's tag.

---

## File Structure

| Path                                                               | Responsibility                                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `plugins/cc-content/skills/cc-content-humanize/SKILL.md`           | New skill: detect AI tells in a draft, produce a brand-voice-calibrated rewrite       |
| `plugins/cc-content/skills/cc-content-performance-review/SKILL.md` | New skill: piece-level pattern analysis + iteration variants from pasted metrics      |
| `plugins/cc-content/skills/cc-content-text/SKILL.md`               | Edited: add Step 1.5 atomization detection, adjust Steps 4/9/10 for multi-format runs |
| `CLAUDE.md`                                                        | +2 rows in Key Config Files table (new skills)                                        |
| `README.md`                                                        | +2 rows in the skill table                                                            |

Already present, unmodified: `docs/superpowers/specs/2026-07-19-hubspot-gap-closure-design.md`, this plan file, `_shared/storytelling-frameworks.md`, `_shared/persuasion-principles.md`, all other existing skill files.

---

## Task 1: `cc-content-humanize` skill

Deliverable: a new skill that takes any draft (pasted or file path) and produces a rewrite with AI "tells" removed, calibrated to the loaded brand voice (spec §2).

**Files:**

- Create: `plugins/cc-content/skills/cc-content-humanize/SKILL.md`
- Reference (read for shape, do not modify): `plugins/cc-content/skills/cc-content-text/SKILL.md` (Steps 0–1 context-loading pattern, Step 8's em-dash check to generalize from, Step 10's feedback pattern)

**Interfaces:**

- Consumes: a pasted draft or `$ARGUMENTS` file path; the `## Context files` table's brand-voice row.
- Produces: a two-part delimited output (marker counts, then rewritten text) — no other task consumes this skill's output directly.

- [ ] **Step 1: Write the SKILL.md frontmatter**

```markdown
---
name: cc-content-humanize
description: >
  Use this skill to remove AI "tells" from an existing draft and make it read as
  human-written, calibrated to the project's brand voice. Invoke when the user says
  "humanize this", "make this sound less AI", "remove AI tells from this", "this
  reads like ChatGPT wrote it", "polish this draft to sound human", or pastes a
  draft and asks for a more authentic-sounding version. Works on drafts from any
  source — the owner's own writing, another tool's output, or a previous cc-content
  skill's draft. Do NOT use it to generate new content from scratch; it only revises
  an existing draft.
allowed-tools: Read, Write, Bash
argument-hint: "[optional: path to the draft to humanize]"
---
```

- [ ] **Step 2: Write the skill body — intro and Steps 0–1**

Write the following content, in order:

```markdown
# Humanize Skill

You are helping the owner remove AI "tells" from an existing draft and produce a
version that reads as genuinely human-written, calibrated to the company's brand
voice. This skill takes **any** draft regardless of origin — it is not limited to
drafts produced by other `cc-content` skills.

This skill is **format-, language-, industry-, and audience-neutral**. It carries the
detection and rewrite craft below but calibrates every stylistic choice to the loaded
brand voice — a formal-voice project and a casual-voice project get different
rewrites of the same input.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently. Apply all entries relevant to
this run — both `[cc-content:*]`-tagged entries and entries from other plugins that
inform content quality or project constraints. Do not announce this step. If the
file is absent, continue normally.

## Step 1: Load context

Read the context table from all loaded CLAUDE.md files:

\`\`\`bash
grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
\`\`\`

CLAUDE.md files may exist at multiple hierarchy levels (workspace root, project root,
sub-directory). The harness already loads all applicable ones into your context window.
If multiple `## Context files` tables exist, rows from more specific CLAUDE.md files
take precedence over less specific ones.

**If no context table is found** in any loaded CLAUDE.md, ask once:

> "I don't see any context files registered. Would you like to:
> (a) Pause and run `/cc-content-onboarding` to set up context
> (b) Continue without project context (humanization will use generic style choices)"

Stop if (a); note "generating without project context" and continue if (b).

**If a context table exists**, read every file listed in the **File** column, and
identify which one covers **brand voice** (writing style, tone, vocabulary, phrasing
rules, things to avoid) by matching against each file's **Summary** entry — this is
the **only** need this skill gates on. Organization background, audience, and output
language are noted silently if present and **never block** — humanization revises
style, not substance, so it doesn't need them to do its job.

**Coverage gap — brand voice:**

If no loaded file plausibly covers brand voice, ask once:

> "I don't see any writing style or brand voice context. Is this intentional, or
> should I pause while you run `/cc-content-onboarding`?"
>
> - **Intentional**: note the gap; label the output `⚠ DEGRADED OUTPUT — no brand voice context` and fall back to generic human-writing conventions (varied rhythm, contractions, concrete detail) without a specific tone target.
> - **Pause**: direct the owner to onboarding and stop.
```

- [ ] **Step 3: Write the skill body — Steps 2–4 (get draft, detect, rewrite)**

Append, in order:

```markdown
## Step 2: Get the draft

Resolve the draft to humanize, in this order:

1. If the owner passed a file path as an argument (`$ARGUMENTS`), read it.
2. If the owner pasted text in the request, use that.
3. If neither, ask: _"Paste the draft you want humanized, or give me a file path."_

## Step 3: Detect AI markers (Pass 1)

Scan the draft for these markers and count each type:

- **Em-dash parentheticals** — insertions set off by "–" or "—".
- **Overused transitions** — "Moreover," "Furthermore," "In today's world," and
  similar formulaic connectors.
- **Formulaic structure** — a rigid intro–3 points–conclusion shape with no
  variation.
- **Generic AI phrases** — "dive into," "unlock," "elevate," "transform," unless the
  loaded brand voice explicitly uses these terms as part of its established
  vocabulary.
- **Excessive colons/semicolons** — used as a crutch for list-like sentences instead
  of natural prose.
- **Too-perfect parallel structure** — every sentence in a passage sharing the exact
  same grammatical shape.
- **Hedge words** — "arguably," "potentially," "seemingly," used to soften claims
  without adding information.

Present the counts and one brief example per marker type found, **before**
rewriting — the owner should see the diagnosis first.

## Step 4: Rewrite (Pass 2)

Produce the rewritten draft. Rules:

1. **Preserve every factual claim and the original structure's intent.** This is a
   style pass, not a content rewrite — do not add, remove, or change what the draft
   asserts.
2. **Remove every marker counted in Step 3.** None should remain in the output.
3. **Calibrate reintroduced human texture to the loaded brand voice:**
   - If the brand voice allows casualness: use contractions, allow sentences to
     start with "And" or "But" where it reads naturally, vary sentence rhythm (mix
     short punchy sentences with longer natural ones), replace vague time references
     with concrete ones ("last Tuesday" instead of "recently"), and use specific
     detail in place of generic examples.
   - If the brand voice is formal: keep contractions and casual openers out, but
     still vary sentence rhythm, replace vague generalities with specific detail, and
     remove the same AI markers — formality and human-sounding prose are not
     opposites.
   - If no brand voice is loaded (degraded per Step 1): default to varied rhythm,
     concrete detail, and marker removal only — do not guess a tone.
4. **Intervene as much as necessary but as little as possible.** Preserve what
   already works in the draft; change only what a marker-removal or tone-calibration
   rule requires.
```

- [ ] **Step 4: Write the skill body — Steps 5–6 (output, feedback)**

Append, in order:

```markdown
## Step 5: Delimited output

\`\`\`
─────────────────────────────────────────────
AI markers detected
─────────────────────────────────────────────
<marker type>: <count> — <brief example from the draft>
[one line per marker type found; omit types with zero occurrences]
─────────────────────────────────────────────
Humanized draft
─────────────────────────────────────────────
<the rewritten text only — no preamble, no commentary inside the block>
─────────────────────────────────────────────
\`\`\`

If the output is degraded (no brand voice context), prepend:

\`\`\`
⚠ DEGRADED OUTPUT — generated without brand voice context; used generic
human-writing conventions only
\`\`\`

## Step 6: Feedback

**Auto-store phase.** Before asking for feedback, review this run. For each
qualifying observation, append one tagged line to `.claude/learnings.md` (create with
the standard header if missing):

\`\`\`text
[cc-content:cc-content-humanize] <concise observation> — <YYYY-MM-DD>
\`\`\`

Qualifies: humanization preferences not already in any loaded context file or
`CLAUDE.md` (e.g. "owner always wants contractions even in the formal-voice
project"); corrections the owner made to the rewritten draft; project-specific
facts that would change future humanization passes.

Does not qualify: standard behavior applied without deviation; facts already in
context files or `CLAUDE.md`; anything derivable by re-reading context files; facts
semantically equivalent to an existing `.claude/learnings.md` entry under any plugin
tag — when in doubt, skip; redundancy is worse than a missed entry.

Check for the file before appending:

\`\`\`bash
ls .claude/learnings.md 2>/dev/null && echo "exists" || echo "missing"
\`\`\`

Standard header when creating the file:

\`\`\`markdown

# Learnings

Corrections and feedback collected during content sessions.
Entries are tagged by skill and dated.

---

\`\`\`

**Explicit feedback.** After the auto-store phase, ask:

> "Did this humanized version work for you? Any corrections or notes for future
> passes — or press Enter to finish."

- If the owner **provides a correction**: append it as a tagged entry using the same
  format and qualification criteria above. Confirm: "✓ N learning(s) saved to
  `.claude/learnings.md`."
- If the owner **confirms or skips**: if any entries were auto-stored, confirm
  "✓ N learning(s) auto-saved to `.claude/learnings.md`." Then exit. If nothing was
  stored, exit directly.
```

- [ ] **Step 5: Verify frontmatter and key markers**

Run:

```bash
f=plugins/cc-content/skills/cc-content-humanize/SKILL.md
python3 - "$f" <<'PY'
import sys, yaml
meta = yaml.safe_load(open(sys.argv[1]).read().split('---')[1])
assert meta['name'] == 'cc-content-humanize', meta.get('name')
assert 'allowed-tools' in meta
print("frontmatter OK")
PY
grep -q -i 'em-dash' "$f" && grep -q -i 'hedge words' "$f" && echo "detection list OK"
grep -q -i 'preserve every factual claim' "$f" && echo "style-only constraint OK"
grep -q -i 'brand voice' "$f" && grep -q -i 'never block' "$f" && echo "gating OK"
grep -q -i '\[cc-content:cc-content-humanize\]' "$f" && echo "learnings tag OK"
```

Expected: `frontmatter OK`, `detection list OK`, `style-only constraint OK`,
`gating OK`, `learnings tag OK`.

- [ ] **Step 6: Commit**

```bash
git add plugins/cc-content/skills/cc-content-humanize/SKILL.md
git commit -m ":sparkles: feat(cc-content): add humanize skill"
```

---

## Task 2: `cc-content-performance-review` skill

Deliverable: a new skill that reasons over owner-pasted performance data for one or more content pieces, identifies structural/tonal patterns, and produces iteration variants (spec §3).

**Files:**

- Create: `plugins/cc-content/skills/cc-content-performance-review/SKILL.md`
- Reference (read for shape, do not modify): `plugins/cc-content/skills/_shared/storytelling-frameworks.md`, `plugins/cc-content/skills/_shared/persuasion-principles.md` (vocabulary this skill reuses for pattern-naming)
- Reference (read for shape, do not modify): `plugins/cc-content/skills/cc-content-ideation/SKILL.md` (Step 4's "offer next step, don't auto-draft" pattern)

**Interfaces:**

- Consumes: pasted content pieces + performance data or `$ARGUMENTS` file path; `_shared/storytelling-frameworks.md` and `_shared/persuasion-principles.md` vocabulary.
- Produces: a delimited pattern summary + iteration variants; no other task consumes this directly.

- [ ] **Step 1: Write the SKILL.md frontmatter**

```markdown
---
name: cc-content-performance-review
description: >
  Use this skill to analyze how one or more published content pieces performed and
  generate concrete iteration variants for the next piece. Invoke when the user says
  "review how this post performed", "analyze content performance", "what worked in
  these posts", "help me iterate on this based on the numbers", or pastes performance
  data (impressions, engagement rate, CTR, conversions) alongside a piece and asks
  what to do next. Works from whatever data the owner supplies — there is no
  analytics API integration. Do NOT use it to evaluate whether a positioning claim,
  channel allocation, or campaign goal was validated — that is a strategic-level
  question for cc-concept-performance-review, not this skill.
allowed-tools: Read, Write, Bash
argument-hint: "[optional: path to a file with performance notes]"
---
```

- [ ] **Step 2: Write the skill body — intro and Steps 0–1**

```markdown
# Content Performance Review Skill

You are helping the owner understand why one or more content pieces performed the way
they did, and turn that understanding into concrete next-piece variants. This skill
looks at **structural and tonal patterns within and across individual content
pieces** — it is deliberately narrower than a strategic review: it never evaluates
whether a positioning claim or channel allocation was validated (that's
`cc-concept-performance-review`, a different plugin's skill, at a different altitude).

This skill reasons only over data the owner supplies — pasted metrics, notes, or
observations. There is no live analytics integration.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently. Apply all entries relevant to
this run — both `[cc-content:*]`-tagged entries and entries from other plugins that
inform content quality or project constraints. Do not announce this step. If the
file is absent, continue normally.

## Step 1: Load context

Read the context table from all loaded CLAUDE.md files:

\`\`\`bash
grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
\`\`\`

**If no context table is found**, ask once:

> "I don't see any context files registered. Would you like to:
> (a) Pause and run `/cc-content-onboarding` to set up context
> (b) Continue without project context (iteration variants will use generic style choices)"

Stop if (a); note "generating without project context" and continue if (b).

**If a context table exists**, identify which file covers **brand voice** — the
**only** need this skill gates on, since Step 4's iteration variants need it to stay
on-voice. Organization background and audience are noted silently if present and
never block.

**Coverage gap — brand voice:**

If no loaded file plausibly covers brand voice, ask once:

> "I don't see any writing style or brand voice context. Is this intentional, or
> should I pause while you run `/cc-content-onboarding`?"
>
> - **Intentional**: note the gap; label the output `⚠ DEGRADED OUTPUT — no brand voice context`.
> - **Pause**: direct the owner to onboarding and stop.
```

- [ ] **Step 3: Write the skill body — Steps 2–4 (gather, identify patterns, generate variants)**

```markdown
## Step 2: Gather the pieces and their data

For each piece under review, collect:

1. **The content itself** — pasted text, a file path, or (if unavailable) a brief
   summary the owner provides.
2. **Performance data** — whatever the owner has: impressions, engagement rate, CTR,
   conversions, or qualitative notes (e.g. "comments kept mentioning X").

If nothing is provided yet, ask:

> "Paste the piece(s) and whatever performance numbers or notes you have —
> impressions, engagement rate, CTR, conversions, or just qualitative observations."

If the owner has only numbers and no content, proceed with data-only analysis and
note that limitation in the output.

## Step 3: Identify patterns

Compare pieces against each other (if 2 or more are provided) or against stated
expectations (if only 1 is provided). For each piece, note which storytelling
framework (`../_shared/storytelling-frameworks.md`) and persuasion principles
(`../_shared/persuasion-principles.md`) it used, if identifiable.

Name the structural/tonal elements correlated with **stronger** results — e.g. "the
two top-performing posts both used PAS with a Loss-Aversion opener." Name the
elements correlated with **weaker** results the same way.

**Do not fabricate a pattern from a single data point.** If there isn't enough
evidence to generalize (e.g. only one piece with no comparison, or metrics too close
to distinguish), say so explicitly rather than naming a pattern anyway.

## Step 4: Generate iteration variants

Produce **2–3 short concept-level variants** (not full drafts) for the next piece.
Each variant:

- **Keeps** the winning elements identified in Step 3.
- **Changes exactly one thing** — a different hook trigger, a different framework, a
  different persuasion principle — so results stay attributable to that one change.

After presenting the variants, offer the next step:

> "Want me to turn one of these into a finished draft? Tell me the number and the
> format. If a dedicated skill fits the format (e.g. a blog article or LinkedIn
> post), I'll route you to it for a better result; otherwise I'll use the general
> text skill (`/cc-content-text`)."

Do not auto-draft. Wait for the owner to choose.
```

- [ ] **Step 4: Write the skill body — Steps 5–6 (output, feedback)**

```markdown
## Step 5: Delimited output

\`\`\`
─────────────────────────────────────────────
Performance review — <N> piece(s)
─────────────────────────────────────────────
Winning elements: <list, with evidence>
Weak elements: <list, with evidence>
Confidence: <note if evidence is too thin to generalize, or omit if solid>
─────────────────────────────────────────────
Iteration variants for next piece
─────────────────────────────────────────────
Variant 1: <what's kept> / <the one thing changed>
Variant 2: <what's kept> / <the one thing changed>
[Variant 3, if applicable]
─────────────────────────────────────────────
\`\`\`

If the output is degraded (no brand voice context), prepend:

\`\`\`
⚠ DEGRADED OUTPUT — generated without brand voice context
\`\`\`

## Step 6: Feedback

**Auto-store phase.** Before asking for feedback, review this run. For each
qualifying observation, append one tagged line to `.claude/learnings.md` (create with
the standard header if missing):

\`\`\`text
[cc-content:cc-content-performance-review] <concise observation> — <YYYY-MM-DD>
\`\`\`

Qualifies: performance patterns not already in any loaded context file or
`CLAUDE.md` (e.g. "audience consistently engages more with concrete numbers in the
hook"); corrections the owner made to the identified patterns; project-specific
facts that would change future reviews.

Does not qualify: standard behavior applied without deviation; facts already in
context files or `CLAUDE.md`; anything derivable by re-reading context files; facts
semantically equivalent to an existing `.claude/learnings.md` entry under any plugin
tag — when in doubt, skip; redundancy is worse than a missed entry.

Check for the file before appending:

\`\`\`bash
ls .claude/learnings.md 2>/dev/null && echo "exists" || echo "missing"
\`\`\`

Standard header when creating the file:

\`\`\`markdown

# Learnings

Corrections and feedback collected during content sessions.
Entries are tagged by skill and dated.

---

\`\`\`

**Explicit feedback.** After the auto-store phase, ask:

> "Does this analysis match your own read on why these pieces performed the way they
> did? Any corrections or notes for future reviews — or press Enter to finish."

- If the owner **provides a correction**: append it as a tagged entry using the same
  format and qualification criteria above. Confirm: "✓ N learning(s) saved to
  `.claude/learnings.md`."
- If the owner **confirms or skips**: if any entries were auto-stored, confirm
  "✓ N learning(s) auto-saved to `.claude/learnings.md`." Then exit. If nothing was
  stored, exit directly.
```

- [ ] **Step 5: Verify frontmatter and key markers**

Run:

```bash
f=plugins/cc-content/skills/cc-content-performance-review/SKILL.md
python3 - "$f" <<'PY'
import sys, yaml
meta = yaml.safe_load(open(sys.argv[1]).read().split('---')[1])
assert meta['name'] == 'cc-content-performance-review', meta.get('name')
assert 'allowed-tools' in meta
print("frontmatter OK")
PY
grep -q -i 'no live analytics integration' "$f" && echo "no-API constraint OK"
grep -q -i 'do not fabricate a pattern' "$f" && echo "thin-evidence constraint OK"
grep -q -i 'changes exactly one thing' "$f" && echo "isolated-variable constraint OK"
grep -q -i 'different altitude' "$f" && echo "cc-concept differentiation OK"
grep -q -i '\[cc-content:cc-content-performance-review\]' "$f" && echo "learnings tag OK"
```

Expected: `frontmatter OK`, `no-API constraint OK`, `thin-evidence constraint OK`,
`isolated-variable constraint OK`, `cc-concept differentiation OK`, `learnings tag OK`.

- [ ] **Step 6: Commit**

```bash
git add plugins/cc-content/skills/cc-content-performance-review/SKILL.md
git commit -m ":sparkles: feat(cc-content): add performance-review skill"
```

---

## Task 3: `cc-content-text` atomization mode

Deliverable: `cc-content-text` detects multi-format repurposing requests and drafts one variant per target format from a single core message, routing formats with a dedicated skill exactly as it does today (spec §4).

**Files:**

- Modify: `plugins/cc-content/skills/cc-content-text/SKILL.md`

**Interfaces:**

- Consumes: the existing skill's Steps 1, 2 (routing), 4–9 — reused per format in atomization mode.
- Produces: no other task depends on this.

- [ ] **Step 1: Read the current file to get exact line anchors**

```bash
grep -n '^## Step' plugins/cc-content/skills/cc-content-text/SKILL.md
```

Use the reported line numbers to place the new Step 1.5 precisely between the
existing `## Step 1: Load context` block and `## Step 2: Identify the format and
route correctly`.

- [ ] **Step 2: Insert Step 1.5 (atomization detection)**

Insert this new section immediately after the end of `## Step 1: Load context`
(after its last line, `Proceed to Step 2.` if present, or the coverage-gap handling
if that line differs) and before `## Step 2: Identify the format and route
correctly`:

```markdown
## Step 1.5: Detect atomization requests

If the owner's request names **2 or more target formats**, or explicitly asks to
"repurpose," "atomize," or "turn this into multiple formats," switch to **atomization
mode** for the rest of this run. Otherwise, proceed to Step 2 in normal single-format
mode.

**In atomization mode:**

> "Which formats do you want this in? (e.g. LinkedIn post, Twitter/X thread,
> newsletter, blog post, email) I'll draft each from the same core message."

Collect the target format list. Then run **Step 2's Tier A/B/C routing separately for
each format** in the list — a format with a dedicated skill (Tier A) is routed away
exactly as it would be for a single-format request; only formats without a dedicated
skill and without one the owner explicitly overrides continue through this skill's
own drafting steps (5–9), once per remaining format.

Note which formats were routed away and which remain, for the final summary in
Step 9.
```

- [ ] **Step 3: Adjust Step 4 for atomization mode**

Find the existing `## Step 4: Get the content idea, audience, and length target`
section. Immediately after its heading line, insert this paragraph (before the
existing "If the owner has not said..." content):

```markdown
**In atomization mode:** ask for the content idea, audience, and any core proof
points **once**, not once per format. The core message, key value proposition, and
proof points must stay identical across every format produced in this run — only
structure, length, and tone vary per format's own conventions (handled in Steps 5–9
below, run separately per format).
```

- [ ] **Step 4: Adjust Step 9 for atomization mode**

Find the existing `## Step 9: Present the text` section (verify the exact heading via
`grep -n '^## Step 9' plugins/cc-content/skills/cc-content-text/SKILL.md` — Step
numbering must match the file as it exists after Task 3 Step 1's inspection). Insert
this paragraph immediately after the section's heading line, before the existing
delimited-block instructions:

```markdown
**In atomization mode:** present each drafted format (i.e. every format that was not
routed to a dedicated skill in Step 1.5) in its own delimited block using the format
below, in sequence. After all blocks, add a one-line routing summary listing every
format and where it ended up, e.g.: "LinkedIn → routed to `/cc-content-linkedin-post`;
drafted here: newsletter, Twitter/X thread."
```

- [ ] **Step 5: Adjust Step 10 (feedback) for atomization mode**

Find the existing `## Step 10: Feedback` section. Insert this sentence immediately
after its heading line, before the existing "Auto-store phase" content:

```markdown
**In atomization mode:** run this feedback step once for the whole batch of drafted
formats, not once per format — the same tag and qualification rules apply to the
batch as a whole.
```

- [ ] **Step 6: Verify the insertions**

Run:

```bash
f=plugins/cc-content/skills/cc-content-text/SKILL.md
grep -q '^## Step 1.5: Detect atomization requests' "$f" && echo "Step 1.5 present"
grep -q 'atomization mode' "$f" && echo "atomization mode referenced"
grep -q 'core message, key value proposition, and' "$f" && echo "Step 4 constant-message rule present"
grep -q 'routing summary listing every' "$f" && echo "Step 9 summary rule present"
grep -q 'once for the whole batch' "$f" && echo "Step 10 batch rule present"
python3 - "$f" <<'PY'
import sys, yaml
meta = yaml.safe_load(open(sys.argv[1]).read().split('---')[1])
assert meta['name'] == 'cc-content-text', meta.get('name')
print("frontmatter unchanged OK")
PY
```

Expected: `Step 1.5 present`, `atomization mode referenced`, `Step 4 constant-message
rule present`, `Step 9 summary rule present`, `Step 10 batch rule present`,
`frontmatter unchanged OK`.

- [ ] **Step 7: Commit**

```bash
git add plugins/cc-content/skills/cc-content-text/SKILL.md
git commit -m ":sparkles: feat(cc-content): add atomization mode to cc-content-text"
```

---

## Task 4: README and CLAUDE.md registration, fixture verification

Deliverable: both new skills are discoverable in `README.md`'s skill table and
registered in `CLAUDE.md`'s Key Config Files table with real descriptions (no `TODO`
placeholder); all six fixtures from the design doc (spec §6) pass with the skills
invoked for real. This is the final task — no further tasks follow.

**Files:**

- Modify: `README.md` (skill table)
- Modify: `CLAUDE.md` (table rows added by the pre-commit sync hook; pre-populate
  descriptions before committing)

**Interfaces:**

- Consumes: the files committed in Tasks 1–3.

- [ ] **Step 1: Add both new skills to README.md's skill table**

Open `README.md`, find the table under `## Plugin: cc-content`, and add two rows
(matching the existing table's column alignment — `prettier` will realign it),
inserted after the `cc-content-samples-curation` row and before
`cc-content-session-wrap` (or wherever fits the existing ordering best):

```markdown
| `/cc-content-humanize` | Removes AI "tells" from an existing draft and rewrites it to read as human-written, calibrated to your brand voice |
| `/cc-content-performance-review` | Analyzes how published pieces performed from data you paste in, and generates iteration variants for the next piece |
```

- [ ] **Step 2: Pre-populate the CLAUDE.md rows before the sync hook runs**

Open `CLAUDE.md`, find the `## Key Config Files` table, and add these two rows:

```markdown
| `plugins/cc-content/skills/cc-content-humanize/SKILL.md` | Skill: Remove AI tells from a draft and rewrite it to sound human, on-brand-voice |
| `plugins/cc-content/skills/cc-content-performance-review/SKILL.md` | Skill: Analyze content performance data and generate iteration variants |
```

Also update the existing `plugins/cc-content/skills/cc-content-text/SKILL.md` row's
description to mention the new capability:

```markdown
| `plugins/cc-content/skills/cc-content-text/SKILL.md` | Skill: Draft text for any format without a dedicated skill; supports multi-format atomization |
```

Also update the `## Skills` table further down in `CLAUDE.md` the same way (add two
new rows; update the `cc-content-text` row's purpose column).

- [ ] **Step 3: Commit — verify no TODO rows remain**

```bash
git add README.md CLAUDE.md
git commit -m ":memo: docs(cc-content): register humanize, performance-review, and atomization mode"
grep -c 'TODO: add description' CLAUDE.md || echo "0 TODO rows OK"
```

Expected: the pre-commit hook's `sync-config-table` output reports either "no
changes" or an update that preserves your descriptions; `0 TODO rows OK` printed
after commit.

- [ ] **Step 4: Fixture A — humanize detects and removes markers**

Manual, human-in-the-loop. Feed `/cc-content-humanize` a draft containing 3+ em-dash
parentheticals and 2+ generic AI phrases ("unlock," "elevate").
Expected: Pass 1 reports accurate counts; Pass 2's output contains none of the
detected markers; every factual claim from the input survives in the output.
Fails if: any counted marker still appears in the rewritten output, or a factual claim
is dropped or altered.

- [ ] **Step 5: Fixture B — humanize respects brand voice**

Manual. Run `/cc-content-humanize` twice against the same draft with two different
loaded brand-voice contexts (one formal, one casual).
Expected: the casual-voice run introduces contractions and/or sentence-initial
"And"/"But"; the formal-voice run does not, even though both runs remove the same AI
markers.
Fails if: both runs produce stylistically identical output regardless of the loaded
voice.

- [ ] **Step 6: Fixture C — performance-review with two pieces**

Manual. Provide `/cc-content-performance-review` two LinkedIn posts with engagement
numbers where one clearly outperforms the other, both using named frameworks from
`_shared/storytelling-frameworks.md`.
Expected: the winning framework/hook pattern is named with evidence; each iteration
variant changes exactly one variable from the winning piece.
Fails if: no framework/pattern is named, or a variant changes more than one thing at
once.

- [ ] **Step 7: Fixture D — performance-review with thin evidence**

Manual. Provide `/cc-content-performance-review` a single piece with no comparison
point.
Expected: the skill explicitly flags that the evidence is too thin to generalize a
pattern, rather than fabricating one.
Fails if: the skill states a confident pattern from a single data point.

- [ ] **Step 8: Fixture E — atomization routes correctly**

Manual. Ask `/cc-content-text` to "turn this announcement into a LinkedIn post, a
Twitter thread, and a newsletter."
Expected: LinkedIn is routed to `/cc-content-linkedin-post` per Step 1.5/Tier A; the
thread and newsletter are drafted inline, each with its own framework choice; the
final summary line correctly reports the routing.
Fails if: LinkedIn is drafted inline instead of routed, or the summary line is
missing or wrong.

- [ ] **Step 9: Fixture F — atomization keeps the core message constant**

Manual. In Fixture E's run, verify the same value proposition and proof points appear
(adapted in length/structure only) in both the drafted thread and the drafted
newsletter.
Fails if: the two drafted formats assert materially different value propositions or
proof points.

- [ ] **Step 10: Record fixture results**

After running Steps 4–9, note pass/fail for each in the session summary. Any failure
is a defect in Task 1, 2, or 3's skill file — fix there and re-run, do not paper over
in the plan. Once all six fixtures pass, this plan is complete.

---
