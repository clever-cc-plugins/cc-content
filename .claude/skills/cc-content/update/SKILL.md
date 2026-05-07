---
name: cc-content:update
description: >
  Update installed cc-content skills to their latest versions from the source
  repository. Use when the user says "update content skills", "update
  cc-content skills", "get the latest content skills", "refresh content
  skills", or "cc-content update".
allowed-tools: Bash, Read
---

# Update cc-content Skills

Fetch the latest versions of the installed cc-content skills and shared
reference files from the source repository and replace the local copies.

## Step 1: Check prerequisites

Verify `.claude/skills/cc-content/` exists in the current directory:

```bash
ls .claude/skills/cc-content/ 2>/dev/null || echo "NOT_FOUND"
```

If the directory is missing, abort and tell the user: "No
`.claude/skills/cc-content/` directory found. Run `install.sh` from the
source repository first — see the README at
github.com/MichaelvanLaar/claude-code-skills-for-content-creation."

## Step 2: Detect installed skills

```bash
for skill in create-linkedin-post new-skill onboarding samples-curation session-wrap update; do
  [ -d ".claude/skills/cc-content/$skill" ] && echo "$skill: installed" || echo "$skill: not installed"
done
[ -d ".claude/skills/_shared" ] && echo "_shared: installed" || echo "_shared: not installed"
```

Update rules:

- **`update`** — always update (enables self-update).
- **All other cc-content skills** — only if already installed. Do not install
  skills the user has not chosen to install.
- **`_shared/`** — only if the directory already exists in the project.

## Step 3: Download and replace

```bash
BASE_URL="https://raw.githubusercontent.com/MichaelvanLaar/claude-code-skills-for-content-creation/main"

update_file() {
  local remote_path="$1"
  local local_path="$2"
  if curl -fsSL "$BASE_URL/$remote_path" -o "$local_path"; then
    echo "✓ $remote_path"
  else
    echo "✗ $remote_path (download failed)"
  fi
}

# cc-content:update — always self-update first
mkdir -p ".claude/skills/cc-content/update"
update_file ".claude/skills/cc-content/update/SKILL.md" ".claude/skills/cc-content/update/SKILL.md"

# Skills with a single SKILL.md
for skill in new-skill onboarding samples-curation session-wrap; do
  if [ -d ".claude/skills/cc-content/$skill" ]; then
    update_file ".claude/skills/cc-content/$skill/SKILL.md" ".claude/skills/cc-content/$skill/SKILL.md"
  else
    echo "— skipped cc-content:$skill (not installed)"
  fi
done

# Skills with additional files
if [ -d ".claude/skills/cc-content/create-linkedin-post" ]; then
  update_file ".claude/skills/cc-content/create-linkedin-post/SKILL.md" ".claude/skills/cc-content/create-linkedin-post/SKILL.md"
  update_file ".claude/skills/cc-content/create-linkedin-post/format-guidelines.md" ".claude/skills/cc-content/create-linkedin-post/format-guidelines.md"
else
  echo "— skipped cc-content:create-linkedin-post (not installed)"
fi

# _shared reference files
if [ -d ".claude/skills/_shared" ]; then
  for file in context-categories.md persuasion-principles.md storytelling-frameworks.md content-skill-research-brief.md; do
    update_file ".claude/skills/_shared/$file" ".claude/skills/_shared/$file"
  done
else
  echo "— skipped _shared (not installed)"
fi
```

## Step 4: Report and wrap up

After the downloads complete:

1. List each skill: updated, skipped, or failed.
2. Remind the user to commit the updated files:
   `git add .claude/skills/ && git commit -m "chore: update cc-content skills to latest version"`.

## What NOT to do

- Do not install skills or `_shared/` if they were not already present.
- Do not run any skill after updating.
- Do not modify any other project files.

## Feedback

Before ending the session, ask: "Were all skills updated successfully? If
anything went wrong, I'll log it to `.claude/learnings.md`."
