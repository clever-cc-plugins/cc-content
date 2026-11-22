---
name: refresh-ai-tells
description: >
  Maintainer skill for this repo (not shipped with the plugin). Manually refresh
  plugins/cc-content/skills/_shared/ai-tells.md from its sources (all Wikipedia
  language versions of "Signs of AI writing", tropes.fyi, Graphite) as a reviewed
  proposal. Invoke when the user says "refresh the AI tells", "update the AI-tells
  catalog", or "check Wikipedia for new AI signs".
---

# Refresh the AI-tells catalog

Turns changes in the catalog's sources into a numbered proposal, applies only what the user approves, and ends with a branch and a PR. Never apply findings automatically: the sources are written for other contexts (Wikipedia for encyclopedia edits), their signs flip as models change, and they are signs, not proof.

Files:

- Catalog: `plugins/cc-content/skills/_shared/ai-tells.md` (format and allowed values: see its tables and `tests/ai-tells/catalog.test.mjs`)
- State: `.claude/skills/refresh-ai-tells/sync-state.md`

## Step 1: Branch

Stop if `git status --porcelain` shows changes. Otherwise run `git fetch origin` and create `chore/refresh-ai-tells-<YYYY-MM-DD>` from `origin/main`.

## Step 2: Read the state

Read `sync-state.md` and the catalog in full.

## Step 3: Wikipedia, all languages

This repo denies `curl` and `wget`; use WebFetch for every request.

1. Re-read the language list: `https://en.wikipedia.org/w/api.php?action=query&titles=Wikipedia:Signs_of_AI_writing&prop=langlinks&lllimit=500&format=json`. Add a `none` row to `sync-state.md` for any new language.
2. For each language, get the current revision: `https://<lang>.wikipedia.org/w/api.php?action=query&titles=<title>&prop=revisions&rvprop=ids|timestamp&format=json`.
3. Unchanged revision: skip. Changed: fetch `https://<lang>.wikipedia.org/w/api.php?action=compare&fromrev=<last>&torev=<current>&format=json` and ask WebFetch for the verbatim added and removed lines with their section headings, not a summary. Revision `none`: read the whole page and ask for every section heading with the patterns it names and the page's own status labels (current, historical, ineffective).

## Step 4: Other sources

- **tropes.fyi:** compare entries and their tags (consistent, rising, new, fading) with the snapshot in `sync-state.md`.
- **Graphite:** check `https://graphite.io/five-percent/research` for AI-tells reports newer than the recorded one.

## Step 5: Filter

Apply the gaming-tactics filter in `plugins/cc-content/skills/new-content-skill/SKILL.md` ("Filter out algorithm-gaming tactics"), then:

- Skip Wikipedia-specific signs: citations, references, wiki markup, notability, article sections such as "Awards and recognition", edit summaries, talk-page behavior.
- Status moves: when a source moves a pattern to "historical" or "ineffective", apply the move directly only if that source is the entry's only source. If the entry has other sources, make it a proposal item that names the conflict (for example, Wikipedia files dash overuse as historical while a 2026 corpus study still measures it). Never change the status of a `cc-research` entry without the user's explicit decision.
- Check context flips: a sign of human writing in an encyclopedia (superlatives, for example) can be puffery in marketing copy, and vice versa.
- From non-English pages, take only language-specific tells (phrases, typography, grammar); most of those pages translate the English one.
- Never remove an entry that still has another source; remove only the source key, then recompute the tier from the remaining sources (for example, an entry left with only `tropes` drops to C). Never remove `cc-research` entries.
- Tier: A needs a figure measured against human text; B needs an editor-curated source or several independent sources; a single practitioner source is C.

## Step 6: Propose

Present one numbered list. Each item names the action (add, change tier, status, scope, or sources, move to historical or ineffective, add a language note), the catalog entry, the source with revision or URL, and the evidence in one line. Mark items you recommend against, with the reason. Wait for the user's choice; apply nothing before it.

## Step 7: Apply and ship

1. Apply only the approved items. Write in our own words: Wikipedia is CC BY-SA and the plugin is MIT, so quote at most short example phrases and never translate or condense a page.
2. Update `sync-state.md` (revision and date per source read) and the "Last checked" column of the catalog's Sources table.
3. Run `node --test tests/ai-tells/`; fix any failure before going on.
4. Commit (Conventional Commits with gitmoji), push the branch, and open a PR that lists the applied and rejected items. Never push to `main` (it triggers a release) and never merge.
