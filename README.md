<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/clever-cc-plugins/.github/main/assets/logo-dark.svg" />
    <img src="https://raw.githubusercontent.com/clever-cc-plugins/.github/main/assets/logo.svg" width="220" alt="clever [cc] plugins" />
  </picture>
</p>

# cc-content

A [Claude Code](https://claude.ai/code) plugin that provides a suite of content creation skills for marketing projects — brand onboarding, LinkedIn posts, blog articles, sample curation, and session management.

---

## Plugin: `cc-content`

The content-production skills work for any industry, audience, and output language. They automatically use the context files set up during onboarding, and prompt you for any required information that the context does not already cover.

| Skill                          | What it does                                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/cc-content-onboarding`       | Interviews you about your brand, voice, and audience, then populates `context/` with structured context files that all other skills can read                                                      |
| `/cc-content-promote`          | Registers a single file as context in `CLAUDE.md` mid-session, without re-running full onboarding                                                                                                 |
| `/cc-content-research-prompt`  | Generates a vendor-neutral deep-research prompt for a topic, ready to paste into Claude, ChatGPT, Gemini, Perplexity, or similar                                                                  |
| `/cc-content-linkedin-post`    | Drafts LinkedIn posts that match your brand voice, format guidelines, and audience — with a built-in feedback step                                                                                |
| `/cc-content-blog-article`     | Drafts blog articles calibrated to your audience type (B2B / B2C), content goal, funnel stage, and reader expertise                                                                               |
| `/cc-content-ideation`         | Generates several distinct strategic angles (thesis / goal / perspective) from an article, briefing, or topic — the idea step before writing                                                      |
| `/cc-content-text`             | Drafts a finished text for any format without a dedicated skill (press release, newsletter, whitepaper, landing page, email …), routing you to a dedicated skill when one fits better             |
| `/cc-content-samples-curation` | Saves gold-standard content examples with annotations to the samples file registered in the `## Context files` table (default `context/samples.md`) so skills can use them as reference material  |
| `/cc-content-session-wrap`     | Reviews session deliverables, logs feedback and corrections, detects recurring patterns, and commits your work                                                                                    |
| `/cc-content-new-skill`        | Turns research notes into a complete content-production skill for a new output format. Use it to build project-local custom skills, or add `--plugin` to create a pre-built skill for the plugin. |

---

## See it in action

**Input** — a rough note:

> we shipped dark mode. finally. took forever. users have been asking for years

**Output** — `/cc-content-linkedin-post`:

> Dark mode is here.
>
> Users have been asking for this for years — and honestly, it took us longer than we'd like to admit. But it's live today, and it was worth the wait.
>
> If you've been holding off because of this one thing, give it another look.

The skill draws on the brand voice, tone, and audience set up during onboarding — this is an illustrative example, not a fixed template.

---

## Installation

Open Claude Code in any project and run:

```
/plugin marketplace add clever-cc-plugins/marketplace
/plugin install cc-content@clever-cc-plugins
```

This makes all skills immediately available.

### Keeping Skills Current

Auto-update is disabled by default for third-party marketplaces. To enable it:

1. Run `/plugin` in Claude Code
2. Go to the **Marketplaces** tab
3. Toggle auto-update for `clever-cc-plugins/marketplace`

Once enabled, skills update automatically on startup when new versions are available.

---

## Getting Started

**Step 1 — Run onboarding**

Open your marketing project in Claude Code and run the onboarding skill:

```
/cc-content-onboarding
```

This populates `context/` with your brand voice, company profile, and buyer personas. The other skills read this context automatically.

**Step 2 — Create content**

Run any output skill:

```
/cc-content-linkedin-post
```

For a format without its own skill (press release, newsletter, whitepaper …), use the general writer — or start from ideas first:

```
/cc-content-ideation
/cc-content-text
```

**Step 3 — Curate good examples**

When a piece of content lands well, save it as a reference sample:

```
/cc-content-samples-curation
```

**Step 4 — Wrap your session**

At the end of each working session, commit your work and log any corrections:

```
/cc-content-session-wrap
```

---

## Extending with Custom Content Skills

The plugin ships with LinkedIn post and blog article support today, and more pre-built formats are planned. If you need a content format that isn't covered yet, you can build a project-local skill using `cc-content-new-skill` — no plugin contribution required.

**Workflow:**

1. Run `/cc-content-new-skill <format-name>` without any research files. The skill will guide you to a research brief template that tells you what to gather about your target format.
2. Fill in the brief, then re-run `/cc-content-new-skill <format-name>` with your research files attached. The skill interviews you about coverage gaps, synthesizes a `format-guidelines.md`, and generates a `SKILL.md` skeleton.
3. Open the generated `SKILL.md` and fill in the `[TODO: ...]` placeholders to tailor the skill to your exact needs.
4. The finished skill lives in `.claude/skills/<format-name>/` and is ready to invoke from there.

If the new format turns out to be broadly useful and you'd like to contribute it back, re-run the skill with `--plugin` to produce a version structured for the plugin repository.

---

## Context Architecture

Skills follow a three-level context model:

| Level              | Location                                  | What goes here                                                                      |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| **Company scope**  | `context/` (registered in `CLAUDE.md`)    | Brand voice, buyer personas, company profile — applies to all work for this company |
| **Format scope**   | Inside the plugin                         | Structure rules, length limits, tone calibrations for one output type               |
| **Campaign scope** | Project subfolders (e.g. `campaigns/q3/`) | Campaign briefings, key messages, one-off constraints                               |

Company-scope context is registered in a `## Context files` table in `CLAUDE.md` — not loaded via `@`-import. The distinction matters and applies to any plugin in this family that uses the same pattern.

### `@`-imports vs. the `## Context files` table

**`@`-imports** (e.g. `@DESIGN.md`, `@AGENTS.md`) are parsed by Claude Code and pull the referenced file's full content into the context window unconditionally — every message, every session. Reserve them for the handful of files that are genuinely relevant to every task.

**The `## Context files` table** is plain Markdown, not an `@`-import. Only the table itself (labels, paths, one-line summaries) loads every message via `CLAUDE.md` — cheap. The underlying files load conditionally: a skill reads the table, matches the current task against each row's Summary, and reads only the file(s) that are actually relevant. A brand-voice file won't be loaded for a task that only needs buyer-persona data, even though both are registered in the same table.

Use `@`-imports for material every task needs. Use the context table for anything that's only sometimes relevant — for company-scope context, that's almost everything.

### Authoring the table by hand

```markdown
## Context files

Skills read all registered files and load what's relevant for each task.

| Label       | File                     | Summary                                                                     |
| ----------- | ------------------------ | --------------------------------------------------------------------------- |
| Brand voice | `context/brand-voice.md` | Formal German, em-dash preferred, no exclamation marks — all corporate copy |
```

- **Label** — free-form, whatever you'd recognize at a glance. No fixed taxonomy.
- **File** — see path convention below.
- **Summary** — one sentence, 10–25 words, specific enough to act as a relevance signal. Skills match against this, not the label.
  - Too vague: "Writing style guidelines for the company"
  - Good: "Formal German, em-dash preferred, no exclamation marks — all corporate copy"
  - Good: "Casual and inclusive tone — job ads and employer branding only"

`/cc-content-onboarding` builds this table through a guided interview; `/cc-content-promote` adds a single row mid-session. Both apply the same quality bar — hand-edits to the table should meet it too.

### File paths in the table

Write `File` paths relative to the `CLAUDE.md` file that contains the table — not relative to the repository root. This mirrors how Claude Code resolves `@`-import paths, so both mechanisms follow the same mental model, and it keeps a `CLAUDE.md` plus its registered context files self-contained if that subtree is moved or copied elsewhere.

If a project has more than one `CLAUDE.md` (e.g. a nested one for a specific campaign or sub-brand), each table is scoped to its own file — a nested `CLAUDE.md`'s `File` column is relative to that nested folder, not the project root.

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Michael van Laar

---

<p align="center">
  Part of the <a href="https://github.com/clever-cc-plugins">clever-cc-plugins</a> family · <a href="https://github.com/clever-cc-plugins/marketplace">marketplace</a> · <a href="https://github.com/clever-cc-plugins/cc-config">cc-config</a> · <a href="https://github.com/clever-cc-plugins/cc-chime">cc-chime</a> · <a href="https://github.com/clever-cc-plugins/cc-handoff">cc-handoff</a>
</p>
