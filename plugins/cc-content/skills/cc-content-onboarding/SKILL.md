---
name: cc-content-onboarding
description: >
  Use this skill when setting up a new marketing project with Claude Code, populating
  company-level context files, or initializing the context/ folder.
  Invoke when the user asks to "onboard a new client", "set up context files",
  "create company profile", "populate context", "initialize marketing project",
  or "set up brand context". Also use when context files are missing and the user
  wants to create them through an interview.
allowed-tools: Read, Write, Edit, Bash
argument-hint: "[optional: context category to regenerate, e.g. writing-style]"
---

# Onboarding Skill

You are setting up the company-level context for a marketing project. Your goal is to
populate `context/` with structured Markdown files that skills load on demand —
and to register all those files in a context table in CLAUDE.md so skills can discover
and read only what they need.

## Step 1: Discover existing context

Before asking any questions, discover what context files already exist and classify
them by category.

Run:

```bash
grep -A 100 '## Context files' CLAUDE.md 2>/dev/null || echo "(no CLAUDE.md or no context table)"
find context/ -type f -name "*.md" 2>/dev/null | sort || echo "(no context/)"
```

Read each discovered file. Classify it into one of these categories based on its
**content** (not its filename):

| Category                    | What it covers                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| **content-defaults**        | Default output language and other project-level defaults                                         |
| **writing-style**           | Tone, vocabulary, phrases to use/avoid, sentence patterns                                        |
| **organization-identity**   | What the company does, products, mission, positioning                                            |
| **target-audience**         | Personas, goals, challenges, preferred channels                                                  |
| **storytelling-frameworks** | Project-specific framework preferences (preferred/avoided); the plugin provides the full library |
| **reference-materials**     | Books, research, or external sources informing the approach                                      |
| **reference-samples**       | Curated past content examples with quality annotations                                           |

Present the coverage table to the owner:

```
Context coverage
─────────────────────────────────────────────
Category                Status    File(s)
─────────────────────────────────────────────
writing-style           ✓ present  <path>
organization-identity   ✗ missing  —
target-audience         ✗ missing  —
storytelling-frameworks ✗ missing  —
reference-materials     ✗ missing  —
reference-samples       ✗ missing  —
─────────────────────────────────────────────
```

Omit categories that are both missing and clearly not applicable to the project type.
If `$ARGUMENTS` names a specific category to regenerate, treat that category as
missing regardless of whether a file already exists for it.

## Step 2: Handle required categories

For each of these categories that is **missing**: `writing-style`, `organization-identity`

Ask:

> "The **[category]** category is missing. Would you like to:
> (a) Create it now through a short interview
> (b) You already have a file for this — tell me the path
> (c) Skip for now"

**Option (a) — Create via interview:**

First ask: "Where should I save this file? (Suggested: `context/<name>.md` —
or enter any path like `brand/voice.md` and I'll create it at `context/brand/voice.md`)"

Then conduct the interview. Ask questions one at a time and wait for each answer.
If the owner skips a question, use `TODO: [question text]` as a placeholder.

**writing-style interview:**

1. "How would you describe the brand's tone? (e.g., authoritative, conversational, witty, warm)"
2. "What words or phrases does the brand use frequently?"
3. "What words or phrases should the brand never use?"
4. "Is there a specific reading level or vocabulary level to target?"
5. "Any punctuation, capitalization, or formatting rules? (e.g., no exclamation marks, em-dash preferred)"

Write the file:

```markdown
# Writing Style

## Tone

<answer>

## Signature phrases & vocabulary

<answer>

## Words & phrases to avoid

<answer>

## Reading level

<answer>

## Formatting rules

<answer>
```

**organization-identity interview:**

1. "What is the company's name and one-sentence description of what it does?"
2. "What are the main products or services? (List them briefly.)"
3. "What is the company's mission or core purpose?"
4. "What makes this company different from competitors? (Key differentiators.)"
5. "Are there any values or principles the company is known for?"

Write the file:

```markdown
# Organization Identity

## Name & Description

<answer>

## Products & Services

<answer>

## Mission

<answer>

## Differentiators

<answer>

## Values

<answer>
```

After writing, confirm: "✓ Created `context/<path>`."

**Option (b) — Existing file:**

Ask for the path. Read the file and verify it covers the category.

- If it covers the category: note it as present and continue.
- If it does not: say so and offer options (a), (b), (c) again.

**Option (c) — Skip:**

Note it as intentionally absent and continue.

## Step 3: Set content defaults (unconditional)

This step runs regardless of whether a `content-defaults` file already exists.

Check whether a `content-defaults` file is present:

```bash
find context/ -type f -name "*.md" 2>/dev/null | xargs grep -l "Output language" 2>/dev/null | head -1
```

**If a file is found:** read it and show its current contents:

> "I found an existing content-defaults file at `<path>`:
>
> ```
> <file contents>
> ```
>
> Would you like to update it? (yes / no)"

- **No**: keep the existing file and proceed to Step 4.
- **Yes**: proceed with the interview below and overwrite the file.

**If no file is found:** proceed with the interview.

Ask: "Where should I save the content defaults file?
(Suggested: `context/content-defaults.md`)"

Then ask:

> "What is the default output language for all content created in this project?
> (Examples: German / de-DE, English / en-US, French / fr-FR)"

Write the file:

```markdown
# Content Defaults

**Output language:** <answer>
```

After writing, confirm: "✓ Created `context/<path>`."

## Step 4: Handle recommended category

For the `target-audience` category, if missing:

Ask:

> "The **target-audience** category is missing. This helps skills tailor content to
> the right reader. Would you like to:
> (a) Create it through a short interview
> (b) You have a file for this — tell me the path
> (c) Skip — skills will generate without specific audience context"

