/* Point d'entete unique des controles qualite.
   Usage : node tools/check-all.js
   Necessite jsdom : npm install --prefix tools */

const { execFileSync } = require("child_process");
const path = require("path");

const TOOLS = __dirname;
const ROOT = path.resolve(TOOLS, "..");

const HTML = ["index.html"].concat(
  require("fs")
    .readdirSync(path.join(ROOT, "pages"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => path.join(ROOT, "pages", f))
);

const STEPS = [
  ["Syntaxe JavaScript", null, ["js/data.js", "js/icons.js", "js/main.js"].map((f) => path.join(ROOT, f))],
  ["Integrite du texte", path.join(TOOLS, "check-texte.js"), null],
  ["Gabarits resolus", path.join(TOOLS, "check-placeholders.js"), null],
  ["Audit liens et assets", path.join(TOOLS, "audit.js"), HTML],
  ["Images : fichiers, ratios, alt", path.join(TOOLS, "check-images.js"), null],
  ["Contrats HTML", path.join(TOOLS, "check-contract.js"), HTML],
  ["Accessibilite", path.join(TOOLS, "check-a11y.js"), null],
  ["Variables CSS", path.join(TOOLS, "check-css-vars.js"), null],
  ["Classes CSS", path.join(TOOLS, "check-css-classes.js"), null],
  ["Taille des icones", path.join(TOOLS, "check-icons-size.js"), null],
  ["Pied de page", path.join(TOOLS, "check-copyright.js"), null],
  ["Contraste des textes", path.join(TOOLS, "check-contrast.js"), null],
  ["Pages de detail", path.join(TOOLS, "check-detail.js"), null],
  ["Interactions", path.join(TOOLS, "check-interactions.js"), null],
  ["Execution dans le DOM", path.join(TOOLS, "smoke.js"), HTML],
  ["Codes de sortie", path.join(TOOLS, "check-exit-codes.js"), null]
];

let failed = 0;

for (const [label, script, args] of STEPS) {
  process.stdout.write("\n=== " + label + " ===\n");
  try {
    if (script === null) {
      for (const f of args) {
        execFileSync(process.execPath, ["--check", f], { stdio: "pipe" });
        console.log("OK  " + path.relative(ROOT, f));
      }
    } else {
      const out = execFileSync(process.execPath, [script, ...(args || [])], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024
      });
      const lines = out.trim().split("\n");
      console.log(lines.slice(-6).join("\n"));
    }
    console.log("-> " + label + " : OK");
  } catch (e) {
    failed++;
    console.log((e.stdout || "").trim());
    if (e.stderr) console.log(String(e.stderr).trim().split("\n").slice(0, 8).join("\n"));
    console.log("-> " + label + " : ECHEC");
  }
}

console.log("\n" + (failed ? failed + " etape(s) en echec." : "Toutes les controles passent."));
process.exit(failed ? 1 : 0);
