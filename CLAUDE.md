# Claude Code Content Creation Skills

This repository distributes the `cc-content` Claude Code plugin — a suite of
content creation skills for marketing projects.

## Plugin Structure

```
plugins/cc-content/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    ├── _shared/                         shared reference files for skills
    ├── cc-content-linkedin-post/
    ├── cc-content-new-skill/
    ├── cc-content-onboarding/
    ├── cc-content-samples-curation/
    └── cc-content-session-wrap/
```

Each skill lives in its own subdirectory containing a `SKILL.md` and any
companion files (e.g., `format-guidelines.md`).

## Skills

| Skill                         | Purpose                                            |
| ----------------------------- | -------------------------------------------------- |
| `cc-content-onboarding`       | Populate `.claude/context/` via interview          |
| `cc-content-linkedin-post`    | Draft LinkedIn posts                               |
| `cc-content-samples-curation` | Save and annotate gold-standard content examples   |
| `cc-content-session-wrap`     | Review session, collect feedback, commit work      |
| `cc-content-new-skill`        | Build a new content-production skill from research |

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line
summary to `.claude/learnings.md`. Don't modify CLAUDE.md directly.
