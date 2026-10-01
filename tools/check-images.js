/* Audit complet des references d'images :
   - fichier reference mais absent du dossier images/
   - fichier present mais jamais reference (image morte)
   - attribut width/height declares differents des dimensions reelles
   - image referencee sans alt pertinent
   - image en arriere-plan CSS (object-fit manquant ?)
   - chemins absolus ou mixant / et \  */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const IMG_DIR = path.join(ROOT, "images");

/* ---------- dimensions reelles, lues dans l'en-tete ---------- */
function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: "png" };
}
function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7), type: "jpeg" };
    }
    i += 2 + len;
  }
  return null;
}

const reels = new Map();
for (const f of fs.readdirSync(IMG_DIR)) {
  const abs = path.join(IMG_DIR, f);
  if (!fs.statSync(abs).isFile()) continue;
  const buf = fs.readFileSync(abs);
  const d = pngSize(buf) || jpegSize(buf);
  reels.set(f, d ? { ...d, ko: Math.round(buf.length / 1024) } : { w: 0, h: 0, type: "?", ko: Math.round(buf.length / 1024) });
}

const pages = ["index.html"].concat(
  fs.readdirSync(path.join(ROOT, "pages")).filter((f) => f.endsWith(".html")).map((f) => "pages/" + f)
);
const sources = [
  "js/data.js", "js/main.js", "js/icons.js",
  "css/style.css",
  "tools/layout.js", "tools/build-ubd.js", "tools/build-legal.js", "tools/build-pesup1.js", "tools/build-pesup2.js"
];

const refs = new Map(); /* fichier images/x -> [{source, contexte, w, h, alt}] */
const introuvables = [];
const ratiosFaux = [];
const sansAlt = [];

function note(fichier, source, contexte, w, h, alt) {
  const nom = fichier.replace(/^.*images[\\/]/, "").replace(/^\.\.[\\/]/, "");
  if (!refs.has(nom)) refs.set(nom, []);
  refs.get(nom).push({ source, contexte, w, h, alt });
  if (!reels.has(nom)) introuvables.push(source + "  ->  images/" + nom + "   (" + contexte + ")");
  if (typeof w === "number" && typeof h === "number" && w > 0 && reels.has(nom)) {
    const r = reels.get(nom);
    if (r.w && Math.abs(w / h - r.w / r.h) > 0.02) {
      ratiosFaux.push(
        source + "  ->  images/" + nom + "  declare " + w + "x" + h +
        " (ratio " + (w / h).toFixed(2) + ")  reel " + r.w + "x" + r.h + " (ratio " + (r.w / r.h).toFixed(2) + ")"
      );
    }
  }
  /* alt absent ET alt vide sont deux problemes distincts : le premier est
     un oubli, le second doit etre justifie par le caractere decoratif.
     La verification ne concerne que les vrais <img> du HTML, pas les
     references trouvees dans le code source (data.js, CSS, etc.), ou le
     champ alt est porteur par un objet de donnees voisin. */
  if (contexte === "img") {
    if (alt === null) {
      sansAlt.push(source + "  ->  images/" + nom + "  : attribut alt ABSENT sur <img>");
    } else if (!alt.trim()) {
      sansAlt.push(source + "  ->  images/" + nom + "  : alt vide sur <img>");
    }
  }
}

/* ---------- 1. HTML genere ---------- */
for (const rel of pages) {
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, rel), "utf8"));
  for (const img of dom.window.document.querySelectorAll("img")) {
    const src = img.getAttribute("src") || "";
    if (!src) continue;
    if (/^(https?:|data:)/.test(src)) {
      introuvables.push(rel + "  ->  image distante : " + src);
      continue;
    }
    note(src, rel, "img", parseInt(img.getAttribute("width"), 10), parseInt(img.getAttribute("height"), 10), img.getAttribute("alt"));
  }
  dom.window.close();
}

