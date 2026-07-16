# cc-content

This repository distributes the `cc-content` Claude Code plugin — a suite of
content creation skills for marketing projects.

## Key Config Files

| File                                                             | Purpose                                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| `.claude/format-markdown.sh`                                     | PostToolUse hook: formats Markdown files with prettier after edits  |
| `.claude/guard-secret-files.sh`                                  | PreToolUse hook: blocks reads/edits/writes of secret .env files     |
| `.claudeignore`                                                  | Paths excluded from Claude Code indexing                            |
| `CLAUDE.md`                                                      | Project instructions, loaded every message                          |
| `.claude/settings.json`                                          | Permissions, hooks, environment variables                           |
| `.githooks/pre-commit`                                           | Secret scanning (gitleaks) + CLAUDE.md table sync                   |
| `.github/workflows/claude-code-review.yml`                       | Automatic PR review via Claude Code                                 |
| `.github/workflows/claude.yml`                                   | Trigger Claude via @claude mentions in issues/PRs                   |
| `.gitignore`                                                     | Git ignore patterns                                                 |
| `plugins/cc-content/.claude-plugin/plugin.json`                  | Plugin manifest                                                     |
| `plugins/cc-content/skills/cc-content-blog-article/SKILL.md`     | Skill: Draft blog articles                                          |
| `plugins/cc-content/skills/cc-content-ideation/SKILL.md`         | Skill: Generate strategic content angles from an inspiration input  |
| `plugins/cc-content/skills/cc-content-linkedin-post/SKILL.md`    | Skill: Draft LinkedIn posts                                         |
| `plugins/cc-content/skills/cc-content-new-skill/SKILL.md`        | Skill: Build a new content-production skill from research           |
| `plugins/cc-content/skills/cc-content-onboarding/SKILL.md`       | Skill: Register and create context files; guide project setup       |
| `plugins/cc-content/skills/cc-content-promote/SKILL.md`          | Skill: Register a single file as context in CLAUDE.md (mid-session) |
| `plugins/cc-content/skills/cc-content-research-prompt/SKILL.md`  | Skill: Generate a vendor-neutral deep-research prompt for a topic   |
| `plugins/cc-content/skills/cc-content-samples-curation/SKILL.md` | Skill: Save and annotate gold-standard content examples             |
| `plugins/cc-content/skills/cc-content-session-wrap/SKILL.md`     | Skill: Review session, promote deliverables to context, commit work |
| `plugins/cc-content/skills/cc-content-text/SKILL.md`             | Skill: Draft text for any format without a dedicated skill          |
| `scripts/sync-config-table.sh`                                   | Keeps Key Config Files table in sync on each commit                 |

## Plugin Structure

Skills live in `plugins/cc-content/skills/`, one subdirectory per skill containing a `SKILL.md` and any companion files. Shared reference files go in `plugins/cc-content/skills/_shared/`.

## Skills

| Skill                         | Purpose                                                      |
| ----------------------------- | ------------------------------------------------------------ |
| `cc-content-onboarding`       | Register and create context files; guide project setup       |
| `cc-content-promote`          | Register a single file as context in CLAUDE.md (mid-session) |
| `cc-content-research-prompt`  | Generate a vendor-neutral deep-research prompt for a topic   |
| `cc-content-linkedin-post`    | Draft LinkedIn posts                                         |
| `cc-content-blog-article`     | Draft blog articles                                          |
| `cc-content-ideation`         | Generate strategic content angles from an inspiration input  |
| `cc-content-text`             | Draft text for any format without a dedicated skill          |
| `cc-content-samples-curation` | Save and annotate gold-standard content examples             |
| `cc-content-session-wrap`     | Review session, promote deliverables to context, commit work |
| `cc-content-new-skill`        | Build a new content-production skill from research           |

## Don't

- Don't commit secrets or credentials to git
- Don't use `--force` flags — fix the underlying issue instead
- Don't modify CLAUDE.md directly when logging a correction — append to `.claude/learnings.md`

## Compact Instructions

When compacting, preserve: list of modified files, current open TODOs, and key decisions made.

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line
summary to `.claude/learnings.md`. Don't modify CLAUDE.md directly.
