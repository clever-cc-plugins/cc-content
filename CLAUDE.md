# cc-content

This repository distributes the `cc-content` Claude Code plugin — a suite of
content creation skills for marketing projects.

<!-- cc-config: last-optimize-run: 2026-11-05 9a062978778431d0c9498da8f832af68340fb479 -->

## Key Config Files

| File                                                            | Purpose                                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `.claude/format-markdown.sh`                                    | PostToolUse hook: formats Markdown files with prettier after edits                            |
| `.claude/guard-secret-files.sh`                                 | PreToolUse hook: blocks reads/edits/writes of secret .env files                               |
| `.claude/learnings.md`                                          | Corrections and observations logged during config/session-wrap runs                           |
| `.claude/settings.json`                                         | Permissions, hooks, environment variables                                                     |
| `.githooks/pre-commit`                                          | Secret scanning (gitleaks) + CLAUDE.md table sync                                             |
| `.github/workflows/claude-code-review.yml`                      | Automatic PR review via Claude Code                                                           |
| `.github/workflows/claude.yml`                                  | Trigger Claude via @claude mentions in issues/PRs                                             |
| `.github/workflows/release.yml`                                 | Triggers shared plugin-release workflow — version bump + GitHub release — on push to main     |
| `.gitignore`                                                    | Git ignore patterns                                                                           |
| `CLAUDE.md`                                                     | Project instructions, loaded every message                                                    |
| `plugins/cc-content/.claude-plugin/plugin.json`                 | Plugin manifest                                                                               |
| `plugins/cc-content/skills/atomize/SKILL.md`                    | Skill: Repurpose one core message across multiple formats in a single run                     |
| `plugins/cc-content/skills/blog-article/SKILL.md`               | Skill: Draft blog articles                                                                    |
| `plugins/cc-content/skills/brand-voice/SKILL.md`                | Skill: Build or refine a brand voice guide from samples, interview, and project context       |
| `plugins/cc-content/skills/content-ideation/SKILL.md`           | Skill: Generate strategic content angles from an inspiration input                            |
| `plugins/cc-content/skills/content-onboarding/SKILL.md`         | Skill: Register and create context files; guide project setup                                 |
| `plugins/cc-content/skills/content-performance-review/SKILL.md` | Skill: Analyze content performance data and generate iteration variants                       |
| `plugins/cc-content/skills/facebook-post/SKILL.md`              | Skill: Draft Facebook posts                                                                   |
| `plugins/cc-content/skills/gated-long-form-content/SKILL.md`    | Skill: Draft gated long-form lead-generation content (whitepapers, guides, ebooks)            |
| `plugins/cc-content/skills/humanize/SKILL.md`                   | Skill: Remove AI tells from a draft and rewrite it to sound human, on-brand-voice             |
| `plugins/cc-content/skills/instagram-post/SKILL.md`             | Skill: Draft Instagram posts and captions                                                     |
| `plugins/cc-content/skills/landing-page/SKILL.md`               | Skill: Draft landing pages                                                                    |
| `plugins/cc-content/skills/linkedin-post/SKILL.md`              | Skill: Draft LinkedIn posts                                                                   |
| `plugins/cc-content/skills/long-tail-copy/SKILL.md`             | Skill: Draft text for any format without a dedicated skill; supports multi-format atomization |
| `plugins/cc-content/skills/marketing-email/SKILL.md`            | Skill: Draft marketing and sales emails                                                       |
| `plugins/cc-content/skills/new-content-skill/SKILL.md`          | Skill: Build a new content-production skill from research                                     |
| `plugins/cc-content/skills/personal-email/SKILL.md`             | Skill: Draft and reply to personal one-to-one emails, professional or private                 |
| `plugins/cc-content/skills/press-release/SKILL.md`              | Skill: Draft press releases                                                                   |
| `plugins/cc-content/skills/register-context/SKILL.md`           | Skill: Register a single file as context in CLAUDE.md (mid-session)                           |
| `plugins/cc-content/skills/research-prompt/SKILL.md`            | Skill: Generate a vendor-neutral deep-research prompt for a topic                             |
| `plugins/cc-content/skills/samples-curation/SKILL.md`           | Skill: Save and annotate gold-standard content examples                                       |
| `plugins/cc-content/skills/session-wrap/SKILL.md`               | Skill: Review session, promote deliverables to context, commit work                           |
| `plugins/cc-content/skills/x-post/SKILL.md`                     | Skill: Draft X (Twitter) posts                                                                |
| `scripts/stamp-shared-files.sh`                                 | Pre-commit: stamps `_Last updated_` on changed `_shared/*.md`                                 |
| `scripts/sync-config-table.sh`                                  | Keeps Key Config Files table in sync on each commit                                           |

## Plugin Structure

Skills live in `plugins/cc-content/skills/`, one subdirectory per skill containing a `SKILL.md` and any companion files. Shared reference files go in `plugins/cc-content/skills/_shared/`.

## Tests

Run `node --test tests/brand-voice/` from the repo root (Node 18+, no dependencies). See `tests/brand-voice/README.md` for the dry-run scenarios. Run `bash tests/stamp-shared-files/test.sh` to test the pre-commit date stamping.

## Don't

- Don't commit secrets or credentials to git
- Don't use `--force` flags — fix the underlying issue instead
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

When the user corrects a mistake or points out a recurring issue, record a one-line
summary in `.claude/learnings.md` by `plugins/cc-content/skills/_shared/learnings-protocol.md`: add a source marker, and replace a contradicted entry instead of appending a second one. Don't modify CLAUDE.md directly.
