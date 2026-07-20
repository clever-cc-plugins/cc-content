---
name: cc-content-atomize
description: >
  Use this skill to repurpose one core message across multiple content formats in a
  single run — e.g. turning a campaign brief or a single piece into a LinkedIn post,
  newsletter, and blog post at once, each properly adapted to its own conventions
  while keeping the core claim and proof points identical. Invoke when the user
  names 2+ target formats, says "repurpose this," "atomize this," "turn this into
  multiple formats," or when a brief.md is present and the user wants it distributed
  across channels. For a single format, use the dedicated format skill (e.g.
  cc-content-blog-article) or cc-content-text instead — this skill is for the
  fan-out case specifically.
allowed-tools: Read, Write, Bash
argument-hint: "[optional: path to campaign briefing; defaults to brief.md if present]"
---

@../\_shared/storytelling-frameworks.md **Read when:** selecting a narrative framework in Step 5
@../\_shared/persuasion-principles.md **Read when:** selecting persuasion principles in Step 6

# Distribution Engine (Atomization) Skill

Takes one core message — either a `brief.md` campaign handoff or a manually
described idea — and produces properly-adapted drafts for every named format in a
single run, keeping the core claim and proof points identical across all of them
while letting structure, length, and tone vary per format's own conventions.

**Key principle (from research):** fix the facts, vary the frame. The specific
claim, statistics, named proof points, product/entity names, and quoted figures
must stay **byte-identical** across every atomized piece; structure, length, hook,
opening, tone, CTA, and formatting must be **rewritten per platform** to match its
native conventions. This skill enforces that separation to prevent "copy-paste
repurposing" — a truncated blog dumped onto LinkedIn — which audiences and
algorithms both punish.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently, `[cc-content:*]` tags plus any
cross-plugin entries relevant to distribution/repurposing. Never announce.

## Step 1: Load context

Read the context table from all loaded CLAUDE.md files:

```bash
grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
```

CLAUDE.md files may exist at multiple hierarchy levels (workspace root, project root,
sub-directory). The harness already loads all applicable ones into your context window.
If multiple `## Context files` tables exist, rows from more specific CLAUDE.md files
take precedence over less specific ones.

**If no context table is found** in any loaded CLAUDE.md, ask once:

> "I don't see any context files registered. Would you like to:
> (a) Pause and run `/cc-content-onboarding` to set up context
> (b) Continue without project context (output will be generic)"

Stop if (a); note "generating without project context" and continue if (b).

**If a context table exists**, read every file listed in the **File** column.

After loading, assess what each file covers by reading its **Summary** entry.
Map the loaded files to these content needs:

| Need                    | What to look for in the Summary                                  |
| ----------------------- | ---------------------------------------------------------------- |
| Brand voice             | Writing style, tone, vocabulary, phrasing rules, things to avoid |
| Organization background | Who the company/author is, products, positioning, mission        |
| Target audience         | Reader personas, goals, challenges, job titles                   |
| Output language         | Default language, locale, or region                              |
| Format rules            | Best practices / structure / length for a specific output format |

**When multiple files plausibly cover the same need**, pick the one whose Summary
best fits this specific task. For example, if one brand-voice file is "casual —
employer branding" and another is "formal — corporate communications", and this is
for LinkedIn promotion, load the more casual one and note the choice.

**Coverage gaps — flag these two:**

If no loaded file plausibly covers **brand voice**, ask once:

> "I don't see any writing style or brand voice context. Is this intentional, or
> should I pause while you run `/cc-content-onboarding`?"
>
> - **Intentional**: note the gap; label output `⚠ DEGRADED OUTPUT — no brand voice context`
> - **Pause**: direct the owner to onboarding and stop.

Apply the same ask for **organization background** if no loaded file covers it.

For absent audience or language: note silently and continue.

## Step 2: Resolve the format list and the core message source

Check for `brief.md` in the working directory first:

```bash
ls brief.md 2>/dev/null && echo "found" || echo "missing"
```

- **Found:** read it. If it names a channel mix (as `cc-concept-campaign-concept`'s
  and `cc-concept-gtm`'s output does), propose that list as the target formats and
  ask the owner to confirm or adjust before continuing.
- **Missing:** ask: "Which formats do you want this in? (e.g. LinkedIn post,
  newsletter, blog post) I'll draft each from the same core message." Then ask for
  the core message/idea directly, same prompt `cc-content-text` uses today.

## Step 3: Get the content idea, audience, and length target

Ask for the content idea, audience, and any core proof points **once**, not once
per format. The core message, key value proposition, and proof points must stay
identical across every format produced in this run — only structure, length, and
tone vary per format's own conventions (handled in Steps 4–9 below, run separately
per format).

If the owner has not said what the text should be about, ask:

