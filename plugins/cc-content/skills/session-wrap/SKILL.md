---
name: session-wrap
description: >
  Use this skill at the end of a content creation session to review deliverables,
  collect feedback, review learnings (promote, keep or retire), and create a git commit.
  Invoke when the user says "wrap up", "end session", "session wrap", "wrap session",
  "commit session work", or "close out this session".
allowed-tools: Read, Write, Edit, Bash
disable-model-invocation: true
---

# Session Wrap Skill

You are closing out a content creation session. The goals are: (1) review what
was produced, (2) collect corrections for any skills used, (3) review the
learnings (promote, keep or retire), and (4) commit
all session work with a clean, well-labelled message.

## Step 0: Recall learnings

Read `../_shared/learnings-protocol.md` and follow its **Recall** section.

## Step 1: Review deliverables

Run git status to understand what changed during the session:

```bash
git status --short
```

If git status reports **no changes**:

> "No changes detected in git. Would you still like to collect feedback and
> review learnings? (yes / no)"

If the owner says no, skip to Step 6. If yes, continue but skip the file summary.

If changes **exist**, group them into four categories and present them:

```
─────────────────────────────────────────────
Session deliverables
─────────────────────────────────────────────
Context files (registered context location, e.g. context/):
  <list of modified/untracked files in the registered context location>

Deliverables (content output files):
  <list of modified/untracked files that are not in .claude/ or skill folders>

Skill files (.claude/skills/):
  <list of modified/untracked files in .claude/skills/>

Other:
  <any remaining files>
─────────────────────────────────────────────
```

Omit any empty categories. If all changes are in a single category, still use
the labelled format so the owner sees what type of work was done.

## Step 1b: Promote deliverables to context

Look at the deliverables listed in Step 1 — files that are not in the
registered context location, `.claude/`, or skill folders.

If any deliverables were created or significantly modified, ask:

> "Are any of these worth registering as context for future work?
> For example: a completed whitepaper, evergreen guide, or reference piece —
> something skills should be able to build upon later.
> (Name the files, or say 'none' to skip.)"

- If the owner names files: for each one, run the promote flow inline:
  1. Read the file.
  2. Suggest a label (2–5 words) and a one-sentence summary drawn from the content.
  3. Ask: "Register as `| [label] | [path] | [summary] |`? (yes / edit / skip)"
  4. On yes: add the row to the appropriate `## Context files` table in CLAUDE.md.
     If the section doesn't exist yet, create it first.
  5. Confirm: "✓ Registered `[path]` as context."
- If the owner says 'none' or skips: continue to Step 2.

You can also invoke `/register-context` at any point during a session
to register a file immediately, without waiting for session wrap.

## Step 1c: Check shared reference files for updates

`new-content-skill` (end-user mode) copies four shared reference files into
project-local custom skills: `.claude/skills/_shared/storytelling-frameworks.md`,
`.claude/skills/_shared/persuasion-principles.md`,
`.claude/skills/_shared/readability-patterns.md` and
`.claude/skills/_shared/learnings-protocol.md`. That copy happens once,
at creation time — plugin updates to these files never reach a project
automatically. This step closes that gap.

Check which of these files exist in the project:

```bash
ls .claude/skills/_shared/storytelling-frameworks.md .claude/skills/_shared/persuasion-principles.md .claude/skills/_shared/readability-patterns.md .claude/skills/_shared/learnings-protocol.md 2>/dev/null
```

If **none exists**: skip this step silently — the project has no project-local
custom skill using these files.

For each file that **does** exist, compare it against this plugin's own bundled
copy at `${CLAUDE_SKILL_DIR}/../_shared/<file>.md` (relative to this skill's own
directory — same plugin, so this path always resolves regardless of install
location):

For `learnings-protocol.md`, use the content check at the end of this step. For the other three files, use the dates:

1. Read the `_Last updated: YYYY-MM-DD_` line (line 3) from both the project's
   copy and the plugin's bundled copy. If the project's copy has no such line,
   treat it as predating the marker — always older than the plugin's copy.
2. If the dates match: say nothing for this file and move to the next.
3. If the plugin's copy is newer (or the project's has no marker): ask, per file —

   > "Your project's copy of `<file>` (last updated <project-date-or-'unknown'>)
   > is older than the plugin's version (last updated <plugin-date>). Refresh it
   > with the plugin's version? This overwrites any local edits to the file.
   > (yes / no / show diff)"
   - **show diff**: run `diff .claude/skills/_shared/<file> ${CLAUDE_SKILL_DIR}/../_shared/<file>`,
     show the output, then re-ask yes/no.
   - **yes**: copy the plugin's file over the project's copy, preserving the
     project path. Confirm: "✓ Refreshed `.claude/skills/_shared/<file>` (now
     <plugin-date>)."
   - **no**: leave the file as-is. Note it will ask again at the next session wrap.

