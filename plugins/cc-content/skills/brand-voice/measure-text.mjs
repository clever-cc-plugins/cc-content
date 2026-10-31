#!/usr/bin/env node
// Measures observable text features so brand-voice analysis is grounded in numbers.
// Usage: node measure-text.mjs [--lang <code>] [--json] [file ...]  (stdin when no files)
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const WORD = /[\p{L}\p{N}]+(?:['’]\p{L}+)*/gu;
const LIST_LINE = /^\s*(?:[-*•]|\d+[.)])\s+/;
const words = (s) => s.match(WORD) ?? [];
const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
const per1000 = (n, total) => round((n / total) * 1000, 1);
const count = (s, re) => (s.match(re) ?? []).length;

const PRONOUNS = {
  en: {
    firstSingular: "i me my mine myself",
    firstPlural: "we us our ours ourselves",
    second: "you your yours yourself yourselves",
  },
  de: {
    firstSingular: "ich mich mir mein meine meinem meinen meiner meines",
    firstPlural: "wir uns unser unsere unserem unseren unserer unseres",
    second:
      "du dich dir dein deine deinem deinen deiner deines euch euer eure eurem euren eurer eures",
  },
  fr: {
    firstSingular: "je j me m moi mon ma mes",
    firstPlural: "nous notre nos",
    second: "tu te t toi ton ta tes vous votre vos",
  },
  es: {
    firstSingular: "yo me mi mis conmigo",
    firstPlural: "nosotros nosotras nos nuestro nuestra nuestros nuestras",
    second:
      "tú tu tus te ti contigo vosotros vosotras os vuestro vuestra vuestros vuestras usted ustedes",
  },
  nl: {
    firstSingular: "ik me mij mijn",
    firstPlural: "wij we ons onze",
    second: "je jij jou jouw jullie u uw",
  },
  it: {
    firstSingular: "io mi mio mia miei mie",
    firstPlural: "noi ci nostro nostra nostri nostre",
    second: "tu ti te tuo tua tuoi tue voi vi vostro vostra vostri vostre",
  },
};

// caseSensitive: formal forms are capitalized and ignored at sentence start.
const ADDRESS = {
  de: {
    formal: "Sie Ihnen Ihr Ihre Ihrem Ihren Ihrer Ihres",
    informal:
      "du dich dir dein deine deinem deinen deiner deines euch euer eure eurem euren eurer eures",
    capitalized: true,
    note: 'address forms: sentence-initial "Sie" (and other capitalized formal forms) is excluded as ambiguous',
  },
  it: {
    formal: "Lei La Le Suo Sua Suoi Sue",
    informal: "tu ti tuo tua tuoi tue voi vi vostro vostra vostri vostre",
    capitalized: true,
    note: "address forms: sentence-initial capitalized formal forms are excluded as ambiguous",
  },
  fr: {
    formal: "vous votre vos",
    informal: "tu te t toi ton ta tes",
    note: "address forms: vous is counted as formal but is also the plural",
  },
  es: {
    formal: "usted ustedes",
    informal: "tú tu tus te ti contigo vosotros vosotras os vuestro vuestra vuestros vuestras",
    note: "address forms: ustedes is also the neutral plural in Latin America",
  },
  nl: {
    formal: "u uw",
    informal: "je jij jou jouw jullie",
    note: 'address forms: "je" is also the generic "one"',
  },
};

const set = (s) => new Set(s.split(" "));

function percentile(sorted, p) {
  return sorted[Math.ceil(p * sorted.length) - 1];
}
function median(sorted) {
  const m = sorted.length >> 1;
  return sorted.length % 2 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2;
}
function stats(lengths) {
  const sorted = [...lengths].sort((a, b) => a - b);
  return {
    count: sorted.length,
    mean: round(lengths.reduce((a, b) => a + b, 0) / lengths.length, 1),
    median: round(median(sorted), 1),
    p90: round(percentile(sorted, 0.9), 1),
  };
}

// Blank out front matter, headings and fenced code, and reduce links to their
// text, so none of them distort the statistics.
function stripExcluded(text) {
  let fenced = false;
  return text
    .replace(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        fenced = !fenced;
        return "";
      }
      return fenced || /^\s*#/.test(line) ? "" : line;
    })
    .join("\n");
}