> "What should this text say? Describe the content idea or key message, or paste raw
> notes and I'll shape them into the finished <format>."

Then settle anything still open that materially shapes the draft:

- **Output language:** write the finished text in the language specified by loaded
  context — **even when an inspiration article is in another language** (an English
  source does not make a German-default project's text English). Only if no output
  language is in context, fall back to the language of the owner's request.
- **Audience:** if the loaded audience context has more than one persona, infer which
  one(s) this text targets and confirm in one line. If audience context is absent and
  the owner hasn't said, ask only if it would change the draft meaningfully.
- **Core proof points & constraints:** if the owner names specific facts, statistics,
  or claims that must appear in every format, note them explicitly — this is the
  "substance layer" that stays byte-identical across all formats per the research.

## Step 4–9: Run per-format routing and drafting loop

For each format in the confirmed format list:

### Step 4: Identify the format and route correctly (per format)

First, settle on the **requested output format** for this iteration. (If the owner
has not named each clearly, they should have in Step 2's format list.)

Once you know the format, work through three tiers **in order**:

#### Tier A — A dedicated skill exists for this format → route away

Some formats have their own dedicated skill that applies format-specific best
practices this skill does not. Using this skill for them produces weaker results.

**How to check:** look at the skills available in this session (your available-skills
list). The cc-content plugin ships dedicated skills for some formats — for example
blog articles (`cc-content-blog-article`) and LinkedIn posts (`cc-content-linkedin-post`)
— and **the project may have added its own** dedicated skills for other formats. Do
**not** rely on a hardcoded list; judge from the skills actually available whether any
one's purpose squarely covers the requested format.

**If a dedicated skill covers the format:**

Tell the owner: "The format **<format>** has a dedicated skill — `/<skill-name>` —
which applies format-specific best practices. I'll route this format there and
draft the remaining formats here. (You can always run `/<skill-name>` standalone
later if you want to adjust the <format> version independently.)"

Then **stop drafting this format here**; it's handled by the dedicated skill.
Note which formats are routed away for the final summary in Step 9.

#### Tier B — No dedicated skill, but a format-guideline file is registered → load it

From the context files you loaded in Step 1, check whether any file's Summary covers
**best practices, structure, or length for the requested format** (e.g. a whitepaper
guideline, e-mail best-practices, newsletter guideline, webinar guideline). If one
exists, treat it as **authoritative** for this format: load it, and follow its rules
on length, structure, mandatory sections, and conventions. Note: "Format rules loaded
from `<file>`."

#### Tier C — Neither → use your own best practices

If no dedicated skill and no registered guideline cover the format, draft using your
own knowledge of current best practices for that format — appropriate length,
structure, and conventions for the channel. Note: "No project guideline for <format>;
using general best practices."

### Step 5: Select a storytelling framework (per format)

Read `../_shared/storytelling-frameworks.md` and follow its selection process. Apply
the chosen framework as the **structural spine** of the text for **this format**,
where it fits (a press release and a webinar abstract use structure differently than
a narrative email). Where the SPIN logic (Situation → Problem → Implication →
Need-Payoff) fits the task, let it shape the argument's progression. Note the choice
in working notes — e.g. "Using **PAS** as the spine; SPIN progression for the body."

### Step 6: Select persuasion principles (per format)

Read `../_shared/persuasion-principles.md` and follow its selection process. Pick
**1–3 principles** that fit the goal and the reader's state, plus a pre-suasive opener
strategy. Layer them naturally into the prose — not as labeled callouts. Note the
choice — e.g. "Using **Authority + Social Proof**; opener primes credibility."

### Step 7: Draft (pass 1, per format)

Write the text in the output language as a **creative, expressive** finished piece for
**this format specifically**. Hold to these rules:

1. **Keep the core message fixed, adapt the frame.** The specific claim, statistics,
   named proof points, product/entity names, and quoted figures from Step 3 must
   appear unchanged. Everything else — hook, structure, length, tone, CTA, formatting
   — is **rewritten for this platform's native conventions** (per research findings).
2. **Connect to the organization.** Tie the content idea to the organization's
   products, services, and experience — but keep it subtle. Avoid overt
   self-promotion; the connection should read as relevance, not advertising.
3. **Offer original value.** Go beyond the facts of the core message — add a
   framing, application, or insight tailored to **this format's audience**.
4. **Use the brand voice.** Follow the loaded brand-voice context closely; you are
   writing _as_ the organization.
5. **Apply SPIN where it fits.** Let Situation → Problem → Implication → Need-Payoff
   shape the structure when the task suits it.
6. **Honor format best practices.** Apply the Tier-B guideline (if loaded) or your own
   best practices for **this format's** length, structure, and conventions.
7. **Aim at this format's audience.** Shape content, structure, tone, and CTA for the
   confirmed persona(s) and platform.

### Step 8: Self-edit (pass 2, per format)

Now read your pass-1 draft **sentence by sentence** and revise it. Intervene **as
much as necessary but as little as possible** — preserve what works.

Check and fix:

1. **Factual errors and ambiguous phrasing.** Correct statements that are wrong or
   that a reader could reasonably misread. If a fix would require heavy rewriting,
   cut the passage instead — as long as removing it doesn't break what follows.
2. **Unsupported claims about the organization.** Every reference to the org's
   products, services, or experience must be traceable to the loaded context. If a
   claim isn't adequately supported, soften it, rephrase it, or remove it.
3. **Hype and over-dramatization.** The text should be opinionated and confident, but
   not sensational. Defuse exaggeration, clickbait phrasing, and manufactured drama.
4. **Style drift.** Bring any passage that drifts from the brand voice or the format
   guideline back into line — including new sentences you add while editing.
5. **AI tells — em-dash insertions.** Find parenthetical insertions set off by dashes
   ("–" or "—") and rewrite them as clean sentences so none of those enclosing dashes
   remain. This is a frequent, recognizable tell; removing it makes the text read as
   human-written.
6. **Substance layer verification:** confirm that the core claim, statistics, and
   proof points from Step 3 are still present and **unchanged**. If a platform's
   constraints force abbreviation of a statistic, that's OK as long as the number and
   meaning are preserved ("byte-identical" is practical, not literal).

If a Tier-B guideline specifies an optimal length, make sure the edited text uses the
full range rather than coming in thin.

## Step 9: Present all drafted formats

Present each drafted format (i.e. every format that was not routed to a dedicated
skill in Step 4) in its own delimited block using the format below, in sequence.
After all blocks, add a one-line routing summary.

Present the finished text in a clearly delimited block so the owner can copy it
cleanly:

```
─────────────────────────────────────────────
<format> draft
─────────────────────────────────────────────
<the finished text only — no preamble, no commentary inside the block>
─────────────────────────────────────────────
Format rules: <Tier-B file name | "general best practices">
Framework: <name> · Persuasion: <list>
Length: <count> <unit> (target: <range or "n/a">)
─────────────────────────────────────────────
```

The block must contain **only the deliverable text** — no introduction, no explanation.
Put any notes in the footer rows, not inside the text.

**Channel formatting:** if the text is for a **social-media post or any channel that
strips formatting**, do not use bold, italics, or their Markdown equivalents. Replace
bullet points with fitting emojis, and keep the body plain.

If the output is degraded (brand voice or organization context missing), prepend:

```
⚠ DEGRADED OUTPUT — generated without: <list of missing context>
```

**Routing summary:** after all format blocks, add one line listing every format and
where it ended up, e.g.: "Routed: LinkedIn → `/cc-content-linkedin-post`; Drafted
here: newsletter, Twitter/X thread."

## Step 10: Feedback

Run this feedback step once for the whole batch of drafted formats, not once per
format — the same tag and qualification rules apply to the batch as a whole.

**Auto-store phase.** Before asking for feedback, review this run. For each qualifying
observation, append one tagged line to `.claude/learnings.md` (create with the
standard header if missing):

```text
[cc-content:cc-content-atomize] <concise observation> — <YYYY-MM-DD>
```

Qualifies: content preferences or constraints not already in any loaded context file
or `CLAUDE.md`; corrections the owner made to the output; project-specific facts that
would change future output (e.g. "repurposing always targets these exact five
formats"); accepted/rejected deviations from best practices; observations about which
formats atomize well from the core message (relates to research findings on reliable
vs. unreliable format pairs).

Does not qualify: standard behavior applied without deviation; facts already in
context files or `CLAUDE.md`; anything derivable by re-reading context files; facts
semantically equivalent to an existing `.claude/learnings.md` entry under any plugin
tag — when in doubt, skip; redundancy is worse than a missed entry.

Check for the file before appending:

```bash
ls .claude/learnings.md 2>/dev/null && echo "exists" || echo "missing"
```

Standard header when creating the file:

```markdown
# Learnings

Corrections and feedback collected during content sessions.
Entries are tagged by skill and dated.

---
```

**Explicit feedback.** After the auto-store phase, ask:

> "Did this batch of formats meet expectations? Any corrections or notes for future
> atomization runs — or press Enter to finish."

- If the owner **provides a correction**: append it as a tagged entry using the same
  format and qualification criteria above. Confirm: "✓ N learning(s) saved to
  `.claude/learnings.md`."
- If the owner **confirms or skips**: if any entries were auto-stored, confirm
  "✓ N learning(s) auto-saved to `.claude/learnings.md`." Then exit. If nothing was
  stored, exit directly.