**`learnings-protocol.md` — compare by content.** It is a shared protocol that nobody should customize, and a date is bumped by hand and can be missed. Run `diff -q .claude/skills/_shared/learnings-protocol.md ${CLAUDE_SKILL_DIR}/../_shared/learnings-protocol.md` and act on its exit code:

- **0** (identical): say nothing and move on.
- **1** (the files differ): ask "Your project's copy of `learnings-protocol.md` differs from the plugin's current version (it can also be newer, for example after a plugin downgrade; "show diff" shows which). Refresh it with the plugin's version? This overwrites any local edits to the file. (yes / no / show diff)". On **show diff**, run `diff` on the two files, show the output, then re-ask yes/no. On **yes**, copy the plugin's file over the project's copy and confirm: "✓ Refreshed `.claude/skills/_shared/learnings-protocol.md`." On **no**, leave the file as-is; it will ask again at the next session wrap.
- **anything else** (for example 2, when a path does not resolve): report the error in one line and do not offer a refresh.

Do not overwrite silently under any circumstance — the project's copy may have
been deliberately customized.

## Step 2: Identify skills used

Ask:

> "Which output-format skills did you use during this session?
> (Examples: cc-content:linkedin-post, other skills you may have invoked.
> You can list multiple, or say 'none'.)"

Wait for the response.

- If the owner says **none** or gives an empty response: skip Step 3 and proceed
  to Step 4.
- If the owner lists one or more skills: proceed to Step 3.

## Step 3: Collect feedback per skill

For each skill the owner listed, ask:

> "How did **`<skill-name>`** perform? Did the output meet expectations?
> If you have a correction, describe it — or press Enter to skip."

- If the owner **provides a correction**: record it for the learnings step.
- If the owner **skips**: note "no correction for `<skill-name>`" and move on.

After collecting feedback for all listed skills, proceed to Step 4.

## Step 4: Append to learnings

Record each correction from Step 3 per the protocol's **Writing** section (`../_shared/learnings-protocol.md`), tagged with the skill's own plugin and name, `[<plugin>:<skill-name>]`, source `corrected`. A name the owner gave as `cc-email:newsletter` keeps its own plugin prefix, and an unqualified name uses `cc-content`. Then follow its **Confirming** section.

If no corrections were collected, skip this step silently.

## Step 5: Review learnings

Read `../_shared/learnings-protocol.md` and follow its **Reviewing** section. Scope: entries prefixed `[cc-content:` that are dated today, plus older `[cc-content:` entries that group with them. Entries from other plugins are managed by their own tooling and must not be surfaced or promoted here. If the owner says "review all", the scope is every `[cc-content:` entry.

If `.claude/learnings.md` is absent or no entry is in scope, say:

> No new learnings to review. Say `review all` to include older entries.

Then proceed to Step 6.

Otherwise present each group or single entry:

```
─────────────────────────────────────────────
Learnings review: <skill-name>
─────────────────────────────────────────────
  • [<date>] <entry 1> (<source>)
  • [<date>] <entry 2> (<source>)
─────────────────────────────────────────────
```

After the last group, show the footer once: "Older entries are not shown. Say `review all` to include them."

For each group or single entry, state the entry count, the sources and a one-line reason, then propose Promote, Keep or Retire. Ask:

> "What should I do with this? Promote to:
> (a) `<skill-name>`'s format guidelines
> (b) the project `CLAUDE.md`
> (c) the brand voice guide `<path>`
> Or: (d) Keep it in learnings, or (e) Retire it."

Option (a) covers the format guidelines of one skill. When a group spans several skills, propose one (a) target per skill, and remove only the entries each chosen target covers.

Show option (a) only when that skill's format guidelines live inside the current project: a project-local skill under `.claude/skills/`, or you are working in the plugin's own repository (the resolved path begins with the project root and does not contain `/plugins/cache/`). A plugin installed from a marketplace keeps its guidelines outside the project, so a rule written there would apply to every project and be lost on the next plugin update. For such a skill, leave (a) out and say in one line that (b) keeps the rule in this project.

Show option (c) only when the entry concerns voice (tone, wording, phrasing, punctuation habits) rather than format, and at least one voice guide is registered in the `## Context files` table. Detect a voice guide by its summary (a brand voice guide, tone, or writing style), not by its label. Show only the options that apply among (a), (b), (c), (d) and (e), and keep the letters.

Handle responses:

**Option (a) — format guidelines**:

Ask: "How should I phrase the rule? (Or describe the correction and I'll draft it.)"

