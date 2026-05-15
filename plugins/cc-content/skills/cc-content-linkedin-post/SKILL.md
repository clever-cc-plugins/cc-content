---
name: cc-content-linkedin-post
description: >
  Use this skill when the owner wants to write, draft, or generate a LinkedIn post.
  Invoke when the user says "write a LinkedIn post", "draft a post for LinkedIn",
  "create a LinkedIn update", "generate a LinkedIn post", or "post on LinkedIn".
allowed-tools: Read, Write, Bash
argument-hint: "[optional: path to campaign briefing file]"
---

@./format-guidelines.md **Read when:** starting this skill
@../\_shared/storytelling-frameworks.md **Read when:** selecting a narrative framework in Step 3b
@../\_shared/persuasion-principles.md **Read when:** selecting persuasion principles in Step 3c

# LinkedIn Post Skill

You are helping the owner produce a complete, publishable LinkedIn post. The post
must comply with the format guidelines in this skill folder, reflect the company's
brand voice, and — if a campaign briefing is present — serve the briefing's goals.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently. Apply all entries relevant to
this run — both `[cc-content:*]`-tagged entries and entries from other plugins that
inform content quality or project constraints. Do not announce this step. If the file
is absent, continue normally.

## Step 1: Load context

Check whether CLAUDE.md contains a `## Context files` table:

```bash
grep -A 100 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
```

For each of the following categories, find the matching row in the table (match on
the **Category** column) and Read the file listed in the **File** column:

| Category                  | What it covers                                               | Required?   |
| ------------------------- | ------------------------------------------------------------ | ----------- |
| **writing-style**         | Tone, vocabulary, phrases to use or avoid, sentence patterns | Required    |
| **organization-identity** | What the brand does, products, services, positioning         | Required    |
| **target-audience**       | Who the reader is, their goals, challenges, and motivations  | Recommended |
| **content-defaults**      | Default output language and other project-level settings     | Recommended |

If the context table is absent entirely, or if a **Required** category has no row in
the table, ask once:

> "I don't see any **[category name]** context. Is this intentional, or should I pause
> while you run `/cc-content:cc-content-onboarding`?"

- If the owner says it's **intentional**: note the gap and continue. Label the final
  output `⚠ DEGRADED OUTPUT` and list the missing categories.
- If the owner says to **pause**: say "Run `/cc-content:cc-content-onboarding` to set
  up your context files, then invoke this skill again." and stop.

For **Recommended** categories that are absent: note it silently and continue.

After loading all available files, proceed to Step 2.

## Step 2: Check for campaign briefing

Determine the briefing path:

1. If the owner passed a file path as an argument (`$ARGUMENTS`), use that path.
2. Otherwise, check for `brief.md` in the current working directory:

```bash
ls brief.md 2>/dev/null && echo "found" || echo "missing"
```

- **Found** (either via argument or `brief.md`): read the file and note its key
  messages, goals, and constraints. Confirm: "✓ Campaign briefing loaded from
  `<path>`."
- **Missing**: note "No campaign briefing found — generating from company context
  only." and continue.

## Step 3: Ask for the post topic (if not already provided)

If the owner has not specified a topic or goal for the post, ask:

> "What should this post be about? You can describe the topic, share a key message
> you want to convey, or paste raw notes and I'll turn them into a post."

Wait for the answer, then proceed.

## Step 3b: Select a storytelling framework

Read `../_shared/storytelling-frameworks.md` and follow the selection process described
there. Apply the chosen framework as the structural spine of the post.

## Step 3c: Select persuasion principles

Read `../_shared/persuasion-principles.md` and follow its selection process. Pick 1–3
principles that fit the post's goal and the reader's state, plus a pre-suasive opener
strategy. Note the choice in working notes (e.g., "Using **Authority + Social Proof**,
opener primes credibility").

## Step 4: Generate the post

Produce a complete LinkedIn post that:

- Opens with a strong hook (max 190 chars, starts with an emoji)
- Is structured according to the framework chosen in Step 3b (if applicable)
- Includes a body delivering the substance the hook promises
- Ends with a specific, singular CTA that is easy to answer
- Uses ~6 emojis placed at natural pauses (omit if brand voice prohibits)
- Omits hashtags by default (add 1–2 only if the campaign requires them)
- Stays within the recommended character target (1,242–2,500 characters)
- Reflects tone and vocabulary from any loaded writing-style context
- Addresses the audience from any loaded target-audience context
- Does NOT embed a link in the post body (reference "first comment" if a link is needed)

Internally verify against the quality checklist in `format-guidelines.md` before
presenting the output.

If the briefing is present, the post must serve its stated goals and key messages.

Present the post in a clear block:

```
─────────────────────────────────────────────
LinkedIn post draft
─────────────────────────────────────────────
<post content>
─────────────────────────────────────────────
Character count: <N> / 3,000
```

If the output is degraded (missing required context categories), prepend:

```
⚠ DEGRADED OUTPUT — generated without: <list of missing categories>
```

## Step 5: Feedback

**Auto-store phase.** Before asking for feedback, review this run. For each qualifying
observation, append one tagged line to `.claude/learnings.md` (create with standard
header if missing):

```text
[cc-content:cc-content-linkedin-post] <concise observation> — <YYYY-MM-DD>
```

Qualifies: content preferences or constraints not already in any loaded `context/` file
or `CLAUDE.md`; corrections the owner made to the output; project-specific facts that
would change future output; accepted/rejected suggestions deviating from best practices.

Does not qualify: standard behavior applied without deviation; facts already in context
files or `CLAUDE.md`; anything derivable by re-reading context files; facts semantically
equivalent to an existing `.claude/learnings.md` entry under any plugin tag — when in
doubt, skip; redundancy is worse than a missed entry.

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

> "Did this post meet expectations? If you have any corrections or notes for
> future posts, share them here — or press Enter to finish."

- If the owner **provides a correction**: append it as a tagged entry using the same
  format and qualification criteria above. Confirm total entries written across both
  phases: "✓ N learning(s) saved to `.claude/learnings.md`."
- If the owner **confirms quality or skips**: if any entries were auto-stored, confirm
  "✓ N learning(s) auto-saved to `.claude/learnings.md`." Then say "Great — the post
  is ready to publish. Copy it above and paste directly into LinkedIn." and exit. If
  nothing was stored, skip the confirmation and exit directly.
