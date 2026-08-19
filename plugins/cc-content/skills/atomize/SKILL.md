---
name: atomize
description: >
  Use this skill to repurpose one core message across multiple content formats in a
  single run — e.g. turning a campaign brief or a single piece into a LinkedIn post,
  newsletter, and blog post at once, each properly adapted to its own conventions
  while keeping the core claim and proof points identical. Invoke when the user
  names 2+ target formats, says "repurpose this," "atomize this," "turn this into
  multiple formats," or when a brief.md is present and the user wants it distributed
  across channels. For a single format, use the dedicated format skill (e.g.
  blog-article) or long-tail-copy instead — this skill is for the
  fan-out case specifically.
allowed-tools: Read, Write, Bash, Agent
argument-hint: "[optional: path to campaign briefing; defaults to brief.md if present]"
---

@../\_shared/storytelling-frameworks.md **Read when:** selecting a narrative framework in Step 5 (or by the Step 5 subagent, per-format)
@../\_shared/persuasion-principles.md **Read when:** selecting persuasion principles in Step 5 (or by the Step 5 subagent, per-format)

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
> (a) Pause and run `/content-onboarding` to set up context
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
> should I pause while you run `/content-onboarding`?"
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

- **Found:** read it. If it names a channel mix (as `campaign-concept`'s
  and `gtm-plan`'s output does), propose that list as the target formats and
  ask the owner to confirm or adjust before continuing.
- **Missing:** ask: "Which formats do you want this in? (e.g. LinkedIn post,
  newsletter, blog post) I'll draft each from the same core message." Then ask for
  the core message/idea directly, same prompt `long-tail-copy` uses today.

## Step 3: Get the content idea, audience, and length target

Ask for the content idea, audience, and any core proof points **once**, not once
per format. The core message, key value proposition, and proof points must stay
identical across every format produced in this run — only structure, length, and
tone vary per format's own conventions (handled in Steps 4–5 below: Step 4 routes
each format, Step 5 drafts each Tier-B/C format in its own isolated subagent, in
parallel).

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

## Step 4–5: Route each format, then draft in parallel

For each format in the confirmed format list, first resolve routing (Step 4).
Formats that land in Tier B or Tier C then get drafted concurrently, one isolated
subagent per format (Step 5) — not one after another in this session's context.

### Step 4: Identify the format and route correctly (per format)

