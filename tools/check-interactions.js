/* Verification des interactions d'interface dans un DOM simule (jsdom).
   Usage : node tools/check-interactions.js
   Sort un code 1 des la premiere anomalie detectee. */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");

let failures = 0;

function ok(label, condition, detail) {
  const line = (condition ? "OK  " : "KO  ") + label + (detail ? "  [" + detail + "]" : "");
  if (!condition) failures++;
  console.log(line);
}

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
  /* ---------- reveal : repli sans IntersectionObserver ---------- */
  {
    const dom = boot("index.html");
    await wait(200);
    const d = dom.window.document;
    const total = d.querySelectorAll("[data-reveal]").length;
    const revealed = d.querySelectorAll("[data-reveal].is-revealed").length;
    ok("reveal sans IntersectionObserver", total > 0 && revealed === total, revealed + "/" + total);
    dom.window.close();
  }

  /* ---------- lightbox ---------- */
  {
    const dom = boot("pages/pesup-galerie.html");
    await wait(200);
    const w = dom.window;
    const d = w.document;
    const box = d.getElementById("lightbox");
    const item = d.querySelector("[data-lightbox]");
    ok("lightbox construit", !!box);
    ok("galerie lightbox presente", !!item);

    if (box && item) {
      ok("lightbox masque au depart", box.getAttribute("aria-hidden") === "true", box.getAttribute("aria-hidden"));
      ok("role dialogue", box.getAttribute("role") === "dialog");

      item.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("ouverture par clic", box.classList.contains("is-open") && box.getAttribute("aria-hidden") === "false");
      ok("corps verrouille", d.body.classList.contains("is-locked"));
      ok("image chargee", !!d.querySelector(".lightbox__img").getAttribute("src"));
      ok("legende renseignee", d.querySelector(".lightbox__caption strong").textContent.trim().length > 0);

      /* Le nombre d'elements evolue avec la galerie : on le lit sur le DOM
         plutot que de le figer, sinon l'ajout d'une photo casse le test. */
      const total = d.querySelectorAll("[data-lightbox]").length;
      const compteur = () => d.querySelector(".lightbox__counter").textContent.trim();
      ok("compteur initial", compteur() === "1 / " + total, compteur() + " (attendu 1 / " + total + ")");

      d.querySelector(".lightbox__btn--next").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("image suivante", compteur() === "2 / " + total, compteur() + " (attendu 2 / " + total + ")");

      d.querySelector(".lightbox__btn--prev").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("image precedente", compteur() === "1 / " + total, compteur() + " (attendu 1 / " + total + ")");

      d.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      ok("fermeture par Echap", !box.classList.contains("is-open") && box.getAttribute("aria-hidden") === "true");
      ok("corps deverrouille", !d.body.classList.contains("is-locked"));
    }
    w.close();
  }

  /* ---------- accordions ---------- */
  {
    const dom = boot("pages/admissions.html");
    await wait(200);
    const w = dom.window;
    const d = w.document;
    const acc = d.querySelector(".accordion__btn");
    ok("accordeon present", !!acc);
    if (acc) {
      const panelId = acc.getAttribute("aria-controls");
      const panel = panelId ? d.getElementById(panelId) : null;
      ok("panneau relie par aria-controls", !!panel, panelId);
      ok("panneau identifie", !!panel && panel.getAttribute("aria-labelledby") === acc.id);
      ok("premier panneau ouvert au depart", acc.getAttribute("aria-expanded") === "true");
      acc.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("fermeture au clic", acc.getAttribute("aria-expanded") === "false" && !acc.closest(".accordion__item").classList.contains("is-open"));
      acc.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("reouverture au clic", acc.getAttribute("aria-expanded") === "true" && acc.closest(".accordion__item").classList.contains("is-open"));
    }
    w.close();
  }

  /* ---------- filtres ---------- */
  {
    const dom = boot("pages/formations.html");
    await wait(200);
    const w = dom.window;
    const d = w.document;
    const btns = [...d.querySelectorAll(".filter-btn")];
    const items = [...d.querySelectorAll("[data-filter-group]")];
    const sels = [...d.querySelectorAll("[data-filter-select]")];
    const wrap = d.querySelector("[data-filter-items]");
    const count = d.querySelector("[data-filter-count]");
    const shown = () => items.filter((i) => !i.classList.contains("is-hidden")).length;

    ok("barre de filtres presente", btns.length > 0 && !!count, btns.length + " boutons");
    ok("elements filtrables", items.length > 0, items.length + " elements");
    ok("tous les elements visibles au depart", shown() === items.length, shown() + "/" + items.length);

    const tout = btns.find((b) => b.getAttribute("data-filter-value") === "");
    ok("bouton 'Tout' present", !!tout);
    if (tout) {
      tout.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("'Tout' reaffiche tout", shown() === items.length, shown() + "/" + items.length);
      ok("compteur coherent", count.textContent.indexOf(String(items.length)) === 0, count.textContent.trim());
    }

    const licence = btns.find((b) => b.getAttribute("data-filter-value") === "licence");
    ok("bouton de categorie present", !!licence);
    if (licence) {
      licence.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      const attendu = items.filter((i) => i.getAttribute("data-filter-group") === "licence").length;
      ok("filtre par categorie", attendu > 0 && shown() === attendu, shown() + " visibles, " + attendu + " attendus");
      ok("aucun etat vide inutile", !wrap.querySelector(".empty-state"));
    }

    ok("select de departement present", sels.length > 0);
    if (sels.length) {
      const sel = sels[0];
      const opt = [...sel.options].find((o) => o.value);
      ok("options du select etiquetees", opt && opt.textContent.trim().length > 0, opt ? opt.textContent.trim() : "absent");
      sel.value = opt.value;
      sel.dispatchEvent(new w.Event("change", { bubbles: true }));
      const attendu = items.filter(
        (i) =>
          i.getAttribute("data-filter-group") === "licence" &&
          i.getAttribute("data-filter-key") === opt.value
      ).length;
      ok("filtre combine categorie + departement", attendu > 0 && shown() === attendu, shown() + " visibles, " + attendu + " attendus");
      sel.value = "";
      sel.dispatchEvent(new w.Event("change", { bubbles: true }));
      ok("reinitialisation du select", shown() === items.filter((i) => i.getAttribute("data-filter-group") === "licence").length);
    }
    w.close();
  }

  /* ---------- tiroir de navigation ---------- */
  {
    const dom = boot("pages/universite.html");
    await wait(200);
    const w = dom.window;
    const d = w.document;
    const burger = d.querySelector(".burger");
    const drawer = d.querySelector(".drawer");
    ok("bouton menu present", !!burger);
    ok("tiroir present", !!drawer);
    if (burger && drawer) {
      ok("tiroir ferme au depart", !drawer.classList.contains("is-open"));
      burger.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      ok("ouverture du tiroir", drawer.classList.contains("is-open"));
      d.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      ok("fermeture par Echap", !drawer.classList.contains("is-open"));
    }
    w.close();
  }

  /* ---------- formulaires ---------- */
  {
    const dom = boot("pages/contact.html");
    await wait(200);
    const w = dom.window;
    const d = w.document;
    const form = d.querySelector("form[data-validate]");
    ok("formulaire de contact present", !!form);

    if (form) {
      form.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
      await wait(1000);
      const status = form.querySelector(".form-status");
      ok("soumission vide refusee", !!status && status.textContent.trim().length > 0, status ? status.textContent.trim().slice(0, 60) : "absent");

      for (const c of form.querySelectorAll("input,select,textarea")) {
        if (c.type === "checkbox") c.checked = true;
        else if (c.tagName === "SELECT") c.selectedIndex = 1;
        else if (c.type === "email") c.value = "candidat@example.org";
        else if (c.type === "tel") c.value = "+223 76 00 00 00";
        else c.value = "Test";
      }
      form.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
      await wait(1000);
      const message = form.querySelector(".form-status").textContent;
      const toast = d.querySelector(".toast");
      const toastText = toast ? toast.textContent : "";
      ok("soumission complete acceptee", /enregistr/i.test(message), message.trim().slice(0, 60));
      ok("absence d'envoi explicite", /aucun envoi/i.test(message + " " + toastText), (message + " " + toastText).trim().slice(0, 80));
    }
    w.close();
  }

  console.log(failures ? "\nTotal problemes: " + failures : "\nInteractions : OK");
  process.exit(failures ? 1 : 0);
})();
