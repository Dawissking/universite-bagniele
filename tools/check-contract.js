const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

/* ---------- load data ---------- */
global.window = {};
(0, eval)(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8"));

/* ---------- load icon names ---------- */
global.window.UBD_ICONS = {};
(0, eval)(fs.readFileSync(path.join(ROOT, "js/icons.js"), "utf8"));
const ICONS = new Set(Object.keys(global.window.UBD_ICONS));

/* ---------- render keys declared in main.js ---------- */
const main = fs.readFileSync(path.join(ROOT, "js/main.js"), "utf8");
const renderBlock = main.slice(main.indexOf("var RENDER = {"));
const RENDER_KEYS = new Set(
  [...renderBlock.matchAll(/^\s{4}["']?([a-zA-Z0-9-]+)["']?:\s*function/gm)].map((m) => m[1])
);

/* ---------- fillTargets keys ---------- */
const DT_KEYS = new Set();
for (const m of main.matchAll(/fillTargets\(\{([\s\S]*?)\}\);/g)) {
  for (const k of m[1].matchAll(/([a-zA-Z]+):/g)) DT_KEYS.add(k[1]);
}

/* ---------- css classes ---------- */
const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
const CSS = new Set([...css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((m) => m[1]));

const files = process.argv.slice(2);
let problems = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const issues = new Set();

  for (const m of raw.matchAll(/data-render="([^"]+)"/g)) {
    if (!RENDER_KEYS.has(m[1])) issues.add('data-render inconnu: "' + m[1] + '"');
  }

  for (const m of raw.matchAll(/<use href="#i-([a-zA-Z0-9]+)"/g)) {
    if (!ICONS.has(m[1])) issues.add("icone absente: " + m[1]);
  }

  for (const m of raw.matchAll(/data-dt="([a-zA-Z]+)"/g)) {
    if (!DT_KEYS.has(m[1])) issues.add("data-dt sans cible: " + m[1]);
  }

  const body = raw.replace(/<script[\s\S]*?<\/script>/g, " ");
  for (const m of body.matchAll(/class="([^"]*)"/g)) {
    for (const cls of m[1].split(/\s+/)) {
      if (cls && !CSS.has(cls)) issues.add("classe CSS absente: " + cls);
    }
  }

  /* ancres internes, en ignorant les references de sprite */
  const ids = new Set([...raw.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of raw.matchAll(/href="(#[^"]+)"/g)) {
    const target = m[1].slice(1);
    if (/^i-/.test(target)) continue;
    if (!ids.has(target)) issues.add("ancre interne cassee: " + m[1]);
  }

  if (issues.size) {
    problems += issues.size;
    console.log("\n=== " + rel + " ===");
    for (const i of issues) console.log("  - " + i);
  } else {
    console.log("OK  " + rel);
  }
}

console.log("\nTotal problemes: " + problems);

if (problems) process.exitCode = 1;
