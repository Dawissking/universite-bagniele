const { execFileSync } = require("child_process");
const path = require("path");

const TOOLS = __dirname;
const ROOT = path.resolve(TOOLS, "..");

const SCRIPTS = [
  "audit.js",
  "check-contract.js",
  "check-a11y.js",
  "check-texte.js",
  "check-copyright.js",
  "check-detail.js",
  "check-interactions.js",
  "check-placeholders.js",
  "check-images.js",
  "smoke.js"
];

let silent = 0;

for (const s of SCRIPTS) {
  const abs = path.join(TOOLS, s);
  try {
    execFileSync(process.execPath, [abs], {
      cwd: ROOT,
      stdio: ["ignore", "ignore", "pipe"],
      maxBuffer: 32 * 1024 * 1024
    });
    console.log("exit 0  " + s);
  } catch (e) {
    const code = e.status;
    if (code === 0) {
      console.log("KO  " + s + " : signale des anomalies mais retourne 0");
      silent++;
    } else {
      console.log("exit " + code + "  " + s);
    }
  }
}

console.log(
  "\n" + (silent ? silent + " script(s) en echec muet." : "Tous les scripts sortent en erreur quand ils detectent un probleme.")
);
process.exit(silent ? 1 : 0);
