const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

/* ---------- dimensions reelles des images ----------
   Les gabarits ecrivent width/height indicatifs, mais une valeur fausse
   provoque un decalage de mise en page (CLS) et un ratio force a l'affichage.
   On relit donc l'en-tete du fichier a la generation pour imposer la taille
   intrinsèque reelle : le CSS garde la main sur la taille d'affichage. */
const IMG_DIR = path.join(ROOT, "images");
const dimCache = new Map();

function pngDims(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function jpegDims(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marqueur = buf[i + 1];
    if (marqueur === 0xd8 || marqueur === 0x01 || (marqueur >= 0xd0 && marqueur <= 0xd7)) { i += 2; continue; }
    const taille = buf.readUInt16BE(i + 2);
    const estSOF =
      marqueur >= 0xc0 && marqueur <= 0xcf &&
      marqueur !== 0xc4 && marqueur !== 0xc8 && marqueur !== 0xcc;
    if (estSOF) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + taille;
  }
  return null;
}

function imageDims(src) {
  const nom = src.split("#")[0].split("?")[0].replace(/^.*images[\\/]/, "");
  if (dimCache.has(nom)) return dimCache.get(nom);
  let dims = null;
  const abs = path.join(IMG_DIR, nom);
  if (nom && fs.existsSync(abs) && fs.statSync(abs).isFile()) {
    const buf = fs.readFileSync(abs);
    dims = pngDims(buf) || jpegDims(buf);
  }
  dimCache.set(nom, dims);
  return dims;
}

/* Remplace width/height par les dimensions reelles de chaque <img>. */
function corrigerDimensions(html) {
  return html.replace(/<img\b[^>]*>/g, function (tag) {
    const src = (tag.match(/\bsrc="([^"]+)"/) || [])[1];
    if (!src || /^(https?:|data:)/.test(src)) return tag;
    const dims = imageDims(src);
    if (!dims || !dims.w || !dims.h) return tag;
    let sortie = tag.replace(/\swidth="\d+"/g, "").replace(/\sheight="\d+"/g, "");
    return sortie.replace(/\s*\/?>$/, ' width="' + dims.w + '" height="' + dims.h + '"$&');
  });
}

/* Bandeau de reseau, reserve a l'accueil UBD : rappelle le lien avec le pole
   sante. Le reste du site s'en passe. Il ne porte aucun logo : la marque
   CSUP figure deja dans le bloc d'identite juste au dessus. */
const PARTNERS = `  <div class="footer__partners">
    <div class="container footer__partners-list footer__partners-list--spread">
      <span class="footer__partners-label">Un établissement du réseau Bagnélé Diarra</span>
    </div>
  </div>`;

const HEAD = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__TITLE__ — __SITE__</title>
<meta name="description" content="__DESC__">
<meta name="theme-color" content="__THEMECOLOR__">
<meta property="og:type" content="website">
<meta property="og:site_name" content="__SITE__">
<meta property="og:title" content="__TITLE__ — __SITE__">
<meta property="og:description" content="__DESC__">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="__TITLE__ — __SITE__">
<meta name="twitter:description" content="__DESC__">
<link rel="icon" type="image/png" href="__ICON__">
<link rel="apple-touch-icon" href="__APPLE__">
<link rel="stylesheet" href="__HOME__css/style.css">
<noscript><style>
/* Sans JavaScript les contenus restent lisibles. */
[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}
.back-to-top,.burger{display:none!important}
</style></noscript>
</head>
<body>

<a class="skip-link" href="#contenu">Aller au contenu principal</a>

