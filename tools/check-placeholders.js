/* Detecte les marqueurs de gabarit non resolus dans le HTML genere.
   Un __DESC__ ou un __LOGOPESUP__ laisses en place produisent une page
   silencieusement fausse : meta description litterale, logo manquant.
   Sort en erreur des qu'un marqueur subsiste. */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const files = ["index.html"].concat(
  fs.readdirSync(path.join(ROOT, "pages"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => "pages/" + f)
);

/* Gabarits reellement substitues par buildPage : tout ce qui y apparait doit
   disparaitre apres generation. */
const layout = fs.readFileSync(path.join(__dirname, "layout.js"), "utf8");
const attendus = new Set();
for (const m of layout.matchAll(/\.replace\(\/__(?!HEADMOD)([A-Z][A-Z0-9_]*)__\/g/g)) {
  attendus.add("__" + m[1] + "__");
}
attendus.add("__BODY__");
attendus.add("__HEADMOD__");

const suspects = [];
const descriptions = new Map();

for (const rel of files) {
  const s = fs.readFileSync(path.join(ROOT, rel), "utf8");

  for (const m of s.matchAll(/__[A-Z][A-Z0-9_]*__/g)) {
    suspects.push(rel + "  marqueur residuel : " + m[0]);
  }

  const d = /<meta name="description" content="([^"]*)"/.exec(s);
  if (!d) {
    suspects.push(rel + "  meta description absente");
  } else {
    if (!d[1].trim()) suspects.push(rel + "  meta description vide");
    if (d[1].length > 160) suspects.push(rel + "  meta description trop longue (" + d[1].length + " caracteres)");
    if (!descriptions.has(d[1])) descriptions.set(d[1], []);
    descriptions.get(d[1]).push(rel);
  }

  const t = /<title>([^<]*)<\/title>/.exec(s);
  if (!t || !t[1].trim()) suspects.push(rel + "  titre absent ou vide");
}

console.log("pages analysees : " + files.length);
console.log("marqueurs de gabarit connus : " + [...attendus].sort().join(", "));
console.log("meta description distinctes : " + descriptions.size + " / " + files.length);

const doublons = [...descriptions].filter(([, v]) => v.length > 1);
if (doublons.length) {
  for (const [d, v] of doublons) console.log("  description partagee par " + v.length + " pages : " + d.slice(0, 70) + "  -> " + v.join(", "));
}

if (suspects.length) {
  console.log("\nProblemes :");
  for (const s of suspects) console.log("  " + s);
  process.exitCode = 1;
} else {
  console.log("\nAucun marqueur residuel, toutes les meta description sont remplies.");
}
