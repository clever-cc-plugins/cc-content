import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { measure } from "../../plugins/cc-content/skills/brand-voice/measure-text.mjs";

const SCRIPT = fileURLToPath(
  new URL(
    "../../plugins/cc-content/skills/brand-voice/measure-text.mjs",
    import.meta.url,
  ),
);

test("basic counts", () => {
  const r = measure(
    "One two three. Four five six seven? Eight!\n\nNine ten.",
    "en",
  );
  assert.equal(r.words, 10);
  assert.deepEqual(r.sentences, {
    count: 4,
    mean: 2.5,
    median: 2.5,
    p90: 4,
    over25Share: 0,
  });
  assert.deepEqual(r.paragraphs, { count: 2, mean: 5, median: 5, p90: 8 });
  assert.equal(r.questionShare, 0.25);
  assert.equal(r.exclamationShare, 0.25);
});
test("punctuation per 1000 words", () => {
  const r = measure("Alpha — beta: gamma; delta (epsilon) zeta – eta.", "en");
  assert.equal(r.words, 7);
  for (const k of ["emDash", "enDash", "colon", "semicolon", "parenthesis"])
    assert.equal(r.per1000[k], 142.9);
});
test("emoji", () => {
  assert.equal(measure("Great launch 🚀 today 🎉.", "en").per1000.emoji, 666.7);
});
test("german address forms", () => {
  const r = measure(
    "Sie erhalten heute Ihr Angebot. Wir melden uns bei Ihnen, wenn Sie Fragen haben. Du bist dran.",
    "de",
  );
  assert.deepEqual(r.address, { formal: 3, informal: 1 });
});
test("abbreviation does not split", () => {
  const r = measure("Das gilt z. B. für alle. Ende.", "de");
  assert.equal(r.sentences.count, 2);
  assert.equal(r.words, 7);
});
test("english contractions and pronouns", () => {
  const r = measure(
    "I don't think it's ready. We'll see, won't we? You're right.",
    "en",
  );
  assert.equal(r.words, 11);
  assert.equal(r.contractionsPer1000, 363.6);
  assert.deepEqual(r.pronouns, { firstSingular: 1, firstPlural: 2, second: 1 });
  assert.equal(r.address, null);
});
test("unsupported language", () => {
  const r = measure("これはテストです。", "ja");
  assert.equal(r.pronouns, null);
  assert.equal(r.address, null);
  assert.ok(r.notes.some((n) => n.includes("not measured for ja")));
});
test("markdown structure", () => {
  const r = measure(
    "# Heading\n\n- item one\n- item two\n\nBody text here.\n\n```\ncode here\n```",
    "en",
  );
  assert.equal(r.words, 7);
  assert.equal(r.sentences.count, 3);
  assert.equal(r.paragraphs.count, 2);
  assert.equal(r.per1000.listLine, 285.7);
});
test("single sentence", () => {
  const r = measure("Just one.", "en");
  assert.deepEqual(r.sentences, {
    count: 1,
    mean: 2,
    median: 2,
    p90: 2,
    over25Share: 0,
  });
});
test("empty input throws", () => {
  assert.throws(() => measure("  \n "), /no text/);
});
test("cli: files, --json, empty stdin", () => {
  const dir = mkdtempSync(join(tmpdir(), "measure-text-"));
  const a = join(dir, "a.txt");
  const b = join(dir, "b.txt");
  writeFileSync(a, "One two three. Four five.");
  writeFileSync(b, "Six seven eight nine.");
  const ok = spawnSync(
    process.execPath,
    [SCRIPT, "--lang", "en", "--json", a, b],
    { encoding: "utf8" },
  );
  assert.equal(ok.status, 0);
  assert.equal(JSON.parse(ok.stdout).words, 9);
  const empty = spawnSync(process.execPath, [SCRIPT], {
    input: "",
    encoding: "utf8",
  });
  assert.equal(empty.status, 1);
  assert.match(empty.stderr, /no text/);
});
test("list markers are not counted in paragraph lengths", () => {
  const r = measure("1. alpha beta\n2. gamma delta", "en");
  assert.equal(r.words, 4);
  assert.deepEqual(r.paragraphs, { count: 1, mean: 4, median: 4, p90: 4 });
});
test("links, images, bare URLs and front matter are not prose", () => {
  const r = measure(
    "---\ntitle: Post\ndate: 2026-01-01\n---\n\nRead [the guide](https://example.com/a/b) now. ![logo](img/logo.png) See https://example.com too.",
    "en",
  );
  assert.equal(r.words, 6);
  assert.equal(r.per1000.colon, 0);
});
test("common abbreviations do not split", () => {
  const r = measure("Fragen Sie Dr. Müller bzw. Frau Krause. Der Preis inkl. Versand ist fair.", "de");
  assert.equal(r.sentences.count, 2);
});
test("german ordinals do not split", () => {
  const r = measure("Wir treffen uns am 3. Oktober im Büro. Dann geht es los.", "de");
  assert.equal(r.sentences.count, 2);
});
test("german closing quote splits", () => {
  const r = measure("Er sagte „Das passt.“ Dann ging er.", "de");
  assert.equal(r.sentences.count, 2);
});
test("setext headings, tables and html comments are excluded", () => {
  const r = measure(
    "Title line\n==========\n\n<!-- hidden note -->\n\n| a | b |\n|---|---|\n| one | two |\n\nBody text here.",
    "en",
  );
  assert.equal(r.words, 3);
});
test("unterminated code fence is reported", () => {
  const r = measure("Real text here.\n\n```\ncode never closed", "en");
  assert.ok(r.notes.some((n) => n.includes("code fence")));
});
test("cli: --lang without a value errors", () => {
  const r = spawnSync(process.execPath, [SCRIPT, "--lang"], { input: "Some text.", encoding: "utf8" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /--lang/);
});
test("fr, es, nl, it address tables", () => {
  const cases = {
    fr: ["Vous pouvez nous écrire. Tu viens aussi.", 1, 1],
    es: ["Puede escribir a usted mismo. Tú vienes también.", 1, 1],
    nl: ["Wij helpen u graag. Jij komt ook.", 1, 1],
    it: ["Vi scriviamo oggi. Chiamare La domani.", 1, 1],
  };
  for (const [lang, [text, formal, informal]] of Object.entries(cases)) {
    const r = measure(text, lang);
    assert.equal(r.address.formal >= formal, true, `${lang} formal`);
    assert.equal(r.address.informal >= informal, true, `${lang} informal`);
    assert.ok(r.pronouns, `${lang} pronouns`);
    assert.ok(r.notes.length >= 1, `${lang} note`);
  }
});
test("locale codes are normalized", () => {
  const r = measure("We don't know.", "en-US");
  assert.equal(r.lang, "en");
  assert.ok(r.contractionsPer1000 > 0);
});
test("no language: notes say so", () => {
  const r = measure("Just words here.");
  assert.equal(r.lang, null);
  assert.equal(r.pronouns, null);
  assert.equal(r.address, null);
  assert.ok(r.notes.some((n) => n.includes("language not given")));
});
test("emoji sequences count once", () => {
  assert.equal(measure("Hi 👩‍💻 ok", "en").per1000.emoji, 500);
  assert.equal(measure("Hi 🇩🇪 ok", "en").per1000.emoji, 500);
  assert.equal(measure("Hi 👍🏽 ok", "en").per1000.emoji, 500);
});
test("cli: a directory argument gets a clear error", () => {
  const r = spawnSync(process.execPath, [SCRIPT, "--lang", "en", "."], { encoding: "utf8" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /directory/);
});
