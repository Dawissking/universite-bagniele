const fs = require("fs");

/* English words and stray symbols that must never appear inside French copy. */
const BANNED = [
  "professionally",
  "classroom",
  "engaged",
  "announcements",
  "inserting",
  "opening professionally",
  "Enriched",
  "knowledge",
  "management skills",
  "Lorem ipsum",
  "placeholder",
  "Placeholder",
  "PLACEHOLDER",
  "TODO",
  "FIXME",
  "undefined",
  "NaN",
  "[object Object]",
  "null</",
  "d inserting"
];

/* Only prose-ish text is inspected: we strip tags, attributes and JS. */
function proseOnly(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\u0001")
    .replace(/&#?[a-z0-9]+;/gi, " ")
    .split("\u0001")
    .join(" ")
    .replace(/\s+/g, " ");
}

const files = process.argv.slice(2);
let problems = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const issues = [];

  /* 1. encoding integrity */
  if (raw.includes("\ufffd")) issues.push("caractere de remplacement U+FFFD");
  if (/[\u4e00-\u9fff\uac00-\ud7af\u3040-\u30ff]/.test(raw)) {
    const chars = [...new Set(raw.match(/[\u4e00-\u9fff\uac00-\ud7af\u3040-\u30ff]/g) || [])];
    issues.push("caracteres CJK residuels: " + chars.join(" "));
  }

  /* 2. banned words in visible text */
  const text = proseOnly(raw);
  for (const word of BANNED) {
    let idx = text.indexOf(word);
    while (idx !== -1) {
      issues.push('texte suspect "' + word + '" -> ...' + text.slice(Math.max(0, idx - 45), idx + 45) + "...");
      idx = text.indexOf(word, idx + word.length);
      if (issues.length > 40) break;
    }
  }

  /* 3. broken image references (src pointing at a file that does not exist) */
  const dir = require("path").dirname(file);
  for (const m of raw.matchAll(/<img[^>]+src="([^"]+)"/gi)) {
    const src = m[1];
    if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) continue;
    const target = require("path").resolve(dir, src);
    if (!fs.existsSync(target)) {
      issues.push("image introuvable: " + src);
    }
  }

  /* 4. local href pointing to a missing page */
  for (const m of raw.matchAll(/href="([^"]+\.html)(#[^"]*)?"/gi)) {
    const href = m[1];
    if (/^(https?:)?\/\//.test(href)) continue;
    const target = require("path").resolve(dir, href);
    if (!fs.existsSync(target)) {
      issues.push("page introuvable: " + href);
    }
  }

  /* 5. asset references in <link href> and <script src> */
  for (const m of raw.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/rel="stylesheet"/i.test(tag)) continue;
    const href = /href="([^"]+)"/i.exec(tag);
    if (!href) continue;
    if (/^(https?:)?\/\//.test(href[1]) || href[1].startsWith("data:")) continue;
    const target = require("path").resolve(dir, href[1]);
    if (!fs.existsSync(target)) issues.push("feuille de style introuvable: " + href[1]);
  }
  for (const m of raw.matchAll(/<link[^>]+href="([^"]+)"/gi)) {
    const href = m[1];
    if (/^(https?:)?\/\//.test(href) || href.startsWith("data:")) continue;
    const target = require("path").resolve(dir, href);
    if (!fs.existsSync(target)) issues.push("feuille de style introuvable: " + href);
  }
  for (const m of raw.matchAll(/<script[^>]+src="([^"]+)"/gi)) {
    const src = m[1];
    if (/^(https?:)?\/\//.test(src)) continue;
    const target = require("path").resolve(dir, src);
    if (!fs.existsSync(target)) issues.push("script introuvable: " + src);
  }

  const rel = file.replace(/^.*Projet_Site_Bagnele[\\/]/, "");
  if (issues.length) {
    problems += issues.length;
    console.log("\n=== " + rel + " ===");
    for (const i of issues) console.log("  - " + i);
  } else {
    console.log("OK  " + rel);
  }
}

console.log("\nTotal problemes: " + problems);

if (problems) process.exitCode = 1;
