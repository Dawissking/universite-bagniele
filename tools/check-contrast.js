/* Verification du contraste texte / fond.
   jsdom ne resout pas les custom properties : on lit la valeur declaree
   (parfois « var(--ink-2) »), puis on la resout avec la carte de variables du
   theme applicable (:root ou [data-theme="pesup"]).
   Les seuils appliques sont ceux des WCAG 2.1 (AA). */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const CSS = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");

/* ------------------------------------------------------------------ */
/* Lecture des variables d'un theme                                    */
/* ------------------------------------------------------------------ */

function themeVars(selector) {
  const clean = CSS.replace(/\/\*[\s\S]*?\*\//g, "");
  const vars = new Map();

  /* On cible le bloc exact pour eviter de melanger les themes. */
  const re = new RegExp("(?:^|[\\s,}])" + selector.replace(/[[\]]/g, "\\$&") + "\\s*\\{([^}]*)\\}", "g");
  let m;
  while ((m = re.exec(clean)) !== null) {
    for (const d of m[1].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+)/gi)) {
      vars.set(d[1], d[2].trim());
    }
  }
  return vars;
}

const VARS = {
  root: themeVars(":root"),
  pesup: new Map([...themeVars(":root"), ...themeVars('[data-theme="pesup"]')])
};

/* Resout var(--x, defaut) recursivement. */
function resolve(value, vars, depth) {
  depth = depth || 0;
  if (depth > 12 || typeof value !== "string") return value;
  if (value.indexOf("var(") < 0) return value.trim();

  return value.replace(/var\(\s*(--[a-z0-9-]+)\s*(?:,\s*([^)]*))?\)/gi, (_, name, fallback) => {
    const v = vars.get(name);
    if (v === undefined) return fallback !== undefined ? fallback : "";
    return resolve(v, vars, depth + 1);
  }).trim();
}

/* ------------------------------------------------------------------ */
/* Couleurs                                                            */
/* ------------------------------------------------------------------ */

function parseColor(str) {
  if (!str) return null;
  const s = String(str).trim();

  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length === 4) h += "ff";
    if (h.length === 6) h += "ff";
    if (h.length === 8) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: parseInt(h.slice(6, 8), 16) / 255
      };
    }
    return null;
  }

  m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
    if (p.length >= 3) {
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
  }

  if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  if (s === "white") return { r: 255, g: 255, b: 255, a: 1 };
  if (s === "black") return { r: 0, g: 0, b: 0, a: 1 };
  return null;
}

const chan = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const lum = ({ r, g, b }) => 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);

/* Convertit une longueur CSS en pixels (rem/em bases, clamp, calc simples). */
function toPx(value, base) {
  const v = String(value || "").trim();
  if (!v) return null;
  if (v.endsWith("px")) return parseFloat(v);
  if (v.endsWith("rem") || v.endsWith("em")) return parseFloat(v) * (base || 16);
  if (v.endsWith("pt")) return (parseFloat(v) * 96) / 72;
  const m = v.match(/^clamp\(([^,]+),\s*([^,]+),/i);
  if (m) return toPx(m[2], base) ?? toPx(m[1], base);
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
}

const ratio = (a, b) => {
  const l1 = lum(a);
  const l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const flatten = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1
});

/* ------------------------------------------------------------------ */

const files = ["index.html"].concat(
  fs.readdirSync(path.join(ROOT, "pages"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => "pages/" + f)
);

(async () => {
  let problems = 0;
  let checked = 0;

  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    const dom = new JSDOM(fs.readFileSync(abs, "utf8"), {
      url: "file:///" + abs.replace(/\\/g, "/"),
      runScripts: "dangerously",
      pretendToBeVisual: true,
      resources: "usable"
    });

    await new Promise((resolve) => {
      if (dom.window.document.readyState === "complete") resolve();
      else dom.window.addEventListener("load", resolve);
      setTimeout(resolve, 3000);
    });

    const w = dom.window;
    for (const s of ["js/icons.js", "js/data.js", "js/main.js"]) {
      w.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
    }
    await new Promise((r) => setTimeout(r, 150));

    const d = w.document;
    const theme = d.documentElement.getAttribute("data-theme") === "pesup" ? VARS.pesup : VARS.root;

    const out = [];

    const style = (el, prop) => resolve(w.getComputedStyle(el)[prop], theme);

    function bgOf(el, depth) {
      depth = depth || 0;
      let acc = null;
      let node = el;
      while (node) {
        /* background-color peut rester transparent quand la feuille utilise
           le raccourci « background ». On tente alors le raccourci complet. */
        let c = parseColor(style(node, "backgroundColor"));
        if (!c || c.a === 0) {
          const short = style(node, "background") || style(node, "backgroundImage");
          const m = String(short).match(/(rgba?\([^)]*\)|#[0-9a-f]{3,8})/i);
          if (m) c = parseColor(m[1]);
        }
        if (c && c.a > 0) {
          acc = acc ? flatten(acc, c) : c;
          if (acc.a >= 1) return acc;
        } else if (depth < 3) {
          /* Un conteneur fixe ou collant au fond transparent est superpose au
             contenu : son arriere-plan visuel est la premiere section de la
             page, pas l'element body. */
          const pos = w.getComputedStyle(node).position;
          if (pos === "fixed" || pos === "sticky") {
            const dessous = d.querySelector(".hero, .page-hero, main > section");
            if (dessous && !dessous.contains(node)) {
              const fond = bgOf(dessous, depth + 1);
              return acc ? flatten(acc, fond) : fond;
            }
          }
        }
        node = node.parentElement;
      }
      return acc || { r: 255, g: 255, b: 255, a: 1 };
    }

    for (const el of d.querySelectorAll("body *")) {
      const text = [...el.childNodes]
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join(" ")
        .trim();
      if (text.length < 2) continue;

      const cs = w.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      if (parseFloat(cs.opacity) < 0.15) continue;
      if (el.closest("[aria-hidden='true']")) continue;

      const fgRaw = parseColor(style(el, "color"));
      if (!fgRaw) continue;

      const bg = bgOf(el);
      const fg = fgRaw.a < 1 ? flatten(fgRaw, bg) : fgRaw;
      const c = ratio(fg, bg);

      const size = toPx(style(el, "fontSize"), 16) || 16;
      const weight = parseInt(style(el, "fontWeight"), 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const seuil = large ? 3 : 4.5;

      checked++;

      if (c < seuil) {
        const cls = String(el.className || "").split(" ")[0];
        out.push(
          c.toFixed(2) + ":1 (min " + seuil + ")  <" + el.tagName.toLowerCase() +
          (cls ? "." + cls : "") + "> " + Math.round(size) + "px/" + weight +
          "  \"" + text.slice(0, 40) + "\""
        );
      }
    }

    if (out.length) {
      problems += new Set(out).size;
      console.log("\n=== " + rel + " ===");
      [...new Set(out)].slice(0, 8).forEach((o) => console.log("  - " + o));
    }

    w.close();
  }

  console.log("\nTextes analyses : " + checked);
  console.log("Total problemes de contraste: " + problems);
  if (problems) process.exitCode = 1;
})();
