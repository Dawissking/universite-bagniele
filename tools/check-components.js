const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");

function boot(rel) {
  const abs = path.join(ROOT, rel);
  const dom = new JSDOM(fs.readFileSync(abs, "utf8"), {
    url: "file:///" + abs.replace(/\\/g, "/"),
    runScripts: "dangerously",
    pretendToBeVisual: true
  });
  for (const s of ["js/icons.js", "js/data.js", "js/main.js"]) {
    dom.window.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
  }
  return dom;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const files = ["index.html"].concat(
    fs.readdirSync(path.join(ROOT, "pages"))
      .filter((f) => f.endsWith(".html"))
      .map((f) => "pages/" + f)
  );

  const feats = {
    compteur: "[data-count]",
    module: "[data-module]",
    onglet: "[data-tabs]",
    progression: ".progress",
    preloader: ".preloader",
    fichier: ".file-upload",
    revelationAuto: "[data-auto-reveal]"
  };

  console.log("--- composants presents apres rendu ---");
  for (const [name, sel] of Object.entries(feats)) {
    const pages = [];
    let total = 0;
    for (const f of files) {
      const dom = boot(f);
      await wait(150);
      const n = dom.window.document.querySelectorAll(sel).length;
      dom.window.close();
      if (n) {
        pages.push(f.replace(/^pages\//, "") + "(" + n + ")");
        total += n;
      }
    }
    console.log(
      (name + "            ").slice(0, 16) + " : " + (total ? total + " -> " + pages.join(", ") : "inutilise")
    );
  }
})();
