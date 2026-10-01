/* Recoupement des classes CSS avec les classes reellement utilisees.
   - classes emises par le HTML ou le JS mais absentes de style.css : defaut visuel
   - classes definies dans style.css mais jamais utilisees : code mort
   Le premier cas fait echouer le script. */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const CSS = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");

/* 1. Classes definies dans la feuille de style. */
const clean = CSS
  .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
  .replace(/"(?:[^"\\]|\\.)*"/g, '""');

const defined = new Set();
for (const m of clean.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) defined.add(m[1]);

/* 2. Classes vues dans le HTML brut et dans le JS. */
const used = new Map(); /* classe -> ensemble de sources */

function note(cls, source) {
  if (!used.has(cls)) used.set(cls, new Set());
  used.get(cls).add(source);
}

const files = ["index.html"].concat(
  fs.readdirSync(path.join(ROOT, "pages"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => "pages/" + f)
);

for (const rel of files) {
  const s = fs.readFileSync(path.join(ROOT, rel), "utf8");
  for (const m of s.matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) note(c, rel);
  }
}

/* 3. Classes creees a l'execution par main.js. */
for (const rel of ["js/main.js"]) {
  const s = fs.readFileSync(path.join(ROOT, rel), "utf8");
  /* chaines de concatenation de gabarits : class="..." et className = "..." */
  for (const m of s.matchAll(/class="([a-z0-9 _-]+)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) note(c, rel);
  }
  for (const m of s.matchAll(/className\s*=\s*"([^"]+)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) note(c, rel);
  }
  /* etat dynamically added : classList.add("is-open") */
  for (const m of s.matchAll(/classList\.(?:add|remove|toggle)\("([a-z0-9_-]+)"/g)) {
    note(m[1], rel);
  }
}

/* 4. Classes issues du DOM simule : plus fiable que l'analyse statique. */
(async () => {
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    const dom = new JSDOM(fs.readFileSync(abs, "utf8"), {
      url: "file:///" + abs.replace(/\\/g, "/"),
      runScripts: "dangerously",
      pretendToBeVisual: true
    });
    for (const s of ["js/icons.js", "js/data.js", "js/main.js"]) {
      dom.window.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
    }
    await new Promise((r) => setTimeout(r, 130));
    for (const el of dom.window.document.querySelectorAll("[class]")) {
      for (const c of el.getAttribute("class").split(/\s+/)) if (c) note(c, rel);
    }
    dom.window.close();
  }

  const orphans = [...used.keys()].filter((c) => !defined.has(c)).sort();
  const dead = [...defined].filter((c) => !used.has(c)).sort();

  console.log("classes definies dans style.css : " + defined.size);
  console.log("classes utilisees               : " + used.size);

  console.log("\nclasses utilisees sans regle CSS (" + orphans.length + ") :");
  if (orphans.length) {
    for (const c of orphans) console.log("  ." + c + "   [" + [...used.get(c)].slice(0, 3).join(", ") + "]");
  } else {
    console.log("  aucune");
  }

  console.log("\nclasses definies sans utilisation (" + dead.length + ") :");
  if (dead.length) dead.forEach((c) => console.log("  ." + c));
  else console.log("  aucune");

  if (orphans.length) process.exitCode = 1;
})();
