const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const files = ["index.html"]
  .concat(fs.readdirSync(path.join(ROOT, "pages")).filter((f) => f.endsWith(".html")).map((f) => "pages/" + f));

let issues = 0;

(async () => {
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    const dom = new JSDOM(fs.readFileSync(abs, "utf8"), {
      url: "file:///" + abs.replace(/\\/g, "/"),
      runScripts: "dangerously",
      pretendToBeVisual: true
    });
    const w = dom.window;
    for (const s of ["js/icons.js", "js/data.js", "js/main.js"]) {
      w.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
    }
    await new Promise((r) => setTimeout(r, 130));
    const d = w.document;
    const out = [];

    /* Un seul h1 par page */
    const h1 = d.querySelectorAll("h1");
    if (h1.length !== 1) out.push("h1 x" + h1.length);

    /* Un seul bloc <main> */
    if (d.querySelectorAll("main").length !== 1) out.push("main x" + d.querySelectorAll("main").length);

    /* Un seul banner et un seul contentinfo */
    if (d.querySelectorAll("body > header").length !== 1) {
      out.push("header de page x" + d.querySelectorAll("body > header").length);
    }
    if (d.querySelectorAll("footer").length !== 1) out.push("pied de page x" + d.querySelectorAll("footer").length);

    /* Un seul element landmark "primary" */
    if (d.querySelectorAll("main, [role=main]").length !== 1) out.push("landmark principal incorrecte");

    /* Hierarchy des titres : pas de saut de niveau */
    const levels = [...d.querySelectorAll("h1, h2, h3, h4, h5, h6")]
      .filter((h) => h.offsetParent !== null || true)
      .map((h) => Number(h.tagName[1]));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        const h = [...d.querySelectorAll("h1, h2, h3, h4, h5, h6")][i];
        out.push("saut de niveau h" + levels[i - 1] + " -> h" + levels[i] + " : " + h.textContent.trim().slice(0, 40));
      }
    }

    /* Toutes les images ont un alt ; les decoratives ont alt="" */
    for (const img of d.querySelectorAll("img")) {
      if (img.getAttribute("alt") === null) out.push("img sans alt : " + img.getAttribute("src"));
    }

    /* Elements interactifs nommables */
    for (const el of d.querySelectorAll("a, button, input, select, textarea")) {
      const name = (
        el.getAttribute("aria-label") ||
        el.textContent.trim() ||
        (el.labels && el.labels[0] && el.labels[0].textContent.trim()) ||
        el.getAttribute("title") ||
        ""
      );
      if (!name) {
        const id = el.id || el.className || el.tagName;
        out.push("element sans nom accessible : <" + el.tagName.toLowerCase() + "> " + String(id).slice(0, 40));
      }
    }

    /* Champs de formulaire labels */
    for (const c of d.querySelectorAll("input, select, textarea")) {
      if (c.type === "hidden") continue;
      const hasLabel = (c.labels && c.labels.length) || c.getAttribute("aria-label") || c.getAttribute("aria-labelledby");
      if (!hasLabel) out.push("champ sans label : " + (c.name || c.type));
    }

    /* Cibles de lien en file:// : jamais de repertoire nu */
    for (const a of d.querySelectorAll("a[href]")) {
      const h = a.getAttribute("href");
      if (h === "../" || h === "./" || h === "/") out.push("href vers un repertoire : " + h);
    }

    /* Tableaux : entete obligatoire si presents */
    for (const t of d.querySelectorAll("table")) {
      if (!t.querySelector("th")) out.push("tableau sans <th>");
    }

    /* Le sprite injecte est un conteneur purement technique : il doit etre
       masque. Les autres svg decoratifs portent aria-hidden ou un titre. */
    for (const s of d.querySelectorAll("svg")) {
      if (s.parentElement && s.parentElement.hasAttribute("data-sprite")) continue;
      if (!s.getAttribute("aria-hidden") && !s.querySelector("title") && !s.getAttribute("role")) {
        out.push("svg sans aria-hidden ni titre : " + s.outerHTML.slice(0, 70));
      }
    }

    /* responsive : meta viewport */
    const vp = d.querySelector('meta[name="viewport"]');
    if (!vp || !/width=device-width/.test(vp.getAttribute("content"))) {
      out.push("meta viewport absent ou incorrect");
    }

    /* langue */
    if (d.documentElement.getAttribute("lang") !== "fr") out.push("lang incorrect");

    if (out.length) {
      issues += out.length;
      console.log("\n=== " + rel + " ===");
      for (const o of out.slice(0, 12)) console.log("  - " + o);
      if (out.length > 12) console.log("  ... (" + out.length + ")");
    } else {
      console.log("OK  " + rel);
    }
    w.close();
  }

  console.log("\nTotal problemes d'accessibilite: " + issues);

  if (issues) process.exitCode = 1;
})();
