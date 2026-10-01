/* Copie les fichiers du site vers tools/dist/ :
   Hostinger lit le repertoire de sortie (relatif a la racine de l'app, tools/)
   et le synchronise vers public_html. */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(__dirname, "dist");
const ITEMS = ["index.html", "pages", "css", "js", "images", "documents"];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const copied = [];
for (const item of ITEMS) {
  const src = path.join(ROOT, item);
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(OUT, item), { recursive: true });
  copied.push(item);
}

let files = 0;
(function count(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) count(path.join(dir, e.name));
    else files++;
  }
})(OUT);

console.log("pack : " + copied.join(", ") + " -> tools/dist (" + files + " fichiers)");
