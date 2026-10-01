const fs = require("fs");
const path = require("path");

const files = [];
const SKIP = new Set(["node_modules", "tools", ".git", ".github"]);
(function walk(p) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const q = p + "/" + e.name;
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) walk(q);
    } else if (/\.html$/.test(e.name)) files.push(q);
  }
})(path.join(__dirname, ".."));

/* Le pied de page attendu :
   © 2026 Université Bagnélé Diarra — Tous droits réservés.
   (PESUP-Santé Bagnélé Diarra sur les pages de l'école)
   Le <span data-year> autour de l'année est toléré. */

const BRANDS = ["Université Bagnélé Diarra", "PESUP-Santé Bagnélé Diarra"];
const RE = new RegExp(
  "\u00A9\\s*(?:<span[^>]*>\\s*)?(\\d{4})(?:\\s*</span>)?\\s+(" +
    BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") +
    ")\\s*\u2014\\s*Tous droits réservés\\."
);

let ok = 0;
const bad = [];

for (const f of files) {
  const s = fs.readFileSync(f, "utf8");
  const m = s.match(RE);
  if (m) ok++;
  else {
    const i = s.indexOf("Tous droits");
    bad.push(f.split("/").pop() + " | " + JSON.stringify(i > -1 ? s.slice(Math.max(0, i - 60), i + 25) : "absent"));
  }
}

console.log("Pied de page exact : " + ok + " / " + files.length);
if (bad.length) {
  console.log("KO :");
  bad.forEach((b) => console.log("  " + b));
  process.exitCode = 1;
}