First, settle on the **requested output format** for this iteration. (If the owner
has not named each clearly, they should have in Step 2's format list.)

Once you know the format, work through three tiers **in order**:

#### Tier A — A dedicated skill exists for this format → route away

Some formats have their own dedicated skill that applies format-specific best
practices this skill does not. Using this skill for them produces weaker results.

**How to check:** look at the skills available in this session (your available-skills
list). The cc-content plugin ships dedicated skills for some formats — for example
blog articles (`blog-article`) and LinkedIn posts (`linkedin-post`)
— and **the project may have added its own** dedicated skills for other formats. Do
**not** rely on a hardcoded list; judge from the skills actually available whether any
one's purpose squarely covers the requested format.

**If a dedicated skill covers the format:**

Tell the owner: "The format **<format>** has a dedicated skill — `/<skill-name>` —
which applies format-specific best practices. I'll route this format there and
draft the remaining formats here. (You can always run `/<skill-name>` standalone
later if you want to adjust the <format> version independently.)"

Then **stop drafting this format here**; it's handled by the dedicated skill.
Note which formats are routed away for the final summary in Step 6.

#### Tier B — No dedicated skill, but a format-guideline file is registered → flag it

From the context files you loaded in Step 1, check whether any file's Summary covers
**best practices, structure, or length for the requested format** (e.g. a whitepaper
guideline, e-mail best-practices, newsletter guideline, webinar guideline). If one
exists, treat it as **authoritative** for this format and note its path — the Step 5
subagent for this format will read it directly, so it doesn't need to be loaded here.
Note: "Format rules: `<file>`."

#### Tier C — Neither → use your own best practices

If no dedicated skill and no registered guideline cover the format, note: "No project
guideline for <format>; using general best practices." The Step 5 subagent for this
format will draft using its own knowledge of current best practices for that format's
length, structure, and conventions.

### Step 5: Dispatch drafting subagents (parallel, per format)

Every format assigned Tier B or Tier C in Step 4 needs a full pass — framework
selection, persuasion-principle selection, draft, self-edit — but none of those
formats depend on each other's output; only the fixed core message from Step 3 is
shared. Rather than running that pass sequentially for each format in this session's
context, dispatch one subagent per Tier-B/C format, all in parallel, and let each
work in its own isolated context loaded with only what its format needs.

**If zero formats landed in Tier B/C**, skip Step 5 entirely — there's nothing to
draft, and Step 6 will just present the routing summary.

**If exactly one format landed in Tier B/C**, skip dispatch and do the pass directly
in this session instead, following the same task list laid out in item 7 below
(framework selection, persuasion selection, draft pass 1, self-edit pass 2) applied
to yourself rather than written into a subagent prompt — parallelization overhead
isn't worth it for a single format.

**Otherwise**, call the Agent tool once per Tier-B/C format, **all in a single
message** (parallel tool calls — see the Agent tool's guidance on this), each with:

- `subagent_type: "general-purpose"`
- `run_in_background: false` — Step 6 needs every result before it can present
  anything, so there's nothing to gain from backgrounding these.
- `description`: e.g. `"Draft <format> atomization"`
- `prompt`: a **self-contained** brief (the subagent has no access to this
  conversation) containing:
  1. The content idea / core message exactly as gathered in Step 3.
  2. The **substance layer, verbatim**: the specific claim(s), statistics, named
     proof points, product/entity names, and quoted figures that must appear
     **byte-identical** in the output. State explicitly that these must be
     re-framed, never altered.
  3. The confirmed output language and audience persona(s) from Step 3.
  4. The single target **format** this subagent is drafting — nothing else.
  5. File paths for the subagent to `Read` itself (repo-relative, same checkout this
     session is running in): the brand-voice and organization-background context
     file(s) identified in Step 1; `plugins/cc-content/skills/_shared/storytelling-frameworks.md`;
     `plugins/cc-content/skills/_shared/persuasion-principles.md`; and, for Tier B,
     the format-guideline file path noted in Step 4. For Tier C, state plainly that
     no guideline file exists and it should use its own best-practices knowledge for
     this format's length, structure, and conventions.
  6. An explicit tool-scope constraint: state plainly that the subagent's job is
     read-and-draft only — it must `Read` **only** the exact file paths listed above,
     and must not use any other tool (no web access, no fetching URLs, no shell
     commands, no writing files). This skill's own `allowed-tools` doesn't include
     web or execution access, and a `general-purpose` subagent defaults to a much
     wider tool surface than that; since the content idea and any `brief.md` this
     prompt draws on may contain untrusted or externally-sourced text, don't let a
     subagent's effective tool access exceed what this skill itself is scoped to.
  7. The full task, in order:
     - Select a storytelling framework per `storytelling-frameworks.md`'s selection
       process; apply it as the structural spine where it fits; let SPIN (Situation →
       Problem → Implication → Need-Payoff) shape the argument's progression where
       that fits too.
     - Select 1–3 persuasion principles per `persuasion-principles.md`'s selection
       process, plus a pre-suasive opener strategy; layer them into the prose, not as
       labeled callouts.
     - **Draft pass 1**: write the text in the output language as a creative,
       expressive finished piece for this format, holding to: keep the substance
       layer fixed and adapt everything else (hook, structure, length, tone, CTA,
       formatting) to this platform's native conventions; connect to the
       organization subtly (no overt self-promotion); offer original value beyond
       the core message's bare facts, tailored to this format's audience; use the
       loaded brand voice; honor the Tier-B guideline or general best practices for
       this format's length/structure/conventions; aim at the confirmed persona(s).
     - **Self-edit pass 2**: read the pass-1 draft sentence by sentence and fix, with
       minimal intervention: factual errors or ambiguous phrasing (cut rather than
       heavily rewrite if a fix would require it); unsupported claims about the
       organization not traceable to the loaded context (soften, rephrase, or
       remove); hype and over-dramatization; style drift from brand voice or the
       format guideline (including in sentences added while editing); em-dash-set-off
       parenthetical insertions ("–"/"—"), rewritten as clean sentences — a frequent
       AI tell; and a final check that the substance layer is still present and
       unchanged (abbreviating a statistic to fit platform constraints is fine as
       long as the number and meaning survive). If a Tier-B guideline specifies an
       optimal length, use the full range rather than coming in thin.
  8. The channel-formatting rule: if this format is a social-media post or any
     channel that strips formatting, no bold/italics/Markdown — replace bullet
     points with fitting emojis, keep the body plain.
  9. The exact return contract — the subagent should return **only**: the finished
     text (nothing else mixed into it); the storytelling framework it used; the
     persuasion principles it used plus its opener strategy; the format-rules source
     (guideline filename or "general best practices"); the length (count + unit);
     and one line for the batch learnings step — a correction it had to make, or an
     observation about how well this format took the core message — or "none".

Wait for every dispatched subagent to finish before continuing to Step 6. If a
subagent's result is missing the substance-layer facts or contradicts them, treat
that as a failed draft: redo that one format (either by re-dispatching it or drafting
it directly) rather than presenting it as-is.

## Step 6: Present all drafted formats

Present each drafted format (i.e. every format that was not routed to a dedicated
skill in Step 4) in its own delimited block using the format below, in sequence,
using the text and metadata each Step 5 subagent returned (or that you drafted
directly, if only one format needed drafting). After all blocks, add a one-line
routing summary.

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
where it ended up, e.g.: "Routed: LinkedIn → `/linkedin-post`; Drafted
here: newsletter, Twitter/X thread."

## Step 7: Feedback

Run this feedback step once for the whole batch of drafted formats, not once per
format — the same tag and qualification rules apply to the batch as a whole.

**Auto-store phase.** Before asking for feedback, review this run, including the
one-line notes each Step 5 subagent returned for the batch learnings step. For each
qualifying observation, append one tagged line to `.claude/learnings.md` (create with
the standard header if missing):

```text
[cc-content:atomize] <concise observation> — <YYYY-MM-DD>
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
