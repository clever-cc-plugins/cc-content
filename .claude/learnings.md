# Learnings

Corrections and observations collected during configuration sessions.
Entries are tagged by skill and dated.

---

[cc-config:cc-config-optimize] `core.hooksPath` was never set on this clone despite `.githooks/pre-commit` existing since init — gitleaks scanning and the CLAUDE.md table sync had silently never run on any commit; must be set per-clone (`git config core.hooksPath .githooks`), it isn't tracked by git. — 2026-07-31
