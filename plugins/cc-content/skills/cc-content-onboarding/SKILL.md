---
name: cc-content-onboarding
description: >
  Use this skill when setting up a new marketing project with Claude Code, registering
  context files, or extending the context of an existing project.
  Invoke when the user asks to "onboard a new client", "set up context files",
  "initialize marketing project", "register context", "add context", or "set up project context".
  Also use when context files are missing and the user wants to set up through a guided interview.
allowed-tools: Read, Write, Edit, Bash
argument-hint: "[optional: path to an existing file to register as context]"
---

# Onboarding Skill

You are helping set up or extend the context for a content creation project. Context files
are Markdown documents registered in `CLAUDE.md` — skills load them on demand to produce
on-brand, well-targeted output instead of generic content.

Two paths through this skill:

- **Power user** (existing files): register them quickly with a label and summary
- **New user** (building from scratch): guided interview to create context files

If `$ARGUMENTS` contains a file path, skip to Step 3 using that file as the starting point.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently. Apply relevant entries — in particular,
path preferences, rejected interview answers, or project constraints discovered in prior runs.
Do not announce this step. If the file is absent, continue normally.

## Step 1: Discover existing context

Check what is already registered:

```bash
grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
find context/ -type f -name "*.md" 2>/dev/null | sort || echo "(no context/ folder)"
```

If a context table exists, show it to the owner:

> "Your project already has these context files registered:
>
> | Label           | File | Summary |
> | --------------- | ---- | ------- |
> | <existing rows> |
>
> Would you like to add more context? (yes / no)"

If no context table and no context/ folder, continue to Step 2 directly.
If the context table is empty or only partially filled, continue to Step 2.

## Step 2: Surface common starting points

If context is sparse or absent, present the most common types of context that make a
meaningful difference to output quality. These are suggestions, not required slots.

> "Content skills produce much better output when they have project context to work from.
> Here are the most common types — does any of this apply to your project?
>
> - **Brand voice / writing style** — tone, vocabulary, phrases to use or avoid
> - **Organization or author profile** — who you are, what you do, your positioning
> - **Audience profiles** — who you're writing for, their goals and challenges
> - **Default output language** — a simple note like 'Output language: German (de-DE)'
> - **Format rules for specific output types** — e.g. 'all whitepapers follow this structure'
>
> These are just the most common starting points. Register whatever context is relevant
> for your project — there are no restrictions on types, file names, or locations.
>
> Do you already have files you want to register, or would you like to create context
> files through a short interview? (You can also describe something not on this list.)"

Wait for the owner's response and route accordingly:

- **Have existing files** → go to Step 3 for each file
- **Want to create files** → go to Step 4
- **Something not on the list** → treat as custom context; go to Step 3 or 4 as appropriate
- **Nothing / skip** → go to Step 5

## Step 3: Register an existing file

For each file the owner wants to register:

Read the file.

Suggest a label based on the file content — brief, descriptive, and free-form. The label
appears in the CLAUDE.md table and is what the owner will recognize at a glance.

> "Suggested label: **[label]**
> (or enter your own — no restrictions on naming)"

Generate a one-sentence summary (10–25 words) from the file content. The summary is the key
signal skills use to decide which file is relevant for a given task — be specific:

- Too vague: "Writing style guidelines for the company"
- Good: "Formal German, em-dash preferred, no exclamation marks — all corporate copy"
- Good: "Casual and inclusive tone — job ads and employer branding only"

Show the proposed table row:

> "I'll register this in your CLAUDE.md context table as:
>
> | [label] | [file path] | [summary] |
>
> Confirm? (yes / edit / skip)"

- **Yes**: record the row for Step 5
- **Edit**: ask what to change, update, show again
- **Skip**: discard this file

After handling this file, ask: "Would you like to register another file, or create a new
context file? (yes / create / done)" and loop back to Step 3, go to Step 4, or proceed to Step 5.

## Step 4: Create a new context file

When the owner wants to create a context file from scratch:

Ask:

> "What should this context file cover? Describe it in a few words
> (e.g. 'our brand voice', 'company background', 'reader personas')."

Based on the answer, ask targeted questions one at a time. Adapt questions to what the owner
described — the following are starting points, not a fixed script:

**For brand voice / writing style:**

1. "How would you describe the tone? (e.g. authoritative, conversational, warm, technical)"
2. "What words or phrases does the brand use frequently?"
3. "What words or phrases should never appear?"
4. "Any formatting or punctuation rules? (e.g. no exclamation marks, em-dash preferred)"
5. "Any reading level or vocabulary target?"

**For organization or author profile:**

