const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEXT_EXT = new Set([".html", ".js", ".css", ".json", ".svg", ".txt", ".md", ".xml", ".webmanifest"]);

/* Le dossier tools/ contient les generateurs : leurs propres listes de
   controle ne doivent pas etre analysees comme du contenu editorial. */
const SKIP_DIRS = new Set(["node_modules", "tools", ".git"]);

/* Motifs qui ne doivent jamais apparaitre dans un contenu redige en francais.
   Ils sont appliques au texte visible des pages et aux chaines de data.js. */
const BANNED = [
  [/\baccountab\w*/i, "anglais : accountable"],
  [/\benhanc\w*/i, "anglais : enhance"],
  [/\bdevelops\b/i, "anglais : develops"],
  [/\brefocused\b/i, "anglais : refocused"],
  [/\bprioritiz\w*/i, "anglais : prioritize"],
  [/\bthroughout\b/i, "anglais : throughout"],
  [/\bserie of\b/i, "anglais"],
  [/\bserious engagement\b/i, "anglais"],
  [/\bL\.ac[cè]s\b/i, "apostrophe erronee : L.acces"],
  [/LesTraitements/, "mot colle : LesTraitements"],
  [/etEncadrement/, "mot colle : etEncadrement"],
  [/[\u4E00-\u9FFF]/, "caractere CJK"],
  [/[\u0400-\u04FF]/, "cyrillique"],
  [/[\u0600-\u06FF]/, "arabe"],
  [/\uFFFD/, "caractere de remplacement U+FFFD"],
  [/__[A-Z]+__/, "jeton de generation non remplace"]
];

/* Ces motifs ne concernent que le texte affiche : ils ne doivent pas
   apparaitre dans le HTML rendu, mais sont legitimes dans le code JS. */
const BANNED_DISPLAY_ONLY = [
  [/\bundefined\b/, "valeur undefined affichee"],
  [/\bNaN\b/, "valeur NaN affichee"],
  [/\[object Object\]/, "objet non converti"]
];

let files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(p);
    } else if (TEXT_EXT.has(path.extname(e.name).toLowerCase())) {
      files.push(p);
    }
  }
})(ROOT);

let issues = 0;
const seen = new Set();

for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, "/");
  const raw = fs.readFileSync(f);
  if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
    console.log("BOM UTF-8 : " + rel);
    issues++;
  }

  const s = raw.toString("utf8");

  /* Sur le HTML on inspecte uniquement le texte affiche, jamais les attributs
     techniques (noms de classes, data-*, scripts). */
  let haystack = s;
  if (path.extname(f).toLowerCase() === ".html") {
    haystack = s
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ");
  }

  for (const [src, label] of BANNED) {
    const re = new RegExp(src.source, src.flags.includes("g") ? src.flags : src.flags + "g");
    let m;
    while ((m = re.exec(haystack)) !== null) {
      if (m[0] === "") { re.lastIndex++; continue; }
      const key = label + "|" + rel + "|" + m[1];
      if (seen.has(key)) continue;
      seen.add(key);
      const line = haystack.slice(0, m.index).split("\n").length;
      const ctx = haystack.slice(Math.max(0, m.index - 45), m.index + 45).replace(/\s+/g, " ").trim();
      console.log(label + " : " + rel + ":" + line + "\n    ..." + ctx + "...");
      issues++;
    }
  }

  if (path.extname(f).toLowerCase() !== ".html") continue;

  for (const [src, label] of BANNED_DISPLAY_ONLY) {
    const re = new RegExp(src.source, src.flags + "g");
    let m;
    while ((m = re.exec(haystack)) !== null) {
      if (m[0] === "") { re.lastIndex++; continue; }
      const line = haystack.slice(0, m.index).split("\n").length;
      const ctx = haystack.slice(Math.max(0, m.index - 45), m.index + 45).replace(/\s+/g, " ").trim();
      console.log(label + " : " + rel + ":" + line + "\n    ..." + ctx + "...");
      issues++;
    }
  }
}

console.log(
  issues
    ? "\nTotal anomalies: " + issues
    : "Aucun artefact : " + files.length + " fichiers texte analyses."
);

if (issues) process.exitCode = 1;
