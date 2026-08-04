# Learnings

Corrections and observations collected during configuration sessions.
Entries are tagged by skill and dated.

---

[cc-config:cc-config-optimize] `core.hooksPath` was never set on this clone despite `.githooks/pre-commit` existing since init — gitleaks scanning and the CLAUDE.md table sync had silently never run on any commit; must be set per-clone (`git config core.hooksPath .githooks`), it isn't tracked by git. — 2026-07-31

[cc-content:linkedin-post] User rejects "link in first comment" as a reach workaround on principle — put links in the post body when they add value; don't write around the algorithm even where research shows a real reach cost for in-body links. Also prefers hashtags framed as optional/low-priority rather than a 3–5 default, since visible on-platform usage has declined even though research shows a mild residual effect. — 2026-08-04
