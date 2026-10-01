const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");

function load(rel, query) {
  const abs = path.join(ROOT, rel);
  const dom = new JSDOM(fs.readFileSync(abs, "utf8"), {
    url: "file:///" + abs.replace(/\\/g, "/") + (query || ""),
    runScripts: "dangerously",
    pretendToBeVisual: true
  });
  for (const s of ["js/icons.js", "js/data.js", "js/main.js"]) {
    dom.window.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
  }
  return dom;
}

(async () => {
  /* 1. tous les liens de page de detail du site pointent vers un id existant */
  const sources = ["index.html"].concat(
    fs.readdirSync(path.join(ROOT, "pages"))
      .filter((f) => f.endsWith(".html"))
      .map((f) => "pages/" + f)
  );

  const ids = { actualites: new Set(), formations: new Set(), evenements: new Set() };
  const probe0 = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "file:///" + path.join(ROOT, "index.html").replace(/\\/g, "/"),
    runScripts: "dangerously"
  });
  probe0.window.eval(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8"));
  const D = probe0.window.UBD;
  D.actualites.forEach((a) => ids.actualites.add(a.id));
  D.formations.forEach((f) => ids.formations.add(f.id));
  (D.evenements || []).forEach((e) => ids.evenements.add(e.id));

  let bad = 0;
  let total = 0;
  for (const rel of sources) {
    const dom = load(rel);
    await new Promise((r) => setTimeout(r, 120));
    for (const a of dom.window.document.querySelectorAll("a[href*='-detail.html?id=']")) {
      const href = a.getAttribute("href");
      const id = decodeURIComponent(href.split("?id=")[1].split("#")[0]);
      const kind = href.includes("actualite-detail")
        ? "actualites"
        : href.includes("formation-detail")
        ? "formations"
        : "evenements";
      total++;
      if (!ids[kind].has(id)) {
        console.log("  id inexistant : " + rel + " -> " + href);
        bad++;
      }
    }
    dom.window.close();
  }
  console.log("Liens de detail verifies : " + total + " (" + bad + " invalides)");

  /* 2. tous les id de detail sont atteignables et affichent leur contenu */
  const probes = [
    ["pages/actualite-detail.html", "actualites", D.actualites],
    ["pages/formation-detail.html", "formations", D.formations]
  ];

  let missing = bad;

  for (const [rel, kind, list] of probes) {
    let ok = 0;
    for (const item of list) {
      const dom = load(rel, "?id=" + item.id);
      await new Promise((r) => setTimeout(r, 90));
      const text = dom.window.document.body.textContent;
      const good = !/Contenu introuvable/.test(text) && !/undefined|NaN/.test(text);
      if (good) ok++;
      else {
        missing++;
        console.log("  ECHEC " + rel + "?id=" + item.id);
      }
      dom.window.close();
    }
    console.log(rel + " : " + ok + "/" + list.length + " contenus affiches");
  }

  /* 3. un id absent ou inconnu affiche un message explicite, sans erreur */
  for (const rel of probes.map((p) => p[0])) {
    for (const query of ["", "?id=", "?id=zzz-inexistant"]) {
      const dom = load(rel, query);
      await new Promise((r) => setTimeout(r, 90));
      const d = dom.window.document;
      const hasMessage = /Contenu introuvable/.test(d.body.textContent);
      const clean = !/undefined|NaN|\[object Object\]/.test(d.body.textContent);
      if (!hasMessage || !clean) {
        missing++;
        console.log("  ECHEC " + rel + query + " : message manquant ou contenu invalide");
      }
      dom.window.close();
    }
    console.log(rel + " : etats degrades verifies");
  }

  console.log("\nTotal problemes de detail: " + missing);
  if (missing) process.exitCode = 1;
})();
