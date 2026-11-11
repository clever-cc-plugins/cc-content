<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/clever-cc-plugins/.github/main/assets/logo-dark.svg" />
    <img src="https://raw.githubusercontent.com/clever-cc-plugins/.github/main/assets/logo.svg" width="220" alt="clever [cc] plugins" />
  </picture>
</p>

# <img src="assets/icon.svg" width="40" height="40" align="top" alt="" />&nbsp;cc-content

A [Claude Code](https://claude.ai/code) plugin with a suite of content-creation skills for marketing projects, including blog articles, social posts, press releases, and more. The skills read your brand voice before they write a word, which is more than most first drafts can say.

> **Breaking change (v1.0.0):** Skill names dropped the `cc-content-` prefix (for example `cc-content-blog-article` became `blog-article`). Claude Code already namespaces plugin skills as `cc-content:<skill-name>`, so the prefix was redundant. Six names also changed wording to stay specific and to avoid collisions: `cc-content-email` became `marketing-email`, `cc-content-text` became `long-tail-copy`, `cc-content-promote` became `register-context`, `cc-content-onboarding` became `content-onboarding`, `cc-content-performance-review` became `content-performance-review`, and `cc-content-new-skill` became `new-content-skill`. Update any saved `/cc-content-...` invocations to the new names.

---

## At a Glance

The content-production skills work for any industry, audience, and output language. They use the context files from onboarding automatically and ask you for any required information that the context doesn't cover.

| Skill                                    | What it does                                                                                                                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/cc-content:content-onboarding`         | Interviews you about your brand, voice, and audience, then populates `context/` with structured context files that all other skills can read                                                          |
| `/cc-content:register-context`           | Registers a single file as context in `CLAUDE.md` mid-session, without re-running the full onboarding                                                                                                 |
| `/cc-content:brand-voice`                | Builds or refines a brand voice guide from your texts, an interview, or both, in any language, for writers and AI                                                                                     |
| `/cc-content:samples-curation`           | Saves gold-standard content examples with annotations to the samples file registered in the `## Context files` table (default `context/samples.md`), so skills can use them as reference material     |
| `/cc-content:research-prompt`            | Generates a vendor-neutral deep-research prompt for a topic, ready to paste into Claude, ChatGPT, Gemini, Perplexity, or similar                                                                      |
| `/cc-content:content-ideation`           | Generates several distinct strategic angles (thesis, goal, perspective) from an article, briefing, or topic, as the idea step before writing                                                          |
| `/cc-content:linkedin-post`              | Drafts LinkedIn posts that match your brand voice, format guidelines, and audience, with a built-in feedback step                                                                                     |
| `/cc-content:x-post`                     | Drafts X (Twitter) posts for engagement, conversation, and goal-driven CTAs, as single posts or threads                                                                                               |
| `/cc-content:facebook-post`              | Drafts Facebook posts for Pages and Groups, with awareness of platform reach mechanics and length guidance matched to audience warmth                                                                 |
| `/cc-content:instagram-post`             | Drafts Instagram posts and captions (feed, carousel, Reels) calibrated to your audience type, format choice, content goal, and funnel stage                                                           |
| `/cc-content:blog-article`               | Drafts blog articles calibrated to your audience type (B2B or B2C), content goal, funnel stage, and reader expertise                                                                                  |
| `/cc-content:marketing-email`            | Drafts marketing and sales emails (campaign emails, newsletters, nurture sequences, cold and warm sales outreach) with subject line and preview text                                                  |
| `/cc-content:personal-email`             | Drafts and answers personal emails under your own name (networking, favours, career, thanks, condolences, invitations), matched to relationship and register                                          |
| `/cc-content:press-release`              | Drafts press releases for direct-to-journalist pickup, for SEO and backlink value via wire placement, or for owned newsroom records                                                                   |
| `/cc-content:landing-page`               | Drafts landing pages, from short single-CTA registration pages for gated content or webinars to longer direct-sales pages, calibrated to funnel stage, audience type, and EU and German consent rules |
| `/cc-content:gated-long-form-content`    | Drafts gated long-form lead-generation assets (whitepapers, guides, ebooks) calibrated to audience type, content goal, funnel stage, and reader expertise, with an explicit gating recommendation     |
| `/cc-content:long-tail-copy`             | Drafts a finished text for any format without a dedicated skill (a webinar abstract, a product description, or ad copy, for example) and points you to a dedicated skill when one fits better         |
| `/cc-content:atomize`                    | Repurposes one core message across multiple formats in a single run. Claims and proof points stay identical, while structure, tone, and CTA adapt to each platform                                    |
| `/cc-content:humanize`                   | Removes AI tells from an existing draft and rewrites it to read as human-written, calibrated to your brand voice                                                                                      |
| `/cc-content:content-performance-review` | Analyzes how published pieces performed, based on data you paste in, and generates iteration variants for the next piece                                                                              |
| `/cc-content:session-wrap`               | Reviews session deliverables, logs feedback and corrections, reviews learnings and promotes, keeps or retires them, and commits your work                                                             |
| `/cc-content:new-content-skill`          | Turns research notes into a complete content-production skill for a new output format. Build a project-local custom skill, or add `--plugin` to create a pre-built skill for the plugin               |

---

## See It in Action

**Input:** a rough note

> we shipped dark mode. finally. took forever. users have been asking for years

**Output** of `/cc-content:linkedin-post`:

> We shipped dark mode today. Users have been asking for it for years, and honestly, it took us longer than we'd like to admit.
>
> If dark mode was the one thing that kept you from trying the product, give it another look.

The skill draws on the brand voice, tone, and audience that you set up during onboarding. This is an illustrative example and no fixed template.

---

## Installation

Open Claude Code in any project and run:

```
/plugin marketplace add clever-cc-plugins/marketplace
/plugin install cc-content@clever-cc-plugins
```

All skills are available immediately.

### Keeping Skills Current

Auto-update is off by default for third-party marketplaces. To switch it on:

1. Run `/plugin` in Claude Code
2. Open the **Marketplaces** tab
3. Toggle auto-update for `clever-cc-plugins/marketplace`

Once it's on, Claude Code updates the skills on startup whenever a new version is available.

### Uninstalling

```
/plugin uninstall cc-content@clever-cc-plugins
```

To remove the marketplace as well (this uninstalls every plugin you installed from it):

```
/plugin marketplace remove clever-cc-plugins
```

---

## Getting Started

**Step 1: Run onboarding**

Open your marketing project in Claude Code and run the onboarding skill:

```
/cc-content:content-onboarding
```

Onboarding populates `context/` with your brand voice, company profile, and buyer personas. The other skills read this context automatically. If your voice matters for ongoing content, build a full guide from your existing texts, an interview, or both with `/cc-content:brand-voice`.

**Step 2: Create content**

Run any output skill:

```
/cc-content:linkedin-post
```

For a format without its own skill (a webinar abstract or ad copy, say), use the general writer. You can also start with ideas:

```
/cc-content:content-ideation
/cc-content:long-tail-copy
```

**Step 3: Curate good examples**

When a piece of content lands well, save it as a reference sample:

```
/cc-content:samples-curation
```

**Step 4: Wrap your session**

At the end of each working session, commit your work and log any corrections:

```
/cc-content:session-wrap
```

---

## Extending with Custom Content Skills

The plugin supports many content formats (blog articles, social posts, press releases, and more). If you need a format that isn't covered yet, build a project-local skill with `new-content-skill`. You don't need to contribute anything to the plugin for that.

**Extending vs. customizing.** `new-content-skill` is for formats the plugin doesn't support yet. Suppose the plugin already has a skill for your format (for example `blog-article`) and you only need brand-specific or company-specific rules applied to it, such as structure, length, or mandatory sections. In that case, don't fork the skill. Register those rules as context with `register-context` or `content-onboarding` instead. The default skill loads and applies them automatically, and you keep benefiting from future improvements to the plugin's best-practice defaults.

**Workflow:**

1. Run `/cc-content:new-content-skill <format-name>` without any research files. The skill points you to a research brief template that tells you what to gather about your target format.
2. Fill in the brief, then run `/cc-content:new-content-skill <format-name>` again with your research files attached. The skill interviews you about coverage gaps, synthesizes a `format-guidelines.md`, and generates a `SKILL.md` skeleton.
3. Open the generated `SKILL.md` and fill in the `[TODO: ...]` placeholders to tailor the skill to your needs.
4. The finished skill lives in `.claude/skills/<format-name>/` and you can invoke it from there.

If the new format turns out to be broadly useful and you'd like to contribute it back, run the skill again with `--plugin` to produce a version structured for the plugin repository.

---

## Context Architecture

Skills follow a three-level context model:

| Level              | Location                                  | What goes here                                                                     |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| **Company scope**  | `context/` (registered in `CLAUDE.md`)    | Brand voice, buyer personas, company profile: applies to all work for this company |
| **Format scope**   | Inside the plugin                         | Structure rules, length limits, tone calibrations for one output type              |
| **Campaign scope** | Project subfolders (e.g. `campaigns/q3/`) | Campaign briefings, key messages, one-off constraints                              |

You register company-scope context in a `## Context files` table in `CLAUDE.md`, and you don't load it via `@`-import. The distinction matters, and it applies to every plugin in this family that uses the same pattern.

### `@`-Imports vs. the `## Context files` Table

**`@`-imports** (for example `@DESIGN.md` or `@AGENTS.md`) are parsed by Claude Code, and they pull the referenced file's full content into the context window on every message of every session. Reserve them for the handful of files that every task needs.

**The `## Context files` table** is plain Markdown and no `@`-import. Only the table itself (labels, paths, one-line summaries) loads with `CLAUDE.md` on every message, which is cheap. The underlying files load on demand: a skill reads the table, matches the current task against each row's summary, and reads only the files that are relevant. A brand-voice file stays unloaded for a task that only needs buyer-persona data, even though both are registered in the same table.

Use `@`-imports for material that every task needs. Use the context table for everything that's only sometimes relevant. For company-scope context, that's almost everything.

### Authoring the Table by Hand

```markdown
## Context files

<!-- cc-config: context-toc-registered -->

Skills read all registered files and load what's relevant for each task.

| Label       | File                     | Summary                                                                  |
| ----------- | ------------------------ | ------------------------------------------------------------------------ |
| Brand voice | `context/brand-voice.md` | Formal German, short sentences, no exclamation marks: all corporate copy |
```

- **Label:** free-form, whatever you recognize at a glance. There's no fixed taxonomy.
- **File:** see the path convention below.
- **Summary:** one sentence of 10 to 25 words, specific enough to work as a relevance signal. Skills match against this and ignore the label.
  - Too vague: "Writing style guidelines for the company"
  - Good: "Formal German, short sentences, no exclamation marks: all corporate copy"
  - Good: "Casual and inclusive tone: job ads and employer branding only"
- **`<!-- cc-config: context-toc-registered -->`:** include this marker comment if the project also uses the `scripts/sync-config-table.sh` script from `cc-config` (v4 and later). It tells the script that these files are already registered here with real summaries, so it doesn't list them again in `## Key Config Files` under a generic placeholder. It does no harm in projects without that script.

`/cc-content:content-onboarding` builds this table through a guided interview, and `/cc-content:register-context` adds a single row mid-session. Both apply the same quality bar, so hand edits to the table should meet it too.

### File Paths in the Table

Write `File` paths relative to the `CLAUDE.md` file that contains the table, not relative to the repository root. That mirrors how Claude Code resolves `@`-import paths, so both mechanisms follow the same mental model. It also keeps a `CLAUDE.md` and its registered context files self-contained if you move or copy that subtree.

If a project has more than one `CLAUDE.md` (for example a nested one for a campaign or sub-brand), each table is scoped to its own file. The `File` column of a nested `CLAUDE.md` is relative to that nested folder.

### Always Open Claude Code at the Project Root

Open Claude Code at the project's root directory. Don't open it in a subfolder like `campaigns/campaign-xyz/`, even when your task only concerns that campaign. Claude Code loads `.claude/settings.json` (permissions, hooks, sandbox-relevant env vars) **only** from the actual startup directory. Unlike `CLAUDE.md`, it doesn't search upward through the directory tree for that file, so starting in a subfolder silently skips your project settings.

Starting at the root costs nothing in context precision. Nested `CLAUDE.md` files (for example a campaign-scoped one in `campaigns/campaign-xyz/`) still load automatically as soon as Claude Code reads any file inside that subfolder, with no `cd` required. So when you start a task on a specific campaign, have Claude Code read a file from that subfolder first, ideally the campaign's own briefing or context document. That's a sensible first step before content creation anyway, and it pulls in the right nested `CLAUDE.md` as a side effect.

---

## Contributing

Issues and pull requests are welcome. If you've spotted a gap or a rough edge, please open an issue first so we can agree on the approach.

---

## License

[MIT](LICENSE), Copyright (c) 2026 Michael van Laar

---

<p align="center">
  Part of the <a href="https://github.com/clever-cc-plugins">clever-cc-plugins</a> family · <a href="https://github.com/clever-cc-plugins/marketplace">marketplace</a> · <a href="https://github.com/clever-cc-plugins/cc-config">cc-config</a> · <a href="https://github.com/clever-cc-plugins/cc-concept">cc-concept</a> · <a href="https://github.com/clever-cc-plugins/cc-career">cc-career</a> · <a href="https://github.com/clever-cc-plugins/cc-coach">cc-coach</a> · <a href="https://github.com/clever-cc-plugins/cc-handoff">cc-handoff</a> · <a href="https://github.com/clever-cc-plugins/cc-chime">cc-chime</a> · <a href="https://github.com/clever-cc-plugins/cc-chef">cc-chef</a>
</p>
