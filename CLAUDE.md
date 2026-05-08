# cc-content

This repository distributes the `cc-content` Claude Code plugin — a suite of
content creation skills for marketing projects.

## Plugin Structure

Skills live in `plugins/cc-content/skills/`, one subdirectory per skill containing a `SKILL.md` and any companion files. Shared reference files go in `plugins/cc-content/skills/_shared/`.

## Skills

| Skill                         | Purpose                                            |
| ----------------------------- | -------------------------------------------------- |
| `cc-content-onboarding`       | Populate `.claude/context/` via interview          |
| `cc-content-linkedin-post`    | Draft LinkedIn posts                               |
| `cc-content-samples-curation` | Save and annotate gold-standard content examples   |
| `cc-content-session-wrap`     | Review session, collect feedback, commit work      |
| `cc-content-new-skill`        | Build a new content-production skill from research |

## Don't

- Don't commit secrets or credentials to git
- Don't use `--force` flags — fix the underlying issue instead
- Don't modify CLAUDE.md directly when logging a correction — append to `.claude/learnings.md`

## Compact Instructions

When compacting, preserve: list of modified files, current open TODOs, and key decisions made.

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line
summary to `.claude/learnings.md`. Don't modify CLAUDE.md directly.
