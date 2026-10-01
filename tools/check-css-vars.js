/* Analyse des variables CSS custom properties.
   Ne compte comme definition que ce qui se trouve en position de declaration
   (apres '{' ou ';'), afin d'ignorer les pseudo-classes BEM type .btn--primary:hover. */

const fs = require("fs");

const css = fs.readFileSync("D:/Projet_Site_Bagnele/css/style.css", "utf8");

/* Retire commentaires et chaines pour eviter les faux positifs. */
const clean = css
  .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
  .replace(/"(?:[^"\\]|\\.)*"/g, '""');

const defs = new Map();
for (const m of clean.matchAll(/[{;]\s*(--[a-z0-9-]+)\s*:\s*([^;}]+)/gi)) {
  const line = clean.slice(0, m.index).split("\n").length;
  if (!defs.has(m[1])) defs.set(m[1], { value: m[2].trim(), line });
}

const used = new Map();
for (const m of clean.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)) {
  if (!used.has(m[1])) used.set(m[1], clean.slice(0, m.index).split("\n").length);
}

const missing = [...used.keys()].filter((v) => !defs.has(v));
const unused = [...defs.keys()].filter((v) => !used.has(v));

console.log("variables definies : " + defs.size);
console.log("variables utilisees : " + used.size);

console.log("\nutilisees sans definition (" + missing.length + ") :");
if (missing.length) missing.forEach((v) => console.log("  " + v + "  (l." + used.get(v) + ")"));
else console.log("  aucune");

console.log("\ndefinies mais inutilisees (" + unused.length + ") :");
if (unused.length) unused.forEach((v) => console.log("  " + v + " = " + defs.get(v).value + "  (l." + defs.get(v).line + ")"));
else console.log("  aucune");
