import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const CATALOG = fileURLToPath(
  new URL(
    "../../plugins/cc-content/skills/_shared/ai-tells.md",
    import.meta.url,
  ),
);

const HEADER = ["Tell", "Looks like", "Tier", "Scope", "Status", "Sources"];
const TIERS = new Set(["A", "B", "C"]);
const SCOPES = new Set(["all", "marketing", "social"]);
const STATUSES = new Set([
  "current",
  "rising",
  "fading",
  "historical",
  "ineffective",
]);
const SECTIONS = [
  "## How to use this catalog",
  "## Content-level slop (report only)",
  "## Ineffective indicators (never count)",
  "## Signs of human writing (rewrite targets)",
  "## Language notes",
  "## Sources",
];

const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

const isSeparator = (line) => /^\|[\s:|-]+\|$/.test(line.trim());

// Returns the body rows of every table whose header equals `header`.
function tables(text, header) {
  const rows = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith("|")) continue;
    if (JSON.stringify(cells(lines[i])) !== JSON.stringify(header)) continue;
    let j = i + 1;
    if (j < lines.length && isSeparator(lines[j])) j++;
    for (; j < lines.length && lines[j].trim().startsWith("|"); j++)
      rows.push(cells(lines[j]));
    i = j;
  }
  return rows;
}

const read = () => readFileSync(CATALOG, "utf8");
const entries = () => tables(read(), HEADER);
const sourceKeys = () =>
  new Set(
    tables(read(), ["Key", "Source", "Type", "License", "Last checked"]).map(
      (r) => r[0].replace(/`/g, ""),
    ),
  );
const keysOf = (row) =>
  row[5].split(",").map((k) => k.trim().replace(/`/g, ""));

test("catalog exists and has a Last updated line", () => {
  assert.match(read(), /^_Last updated: \d{4}-\d{2}-\d{2}_$/m);
});

test("every catalog row is well-formed", () => {
  const rows = entries();
  assert.ok(rows.length > 0, "no catalog rows found");
  for (const row of rows) {
    assert.equal(
      row.length,
      6,
      `row has ${row.length} cells: ${row.join(" | ")}`,
    );
    const [tell, looks, tier, scope, status] = row;
    assert.ok(tell && looks, `empty Tell or Looks like: ${row.join(" | ")}`);
    assert.ok(TIERS.has(tier), `bad tier "${tier}" in ${tell}`);
    assert.ok(SCOPES.has(scope), `bad scope "${scope}" in ${tell}`);
    assert.ok(STATUSES.has(status), `bad status "${status}" in ${tell}`);
  }
});

test("every source key is defined", () => {
  const defined = sourceKeys();
  assert.ok(defined.size > 0, "Sources table missing or empty");
  for (const row of entries()) {
    for (const key of keysOf(row))
      assert.ok(defined.has(key), `undefined source "${key}" in ${row[0]}`);
  }
});

test("cc-research entries are present", () => {
  const rows = entries();
  assert.ok(
    rows.some((r) => keysOf(r).includes("cc-research")),
    "no cc-research entry",
  );
  const names = rows.map((r) => r[0]);
  for (const name of [
    "Rhetorical question opener",
    "Reflex closing question",
  ]) {
    assert.ok(names.includes(name), `missing entry "${name}"`);
  }
});

// Structural problems the row checks above can't see: unknown headers,
// missing separators, split tables, ineffective status outside its section.
function structureErrors(text) {
  const known = [
    JSON.stringify(HEADER),
    JSON.stringify(["Key", "Source", "Type", "License", "Last checked"]),
  ];
  const errors = [];
  const lines = text.split("\n");
  let section = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) section = line;
    if (!line.trim().startsWith("|")) continue;
    if (!known.includes(JSON.stringify(cells(line)))) {
      errors.push(`line ${i + 1}: table line outside a recognized table`);
      continue;
    }
    if (!isSeparator(lines[i + 1] ?? "")) {
      errors.push(`line ${i + 2}: separator row missing after header`);
    }
    const isEntry = JSON.stringify(cells(line)) === known[0];
    let j = i + 2;
    for (; j < lines.length && lines[j].trim().startsWith("|"); j++) {
      if (!isEntry) continue;
      const status = cells(lines[j])[4];
      const inIneffective =
        section === "## Ineffective indicators (never count)";
      if ((status === "ineffective") !== inIneffective) {
        errors.push(
          `line ${j + 1}: status "${status}" not allowed in ${section}`,
        );
      }
    }
    i = j - 1;
  }
  return errors;
}

// Errors if a named cc-research entry is missing or lost its cc-research key.
function ccResearchErrors(text) {
  const rows = tables(text, HEADER);
  return ["Rhetorical question opener", "Reflex closing question"].flatMap(
    (name) => {
      const row = rows.find((r) => r[0] === name);
      if (!row) return [`missing entry "${name}"`];
      return keysOf(row).includes("cc-research")
        ? []
        : [`"${name}" lost its cc-research source`];
    },
  );
}

const mutate = (from, to) => {
  const text = read();
  assert.ok(text.includes(from), `mutation anchor not found: ${from}`);
  return text.replace(from, to);
};

test("catalog structure is valid", () => {
  assert.deepEqual(structureErrors(read()), []);
  assert.deepEqual(ccResearchErrors(read()), []);
});

test("structure check rejects a mistyped header", () => {
  const bad = mutate("| Tell ", "| Tells ");
  assert.notDeepEqual(structureErrors(bad), []);
});

test("structure check rejects a missing separator row", () => {
  const text = read();
  const lines = text.split("\n");
  const sep = lines.findIndex(
    (l, i) =>
      i > 0 && lines[i - 1].startsWith("| Tell ") && /^\|[\s:|-]+\|$/.test(l),
  );
  lines.splice(sep, 1);
  assert.notDeepEqual(structureErrors(lines.join("\n")), []);
});

test("structure check rejects a table split by a blank line", () => {
  const bad = mutate(
    "\n| Inflated significance",
    "\n\n| Inflated significance",
  );
  assert.notDeepEqual(structureErrors(bad), []);
});

test("structure check rejects ineffective status in a counting table", () => {
  const lines = read().split("\n");
  const i = lines.findIndex((l) => l.startsWith("| Importance flagging"));
  lines[i] = lines[i].replace("| current |", "| ineffective |");
  assert.notDeepEqual(structureErrors(lines.join("\n")), []);
});

test("cc-research check rejects a named entry without its cc-research key", () => {
  const lines = read().split("\n");
  const i = lines.findIndex((l) => l.startsWith("| Reflex closing question"));
  lines[i] = lines[i].replace(/cc-research\s*\|\s*$/, "wiki-en |");
  assert.notDeepEqual(ccResearchErrors(lines.join("\n")), []);
});

test("required sections exist", () => {
  const text = read();
  for (const s of SECTIONS)
    assert.ok(text.includes(`\n${s}\n`), `missing section ${s}`);
});