**Option (a) — Create via interview:**

Ask: "Where should I save this file? (Suggested: `context/target-audience.md`)"

Then ask:

1. "How many distinct audience segments does this company target? (1–4 recommended.)"

For each segment, ask:

- "What is this persona's role or title?"
- "What are their primary goals or motivations?"
- "What are their biggest challenges or frustrations?"
- "What objections do they typically raise?"
- "What content formats or channels do they prefer?"

Write the file:

```markdown
# Target Audience

## Persona: <role/title>

**Goals:** <answer>
**Challenges:** <answer>
**Objections:** <answer>
**Preferred channels:** <answer>
```

After writing, confirm: "✓ Created `context/<path>`."

Handle Options (b) and (c) the same as in Step 2.

## Step 5: Handle optional categories

Ask once, listing both at the same time to minimize questions:

> "Would you like to add any of these optional context files?
>
> - **storytelling-frameworks** — which frameworks to prioritize or avoid for this
>   project (the plugin already includes a full library; this captures client-specific
>   preferences, e.g. "always StoryBrand and PAS, never AIDA")
> - **reference-materials** — books or research that inform your content approach
>
> For each: (a) create via quick interview, (b) point to an existing file, or (c) skip.
> Or say 'none' to skip all."

**storytelling-frameworks (if creating):**

Ask: "Where should I save this file? (Suggested: `context/storytelling-frameworks.md`)"

Note to the owner:

> "The plugin already includes a comprehensive framework library. This file records
> client-specific preferences — which frameworks to lean on or avoid for this project."

Then ask:

1. "Which frameworks should be preferred for this project? (e.g. StoryBrand, PAS)"
2. "Which frameworks should be avoided, and why? (e.g. 'AIDA — client finds it too salesy')"
3. "Any other notes on narrative approach for this client?"

Write the file:

```markdown
# Storytelling Framework Preferences

The plugin's full framework library is available to all skills. This file
records project-specific preferences that override or constrain that library.

## Preferred frameworks

<answer>

## Frameworks to avoid

<answer>

## Notes

<answer>
```

**reference-materials (if creating):**

Ask: "Where should I save this file? (Suggested: `context/reference-materials.md`)"

Then: "What books, research, or external sources inform your content approach? For
each, give the title and a brief note on what it contributes."

Write the file using the owner's descriptions.

Note: `reference-samples` is managed by the `cc-content:cc-content-samples-curation` skill. Do not create
it here.

## Step 6: Register files in CLAUDE.md

Collect all context files that were created or confirmed in Steps 2–5.

Check the current CLAUDE.md state:

```bash
ls CLAUDE.md 2>/dev/null && echo "exists" || echo "missing"
grep -A 100 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
```

For each confirmed context file, generate a one-sentence summary (10–20 words) drawn
from its content. Use this guidance per category:

| Category                | Summary guidance                                              |
| ----------------------- | ------------------------------------------------------------- |
| content-defaults        | State the output language and any other defaults              |
| writing-style           | Tone adjectives + 1–2 key rules (e.g. "no exclamation marks") |
| organization-identity   | Company name + one-sentence descriptor                        |
| target-audience         | Role/title + key challenge in one phrase                      |
| storytelling-frameworks | Which frameworks are preferred and which to avoid             |
| reference-materials     | Theme or title(s) of the materials                            |

Build the table rows — skip categories for which no file was confirmed:

```
| organization-identity | context/company/acme.md | B2B SaaS platform for enterprise HR teams |
| writing-style | context/brand-voice.md | Formal German, no exclamation marks, em-dash preferred |
```

**If CLAUDE.md is missing:**

Create it with a header using the company name from `organization-identity` (or
`[Company Name]` if that file is also absent), then propose the context table:

> "I'll create CLAUDE.md with a context table for these files:
>
> | Category | File | Summary |
> | -------- | ---- | ------- |
> | <rows>   |
>
> Shall I proceed? (yes / edit / skip)"

- **Yes**: write CLAUDE.md with this structure and confirm: "✓ CLAUDE.md created."
- **Edit**: let the owner adjust paths or summaries, then apply.
- **Skip**: note "CLAUDE.md not created — register files manually when ready."

The file to create:

```markdown
# [Company Name]

## Context files

Skills discover and load these files on demand — they are not pre-loaded.

| Category | File | Summary |
| -------- | ---- | ------- |
| <rows>   |
```

**If CLAUDE.md exists but has no `## Context files` section:**

Propose appending the section:

> "I'll add a context table to your CLAUDE.md:
>
> | Category | File | Summary |
> | -------- | ---- | ------- |
> | <rows>   |
>
> Shall I proceed? (yes / edit / skip)"

- **Yes**: append the section. Confirm: "✓ CLAUDE.md updated."
- **Edit**: let the owner adjust, then apply.
- **Skip**: note "CLAUDE.md not updated — add the context table manually when ready."

**If CLAUDE.md exists and already has a `## Context files` section:**

Show only the rows that are missing from the existing table. Ask for confirmation
before adding them.

## Step 7: Summary

Print a final summary:

```
Onboarding complete
──────────────────────────────────────────────────────
content-defaults        ✓ context/<path>
writing-style           ✓ context/<path>
organization-identity   ✗ skipped intentionally
target-audience         ✓ context/<path>
storytelling-frameworks ✗ skipped
reference-materials     ✗ skipped
CLAUDE.md               ✓ updated (or: ✓ created / ✗ skipped)
──────────────────────────────────────────────────────
```

Then say:

> "Your marketing project context is ready. Skills like `cc-content:cc-content-linkedin-post`
> will read context files on demand using the table in your CLAUDE.md."