<!-- ================= EN-TÊTE ================= -->
<header class="header__HEADMOD__">
  <div class="topbar">
    <div class="container topbar__inner">
      <div class="topbar__group">
        <span class="topbar__item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mapPin"></use></svg>
          <span>Bamako, Mali</span>
        </span>
        <span class="topbar__item topbar__pending">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-phone"></use></svg>
          <span>Téléphone en cours de consolidation</span>
        </span>
        <span class="topbar__item topbar__pending">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mail"></use></svg>
          <span>Adresse électronique en cours de consolidation</span>
        </span>
      </div>
      __POLESWITCH__
      <div class="topbar__group">
        <span class="topbar__item topbar__pending">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
          <span>Horaires d’ouverture : en cours de consolidation</span>
        </span>
      </div>
    </div>
  </div>

  <div class="container navbar">
    <a class="brand" href="__HOME__index.html">
      <img class="brand__logo" src="__LOGOLIGHT__" alt="__LOGOALT__" width="180" height="204">
      <span class="brand__text">
        <span class="brand__name">__SITENAME__</span>
        <span class="brand__sub">__SITESUB__</span>
      </span>
    </a>

    <nav aria-label="Navigation principale">
      <ul class="nav">
        __NAV__
      </ul>
    </nav>

    <div class="header__actions">
      <span class="header__divider" aria-hidden="true"></span>
      __CSUPTAG__
      <a class="btn btn--accent btn--sm" href="__CTAHREF__">Candidater</a>
      <button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="drawer">
        <span class="burger__lines"><span></span><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>

<!-- ================= TIROIR MOBILE ================= -->
<aside class="drawer" id="drawer" aria-label="Menu de navigation mobile">
  <div class="drawer__head">
    <span class="brand">
      <img class="brand__logo" src="__LOGOLIGHT__" alt="" width="180" height="204">
      <span class="brand__text">
        <span class="brand__name">__SITENAME__</span>
      </span>
    </span>
    <button class="icon-btn" type="button" data-drawer-close aria-label="Fermer le menu">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-close"></use></svg>
    </button>
  </div>
  <div class="drawer__body">
    <ul class="drawer-nav">
      __DRAWERNAV__
    </ul>

    __DRAWERPOLES__

    <div class="drawer__contact">
      <span class="drawer__contact-item">
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mapPin"></use></svg>
        <span>Bamako, Mali</span>
      </span>
      <span class="drawer__contact-item">
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
        <span class="text-italic">Horaires en cours de consolidation</span>
      </span>
    </div>
  </div>
  <div class="drawer__foot">
    <a class="btn btn--accent btn--block" href="__CTAHREF__">Candidater</a>
    <a class="btn btn--outline btn--block" href="__CONTACTHREF__">Nous contacter</a>
  </div>
</aside>
<div class="overlay" data-drawer-close></div>

<main id="contenu">
__BODY__
</main>

<!-- ================= PIED DE PAGE ================= -->
<footer class="footer __FOOTERMOD__">
  <div class="container footer__main">
    <div class="footer__brand">
      <div class="footer__logo-row">
        <img class="footer__logo" src="__LOGOWHITE__" alt="Emblème de la PESUP-Santé Bagnélé Diarra" width="180" height="204">
        <span class="footer__sep" aria-hidden="true"></span>
        <img class="footer__logo" src="__CSUPWHITE__" alt="Logo du CSUP Bagnélé Diarra" width="560" height="249">
      </div>
      <p class="footer__name">__SITENAME__</p>
      <p class="footer__tagline">__TAGLINE__</p>
      <div class="footer__social" data-render="site-reseaux"></div>
    </div>

    <div class="footer__col">
      <h2 class="footer__col-title">Navigation</h2>
      <ul class="footer__links">
        __FOOTNAV__
      </ul>
    </div>

    <div class="footer__col">
      <h2 class="footer__col-title">Informations</h2>
      <ul class="footer__links">
        __FOOTINFO__
      </ul>
    </div>

    <div class="footer__col">
      <h2 class="footer__col-title">Nous joindre</h2>
      <div class="footer__contact">
        <div class="footer__contact-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mapPin"></use></svg>
          <div>
            <span class="footer__contact-label">Localisation</span>
            <span>__CITY__</span>
          </div>
        </div>
        <div class="footer__contact-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-phone"></use></svg>
          <div>
            <span class="footer__contact-label">Téléphone</span>
            <span class="footer__contact-pending">En cours de consolidation</span>
          </div>
        </div>
        <div class="footer__contact-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mail"></use></svg>
          <div>
            <span class="footer__contact-label">Adresse électronique</span>
            <span class="footer__contact-pending">En cours de consolidation</span>
          </div>
        </div>
        <div class="footer__contact-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
          <div>
            <span class="footer__contact-label">Horaires d’ouverture</span>
            <span class="footer__contact-pending">En cours de consolidation</span>
          </div>
        </div>
      </div>
    </div>
  </div>

