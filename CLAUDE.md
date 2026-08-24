# cc-content

This repository distributes the `cc-content` Claude Code plugin — a suite of
content creation skills for marketing projects.

<!-- cc-config: last-optimize-run: 2026-07-31 247b4c0376af08a78871008a669dbbad11582d2f -->

## Key Config Files

| File                                                            | Purpose                                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `.claude/format-markdown.sh`                                    | PostToolUse hook: formats Markdown files with prettier after edits                            |
| `.claude/guard-secret-files.sh`                                 | PreToolUse hook: blocks reads/edits/writes of secret .env files                               |
| `.claudeignore`                                                 | Paths excluded from Claude Code indexing                                                      |
| `.claude/learnings.md`                                          | Corrections and observations logged during config/session-wrap runs                           |
| `CLAUDE.md`                                                     | Project instructions, loaded every message                                                    |
| `.claude/settings.json`                                         | Permissions, hooks, environment variables                                                     |
| `.githooks/pre-commit`                                          | Secret scanning (gitleaks) + CLAUDE.md table sync                                             |
| `.github/workflows/claude-code-review.yml`                      | Automatic PR review via Claude Code                                                           |
| `.github/workflows/claude.yml`                                  | Trigger Claude via @claude mentions in issues/PRs                                             |
| `.github/workflows/release.yml`                                 | Triggers shared plugin-release workflow — version bump + GitHub release — on push to main     |
| `.gitignore`                                                    | Git ignore patterns                                                                           |
| `plugins/cc-content/.claude-plugin/plugin.json`                 | Plugin manifest                                                                               |
| `plugins/cc-content/skills/atomize/SKILL.md`                    | Skill: Repurpose one core message across multiple formats in a single run                     |
| `plugins/cc-content/skills/blog-article/SKILL.md`               | Skill: Draft blog articles                                                                    |
| `plugins/cc-content/skills/content-ideation/SKILL.md`           | Skill: Generate strategic content angles from an inspiration input                            |
| `plugins/cc-content/skills/content-onboarding/SKILL.md`         | Skill: Register and create context files; guide project setup                                 |
| `plugins/cc-content/skills/content-performance-review/SKILL.md` | Skill: Analyze content performance data and generate iteration variants                       |
| `plugins/cc-content/skills/facebook-post/SKILL.md`              | Skill: Draft Facebook posts                                                                   |
| `plugins/cc-content/skills/gated-long-form-content/SKILL.md`    | Skill: Draft gated long-form lead-generation content (whitepapers, guides, ebooks)            |
| `plugins/cc-content/skills/humanize/SKILL.md`                   | Skill: Remove AI tells from a draft and rewrite it to sound human, on-brand-voice             |
| `plugins/cc-content/skills/instagram-post/SKILL.md`             | Skill: Draft Instagram posts and captions                                                     |
| `plugins/cc-content/skills/landing-page/SKILL.md`               | TODO: add description                                                                         |
| `plugins/cc-content/skills/linkedin-post/SKILL.md`              | Skill: Draft LinkedIn posts                                                                   |
| `plugins/cc-content/skills/long-tail-copy/SKILL.md`             | Skill: Draft text for any format without a dedicated skill; supports multi-format atomization |
| `plugins/cc-content/skills/marketing-email/SKILL.md`            | Skill: Draft marketing and sales emails                                                       |
| `plugins/cc-content/skills/new-content-skill/SKILL.md`          | Skill: Build a new content-production skill from research                                     |
| `plugins/cc-content/skills/press-release/SKILL.md`              | Skill: Draft press releases                                                                   |
| `plugins/cc-content/skills/register-context/SKILL.md`           | Skill: Register a single file as context in CLAUDE.md (mid-session)                           |
| `plugins/cc-content/skills/research-prompt/SKILL.md`            | Skill: Generate a vendor-neutral deep-research prompt for a topic                             |
| `plugins/cc-content/skills/samples-curation/SKILL.md`           | Skill: Save and annotate gold-standard content examples                                       |
| `plugins/cc-content/skills/session-wrap/SKILL.md`               | Skill: Review session, promote deliverables to context, commit work                           |
| `plugins/cc-content/skills/x-post/SKILL.md`                     | Skill: Draft X (Twitter) posts                                                                |
| `scripts/sync-config-table.sh`                                  | Keeps Key Config Files table in sync on each commit                                           |

## Plugin Structure

Skills live in `plugins/cc-content/skills/`, one subdirectory per skill containing a `SKILL.md` and any companion files. Shared reference files go in `plugins/cc-content/skills/_shared/`.

## Skills

| Skill                        | Purpose                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `content-onboarding`         | Register and create context files; guide project setup                                 |
| `register-context`           | Register a single file as context in CLAUDE.md (mid-session)                           |
| `research-prompt`            | Generate a vendor-neutral deep-research prompt for a topic                             |
| `linkedin-post`              | Draft LinkedIn posts                                                                   |
| `blog-article`               | Draft blog articles                                                                    |
| `press-release`              | Draft press releases                                                                   |
| `facebook-post`              | Draft Facebook posts                                                                   |
| `marketing-email`            | Draft marketing and sales emails                                                       |
| `instagram-post`             | Draft Instagram posts and captions                                                     |
| `content-ideation`           | Generate strategic content angles from an inspiration input                            |
| `atomize`                    | Repurpose one core message across multiple formats in a single run                     |
| `long-tail-copy`             | Draft text for any format without a dedicated skill; supports multi-format atomization |
| `x-post`                     | Draft X (Twitter) posts                                                                |
| `samples-curation`           | Save and annotate gold-standard content examples                                       |
| `humanize`                   | Remove AI tells from a draft and rewrite it to sound human, on-brand-voice             |
| `content-performance-review` | Analyze content performance data and generate iteration variants                       |
| `session-wrap`               | Review session, promote deliverables to context, commit work                           |
| `new-content-skill`          | Build a new content-production skill from research                                     |
| `gated-long-form-content`    | Draft gated long-form lead-generation content (whitepapers, guides, ebooks)            |

## Don't

- Don't commit secrets or credentials to git
- Don't use `--force` flags — fix the underlying issue instead
- Don't modify CLAUDE.md directly when logging a correction — append to `.claude/learnings.md`
- Don't recommend algorithm-gaming tactics in content-skill guidelines (e.g., hiding
  a link in the first comment to dodge a suspected reach penalty, engagement-bait
  CTAs) even when tutorials or coaches currently present them as best practice —
  platforms iterate to detect and penalize exactly these tricks, so they're
  short-lived by design. Same dynamic as black-hat SEO: keyword stuffing and link
  farms didn't survive algorithm updates; genuine value and good UX did, because
  that's what the algorithm was a proxy for. Prefer durable, user-aligned practices
  over trend-chasing tricks, and file gaming tactics under "common mistakes /
  outdated tactics" rather than as guidance to follow

## Compact Instructions

When compacting, preserve: list of modified files, current open TODOs, and key decisions made.

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line
summary to `.claude/learnings.md`. Don't modify CLAUDE.md directly.