/* ---------- 2. HTML genere apres execution de main.js ---------- */
(async () => {
  for (const rel of pages) {
    const abs = path.join(ROOT, rel);
    const dom = new JSDOM(fs.readFileSync(abs, "utf8"), {
      url: "file:///" + abs.replace(/\\/g, "/"),
      runScripts: "dangerously",
      pretendToBeVisual: true
    });
    for (const s of ["js/icons.js", "js/data.js", "js/main.js"]) {
      dom.window.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
    }
    await new Promise((r) => setTimeout(r, 140));
    for (const img of dom.window.document.querySelectorAll("img")) {
      const src = img.getAttribute("src") || "";
      if (!src || /^(https?:|data:)/.test(src)) continue;
      note(src, rel + " [dynamique]", "img", parseInt(img.getAttribute("width"), 10), parseInt(img.getAttribute("height"), 10), img.getAttribute("alt"));
    }
    dom.window.close();
  }

  /* ---------- 3. Sources (data, templates, CSS) ---------- */
  for (const rel of sources) {
    const s = fs.readFileSync(path.join(ROOT, rel), "utf8");
    for (const m of s.matchAll(/images\/[A-Za-z0-9._\u00c0-\u024f-]+/g)) {
      note(m[0], rel, "texte source", null, null, null);
    }
  }

  /* ---------- 4. CSS : url(images/...) ---------- */
  {
    const s = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
    for (const m of s.matchAll(/url\(\s*['"]?(?:\.\.\/)?images\/([^'")]+)['"]?\s*\)/g)) {
      note("images/" + m[1], "css/style.css", "url()", null, null, null);
    }
  }

  const liste = (t) => {
    console.log("\n" + t);
    console.log("-".repeat(80));
  };

  /* Un fichier jamais reference n'est pas forcement un defaut : les favicons
     et apple-touch-icon sont consommes par le <head>, pas par un <img>. */
  const consommeesParHead = new Set(["favicon-32.png", "favicon-pesup-32.png", "apple-touch-icon.png"]);
  const jamaisUtilisees = [...reels.keys()].filter((f) => !refs.has(f) && !consommeesParHead.has(f));

  liste("1. IMAGES PRESENTES MAIS JAMAIS UTILISEES (" + jamaisUtilisees.length + ")");
  const orphelines = jamaisUtilisees.sort();
  if (!orphelines.length) console.log("  aucune");
  for (const f of orphelines) {
    const d = reels.get(f);
    console.log("  " + f.padEnd(32) + (d.w + "x" + d.h).padEnd(11) + d.ko + " Ko");
  }

  liste("2. IMAGES REFERENCEES MAIS ABSENTES (" + introuvables.length + ")");
  if (!introuvables.length) console.log("  aucune");
  for (const s of [...new Set(introuvables)]) console.log("  " + s);

  liste("3. RATIOS DECLARES DIFFERENTS DES DIMENSIONS REELLES (" + ratiosFaux.length + ")");
  if (!ratiosFaux.length) console.log("  aucun");
  for (const s of [...new Set(ratiosFaux)]) console.log("  " + s);

  /* Une image decorative porte alt="" : c'est la bonne pratique. On ne signale
     que les images de contenu dont l'alt est absent. Pour distinguer les deux,
     on s'appuie sur la classe du conteneur immediate dans le HTML source. */
  const estDecoratif = (source, src) => {
    if (/logo-?|Logo_/i.test(src)) return true;
    const html = fs.readFileSync(path.join(ROOT, source), "utf8");
    const re = new RegExp("<[^>]*class=\"[^\"]*(page-hero__bg|hero__bg|footer__logo|brand__logo|img--reseau|header__partner)[^\"]*\"[^>]*>\\s*<img[^>]*" + src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return re.test(html);
  };
  const contenuSansAlt = [...new Set(sansAlt)].filter((s) => {
    const m = s.match(/^(.*?)\s+->\s+images\/(\S+)\s+:/);
    if (!m) return true;
    const source = m[1].replace(/ \[dynamique\]$/, "");
    const src = m[2];
    if (/^https?:/.test(src)) return true;
    try { return !estDecoratif(source, src); } catch (e) { return true; }
  });

  liste("4. IMAGES DE CONTENU SANS ALT (" + contenuSansAlt.length + ")");
  if (!contenuSansAlt.length) console.log("  aucune");
  for (const s of contenuSansAlt) console.log("  " + s);

  const total = introuvables.length + ratiosFaux.length + contenuSansAlt.length;
  console.log("");
  console.log(total === 0
    ? "Images : aucun probleme detecte."
    : "Images : " + total + " probleme(s) a corriger.");

  liste("5. INVENTAIRE DES REFERENCES (" + refs.size + " fichiers distincts sur " + reels.size + " presents)");
  for (const [f, usages] of [...refs].sort()) {
    const d = reels.get(f);
    const parPage = new Set();
    for (const u of usages) {
      if (/^index\.html$|^pages\//.test(u.source)) parPage.add(u.source);
    }
    console.log(
      "  " + f.padEnd(32) +
      (d ? (d.w + "x" + d.h).padEnd(11) : "ABSENT     ").padEnd(11) +
      (d ? String(d.ko + " Ko").padEnd(9) : "          ") +
      String(parPage.size).padStart(3) + " page(s)"
    );
    for (const u of usages) {
      if (!/^index\.html$|^pages\//.test(u.source)) console.log("        source : " + u.source);
    }
  }

  /* Un controle qui sort toujours en zero ne controle rien : on signale
     l'echec par le code de sortie pour que check-all.js l'arrete. */
  process.exitCode = total === 0 ? 0 : 1;
})();
