# Claude Code Skills: Content Creation

Reusable [Claude Code](https://claude.ai/code) skills for content creation projects. Install one skill suite or individual skills into any project with a single command.

---

## Available Skill Suites

### `cc-content` — Content Creation

| Skill                               | What it does                                                                                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cc-content:onboarding**           | Interviews you about your brand, voice, and audience, then populates `.claude/context/` with structured context files that all other skills can read |
| **cc-content:create-linkedin-post** | Drafts LinkedIn posts that match your brand voice, format guidelines, and audience — with a built-in feedback step                                   |
| **cc-content:samples-curation**     | Saves gold-standard content examples with annotations to `.claude/context/samples.md` so skills can use them as reference material                   |
| **cc-content:session-wrap**         | Reviews session deliverables, logs feedback and corrections, detects recurring patterns, and commits your work                                       |
| **cc-content:update**               | Updates installed cc-content skills and shared reference files to their latest versions from the source repository                                   |
| **cc-content:new-skill**            | Template and guide for authoring new content skills in this suite                                                                                    |

---

## Installation

### Option A — Install script (recommended)

From the root of your project, run:

```bash
# Install the entire cc-content skill suite
bash <(curl -fsSL https://raw.githubusercontent.com/MichaelvanLaar/claude-code-skills-for-content-creation/main/install.sh) cc-content

# Install all available skill suites
bash <(curl -fsSL https://raw.githubusercontent.com/MichaelvanLaar/claude-code-skills-for-content-creation/main/install.sh) --all

# Update already-installed skills
bash <(curl -fsSL https://raw.githubusercontent.com/MichaelvanLaar/claude-code-skills-for-content-creation/main/install.sh) --update cc-content

# Install into a specific directory
bash <(curl -fsSL https://raw.githubusercontent.com/MichaelvanLaar/claude-code-skills-for-content-creation/main/install.sh) --target ~/projects/my-content-project cc-content
```

Or clone first and run locally:

```bash
git clone https://github.com/MichaelvanLaar/claude-code-skills-for-content-creation.git
cd claude-code-skills-for-content-creation
bash install.sh cc-content --target ~/projects/my-content-project
```

### Option B — Manual copy

Copy the `.claude/skills/cc-content/` folder into `.claude/skills/` of your target project:

```
your-project/
└── .claude/
    └── skills/
        └── cc-content/
            ├── onboarding/
            │   └── SKILL.md
            ├── create-linkedin-post/
            │   ├── SKILL.md
            │   └── format-guidelines.md
            └── ...
```

Also copy `.claude/skills/_shared/` for the shared reference files the skills depend on.

---

## Getting Started

**Step 1 — Run onboarding**

After installing, open your project in Claude Code and run the onboarding skill:

```
/cc-content:onboarding
```

This populates `.claude/context/` with your brand voice, company profile, and buyer personas. The other skills read this context automatically.

**Step 2 — Create content**

Run any output skill:

```
/cc-content:create-linkedin-post
```

**Step 3 — Curate good examples**

When a piece of content lands well, save it as a reference sample:

```
/cc-content:samples-curation
```

**Step 4 — Wrap your session**

At the end of each working session, commit your work and log any corrections:

```
/cc-content:session-wrap
```

**Step 5 — Stay up to date**

Pull the latest skill versions from the source repository:

```
/cc-content:update
```

---

## Context Architecture

Skills follow a three-level context model:

| Level              | Location                                  | What goes here                                                                      |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| **Company scope**  | `.claude/context/`                        | Brand voice, buyer personas, company profile — applies to all work for this company |
| **Format scope**   | `.claude/skills/cc-content/<skill>/`      | Structure rules, length limits, tone calibrations for one output type               |
| **Campaign scope** | Project subfolders (e.g. `campaigns/q3/`) | Campaign briefings, key messages, one-off constraints                               |

Load company-scope context by importing it from your project-level `CLAUDE.md`:

```markdown
@.claude/context/brand-voice.md **Read when:** producing any written content
@.claude/context/company-profile.md **Read when:** working on any deliverable
@.claude/context/buyer-personas.md **Read when:** targeting content at a specific audience segment
```

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Michael van Laar