__FOOTPARTNERS__

  <div class="container footer__bottom">
    <span class="footer__copy">© <span data-year>2026</span> __COPYRIGHT__ — Tous droits réservés.</span>
    <div class="footer__legal">
      <a href="__HOME__pages/mentions-legales.html">Mentions légales</a>
      <span aria-hidden="true">·</span>
      <a href="__HOME__pages/politique-confidentialite.html">Politique de confidentialité</a>
    </div>
  </div>
</footer>

<button class="back-to-top" type="button" aria-label="Revenir en haut de la page">
  <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowUp"></use></svg>
</button>

<script src="__HOME__js/icons.js"></script>
<script src="__HOME__js/data.js"></script>
<script src="__HOME__js/main.js"></script>
</body>
</html>
`;

/* ---------- navigation definitions ---------- */

const UBD_NAV = [
  ["Accueil", "index.html", null],
  [
    "L’Université",
    "pages/universite.html",
    [
      ["Présentation", "pages/universite.html", "building", "Identité, mission et projet académique"],
      ["Gouvernance", "pages/universite.html#gouvernance", "users", "Organes et instances de décision"],
      ["Infrastructures", "pages/universite.html#infrastructures", "library", "Campus, laboratoires et services"],
      ["Vie universitaire", "pages/vie-universitaire.html", "trophy", "Activités et culture étudiante"]
    ]
  ],
  [
    "Formations",
    "pages/formations.html",
    [
      ["Licences", "pages/formations.html#licence", "cap", "Cycles fondamentaux et filières professionnelles"],
      ["Masters", "pages/formations.html#master", "award", "Formations de troisième cycle"],
      ["Formations professionnelles", "pages/formations.html#pro", "briefcase", "Certifications orientées emploi"],
      ["Formations continues", "pages/formations.html#continue", "layers", "Mise à jour et perfectionnement"]
    ]
  ],
  [
    "Admission",
    "pages/admissions.html",
    [
      ["Conditions d’admission", "pages/admissions.html#conditions", "checkCircle", "Critères et prérequis"],
      ["Dossier de candidature", "pages/admissions.html#dossier", "fileText", "Pièces à fournir"],
      ["Calendrier", "pages/admissions.html#calendrier", "calendar", "Dates clés de la rentrée"],
      ["Questions fréquentes", "pages/admissions.html#faq", "info", "Réponses aux candidats"]
    ]
  ],
  ["Actualités", "pages/actualites.html", null],
  ["Documents", "pages/documents.html", null],
  ["Contact", "pages/contact.html", null]
];

const PESUP_NAV = [
  ["Accueil PESUP", "pages/pesup-sante.html", null],
  [
    "Présentation",
    "pages/pesup-presentation.html",
    [
      ["Notre projet", "pages/pesup-presentation.html", "building", "Identité et mission de la PESUP"],
      ["Organisation", "pages/pesup-presentation.html#organisation", "users", "Équipes et encadrement"],
      ["Services", "pages/pesup-presentation.html#services", "stethoscope", "Ressources et accompagnement"]
    ]
  ],
  ["Formations", "pages/pesup-formations.html", null],
  ["Admission", "pages/pesup-admission.html", null],
  [
    "Vie à l’école",
    "pages/pesup-vie-ecole.html",
    [
      ["Activités", "pages/pesup-activites.html", "spark", "Ateliers et initiatives"],
      ["Événements", "pages/pesup-evenements.html", "calendar", "Agenda de l’école"],
      ["Galerie", "pages/pesup-galerie.html", "camera", "Moments de la vie scolaire"]
    ]
  ],
  ["Contact", "pages/pesup-contact.html", null]
];

/* Extrait le nom de fichier d'un chemin interne, sans ancre ni dossier. */
function base(target) {
  const noHash = String(target).split("#")[0];
  return noHash.substring(noHash.lastIndexOf("/") + 1).toLowerCase();
}

function buildNav(items, home, activeFile) {
  const active = activeFile ? base(activeFile) : null;

  return items
    .map(function (item) {
      const label = item[0];
      const href = home + item[1];
      const file = item[1].split("#")[0];
      const kids = item[2];
      const isChildOn = active && kids ? kids.some((k) => base(k[1]) === active) : false;
      const on = active ? base(file) === active || isChildOn : false;

      if (!kids) {
        return (
          `        <li class="nav__item"><a class="nav__link${on ? " is-active" : ""}" data-nav="${file}" href="${href}"` +
          (on ? ' aria-current="page"' : "") +
          `>${label}</a></li>`
        );
      }

      const links = kids
        .map(function (k) {
          const kOn = active ? base(k[1]) === active : false;
          return (
            `            <a class="dropdown__link${kOn ? " is-active" : ""}" href="${home}${k[1]}"` +
            (kOn ? ' aria-current="page"' : "") +
            `>\n` +
            `              <span class="dropdown__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${k[2]}"></use></svg></span>\n` +
            `              <span><span class="dropdown__title">${k[0]}</span><span class="dropdown__desc">${k[3]}</span></span>\n` +
            `            </a>`
          );
        })
        .join("\n");

      const wide = kids.length > 3 ? " dropdown--wide" : "";

      return (
        `        <li class="nav__item nav__item--has-dropdown">\n` +
        `          <a class="nav__link${on ? " is-active" : ""}" data-nav="${file}" href="${href}"` +
        (on ? ' aria-current="page"' : "") +
        `>\n` +
        `            ${label}\n` +
        `            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevronDown"></use></svg>\n` +
        `          </a>\n` +
        `          <div class="dropdown${wide}">\n${links}\n` +
        (kids.length > 3
          ? `            <div class="dropdown__sep"></div>\n` +
            `            <a class="dropdown__all" href="${home}${item[1]}">\n` +
            `              <span>Voir le détail</span>\n` +
            `              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>\n` +
            `            </a>`
          : "") +
        `\n          </div>\n        </li>`
      );
    })
    .join("\n");
}

