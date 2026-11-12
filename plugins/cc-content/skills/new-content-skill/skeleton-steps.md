# Generated SKILL.md — required steps

Companion file for `new-content-skill` Step 5. These are the steps the generated `SKILL.md` must contain, with the mode-dependent TODO policy for each.

Required skill steps — write each as a level-2 heading with full prose instructions:

**Step 0 — Recall learnings**
Write it as: Read `../_shared/learnings-protocol.md` and follow its **Recall** section. (End-user and plugin-dev mode both resolve `../_shared/` correctly.)

**Step 1 — Load context**
Check for a `## Context files` table in CLAUDE.md via:
`grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"`.

CLAUDE.md files may exist at multiple hierarchy levels (workspace root, project root,
sub-directory) and the harness loads all applicable ones. Where multiple tables exist, rows
from more specific CLAUDE.md files take precedence.

**Do not enumerate required categories by name.** Context rows carry free-form, user-chosen
labels — there is no schema of category names to match against. Instead, Read every file
listed in the **File** column, then assess each row's **Summary** to work out what it covers,
and map the loaded files to the skill's content needs:

| Need                    | What to look for in the Summary                                  |
| ----------------------- | ---------------------------------------------------------------- |
| Brand voice             | Writing style, tone, vocabulary, phrasing rules, things to avoid |
| Organization background | Who the company/author is, products, positioning, mission        |
| Target audience         | Reader personas, goals, challenges, job titles                   |
| Output language         | Default language, locale, or region                              |
| Format-specific rules   | Rules governing this particular output format                    |

Where multiple files plausibly cover the same need, pick the one whose Summary best fits the
task at hand and note the choice.

Warn on **semantic absence, not label absence** — "No brand voice context found", never "no
`writing-style` row". Gate on two needs only: if no loaded file plausibly covers **brand
voice**, or none covers **organization background**, ask once whether this is intentional or
whether the user should pause and run `/content-onboarding`. Same pause / DEGRADED OUTPUT
pattern as all output-format skills. For absent audience, language, or format-specific rules:
note silently and continue — never ask.

See `../_shared/context-categories.md` for the full guide to common context patterns and the
authoring rules this step follows.

**Step 2 — Check for campaign briefing**
Check `$ARGUMENTS` first, then `ls brief.md`. If found, read and confirm. If missing,
note "No campaign briefing found — generating from company context only." and continue.

**Step 3 — Infer and confirm audience and goal**
This is the content-production-specific step. Instruct the skill to:

1. Use the loaded audience context and campaign brief (if any) to infer: B2B or B2C,
   content goal, funnel stage, and audience expertise level. If the loaded context
   genuinely does not support a confident inference, ask the owner the missing question
   directly rather than guessing.
2. Present a one-line inference summary to the user, for example:
   "Audience: B2B (mid-market) · Goal: lead generation · Stage: MOFU · Expertise: familiar"
3. Ask the user to confirm or correct before generating. Do not silently apply assumptions.
4. Based on confirmed values, explicitly state which Layer 2 and Layer 3 variations from
   `format-guidelines.md` are being applied and why.

**Step 4 — Ask for the content topic (if not provided)**
Ask: "What should this [FORMAT] be about?" and wait.

**Step 5 — Select storytelling framework**
Read `storytelling-frameworks.md` and follow its selection process. Apply the chosen
framework as the structural spine.

**Step 6 — Select persuasion principles**
Read `persuasion-principles.md` and follow its selection process. Pick 1–3 principles plus
a pre-suasive opener strategy. Note the choices in working notes.

**Step 7 — Generate the [FORMAT]**
Produce a complete [FORMAT] that applies the confirmed format-guidelines variant, the chosen
framework, the selected persuasion principles, and any loaded brand-voice and audience
context. Then run the readability pass from `readability-patterns.md` on the finished
draft as its own step, fixing only the passages with a hit. Internally verify against
the quality checklist in `format-guidelines.md`. For every unmet gate, revise the
draft and re-check — do not present until every gate passes or the failure genuinely
cannot be fixed (e.g. missing context), in which case surface it in the output rather than
hiding it.

**End-user mode:** include a `[TODO: ...]` placeholder for any format-specific mandatory
elements — for example, word count requirements, mandatory section headers, or SEO
constraints — that the project owner must specify for their use case.

**Plugin-dev mode:** do not leave a design-time `[TODO: ...]` for this — no plugin
maintainer can correctly fill in a requirement that varies per downstream project.
Instead write this step so the skill resolves mandatory elements at **runtime**: check
the **format-specific rules** context loaded in Step 1 for anything that governs this
element (legal disclaimers, provider-specific field names, jurisdiction-specific
wording, word-count constraints); if nothing loaded covers a genuinely required
element, ask the owner once rather than guessing or inventing it. Only mark an inline
`[TODO: ...]` inside the _generated output itself_ (not the skill's instructions) as a
last resort, when the element is still unresolved after checking context and asking.

Present the output in a clearly delimited block showing the content and its word / character
count.

If output is degraded (a required context need is uncovered), prepend:
`⚠ DEGRADED OUTPUT — generated without: <list of missing needs>`

**Step 8 — Feedback**
This step has two phases:

Write the feedback step as:

_Auto-store phase._ Read `../_shared/learnings-protocol.md` and follow its **Writing** section. Tag entries `[cc-content:<skill-name>]`; the source is `inferred` unless the user said it. Worth recording: content preferences or constraints, project-specific facts that would change future output, and accepted or rejected suggestions that deviate from best practice.

_Explicit feedback._ Ask whether the output met expectations.

- If the user provides a correction or states a standing preference, record it per the protocol's **Writing** section, with source `corrected` for a correction and `stated` for a preference.
- Then follow the protocol's **Confirming** section, deliver a closing line and exit.

**End-user mode:** include a `[TODO: ...]` for a format-specific delivery note (e.g.,
"Paste into your CMS", "Send for review").

**Plugin-dev mode:** do not leave an author-facing TODO here either — no plugin
maintainer knows every downstream project's tooling. Write the closing note so it is
derived at **runtime** from what the run actually produced: reference the
format-specific rules context if it named a CMS, builder, or provider; add a
compliance reminder if the confirmed audience triggers one (e.g., a consent-wording
review for a regulated jurisdiction, if the format's guidelines include a compliance
section); and fall back to a sensible generic default (e.g., "ready to hand off to
your [developer/builder/relevant tool]") when nothing more specific is known.
