#!/usr/bin/env bash
# Tests for scripts/stamp-shared-files.sh. Run: bash tests/stamp-shared-files/test.sh
set -uo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
script="$here/scripts/stamp-shared-files.sh"
today="$(date +%F)"
fail=0

assert_eq() {
  if [[ "$2" != "$3" ]]; then echo "FAIL: $1 -- expected '$2', got '$3'"; fail=1; else echo "ok: $1"; fi
}

new_repo() {
  tmp="$(mktemp -d)"
  cd "$tmp" || exit 1
  git init -q
  git config user.email t@example.com
  git config user.name t
  mkdir -p plugins/p/skills/_shared scripts
  cp "$script" scripts/stamp-shared-files.sh
}

write_file() { # path, date, body
  printf '# Title\n\n_Last updated: %s_\n\n%s\n' "$2" "$3" > "$1"
}

staged_line3() { git show ":$1" | sed -n 3p; }

f=plugins/p/skills/_shared/a.md

new_repo
write_file $f 2026-01-01 "old body"; git add -A; git commit -qm init
write_file $f 2026-01-01 "new body"; git add $f
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "a changed body is stamped with today's date (staged)" "_Last updated: ${today}_" "$(staged_line3 $f)"
assert_eq "the working copy gets the same date" "_Last updated: ${today}_" "$(sed -n 3p $f)"

new_repo
write_file $f 2026-01-01 "same body"; git add -A; git commit -qm init
printf 'unrelated\n' > other.md; git add other.md
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "an untouched shared file keeps its date" "_Last updated: 2026-01-01_" "$(sed -n 3p $f)"

new_repo
write_file $f 2026-01-01 "same body"; git add -A; git commit -qm init
write_file $f 2026-03-03 "same body"; git add $f
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "a date-only edit is not overridden" "_Last updated: 2026-03-03_" "$(staged_line3 $f)"

new_repo
p=plugins/p/skills/_shared/learnings-protocol.md
write_file $p 2026-01-01 "old"; git add -A; git commit -qm init
write_file $p 2026-01-01 "new"; git add $p
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "learnings-protocol.md is never stamped" "_Last updated: 2026-01-01_" "$(staged_line3 $p)"

new_repo
write_file $f 2026-01-01 "brand new"; git add $f
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "a new file keeps the author's date" "_Last updated: 2026-01-01_" "$(staged_line3 $f)"

new_repo
printf '# Title\n\nno marker here\n\nold\n' > $f; git add -A; git commit -qm init
printf '# Title\n\nno marker here\n\nnew\n' > $f; git add $f
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "a file without a marker is left alone" "no marker here" "$(staged_line3 $f)"

new_repo
write_file $f 2026-01-01 "old body"; git add -A; git commit -qm init
write_file $f 2026-01-01 "staged body"; git add $f
printf 'unstaged extra line\n' >> $f
bash scripts/stamp-shared-files.sh >/dev/null
assert_eq "the staged copy is stamped" "_Last updated: ${today}_" "$(staged_line3 $f)"
assert_eq "an unstaged edit stays unstaged" "0" "$(git show ":$f" | grep -c 'unstaged extra line')"
assert_eq "and stays in the working copy" "1" "$(grep -c 'unstaged extra line' $f)"

exit $fail