function buildDrawer(items, home, activeFile) {
  const active = activeFile ? base(activeFile) : null;

  return items
    .map(function (item) {
      const label = item[0];
      const href = home + item[1];
      const file = item[1].split("#")[0];
      const kids = item[2];
      const isChildOn = active && kids ? kids.some((k) => base(k[1]) === active) : false;
      const on = active ? base(file) === active || isChildOn : false;

      if (!kids) {
        return (
          `      <li><a class="drawer-nav__link${on ? " is-active" : ""}" data-nav="${file}" href="${href}"` +
          (on ? ' aria-current="page"' : "") +
          `>${label}</a></li>`
        );
      }

      const subs = kids
        .map(function (k) {
          const kOn = active ? base(k[1]) === active : false;
          return (
            `          <a class="drawer-sub__link${kOn ? " is-active" : ""}" href="${home}${k[1]}"` +
            (kOn ? ' aria-current="page"' : "") +
            `>${k[0]}</a>`
          );
        })
        .join("\n");

      return (
        `      <li class="drawer-nav__item--parent${on ? " is-active" : ""}">\n` +
        `        <button class="drawer-nav__link" data-nav="${file}" type="button" aria-expanded="false"` +
        (on ? ' aria-current="page"' : "") +
        `>\n` +
        `          ${label}\n` +
        `          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevronDown"></use></svg>\n` +
        `        </button>\n` +
        `        <div class="drawer-sub"><div>\n${subs}\n        </div></div>\n` +
        `      </li>`
      );
    })
    .join("\n");
}

