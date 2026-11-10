#!/usr/bin/env bash
# Pre-commit step: when a staged plugins/*/skills/_shared/*.md file changed its body, set its
# "_Last updated: YYYY-MM-DD_" line (line 3) to today, so nobody has to bump the date by hand.
# Project copies of these files are refreshed by comparing that date.
# learnings-protocol.md is skipped: it must stay byte-identical across plugin repos and is refreshed by content.
set -euo pipefail

today="$(date +%F)"
marker='^_Last updated: [0-9]{4}-[0-9]{2}-[0-9]{2}_$'

# Modified files only: a new file keeps the author's date.
while IFS= read -r f; do
  [[ -n "$f" ]] || continue
  [[ "$f" == */_shared/learnings-protocol.md ]] && continue

  staged="$(git show ":$f")"
  [[ "$(sed -n 3p <<<"$staged")" =~ $marker ]] || continue

  # Same body (everything except line 3) as HEAD: nothing to stamp.
  [[ "$(git show "HEAD:$f" | sed '3d')" == "$(sed '3d' <<<"$staged")" ]] && continue
  [[ "$(sed -n 3p <<<"$staged")" == "_Last updated: ${today}_" ]] && continue

  # Rewrite line 3 of the staged blob, so unstaged edits are not pulled into the commit.
  blob="$(sed "3s/.*/_Last updated: ${today}_/" <<<"$staged" | git hash-object -w --stdin)"
  mode="$(git ls-files -s -- "$f" | cut -d' ' -f1)"
  git update-index --cacheinfo "${mode},${blob},${f}"
  sed -i "3s/^_Last updated: .*_\$/_Last updated: ${today}_/" "$f"
  echo "stamp-shared-files: ${f} -> _Last updated: ${today}_"
done < <(git diff --cached --name-only --diff-filter=M -- 'plugins/*/skills/_shared/*.md')