1. "What is the name and a one-sentence description of what you do?"
2. "What are the main products or services?"
3. "What makes you different from competitors?"
4. "Any values, principles, or positioning worth noting?"

**For audience profiles:**

1. "How many distinct audience segments? (1–4 recommended)"
   For each segment, ask: role or title; primary goals; biggest challenges; preferred channels.

**For default output language:**

1. "What is the default output language for all content in this project?
   (e.g. German / de-DE, English / en-US, French / fr-FR)"

**For format rules specific to a content type:**

1. "Which content type do these rules apply to?"
2. "What are the mandatory structural elements or rules?"

**For any other context type:**
Ask open-ended questions appropriate to what the owner described. The goal is to capture the
information that will make content skills produce better output for this specific project.

After collecting answers, ask:

> "Where should I save this file? (Suggested: `context/<descriptive-name>.md` — but any
> path works, e.g. `brand/voice.md` or pointing to an existing folder.)"

Write the file with a clear heading and the owner's answers organized under descriptive sections.
Match the structure to the content type — do not force a generic template.

After writing, confirm: "✓ Created `[path]`." Then proceed to Step 3 to register it.

## Step 5: Update CLAUDE.md

Collect all rows confirmed in Steps 3–4.

If no rows were confirmed, skip to Step 6.

Check the current CLAUDE.md state:

```bash
grep -c '## Context files' CLAUDE.md 2>/dev/null || echo "0"
```

**If `## Context files` section exists:**

Show only rows that are not already in the table:

> "I'll add these rows to your context table:
>
> | Label      | File | Summary |
> | ---------- | ---- | ------- |
> | <new rows> |
>
> Shall I proceed? (yes / edit / skip)"

- **Yes**: append the rows to the table. Confirm: "✓ CLAUDE.md updated."
- **Edit**: ask what to change, update, show again.
- **Skip**: note that the context table was not updated.

**If CLAUDE.md exists but has no `## Context files` section:**

> "I'll add a context table to your CLAUDE.md:
>
> ## Context files
>
> Skills read all registered files and load what's relevant for each task.
>
> | Label                | File | Summary |
> | -------------------- | ---- | ------- |
> | <all confirmed rows> |
>
> Shall I proceed? (yes / edit / skip)"

**If CLAUDE.md does not exist:**

Ask: "There is no CLAUDE.md yet. What is the project or client name? (Used as the heading.)"

Create:

```markdown
# [Project Name]

## Context files

Skills read all registered files and load what's relevant for each task.

| Label  | File | Summary |
| ------ | ---- | ------- |
| <rows> |
```

Confirm: "✓ CLAUDE.md created."

## Step 6: Folder structure nudge

After updating CLAUDE.md, add a practical tip:

> "**Tip:** Content skills can also find unreferenced files on demand — for example,
> 'check how we wrote the invitation for the XYZ event last year'. This works best with
> meaningful file names (e.g. `xyz-event-invitation-2025.md`, not `draft-v3-final.md`)
> and a folder structure you can describe in a sentence.
>
> Want to add a one-line note to your CLAUDE.md describing how this project's content
> is organized? (yes / describe it / skip)"

- **Yes or owner describes it**: add a `## Folder structure` note to CLAUDE.md.
- **Skip**: continue.

## Step 7: Summary

```
Context setup complete
──────────────────────────────────────────────────────
Registered:    <N> context file(s)
CLAUDE.md:     ✓ updated (or: ✓ created / ✗ skipped)
──────────────────────────────────────────────────────
```

Then say:

> "Your project context is ready. Content skills will read the registered files and
> load what's relevant for each task — producing more on-brand, targeted output.
> You can run this skill again any time to add more context, or use
> `/cc-content-promote` to quickly register a file mid-session."

## Step 8: Store learnings

Before ending, review the interview for nuances that were discovered but not formalized
into any context file created during this run.

For each qualifying observation, append one tagged line to `.claude/learnings.md`
(create with standard header if missing):

```text
[cc-content:cc-content-onboarding] <concise observation> — <YYYY-MM-DD>
```

**Qualifies:** a preference, constraint, or project fact revealed during the interview
that is not already captured in any context file written this run, in `CLAUDE.md`, or
in any existing `.claude/learnings.md` entry under any plugin tag.

**Does not qualify:** information written into a context file just now; facts already
in `CLAUDE.md`; standard onboarding behavior applied without deviation; facts
semantically equivalent to any existing entry — when in doubt, skip; redundancy is
worse than a missed entry.

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

If any entries were written, confirm: "✓ N learning(s) saved to `.claude/learnings.md`."
If nothing qualified, skip silently.
