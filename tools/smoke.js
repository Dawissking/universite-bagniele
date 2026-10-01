const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const targets = process.argv.slice(2);
let failures = 0;

(async () => {
  for (const file of targets) {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    const errors = [];
    const vc = new VirtualConsole();
    vc.on("jsdomError", (e) => errors.push("jsdomError: " + (e.stack || e.message)));
    vc.on("error", (...a) => errors.push("console.error: " + a.join(" ")));

    const dom = new JSDOM(fs.readFileSync(file, "utf8"), {
      url: "file:///" + file.replace(/\\/g, "/"),
      runScripts: "dangerously",
      pretendToBeVisual: true,
      virtualConsole: vc
    });

    const { window } = dom;

    for (const src of ["js/icons.js", "js/data.js", "js/main.js"]) {
      try {
        window.eval(fs.readFileSync(path.join(ROOT, src), "utf8"));
      } catch (e) {
        errors.push("echec " + src + ": " + e.message);
      }
    }

    await new Promise((r) => setTimeout(r, 120));

    const doc = window.document;
    const checks = [];

    /* 1. tous les blocs data-render sont remplis */
    for (const h of doc.querySelectorAll("[data-render]")) {
      const key = h.getAttribute("data-render");
      if (!h.innerHTML.trim()) checks.push("data-render vide: " + key);
    }

    /* 2. aucun marqueur residuel ni valeur parasite dans le texte visible */
    const text = doc.body.textContent;
    for (const bad of ["undefined", "NaN", "[object Object]", "__BODY__", "__HOME__", "__SITE__", "__LOGO"]) {
      if (text.includes(bad)) checks.push('texte contient "' + bad + '"');
    }

    /* 3. sprite complet */
    const missing = new Set();
    for (const u of doc.querySelectorAll("use[href^='#i-']")) {
      const id = u.getAttribute("href").slice(1);
      if (!doc.getElementById(id)) missing.add(id);
    }
    if (missing.size) checks.push("sprite manquant: " + [...missing].join(", "));

    /* 4. images presentes sur le disque */
    const dir = path.dirname(file);
    for (const img of doc.querySelectorAll("img[src]")) {
      const src = img.getAttribute("src");
      if (!src || /^(https?:)?\/\//.test(src) || src.startsWith("data:")) continue;
      if (!path.resolve(dir, src.split("#")[0]) || !fs.existsSync(path.resolve(dir, src.split("#")[0]))) {
        checks.push("image absente: " + src);
      }
    }

    /* 5. liens internes vers un id existant */
    const ids = new Set([...doc.querySelectorAll("[id]")].map((n) => n.id));
    for (const a of doc.querySelectorAll("a[href^='#']")) {
      const t = a.getAttribute("href").slice(1);
      if (t && !/^i-/.test(t) && !ids.has(t)) checks.push("ancre cassee: #" + t);
    }

    /* 5b. les pages de detail doivent exposer un acces lisible a leur contenu */
    if (/-(detail)\.html$/.test(rel)) {
      const stem = rel.replace(/^pages\//, "").replace(/-detail\.html$/, "");
      if (!doc.querySelector("h1")) checks.push("page de detail sans <h1>");
      if (!doc.querySelector('[data-render^="' + stem + '-"]')) {
        checks.push("aucun bloc data-render pour le prefixe " + stem + "-");
      }
      if (!doc.querySelector(".breadcrumb")) checks.push("fil d'Ariane absent");
    }

    /* 5c. lien de retour : toute page interne hors accueil doit remonter a index.html */
    if (rel !== "index.html" && !/mentions-legales|politique-confidentialite/.test(rel)) {
      const brand = doc.querySelector(".brand");
      const href = brand ? brand.getAttribute("href") : null;
      if (!href) checks.push("lien de marque absent");
      else if (href === "../" || href === "/" || href === "./") {
        checks.push("lien de marque ambigu (dossier au lieu de index.html): " + href);
      } else if (!fs.existsSync(path.resolve(path.dirname(file), href.split("#")[0]))) {
        checks.push("lien de marque casse: " + href);
      }
    }

    /* 6. interactions construites au demarrage */
    const built = {
      lightbox: doc.getElementById("lightbox"),
      drawer: doc.querySelector(".drawer"),
      filters: doc.querySelectorAll("[data-filter-bar]").length,
      accordions: doc.querySelectorAll(".accordion__btn, .module__head").length,
      forms: doc.querySelectorAll("form[data-validate]").length
    };
    if (!built.lightbox) checks.push("lightbox non construit");
    if (!built.drawer) checks.push("drawer absent");
    if (doc.querySelectorAll(".filter-btn").length && !built.filters) checks.push("boutons de filtre sans barre");

    /* 7. simulation : validation puis soumission d'un formulaire rempli */
    if (built.forms) {
      const form = doc.querySelector("form[data-validate]");
      const status = form.querySelector("[data-form-status]");

      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      if (!status || !status.textContent.trim()) checks.push("soumission vide sans message de statut");
      if (doc.querySelectorAll(".has-error, [aria-invalid='true']").length === 0) {
        checks.push("aucun champ signale comme invalide apres soumission vide");
      }

      for (const ctl of form.querySelectorAll("input, select, textarea")) {
        if (ctl.type === "checkbox") ctl.checked = true;
        else if (ctl.tagName === "SELECT") ctl.selectedIndex = 1;
        else if (ctl.type === "email") ctl.value = "candidat@example.org";
        else if (ctl.type === "tel") ctl.value = "+223 76 00 00 00";
        else ctl.value = "Valeur de test";
        ctl.dispatchEvent(new window.Event("input", { bubbles: true }));
        ctl.dispatchEvent(new window.Event("change", { bubbles: true }));
      }
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await new Promise((r) => setTimeout(r, 1100));
      if (!status || !status.textContent.trim()) checks.push("soumission valide sans message");
      else if (!/local|transmis|transmise|guichet|directement/i.test(status.textContent)) {
        checks.push("message de formulaire ambigu: " + JSON.stringify(status.textContent.trim().slice(0, 100)));
      }
    }

    /* 7b. page de detail : sans parametre et avec un id inconnu, un message doit s'afficher */
    if (/-(detail)\.html$/.test(rel)) {
      const stem = rel.replace(/^pages\//, "").replace(/-detail\.html$/, "");
      const host = doc.querySelector('[data-render^="' + stem + '-"]');
      if (host && !host.querySelector("h2, h3, p")) checks.push("detail vide : ni contenu ni message");
      if (host && !/introuvable|plus disponible|retour/i.test(host.textContent)) {
        checks.push("detail sans message d'absence pour un id manquant");
      }
    }

    /* 7c. les liens vers une page de detail portent tous un id existant */
    for (const a of doc.querySelectorAll('a[href*="-detail.html?id="]')) {
      const href = a.getAttribute("href");
      const id = decodeURIComponent(href.split("?id=")[1].split("#")[0]);
      const pool = href.indexOf("actualite-detail") >= 0 ? window.UBD.actualites : window.UBD.formations;
      if (!pool.some((x) => x.id === id)) {
        checks.push("lien de detail vers un id inexistant: " + id);
      }
    }

    /* 8. simulation : ouverture du drawer */
    const burger = doc.querySelector(".burger");
    if (burger && built.drawer) {
      burger.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
      if (!built.drawer.classList.contains("is-open")) checks.push("le drawer ne s'ouvre pas");
      const closer = doc.querySelector("[data-drawer-close]");
      if (closer) {
        closer.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
        if (built.drawer.classList.contains("is-open")) checks.push("le drawer ne se ferme pas");
      } else {
        checks.push("bouton de fermeture du drawer absent");
      }
    }

    /* 9. navigation active */
    /* 9. navigation active
       Les pages legales ne sont listees qu'en pied de page : leurNavigation
       principale n'a volontairement pas de rubrique correspondante. */
    const LEGAL = /mentions-legales|politique-confidentialite/;
    const active = doc.querySelectorAll(
      ".nav__link.is-active, .drawer-nav__link.is-active"
    ).length;
    if (active === 0 && !LEGAL.test(rel)) checks.push("aucun lien de navigation marque actif");

    /* 9b. si un lien de menu secondaire est actif, sa rubrique parente l'est aussi */
    const subActive = doc.querySelectorAll(".dropdown__link.is-active, .drawer-sub__link.is-active").length;
    const parentActive = doc.querySelectorAll(".nav__item--has-dropdown > .nav__link.is-active").length;
    if (subActive > 0 && parentActive === 0) checks.push("rubrique parente non marquee active");

    if (errors.length || checks.length) {
      failures += errors.length + checks.length;
      console.log("\n=== " + rel + " ===");
      for (const e of errors.slice(0, 10)) console.log("  ! " + String(e).split("\n").slice(0, 4).join("\n    "));
      for (const c of checks.slice(0, 10)) console.log("  - " + c);
      if (errors.length + checks.length > 10) console.log("  ... (" + (errors.length + checks.length) + " au total)");
    } else {
      console.log(
        "OK  " + rel +
        "  (" + doc.querySelectorAll("[data-render]").length + " rendus, " +
        doc.querySelectorAll("use[href^='#i-']").length + " icones, " +
        built.filters + " barre(s) de filtre, " + built.accordions + " accordeon(s), " +
        built.forms + " formulaire(s))"
      );
    }

    window.close();
  }

  console.log("\nTotal problemes: " + failures);

  if (failures) process.exitCode = 1;
})();