const THEMES = {
  ubd: {
    home: "../",
    site: "Université Bagnélé Diarra",
    siteName: "Université Bagnélé Diarra",
    siteSub: "Bamako · Mali",
    city: "Bamako, Mali",
    tagline:
      "Enseignement supérieur privé à Bamako. Former des professionnels responsables, techniquement solides et engagés pour le développement du Mali.",
    copyright: "Université Bagnélé Diarra",
    themeColor: "#0f4d3a",
    icon: "images/favicon-32.png",
    apple: "images/apple-touch-icon.png",
    logo: "images/logo-ubd.png",
    logoWhite: "images/logo-ubd-blanc.png",
    logoPesupWhite: "images/logo-pesup-blanc.png",
    logoCsup: "images/Logo_CSUP.png",
    csupHref: "pages/pesup-sante.html",
    /* Le jeu ne contient aucun logo de l'universite : l'embleme employe en
       marque appartient a la PESUP-Sante. L'image est donc traitee comme
       decorative a cote du nom du site, et non presentee comme un logo UBD. */
    logoAlt: "",
    nav: UBD_NAV,
    footNav: [
      ["Accueil", "index.html"],
      ["L’Université", "pages/universite.html"],
      ["Formations", "pages/formations.html"],
      ["Admission", "pages/admissions.html"],
      ["Vie universitaire", "pages/vie-universitaire.html"],
      ["PESUP-Santé", "pages/pesup-sante.html"]
    ],
    footInfo: [
      ["Actualités", "pages/actualites.html"],
      ["Documents", "pages/documents.html"],
      ["Calendrier académique", "pages/admissions.html#calendrier"],
      ["Contact", "pages/contact.html"]
    ]
  },
  pesup: {
    home: "../",
    site: "PESUP-Santé Bagnélé Diarra",
    siteName: "PESUP-Santé Bagnélé Diarra",
    siteSub: "Pôle d’enseignement supérieur en santé",
    city: "Bamako, Mali",
    tagline:
      "Pôle d’enseignement supérieur dédié aux métiers de la santé : former des professionnels soignants responsables, compétents et engagés dans la qualité des soins.",
    copyright: "PESUP-Santé Bagnélé Diarra",
    themeColor: "#0f6f9c",
    icon: "images/favicon-pesup-32.png",
    /* Aucune icone tactile de la taille requise (180 px) n'existe pour le pôle :
       on omet plutot que de servir un fichier de 32 px. */
    apple: null,
    /* La marque de l'ecole est l'embleme PESUP-Sante (logo-ubd*.png) : le
       fichier nomme logo-pesup.png contenait en realite le logotype CSUP. */
    logo: "images/logo-ubd.png",
    logoWhite: "images/logo-ubd-blanc.png",
    logoPesupWhite: "images/logo-pesup-blanc.png",
    logoCsup: "images/Logo_CSUP.png",
    csupHref: null,
    logoAlt: "Logo de PESUP-Santé Bagnélé Diarra",
    nav: PESUP_NAV,
    footNav: [
      ["Accueil PESUP", "pages/pesup-sante.html"],
      ["Présentation", "pages/pesup-presentation.html"],
      ["Formations", "pages/pesup-formations.html"],
      ["Admission", "pages/pesup-admission.html"],
      ["Vie à l’école", "pages/pesup-vie-ecole.html"],
      ["Université Bagnélé Diarra", "index.html"]
    ],
    footInfo: [
      ["Activités", "pages/pesup-activites.html"],
      ["Événements", "pages/pesup-evenements.html"],
      ["Galerie", "pages/pesup-galerie.html"],
      ["Contact", "pages/pesup-contact.html"]
    ]
  }
};

/* Les deux poles du reseau Bagnélé Diarra restent accessibles depuis
   chaque page : bandeau utilitaire sur écran large, bloc dedie dans le
   tiroir sur mobile. Le pole courant est signale visuellement. */
function poleLinks(home, themeKey) {
  const onUbd = themeKey === "ubd";
  return [
    { label: "Université", longLabel: "Université Bagnélé Diarra", href: "index.html", on: onUbd },
    { label: "PESUP-Santé", longLabel: "PESUP-Santé", href: "pages/pesup-sante.html", on: !onUbd }
  ];
}

function buildTopbarPoles(home, themeKey) {
  const links = poleLinks(home, themeKey);
  const anchor = (p) =>
    `        <a class="topbar__pole${p.on ? " is-active" : ""}" href="${home}${p.href}"` +
    (p.on ? ` aria-current="true"` : "") +
    `>${p.label}</a>`;
  return [
    `      <nav class="topbar__group topbar__poles" aria-label="Pôles Bagnélé Diarra">`,
    anchor(links[0]),
    `        <span class="topbar__pole-sep" aria-hidden="true"></span>`,
    anchor(links[1]),
    `      </nav>`
  ].join("\n");
}

function buildDrawerPoles(home, themeKey) {
  const links = poleLinks(home, themeKey);
  return [
    `    <div class="drawer__poles">`,
    `      <span class="drawer__poles-label">Nos pôles</span>`,
    ...links.map(
      (p) =>
        `      <a class="drawer__pole${p.on ? " is-active" : ""}" href="${home}${p.href}"` +
        (p.on ? ` aria-current="true"` : "") +
        `>${p.longLabel}</a>`
    ),
    `    </div>`
  ].join("\n");
}

