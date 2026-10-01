/* Chaque <svg class="icon"> doit etre dimensionne par une regle CSS ancetre.
   Un SVG sans width/height et sans regle dimensionnante s'affiche a sa taille
   par defaut (300x150), ce qui casse la mise en page. */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const CSS = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");

/* Ancres de dimensionnement reconnues.
   - sizerClasses : le selecteur finit par  .classe > svg  ou  .classe svg
   - sizerTags    : le selecteur finit par  element > svg  (ex. .check-list li > svg) */
const sizerClasses = new Set();
const sizerTags = new Set();

for (const m of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const body = m[2];
  if (!/width\s*:/.test(body) || !/height\s*:/.test(body)) continue;

  for (const part of m[1].split(",")) {
    const sel = part.trim().replace(/^\s*\/\*[\s\S]*?\*\/\s*/, "").trim();
    const parts = sel.split(/\s*>\s*|\s+/).filter(Boolean);
    const last = parts[parts.length - 1];
    if (!last || !/^svg$/.test(last)) continue;

    const parent = parts[parts.length - 2];
    if (!parent) continue;
    if (/^\./.test(parent)) sizerClasses.add(parent.slice(1));
    else if (/^[a-z][a-z0-9]*$/i.test(parent)) sizerTags.add(parent.toLowerCase());
  }
}

const files = ["index.html"].concat(
  fs.readdirSync(path.join(ROOT, "pages"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => "pages/" + f)
);

(async () => {
  const problems = new Map();

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
    const d = dom.window.document;

    for (const svg of d.querySelectorAll("svg.icon")) {
      /* le sprite lui-meme est un conteneur technique */
      if (svg.closest("[data-sprite]")) continue;

      let node = svg.parentElement;
      let ok = false;
      while (node && node !== d.body) {
        const classes = (node.getAttribute("class") || "").split(/\s+/);
        if (classes.some((c) => c && sizerClasses.has(c))) {
          ok = true;
          break;
        }
        if (sizerTags.has(node.tagName.toLowerCase())) {
          ok = true;
          break;
        }
        node = node.parentElement;
      }

      if (!ok) {
        const parent = svg.parentElement.getAttribute("class") || svg.parentElement.tagName;
        const key = parent + " (svg non dimensionne)";
        if (!problems.has(key)) problems.set(key, new Set());
        problems.get(key).add(rel);
      }
    }
    dom.window.close();
  }

  console.log(" ancres de dimensionnement : " + sizerClasses.size + " classes, " + sizerTags.size + " elements");
  console.log("\nicones sans ancrage de taille (" + problems.size + ") :");
  if (!problems.size) console.log("  aucune");
  for (const [k, v] of problems) {
    console.log("  " + k);
    console.log("      " + [...v].slice(0, 5).join(", ") + (v.size > 5 ? " (+" + (v.size - 5) + ")" : ""));
  }
  if (problems.size) process.exitCode = 1;
})();