This option is offered only for project-local skills or inside the plugin's own repository, so the paths below point inside the project. Determine the skill's format guidelines path. For `cc-content:linkedin-post`,
the format guidelines file is at `${CLAUDE_SKILL_DIR}/../linkedin-post/format-guidelines.md`
(relative to this skill's directory). For other skills, look for a `format-guidelines.md`
inside the skill's directory.

Read the file, then append the new rule under an appropriate existing section or
create a new `## Promoted Rules` section at the bottom.

Confirm: "✓ Rule added to `<path>`."

**Option (b) — CLAUDE.md**:

Ask: "How should I phrase the rule in `CLAUDE.md`? (Or describe it and I'll draft it.)"

Read `CLAUDE.md`, locate the `## Learnings` section, and append the rule there.
If no `## Learnings` section exists, add it before appending.

Confirm: "✓ Rule added to `CLAUDE.md`."

**Option (c) — brand voice guide**:

If several voice guides are registered, ask which one. Draft the rule per the rule conventions of the guide (one rule = observable behavior + scope + example; positive phrasing; a ban paired with an "instead"; a priority mark in the guide's language, e.g. must / should / may, or MUSS / SOLL / KANN in a German guide), show it to the owner, and ask for confirmation or edits. Then insert it into the matching section of the guide (section 3 or 4 for detailed rules, section 1 for a core rule of any priority (must, should or may), appended at the end of the core list so existing rule numbers stay valid) and append a change-log entry (section 10) dated today. Update the as-of date in section 0, and the matching line in the section 8 checklist if the rule changes what it checks.

If the file has no numbered guide sections (for example a quick voice note from `content-onboarding`), append the rule under the most fitting existing heading, or under a new `Rules` heading, and add a dated change-log line at the end of the file, creating a `Change log` heading if absent. Mention that `/cc-content:brand-voice` in refine mode can give the file the full guide structure.

Confirm: "✓ Rule added to `<path>`."

**Option (d) — keep**:

Leave the entries unchanged in `.claude/learnings.md`. Say: "Kept in `.claude/learnings.md`."

**Option (e) — retire**:

Remove the entries from `.claude/learnings.md`; when no entries remain below the header, delete the file, or leave only the header if you cannot delete files. Tell the user the reason and, if applicable, the file that already covers the entry (the protocol's Retire rule). Say: "✓ Retired from `.claude/learnings.md`."

After a promotion (a), (b) or (c), remove only the entries the chosen target covers from `.claude/learnings.md`, as the protocol's **Reviewing** section requires.

Process all groups and entries in scope before moving on.

## Step 6: Commit

Check for files to commit:

```bash
git status --short
```

If nothing to commit, say: "Nothing to commit — session is clean." and close with
the summary in Step 7.

If there are changes, stage them explicitly. Do NOT use `git add -A` or
`git add .`. Instead, list each file that should be committed:

Ask:

> "I'll stage the following files for this commit:
> <list of modified/untracked files from the session, excluding any .env or secrets/ patterns>
>
> Shall I proceed? (yes / no / edit the list)"

- **Yes**: stage each file individually, then continue.
- **No**: skip the commit step and close with Step 7.
- **Edit**: ask which files to add or remove, update the list, show it again.

After staging, propose a commit message following Conventional Commits with gitmoji.

Use the session changes to determine the type:

| Change type                             | Conventional Commits prefix | Gitmoji |
| --------------------------------------- | --------------------------- | ------- |
| New content deliverables                | `feat`                      | ✨      |
| Context file updates (brand voice, etc) | `feat` or `docs`            | 📝      |
| Skill files added or updated            | `feat`                      | ✨      |
| Learnings / corrections only            | `docs`                      | 📝      |
| Mixed session                           | `feat`                      | ✨      |
| Bug fix or correction to existing file  | `fix`                       | 🐛      |

Present the proposed message:

```
─────────────────────────────────────────────
Proposed commit message
─────────────────────────────────────────────
<gitmoji> <type>: <short description>

<optional body with bullet points if multiple distinct changes>
─────────────────────────────────────────────
```

Ask: "Shall I commit with this message? (yes / edit / skip)"

- **Yes**: run the commit.
- **Edit**: ask for the owner's preferred message, then commit with that.
- **Skip**: say "Commit skipped. Files are staged but not committed."

After a successful commit, show the commit hash:

> "✓ Committed: `<hash>` — <first line of commit message>"

## Step 7: Session summary

Close with a brief summary:

```
─────────────────────────────────────────────
Session complete
─────────────────────────────────────────────
Deliverables reviewed:   <N files>
Learnings logged:        <N entries (or "none")>
Patterns promoted:       <N (or "none")>
Learnings retired:       <N (or "none")>
Committed:               <hash> (or "not committed")
─────────────────────────────────────────────
```

Then say:

> "Session wrapped. Run `/session-wrap` again at the end of your next session."