function buildPage(file, themeKey, title, desc, body, activeFile, opts) {
  const t = THEMES[themeKey];
  opts = opts || {};
  const themeAttr = themeKey === "pesup" ? ' data-theme="pesup"' : "";
  const active = activeFile || file.split("/").pop();
  /* La racine du site vit au meme niveau que le fichier : pas de prefixe.
     Toutes les pages de pages/ sont en revanche un niveau plus bas. */
  const home = opts.home !== undefined ? opts.home : t.home;
  const ctaHref = home + (themeKey === "pesup" ? "pages/pesup-admission.html" : "pages/admissions.html");
  const contactHref = home + (themeKey === "pesup" ? "pages/pesup-contact.html" : "pages/contact.html");
  /* Le second badge est le logo CSUP : sur le site UBD il renvoie vers le pôle
     sante, sur le site PESUP il n'a aucune destination propre et devient une
     simple marque illustrative plutot qu'un lien vers lui-meme. */
  const csupTag = t.csupHref
    ? `<a class="header__partner header__partner--csup" href="${home + t.csupHref}" title="CSUP Bagnélé Diarra">\n` +
      `        <img src="${home + t.logoCsup}" alt="Logo du CSUP Bagnélé Diarra" width="477" height="226">\n` +
      `      </a>`
    : `<span class="header__partner header__partner--csup" title="CSUP Bagnélé Diarra">\n` +
      `        <img src="${home + t.logoCsup}" alt="Logo du CSUP Bagnélé Diarra" width="477" height="226">\n` +
      `      </span>`;
  /* Sans icone tactile dimensionnée, l'attribut est omis plutot que de renvoyer
     vers un fichier de 32 px. */
  let head = HEAD;
  if (!t.apple) head = head.replace(/^\s*<link rel="apple-touch-icon"[^\n]*\n/m, "");

  /* Le bandeau reseau est insere en premier : il ne contient plus de marqueur
     propre, mais l'ordre des remplacements reste sans effet sur le resultat. */
  const html = head.replace(/__BODY__/, body)
    .replace(/__FOOTPARTNERS__/g, opts.partners ? PARTNERS : "")
    .replace(/__HOME__/g, home)
    .replace(/__CTAHREF__/g, ctaHref)
    .replace(/__CONTACTHREF__/g, contactHref)
    .replace(/__CSUPTAG__/g, csupTag)
    .replace(/__NAV__/g, buildNav(t.nav, home, active))
    .replace(/__DRAWERNAV__/g, buildDrawer(t.nav, home, active))
    .replace(/__POLESWITCH__/g, buildTopbarPoles(home, themeKey))
    .replace(/__DRAWERPOLES__/g, buildDrawerPoles(home, themeKey))
    .replace(/__FOOTNAV__/g, t.footNav.map((x) => `        <li><a href="${home}${x[1]}">${x[0]}</a></li>`).join("\n"))
    .replace(/__FOOTINFO__/g, t.footInfo.map((x) => `        <li><a href="${home}${x[1]}">${x[0]}</a></li>`).join("\n"))
    .replace(/__TITLE__/g, title)
    .replace(/__DESC__/g, desc)
    .replace(/__THEMECOLOR__/g, t.themeColor)
    .replace(/__SITE__/g, t.site)
    .replace(/__SITENAME__/g, t.siteName)
    .replace(/__SITESUB__/g, t.siteSub)
    .replace(/__TAGLINE__/g, t.tagline)
    .replace(/__COPYRIGHT__/g, t.copyright)
    .replace(/__CITY__/g, t.city)
    .replace(/__ICON__/g, home + t.icon)
    .replace(/__APPLE__/g, home + t.apple)
    .replace(/__LOGOLIGHT__/g, home + t.logo)
    .replace(/__LOGOWHITE__/g, home + t.logoWhite)
    .replace(/__CSUPWHITE__/g, home + t.logoPesupWhite)
    .replace(/__LOGOALT__/g, t.logoAlt)
    .replace(/__FOOTERMOD__/g, themeKey === "pesup" ? "footer--pesup" : "")
    .replace(/__HEADMOD__/g, opts.transparentHeader ? " header--transparent" : "")
    .replace(/<html lang="fr">/, `<html lang="fr"${themeAttr}>`);

  fs.writeFileSync(path.join(ROOT, file), corrigerDimensions(html), "utf8");
  console.log("ecrit : " + file + "  (" + html.length + " octets)");
}

module.exports = { buildPage, ROOT };