function splitProse(text) {
  const out = [];
  let start = 0;
  for (const m of text.matchAll(/[.!?…]+["'”’)»]*/g)) {
    const end = m.index + m[0].length;
    const rest = text.slice(end);
    const before = text.slice(0, m.index);
    const boundary = /^\s*$/.test(rest) || /^\s+\p{Lu}/u.test(rest);
    if (!boundary || /(?:^|[^\p{L}\p{N}])\p{L}$/u.test(before)) continue;
    out.push(text.slice(start, end));
    start = end;
  }
  out.push(text.slice(start));
  return out.map((s) => s.trim()).filter((s) => words(s).length);
}

// Returns sentences (with list flag) for one paragraph block.
function sentencesOf(block) {
  const out = [];
  let prose = [];
  const flush = () => {
    if (prose.length) out.push(...splitProse(prose.join(" ")).map((text) => ({ text, list: false })));
    prose = [];
  };
  for (const line of block.split("\n")) {
    if (LIST_LINE.test(line)) {
      flush();
      const text = line.replace(LIST_LINE, "").trim();
      if (words(text).length) out.push({ text, list: true });
    } else prose.push(line.trim());
  }
  flush();
  return out;
}

export function measure(text, lang) {
  const base = lang ? lang.toLowerCase().split(/[-_]/)[0] : null;
  const blocks = stripExcluded(text)
    .split(/\n\s*\n/)
    .map(sentencesOf)
    .filter((b) => b.length);
  const sentences = blocks.flat();
  const all = sentences.map((s) => words(s.text));
  const total = all.reduce((n, w) => n + w.length, 0);
  if (!total) throw new Error("no text to measure");

  const body = sentences.map((s) => s.text).join("\n");
  const sLens = all.map((w) => w.length);
  const share = (re) => round(sentences.filter((s) => re.test(s.text)).length / sentences.length, 2);
  const notes = [];

  // Head of each token before an apostrophe ("We'll" -> "we").
  const heads = all.flat().map((w) => w.split(/['’]/)[0].toLowerCase());
  const tally = (list) => {
    const s = set(list);
    return heads.filter((h) => s.has(h)).length;
  };

  let pronouns = null;
  let address = null;
  let contractionsPer1000 = null;
  if (!base) notes.push("language not given");
  else {
    if (PRONOUNS[base]) {
      const p = PRONOUNS[base];
      pronouns = {
        firstSingular: tally(p.firstSingular),
        firstPlural: tally(p.firstPlural),
        second: tally(p.second),
      };
    } else notes.push(`pronouns: not measured for ${base}`);

    if (ADDRESS[base]) {
      const a = ADDRESS[base];
      const formal = set(a.formal);
      const informal = set(a.informal);
      address = { formal: 0, informal: 0 };
      for (const w of all) {
        w.forEach((word, i) => {
          const head = word.split(/['’]/)[0];
          if (a.capitalized ? i > 0 && formal.has(head) : formal.has(head.toLowerCase())) address.formal++;
          if (informal.has(head.toLowerCase())) address.informal++;
        });
      }
      notes.push(a.note);
    } else if (base !== "en") notes.push(`address forms: not measured for ${base}`);

    if (base === "en") {
      const n = count(all.flat().join(" "), /\p{L}(?:n['’]t|['’](?:re|ve|ll|d|m))(?!\p{L})/giu);
      contractionsPer1000 = per1000(n, total);
    }
  }

  return {
    lang: base,
    words: total,
    sentences: {
      ...stats(sLens),
      over25Share: round(sLens.filter((n) => n > 25).length / sLens.length, 2),
    },
    paragraphs: stats(blocks.map((b) => b.reduce((n, x) => n + words(x.text).length, 0))),
    questionShare: share(/\?[^\p{L}\p{N}]*$/u),
    exclamationShare: share(/!+[^\p{L}\p{N}]*$/u),
    per1000: {
      emDash: per1000(count(body, /—/g), total),
      enDash: per1000(count(body, /–/g), total),
      colon: per1000(count(body, /:/g), total),
      semicolon: per1000(count(body, /;/g), total),
      parenthesis: per1000(count(body, /\(/g), total),
      emoji: per1000(count(body, /\p{Extended_Pictographic}/gu), total),
      listLine: per1000(sentences.filter((s) => s.list).length, total),
    },
    pronouns,
    address,
    contractionsPer1000,
    notes,
  };
}

function format(r) {
  const s = r.sentences;
  const p = r.paragraphs;
  const k = r.per1000;
  const lines = [
    "measure-text: heuristic sentence splitting, numbers are approximate",
    `language: ${r.lang ?? "not given"}; words: ${r.words}`,
    `sentences: ${s.count} (mean ${s.mean}, median ${s.median}, p90 ${s.p90} words; ${s.over25Share} over 25 words)`,
    `paragraphs: ${p.count} (mean ${p.mean}, median ${p.median}, p90 ${p.p90} words)`,
    `sentence types: ${r.questionShare} questions, ${r.exclamationShare} exclamations (share of sentences)`,
    `per 1000 words: em dash ${k.emDash}, en dash ${k.enDash}, colon ${k.colon}, semicolon ${k.semicolon}, parenthesis ${k.parenthesis}, emoji ${k.emoji}, list lines ${k.listLine}`,
  ];
  if (r.pronouns) {
    const q = r.pronouns;
    lines.push(`pronouns (counts): first singular ${q.firstSingular}, first plural ${q.firstPlural}, second ${q.second}`);
  }
  if (r.address) lines.push(`address forms (counts): formal ${r.address.formal}, informal ${r.address.informal}`);
  if (r.contractionsPer1000 !== null) lines.push(`contractions per 1000 words: ${r.contractionsPer1000}`);
  for (const n of r.notes) lines.push(`note: ${n}`);
  return lines.join("\n");
}

function cli(argv) {
  let lang;
  let json = false;
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lang") lang = argv[++i];
    else if (argv[i] === "--json") json = true;
    else files.push(argv[i]);
  }
  const text = files.length
    ? files.map((f) => readFileSync(f, "utf8")).join("\n\n")
    : readFileSync(0, "utf8");
  const report = measure(text, lang);
  console.log(json ? JSON.stringify(report, null, 2) : format(report));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    cli(process.argv.slice(2));
  } catch (err) {
    console.error(`measure-text: ${err.message}`);
    process.exit(1);
  }
}
