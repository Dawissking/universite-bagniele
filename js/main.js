/* ==========================================================================
   UNIVERSITÉ BAGNÉLÉ DIARRA  ·  PESUP-SANTÉ
   Comportements globaux & rendu des contenus pilotés par js/data.js
   --------------------------------------------------------------------------
   01. Utilitaires
   02. Bibliothèque d'icônes (sprite)
   03. En-tête, navigation, tiroir mobile
   04. Défilement, révélations, compteurs
   05. Rendu des données
   06. Interactions de page
   07. Initialisation
   ========================================================================== */

(function () {
  "use strict";

  var D = window.UBD || {};

  /* ======================================================================
     01. UTILITAIRES
     ====================================================================== */

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ESC[ch];
    });
  }

  /* Base relative : les pages du dossier /pages/ remontent d'un niveau. */
  var BASE = (function () {
    var p = String(location.pathname).replace(/\\/g, "/");
    return /\/pages(\/|$)/.test(p) ? "../" : "";
  })();

  function asset(src) {
    if (!src) return "";
    if (/^(https?:)?\/\//.test(src) || src.charAt(0) === "/" || src.indexOf("data:") === 0) return src;
    return BASE + src;
  }

  function param(name) {
    var found = null;
    try {
      found = new URLSearchParams(location.search).get(name);
    } catch (e) {
      found = null;
    }
    if (!found) {
      var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(location.search);
      if (m) found = decodeURIComponent(m[1]);
    }
    return found;
  }

  var MOIS = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  /* "2026-09-15" -> "15 septembre 2026" */
  function longDate(iso) {
    if (!iso) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    if (!m) return String(iso);
    return parseInt(m[3], 10) + " " + MOIS[parseInt(m[2], 10) - 1] + " " + m[1];
  }

  /* "2026-09-15" -> "15 sep. 2026" */
  function shortDate(iso) {
    if (!iso) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    if (!m) return String(iso);
    return parseInt(m[3], 10) + " " + MOIS[parseInt(m[2], 10) - 1].slice(0, 4) + ". " + m[1];
  }

  /* Date du jour au format ISO : sert à qualifier un événement « À venir »
     ou « Passé » sans figer le statut dans les données. */
  function todayISO() {
    var d = new Date();
    var mm = String(d.getMonth() + 1);
    var dd = String(d.getDate());
    return d.getFullYear() + "-" + (mm.length < 2 ? "0" + mm : mm) + "-" + (dd.length < 2 ? "0" + dd : dd);
  }

  function dayNum(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    return m ? m[3] : "";
  }

  function monthShort(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    return m ? MOIS[parseInt(m[2], 10) - 1].slice(0, 4) + "." : "";
  }

  function clamp(list, n) {
    return list.slice(0, Math.max(0, n || list.length));
  }

  /* L'ordre d'affichage ne doit jamais dépendre de l'ordre du fichier de données :
     les actualités sont présentées de la plus récente à la plus ancienne. */
  function byDateDesc(list) {
    return (list || []).slice().sort(function (x, y) {
      var a = (x && x.date) || "";
      var b = (y && y.date) || "";
      if (a === b) return 0;
      if (!a) return 1;
      if (!b) return -1;
      return a < b ? 1 : -1;
    });
  }

  /* Calendrier : les événements à venir d'abord (du plus proche au plus lointain),
     puis les événements passés (du plus récent au plus ancien). */
  function byEventDate(list) {
    var today = todayISO();
    return (list || []).slice().sort(function (x, y) {
      var a = (x && x.date) || "";
      var b = (y && y.date) || "";
      var aVenir = !!a && a >= today;
      var bVenir = !!b && b >= today;
      if (aVenir !== bVenir) return aVenir ? -1 : 1;
      if (!a || !b || a === b) return 0;
      if (aVenir) return a < b ? -1 : 1;
      return a < b ? 1 : -1;
    });
  }

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] && String(list[i].id) === String(id)) return list[i];
    }
    return null;
  }

  /* Les catalogues emploient tantôt « label » tantôt « nom » : on accepte les deux. */
  function catLabel(catalog, id) {
    var found = byId(catalog || [], id);
    if (!found) return id;
    return found.label || found.nom || id;
  }

  /* État « information non encore validée » — jamais de valeur inventée. */
  function pending(text) {
    return (
      '<span class="text-muted text-italic">' +
      esc(text || "En cours de consolidation") +
      "</span>"
    );
  }

  function valueOrPending(v, label) {
    if (v === null || v === undefined || v === "") return pending(label ? label + " en cours de consolidation" : null);
    return esc(v);
  }

  function listOrPending(list, label) {
    if (!list || !list.length) return pending(label ? label + " en cours de consolidation" : null);
    return (
      '<ul class="check-list">' +
      list
        .map(function (t) {
          return '<li>' + icon("check") + "<span>" + esc(t) + "</span></li>";
        })
        .join("") +
      "</ul>"
    );
  }

  /* ======================================================================
     02. BIBLIOTHÈQUE D'ICÔNES
     ====================================================================== */

  function icon(name, cls) {
    return (
      '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<use href="#i-' + esc(name) + '"></use></svg>'
    );
  }

  function injectSprite() {
    var lib = window.UBD_ICONS;
    if (!lib) return;
    var symbols = Object.keys(lib)
      .map(function (name) {
        return '<symbol id="i-' + name + '" viewBox="0 0 24 24">' + lib[name] + "</symbol>";
      })
      .join("");
    var host = document.createElement("div");
    host.setAttribute("aria-hidden", "true");
    host.setAttribute("data-sprite", "");
    host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    host.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      symbols +
      "</svg>";
    document.body.insertBefore(host, document.body.firstChild);
  }

  /* Expose les utilitaires aux rendus et aux pages. */
  window.UBDBase = {
    $: $,
    $$: $$,
    esc: esc,
    asset: asset,
    icon: icon,
    param: param,
    longDate: longDate,
    shortDate: shortDate,
    dayNum: dayNum,
    monthShort: monthShort,
    byId: byId,
    catLabel: catLabel,
    clamp: clamp,
    pending: pending,
    valueOrPending: valueOrPending,
    listOrPending: listOrPending
  };

  /* ======================================================================
     03. EN-TÊTE, NAVIGATION, TIROIR MOBILE
     ====================================================================== */

  function initHeader() {
    var header = $(".header");
    if (!header) return;
    var threshold = 12;

    function onScroll() {
      if (window.scrollY > threshold) header.classList.add("is-stuck");
      else header.classList.remove("is-stuck");
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* La navigation reste affichée tant qu'elle tient réellement dans la
     barre : le menu burger n'intervient qu'en dernier recours, au lieu
     d'un seuil de largeur fixe qui dépend de la mise à l'échelle de
     l'écran. Le repli CSS (1024px) couvre l'absence de JavaScript. */
  function initHeaderFit() {
    var header = $(".header");
    var navbar = $(".navbar");
    if (!header || !navbar) return;

    function requiredWidth() {
      var parts = [$(".brand", navbar), $("nav", navbar), $(".header__actions", navbar)].filter(Boolean);
      if (!parts.length) return 0;
      var cs = window.getComputedStyle(navbar);
      var gap = parseFloat(cs.columnGap || cs.gap) || 0;
      var sum = gap * (parts.length - 1);
      parts.forEach(function (el) {
        sum += el.getBoundingClientRect().width;
      });
      sum += (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      return sum;
    }

    function fits() {
      return requiredWidth() <= navbar.getBoundingClientRect().width + 1;
    }

    function fit() {
      header.classList.remove("header--compact", "header--menu");
      if (window.innerWidth <= 1024) return;
      if (fits()) return;
      header.classList.add("header--compact");
      if (fits()) return;
      header.classList.add("header--menu");
    }

    var timer = null;
    window.addEventListener("resize", function () {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(fit, 120);
    });

    fit();
  }

  function initActiveNav() {
    var here = location.pathname.replace(/\\/g, "/");
    var file = here.substring(here.lastIndexOf("/") + 1).toLowerCase();

    $$("[data-nav]").forEach(function (link) {
      var target = String(link.getAttribute("data-nav") || "").toLowerCase();
      if (!target) return;
      var tFile = target.substring(target.lastIndexOf("/") + 1);
      var match =
        tFile === file ||
        (tFile === "index.html" && (file === "" || file === "index.html")) ||
        (file.indexOf(tFile.replace(".html", "")) === 0 && tFile !== "index.html");
      if (match) {
        link.classList.add("is-active");
        var item = link.closest(".nav__item, .drawer-nav__item--parent");
        if (item) item.classList.add("is-active");
      }
    });
  }

  function initDrawer() {
    var burger = $(".burger");
    var drawer = $(".drawer");
    var overlay = $(".overlay");
    if (!burger || !drawer) return;

    drawer.setAttribute("aria-hidden", "true");

    function open() {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      if (overlay) overlay.classList.add("is-open");
      burger.classList.add("is-active");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-locked");
      var first = drawer.querySelector("a, button");
      if (first) first.focus();
    }

    function close() {
      /* Le focus doit revenir sur le bouton qui a ouvert le menu, sinon il
         se retrouve perdu dans le document. */
      if (document.activeElement && drawer.contains(document.activeElement)) burger.focus();
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      if (overlay) overlay.classList.remove("is-open");
      burger.classList.remove("is-active");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    }

    burger.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) close();
      else open();
    });

    if (overlay) overlay.addEventListener("click", close);

    $$("[data-drawer-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });

    $$(".drawer a", drawer).forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && drawer.classList.contains("is-open")) {
        close();
        return;
      }
      /* Panneau modal : la tabulation reste confinée au menu tant qu'il est ouvert. */
      if (ev.key !== "Tab" || !drawer.classList.contains("is-open")) return;
      var focusables = $$("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])", drawer).filter(
        function (n) {
          return n.offsetParent !== null;
        }
      );
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      } else if (!drawer.contains(document.activeElement)) {
        ev.preventDefault();
        first.focus();
      }
    });

    $$(".drawer-nav__item--parent > .drawer-nav__link", drawer).forEach(function (btn) {
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        btn.parentNode.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", btn.parentNode.classList.contains("is-open") ? "true" : "false");
      });
    });

    $$("a", drawer).forEach(function (link) {
      link.addEventListener("click", function () {
        if (!link.hasAttribute("data-keep-open")) close();
      });
    });

    /* Le tiroir se referme si l'on repasse en affichage large. */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && drawer.classList.contains("is-open")) close();
    });
  }

  /* Clavier dans les menus déroulants du header. */
  function initDropdownKeys() {
    $$(".nav__item--has-dropdown").forEach(function (item) {
      var trigger = item.querySelector(":scope > .nav__link");
      if (!trigger) return;
      trigger.addEventListener("keydown", function (ev) {
        if (ev.key === "ArrowDown") {
          ev.preventDefault();
          var first = item.querySelector(".dropdown a");
          if (first) first.focus();
        }
      });
    });
  }

  /* ======================================================================
     04. DÉFILEMENT, RÉVÉLATIONS, COMPTEURS
     ====================================================================== */

  function initSmoothScroll() {
    document.addEventListener("click", function (ev) {
      var link = ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      ev.preventDefault();
      var header = $(".header");
      var offset = header ? header.offsetHeight + 18 : 20;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (n) {
        n.classList.add("is-revealed");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    items.forEach(function (n) {
      io.observe(n);
    });
  }

  /* Anime les nombres « confirmed: true » uniquement. */
  function initCounters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) return;

    function run(node) {
      var target = parseFloat(String(node.getAttribute("data-count")).replace(",", "."));
      if (isNaN(target)) return;
      var suffix = node.getAttribute("data-suffix") || "";
      var decimals = String(node.getAttribute("data-count")).indexOf(".") > -1 ? 1 : 0;
      var start = performance.now();
      var dur = 1400;

      function step(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        var value = target * eased;
        node.textContent = (decimals ? value.toFixed(decimals) : Math.round(value).toString()) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else node.textContent = (decimals ? target.toFixed(decimals) : target) + suffix;
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(run);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  function initBackToTop() {
    var btn = $(".back-to-top");
    if (!btn) return;
    function onScroll() {
      btn.classList.toggle("is-visible", window.scrollY > 620);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var toastTimer = null;

  function toast(message, kind) {
    var box = $(".toast");
    if (!box) {
      box = document.createElement("div");
      box.className = "toast";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    box.className = "toast" + (kind ? " toast--" + kind : "");
    box.innerHTML = icon(kind === "error" ? "alert" : "checkCircle") + "<span>" + esc(message) + "</span>";
    box.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      box.classList.remove("is-visible");
    }, 5200);
  }

  /* ======================================================================
     05. RENDU DES DONNÉES
     ====================================================================== */

  /* ---------- gabarits réutilisables ---------- */

  /* Le groupe reste le niveau ; les modalités sont portées à part, de sorte
     que le filtre « Formations continues » retrouve les parcours suivis en
     continue sans brouiller les autres catégories. */
  function tplFormation(f) {
    var href = BASE + "pages/formation-detail.html?id=" + encodeURIComponent(f.id);
    return (
      '<article class="card" data-reveal data-filter-group="' + esc(f.niveau) + '" data-filter-modes="' +
      esc((f.modes || []).join(" ")) + '" data-filter-key="' + esc(f.departement) + '">' +
      '<div class="card__media">' +
      '<img src="' + asset(f.image) + '" alt="' + esc(f.alt || f.intitule) + '" loading="lazy" decoding="async">' +
      '<span class="badge badge--accent card__tag">' + esc(f.code) + "</span>" +
      "</div>" +
      '<div class="card__body">' +
      '<h3 class="card__title"><a href="' + href + '">' + esc(f.intitule) + "</a></h3>" +
      '<p class="card__text">' + esc(f.resume) + "</p>" +
      '<div class="card__meta">' +
      '<span class="card__meta-item">' + icon("layers") + esc(f.niveau) + "</span>" +
      '<span class="card__meta-item">' + icon("clock") + esc(f.duree) + "</span>" +
      "</div>" +
      "</div>" +
      '<div class="card__foot"><span>Consulter la fiche</span>' + icon("arrowRight") + "</div>" +
      "</article>"
    );
  }

  function tplFormationCompact(f) {
    var href = BASE + "pages/formation-detail.html?id=" + encodeURIComponent(f.id);
    return (
      '<article class="card card--flat" data-reveal>' +
      '<div class="card__body">' +
      '<div class="chip-row mb-2"><span class="badge badge--brand">' + esc(f.code) + "</span>" +
      '<span class="badge">' + esc(f.niveau) + "</span></div>" +
      '<h3 class="card__title card__title--sm"><a href="' + href + '">' + esc(f.intitule) + "</a></h3>" +
      '<p class="card__text">' + esc(f.resume) + "</p>" +
      '<div class="card__meta"><span class="card__meta-item">' + icon("clock") + esc(f.duree) + "</span></div>" +
      "</div></article>"
    );
  }

  function tplActu(a) {
    var href = BASE + "pages/actualite-detail.html?id=" + encodeURIComponent(a.id);
    return (
      '<article class="card" data-reveal data-filter-group="' + esc(a.categorie) + '">' +
      '<div class="card__media">' +
      '<img src="' + asset(a.image) + '" alt="' + esc(a.alt || a.titre) + '" loading="lazy" decoding="async">' +
      '<span class="badge badge--info card__tag">' + esc(catLabel(D.categoriesActualites, a.categorie)) + "</span>" +
      "</div>" +
      '<div class="card__body">' +
      '<h3 class="card__title"><a href="' + href + '">' + esc(a.titre) + "</a></h3>" +
      '<p class="card__text">' + esc(a.chapo) + "</p>" +
      '<div class="card__meta"><span class="card__meta-item">' + icon("calendar") + esc(longDate(a.date)) + "</span></div>" +
      "</div>" +
      '<div class="card__foot"><span>Lire la suite</span>' + icon("arrowRight") + "</div>" +
      "</article>"
    );
  }

  function tplEvent(e) {
    var statut = String(e.date || "") >= todayISO() ? "À venir" : "Passé";
    return (
      '<article class="event-card" data-reveal>' +
      '<div class="event-card__date">' +
      '<div class="event-card__day">' + esc(dayNum(e.date)) + "</div>" +
      '<div class="event-card__month">' + esc(monthShort(e.date)) + "</div>" +
      "</div>" +
      '<div class="event-card__body">' +
      '<h3 class="event-card__title">' + esc(e.titre) + "</h3>" +
      '<div class="event-card__meta">' +
      '<span class="event-card__meta-item">' + icon("tag") + statut + "</span>" +
      (e.lieu ? '<span class="event-card__meta-item">' + icon("mapPin") + esc(e.lieu) + "</span>" : "") +
      '<span class="event-card__meta-item">' + icon("clock") + esc(longDate(e.date)) + "</span>" +
      "</div>" +
      '<p class="card__text mt-2">' + esc(e.texte) + "</p>" +
      "</div></article>"
    );
  }

  function tplValeur(v) {
    return (
      '<article class="value-card" data-reveal>' +
      '<div class="icon-badge">' + icon(v.icone) + "</div>" +
      "<div>" +
      '<h3 class="value-card__title">' + esc(v.titre) + "</h3>" +
      '<p class="value-card__text">' + esc(v.texte) + "</p>" +
      "</div></article>"
    );
  }

  function tplInfra(i) {
    return (
      '<article class="service-card" data-reveal>' +
      '<div class="icon-badge icon-badge--soft service-card__icon">' + icon(i.icone) + "</div>" +
      '<h3 class="service-card__title">' + esc(i.titre) + "</h3>" +
      '<p class="service-card__text">' + esc(i.texte) + "</p>" +
      "</article>"
    );
  }

  function tplService(s) {
    var inner =
      '<div class="icon-badge icon-badge--soft service-card__icon">' + icon(s.icone) + "</div>" +
      '<h3 class="service-card__title">' + esc(s.nom) + "</h3>" +
      '<p class="service-card__text">' + esc(s.texte) + "</p>";
    if (s.href) {
      return '<a class="service-card" href="' + asset(s.href) + '" data-reveal>' + inner + "</a>";
    }
    return '<article class="service-card" data-reveal>' + inner + "</article>";
  }

  function tplDepartement(d) {
    return (
      '<article class="card card--flat" data-reveal data-filter-group="' + esc(d.id) + '">' +
      '<div class="card__body">' +
      '<div class="icon-badge icon-badge--soft mb-3">' + icon(d.icone) + "</div>" +
      '<h3 class="card__title card__title--sm">' + esc(d.nom) + "</h3>" +
      '<p class="card__text">' + esc(d.resume) + "</p>" +
      '<div class="card__meta"><span class="card__meta-item">' + icon("fileText") + esc(d.texte) + "</span></div>" +
      "</div></article>"
    );
  }

  function tplGouvernance(g) {
    var role = g.role ? '<p class="kicker mb-2">' + esc(g.role) + "</p>" : "";
    var statut = g.deliberant
      ? '<p class="card__meta mt-3"><span class="card__meta-item">' + icon("checkCircle") + "Instance délibérante</span></p>"
      : "";
    return (
      '<article class="service-card" data-reveal>' +
      '<div class="icon-badge icon-badge--soft service-card__icon">' + icon("building") + "</div>" +
      '<h3 class="service-card__title">' + esc(g.organe) + "</h3>" +
      role +
      '<p class="service-card__text">' + esc(g.texte) + "</p>" +
      statut +
      "</article>"
    );
  }

  function tplPesupFormation(p) {
    return (
      '<article class="card" data-reveal>' +
      '<div class="card__media">' +
      '<img src="' + asset(p.image) + '" alt="' + esc(p.alt || p.intitule) + '" loading="lazy" decoding="async">' +
      '<span class="badge badge--accent card__tag">' + esc(p.code) + "</span>" +
      "</div>" +
      '<div class="card__body">' +
      '<h3 class="card__title">' + esc(p.intitule) + "</h3>" +
      '<p class="card__text">' + esc(p.resume) + "</p>" +
      '<div class="card__meta">' +
      '<span class="card__meta-item">' + icon("layers") + esc(p.niveau) + "</span>" +
      '<span class="card__meta-item">' + icon("clock") + esc(p.duree) + "</span>" +
      '<span class="card__meta-item">' + icon("cross") + esc(p.domaine) + "</span>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function tplChiffres(list, host) {
    if (!list || !list.length) return "";
    return list
      .map(function (c) {
        var confirmed = c.confirmed === true;
        var display = confirmed
          ? '<span class="stat__value"><span data-count="' + esc(c.valeur) + '" data-suffix="' + esc(c.suffixe || "") + '">0</span></span>'
          : '<span class="stat__value stat__value--pending">—</span>';
        return (
          '<div class="stat" data-reveal>' +
          display +
          '<div class="stat__label">' + esc(c.label) + "</div>" +
          '<div class="stat__note">' + (confirmed ? esc(c.detail || "") : "Chiffre en cours de consolidation") + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function tplGalerie(g) {
    return (
      '<button class="gallery-item" type="button" data-reveal data-lightbox="' +
      esc(g.src) +
      '" data-caption="' +
      esc(g.titre) +
      '" data-alt="' +
      esc(g.alt) +
      '" data-filter-group="' +
      esc(g.cat) +
      '">' +
      '<img src="' + asset(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" decoding="async">' +
      '<span class="gallery-item__zoom">' + icon("camera") + "</span>" +
      '<span class="gallery-item__overlay"><span class="gallery-item__title">' + esc(g.titre) + "</span></span>" +
      "</button>"
    );
  }

  function tplFaq(list, opts) {
    opts = opts || {};
    if (!list || !list.length) return "";
    var uid = "faq-" + (opts.uid || "panel") + "-" + Math.random().toString(36).slice(2, 8);
    return list
      .map(function (f, i) {
        var open = opts.openFirst && i === 0;
        var btnId = uid + "-btn-" + i;
        var panelId = uid + "-panel-" + i;
        return (
          '<div class="accordion__item' + (open ? " is-open" : "") + '">' +
          '<h3><button class="accordion__btn" type="button" id="' + btnId + '" aria-expanded="' + (open ? "true" : "false") +
          '" aria-controls="' + panelId + '">' +
          "<span>" + esc(f.q) + "</span>" +
          '<span class="accordion__icon">' + icon("chevronDown") + "</span>" +
          "</button></h3>" +
          '<div class="accordion__panel" id="' + panelId + '" role="region" aria-labelledby="' + btnId + '">' +
          '<div><div class="accordion__panel-inner">' + esc(f.r) + "</div></div></div>" +
          "</div>"
        );
      })
      .join("");
  }

  function emptyState(title, text, level) {
    var tag = /^h[1-6]$/.test(String(level)) ? level : "h3";
    return (
      '<div class="empty-state">' +
      '<div class="empty-state__icon">' + icon("search") + "</div>" +
      "<" + tag + ' class="empty-state__title">' + esc(title) + "</" + tag + ">" +
      '<p class="empty-state__text">' + esc(text) + "</p>" +
      "</div>"
    );
  }

  /* ---------- barre de filtres ---------- */

  function filterBar(options) {
    var buttons = options.categories
      .map(function (c, i) {
        return (
          '<button class="filter-btn' + (i === 0 ? " is-active" : "") + '" type="button" data-filter-value="' +
          esc(c.id) + '">' + esc(c.label) + "</button>"
        );
      })
      .join("");

    var select = options.selects
      ? options.selects
          .map(function (s) {
            var opts = s.items
              .map(function (item) {
                var label = item.label != null ? item.label : item.nom;
                return '<option value="' + esc(item.id) + '">' + esc(label) + "</option>";
              })
              .join("");
            return (
              '<select class="field__control" data-filter-select="' + esc(s.key) + '" aria-label="' + esc(s.label) + '">' +
              opts +
              "</select>"
            );
          })
          .join("")
      : "";

    return (
      '<div class="filters" data-filter-bar>' +
      '<div class="filters__group"><span class="filters__label">' + esc(options.label) + "</span>" + buttons + "</div>" +
      (select ? '<div class="filters__group">' + select + "</div>" : "") +
      '<div class="filters__count" data-filter-count></div>' +
      "</div>"
    );
  }

  function attachFilters(host) {
    var bar = host.querySelector("[data-filter-bar]");
    if (!bar) return;
    var items = $$("[data-filter-group]", host);
    var count = bar.querySelector("[data-filter-count]");
    var group = null;
    var key = null;

    function apply() {
      var shown = 0;
      items.forEach(function (item) {
        var groupValue = item.getAttribute("data-filter-group") || "";
        var modes = " " + (item.getAttribute("data-filter-modes") || "") + " ";
        /* Une catégorie correspond au groupe exact, ou à l'une des modalités. */
        var okGroup = !group || groupValue === group || modes.indexOf(" " + group + " ") > -1;
        var okKey = !key || item.getAttribute("data-filter-key") === key;
        var on = okGroup && okKey;
        item.classList.toggle("is-hidden", !on);
        if (on) shown++;
      });
      if (count) {
        count.textContent = shown + (shown > 1 ? " résultats affichés" : " résultat affiché");
      }
      if (!shown) {
        var wrap = host.querySelector("[data-filter-items]");
        if (wrap && !wrap.querySelector(".empty-state")) {
          var note = document.createElement("div");
          note.className = "empty-state";
          note.innerHTML =
            '<div class="empty-state__icon">' + icon("filter") + "</div>" +
            '<h3 class="empty-state__title">Aucun contenu ne correspond à ce filtre</h3>' +
            '<p class="empty-state__text">Choisissez une autre catégorie pour afficher les contenus disponibles.</p>';
          wrap.appendChild(note);
        }
      } else {
        $$(".empty-state", host).forEach(function (n) {
          if (n.parentNode) n.parentNode.removeChild(n);
        });
      }
    }

    $$(".filter-btn", bar).forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$(".filter-btn", bar).forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        group = btn.getAttribute("data-filter-value");
        apply();
      });
    });

    $$("[data-filter-select]", bar).forEach(function (sel) {
      sel.addEventListener("change", function () {
        key = sel.value;
        apply();
      });
    });

    apply();
  }

  /* ---------- pages de détail ---------- */

  function notFound(host, what) {
    host.innerHTML = emptyState(
      "Contenu introuvable",
      "Cette page n'existe pas ou le contenu demandé n'est plus disponible. Consultez nos pages de référence ou revenez à l'accueil.",
      "h2"
    );
    if (what) host.setAttribute("data-missing", what);
  }

  /* Les blocs annexes n'ont rien à proposer sans identifiant valide : on les
     redirige vers des contenus toujours disponibles plutôt que de répéter le
     message déjà porté par l'en-tête et par le corps. */
  function fallbackList(host, items, tpl) {
    host.innerHTML = items.length
      ? '<div class="grid grid--3">' + items.map(tpl).join("") + "</div>"
      : emptyState("Contenu en cours de consolidation", "Cette rubrique sera complétée prochainement.");
  }

  function backLink(host, href, label, titre) {
    host.innerHTML =
      '<div class="post-nav"><a class="post-nav__link" href="' + href + '">' +
      '<span class="post-nav__label">' + icon("arrowLeft") + esc(label) + "</span>" +
      '<span class="post-nav__title">' + esc(titre) + "</span></a></div>";
  }

  function fillTargets(map) {
    Object.keys(map).forEach(function (key) {
      $$("[data-dt='" + key + "']").forEach(function (node) {
        if (key === "image") {
          node.setAttribute("src", asset(map[key]));
        } else {
          node.innerHTML = map[key];
        }
      });
    });
  }

  /* Le corps d'une actualité accepte « ## Titre », « - puce » et paragraphes. */
  function renderBody(corps) {
    if (!corps || !corps.length) return pending("Contenu en cours de rédaction");
    var out = "";
    var inList = false;

    function closeList() {
      if (inList) {
        out += "</ul>";
        inList = false;
      }
    }

    corps.forEach(function (block) {
      var text = String(block);
      if (/^##\s+/.test(text)) {
        closeList();
        out += "<h2>" + esc(text.replace(/^##\s+/, "")) + "</h2>";
      } else if (/^###\s+/.test(text)) {
        closeList();
        out += "<h3>" + esc(text.replace(/^###\s+/, "")) + "</h3>";
      } else if (/^>\s+/.test(text)) {
        closeList();
        out += "<blockquote>" + esc(text.replace(/^>\s+/, "")) + "</blockquote>";
      } else if (/^-\s+/.test(text)) {
        if (!inList) {
          out += "<ul>";
          inList = true;
        }
        out += "<li>" + esc(text.replace(/^-\s+/, "")) + "</li>";
      } else {
        closeList();
        out += "<p>" + esc(text) + "</p>";
      }
    });

    closeList();
    return out;
  }

  function withFilters(host, itemsHtml, options, gridClass) {
    host.innerHTML =
      filterBar(options) +
      '<div class="' + (gridClass || "grid grid--auto-lg") + '" data-filter-items>' +
      itemsHtml +
      "</div>";
    attachFilters(host);
  }

  var RENDER = {
    /* ---------- chiffres & identité ---------- */
    chiffres: function (host) {
      host.innerHTML = tplChiffres(D.chiffres);
    },

    "pesup-chiffres": function (host) {
      host.innerHTML = tplChiffres(D.pesupChiffres);
    },

    "site-contact": function (host) {
      var s = D.site || {};
      var cards = [
        {
          icon: "mapPin",
          label: "Adresse",
          value: s.adresse ? esc(s.adresse) : pending("Adresse officielle en cours de consolidation"),
          note: s.ville ? esc(s.ville + ", " + s.pays) : "",
          pending: !s.adresse
        },
        {
          icon: "phone",
          label: "Téléphone",
          value: s.telephone ? '<a href="tel:' + esc(String(s.telephone).replace(/\s/g, "")) + '">' + esc(s.telephone) + "</a>" : pending("Numéro en cours de consolidation"),
          note: "",
          pending: !s.telephone
        },
        {
          icon: "mail",
          label: "Adresse électronique",
          value: s.email ? '<a href="mailto:' + esc(s.email) + '">' + esc(s.email) + "</a>" : pending("Adresse électronique en cours de consolidation"),
          note: "",
          pending: !s.email
        },
        {
          icon: "send",
          label: "Candidatures",
          value: s.emailAdmissions ? '<a href="mailto:' + esc(s.emailAdmissions) + '">' + esc(s.emailAdmissions) + "</a>" : pending("Contact admissions en cours de consolidation"),
          note: "Dossier de candidature et préinscription",
          pending: !s.emailAdmissions
        }
      ];

      host.innerHTML = cards
        .map(function (c) {
          return (
            '<div class="contact-item' + (c.pending ? " contact-item--pending" : "") + '" data-reveal>' +
            '<div class="contact-item__icon">' + icon(c.icon) + "</div>" +
            "<div>" +
            '<div class="contact-item__label">' + esc(c.label) + "</div>" +
            '<div class="contact-item__value">' + c.value + "</div>" +
            (c.note ? '<div class="contact-item__note">' + c.note + "</div>" : "") +
            "</div></div>"
          );
        })
        .join("");

      var hours = (s.horaires || [])
        .map(function (h) {
          return (
            '<div class="list-item"><div class="list-item__icon">' + icon("clock") + "</div>" +
            "<div><div class=\"list-item__title\">" + esc(h.label) + "</div>" +
            '<div class="list-item__text">' + esc(h.valeur) + "</div></div></div>"
          );
        })
        .join("");

      if (host.dataset.horaires !== "off" && hours.length) {
        host.insertAdjacentHTML("afterend", '<div class="mt-5" data-reveal>' + hours + "</div>");
      }
    },

    "site-reseaux": function (host) {
      var res = (D.site && D.site.reseaux) || [];
      var real = res.filter(function (r) {
        return r.href;
      });

      if (!real.length) {
        /* Le variante « light » n'est lisible que sur un fond sombre :
           on ne l'emploie que dans le pied de page ou les sections profondes. */
        var surFondSombre = !!(
          host.closest(".footer, .section--deep, .section--brand, .cta-band, .page-hero")
        );
        host.innerHTML =
          '<div class="notice' + (surFondSombre ? " notice--light" : "") + '">' +
          icon("info") +
          "<span>Nos pages officielles seront bientôt disponibles. En attendant, nous restons joignables par le canal indiqué sur la page <a href=\"" +
          BASE +
          "pages/contact.html\" class=\"notice__link\">Contact</a>.</span></div>";
        return;
      }

      host.innerHTML = real
        .map(function (r) {
          return (
            '<a href="' + esc(r.href) + '" aria-label="' + esc(r.nom) + '" title="' + esc(r.nom) + '">' +
            icon(r.icone) + "</a>"
          );
        })
        .join("");
    },

    /* ---------- structure ---------- */
    departements: function (host) {
      host.innerHTML = (D.departements || []).map(tplDepartement).join("");
    },

    valeurs: function (host) {
      host.innerHTML = (D.valeurs || []).map(tplValeur).join("");
    },

    infrastructures: function (host) {
      host.innerHTML = (D.infrastructures || []).map(tplInfra).join("");
    },

    "services-ubd": function (host) {
      host.innerHTML = (D.services || []).map(tplService).join("");
    },

    gouvernance: function (host) {
      host.innerHTML = (D.gouvernance || []).map(tplGouvernance).join("");
    },

    evenements: function (host) {
      var list = byEventDate(D.evenements);
      host.innerHTML = list.length
        ? clamp(list, parseInt(host.dataset.limit, 10)).map(tplEvent).join("")
        : emptyState("Aucun événement publié", "Le calendrier des événements est en cours de mise à jour par les services de l’université.");
    },

    /* ---------- formations ---------- */
    "formations-home": function (host) {
      var list = D.formations || [];
      host.innerHTML = clamp(list, parseInt(host.dataset.limit, 10) || 6).map(tplFormation).join("");
    },

    "formations-condensees": function (host) {
      host.innerHTML = (D.formations || []).map(tplFormationCompact).join("");
    },

    "formations-grid": function (host) {
      var list = D.formations || [];
      var departements = D.departements || [];
      var withFormations = departements.filter(function (d) {
        return list.some(function (f) {
          return f.departement === d.id;
        });
      });
      var selects = [
        {
          key: "departement",
          label: "Département",
          /* Seuls les départements qui publient une formation sont proposés. */
          items: [{ id: "", label: "Tous les départements" }].concat(withFormations)
        }
      ];
      withFilters(
        host,
        list.map(tplFormation).join(""),
        { label: "Niveau", categories: D.categories || [], selects: selects },
        "grid grid--auto-lg"
      );
    },

    "formations-niveau": function (host) {
      var niveau = host.dataset.niveau || "";
      var list = (D.formations || []).filter(function (f) {
        if (!niveau) return true;
        /* « Formations continues » désigne une modalité, pas un niveau. */
        if (niveau === "continue") return (f.modes || []).indexOf("continue") > -1;
        return f.niveau === niveau;
      });
      host.innerHTML = list.length
        ? list.map(tplFormationCompact).join("")
        : emptyState("Contenu en cours de consolidation", "Cette section sera complétée par les équipes départementales.");
    },

    /* ---------- actualités ---------- */
    "actualites-home": function (host) {
      var list = byDateDesc(D.actualites).filter(function (a) {
        return a.aLaUne;
      });
      if (!list.length) list = byDateDesc(D.actualites);
      host.innerHTML = clamp(list, parseInt(host.dataset.limit, 10) || 3).map(tplActu).join("");
    },

    "actualites-grid": function (host) {
      var list = byDateDesc(D.actualites);
      withFilters(
        host,
        list.map(tplActu).join(""),
        { label: "Catégorie", categories: D.categoriesActualites || [] },
        "grid grid--auto-lg"
      );
    },

    /* ---------- galerie ---------- */
    galerie: function (host) {
      var list = D.galeriePesup || [];
      withFilters(
        host,
        list.map(tplGalerie).join(""),
        { label: "Collection", categories: D.categoriesGalerie || [] },
        "gallery-grid"
      );
    },

    "galerie-home": function (host) {
      var list = D.galeriePesup || [];
      host.innerHTML = clamp(list, parseInt(host.dataset.limit, 10) || 8).map(tplGalerie).join("");
    },

    /* ---------- questions fréquentes ---------- */
    faq: function (host) {
      var isPesup = host.dataset.set === "pesup";
      var list = isPesup ? (D.pesupAdmission && D.pesupAdmission.faq) : (D.admissions && D.admissions.faq);
      host.innerHTML =
        tplFaq(list, { openFirst: true, uid: isPesup ? "pesup" : "ubd" }) ||
        pending("Questions en cours de consolidation");
      initAccordions(host);
    },

    /* ---------- admissions ---------- */
    "admissions-conditions": function (host) {
      var a = D.admissions || {};
      host.innerHTML = (a.conditions || [])
        .map(function (c) {
          return (
            '<div class="value-card" data-reveal>' +
            '<div class="icon-badge icon-badge--soft">' + icon("checkCircle") + "</div>" +
            "<div><h3 class=\"value-card__title\">" + esc(c.titre) + "</h3>" +
            '<p class="value-card__text">' + esc(c.texte) + "</p></div></div>"
          );
        })
        .join("");
    },

    "admissions-niveaux": function (host) {
      var niveaux = (D.admissions || {}).niveaux || [];
      host.innerHTML = niveaux
        .map(function (n, i) {
          return (
            '<article class="feature-box">' +
            '<div class="feature-box__num">' + (i + 1 < 10 ? "0" : "") + (i + 1) + "</div>" +
            '<h3 class="feature-box__title">' + esc(n.titre) + "</h3>" +
            '<p class="feature-box__text"><strong>' + esc(n.duree) + ".</strong> " + esc(n.texte) + "</p>" +
            "</article>"
          );
        })
        .join("");
    },

    "admissions-pieces": function (host) {
      var a = D.admissions || {};
      host.innerHTML =
        '<div class="module is-open" data-module>' +
        '<button class="module__head" type="button" aria-expanded="true">' +
        "<span>Pièces constitutives du dossier</span>" + icon("chevronDown") + "</button>" +
        '<div class="module__body"><div><div class="module__body-inner">' +
        listOrPending(a.pieces, "Liste des pièces") +
        "</div></div></div></div>";
      initModules(host);
    },

    "admissions-etapes": function (host) {
      var a = D.admissions || {};
      var steps = a.etapes || [];
      host.innerHTML =
        '<ol class="check-list check-list--numbered">' +
        steps
          .map(function (s) {
            return "<li><div><strong>" + esc(s.titre) + "</strong><br>" + esc(s.texte) + "</div></li>";
          })
          .join("") +
        "</ol>";
    },

    "admissions-calendrier": function (host) {
      var rows = ((D.admissions || {}).calendrier || [])
        .map(function (c) {
          return (
            "<tr><td>" + esc(c.periode) + "</td><td>" +
            (c.confirmed ? esc(c.date) : pending("Date à confirmer")) +
            "</td><td>" +
            (c.confirmed
              ? '<span class="badge badge--ok">' + icon("check") + "Confirmée</span>"
              : '<span class="badge badge--warn">' + icon("clock") + "À confirmer</span>") +
            "</td></tr>"
          );
        })
        .join("");

      host.innerHTML =
        '<div class="table-wrap"><table class="table"><thead><tr>' +
        "<th>Période</th><th>Date</th><th>Statut</th>" +
        "</tr></thead><tbody>" +
        (rows || '<tr><td colspan="3">' + pending("Calendrier en cours de consolidation") + "</td></tr>") +
        "</tbody></table></div>";
    },

    "admissions-frais": function (host) {
      var f = (D.admissions || {}).frais;
      host.innerHTML =
        '<div class="notice notice--info">' + icon("info") +
        "<span><strong>Frais de scolarité.</strong> " + esc((f && f.texte) || "") + "</span></div>";
    },

    /* ---------- PESUP-Santé ---------- */
    "pesup-formations": function (host) {
      var list = D.pesupFormations || [];
      host.innerHTML = clamp(list, parseInt(host.dataset.limit, 10) || 4).map(tplPesupFormation).join("");
    },

    /* Objectifs et débouchés, filière par filière, en accordéon. */
    "pesup-formations-detail": function (host) {
      var list = D.pesupFormations || [];
      host.innerHTML = list
        .map(function (p, i) {
          var open = i === 0;
          return (
            '<div class="module' + (open ? " is-open" : "") + '" data-module>' +
            '<button class="module__head" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
            "<span>" + esc(p.intitule) + "</span>" + icon("chevronDown") + "</button>" +
            '<div class="module__body"><div><div class="module__body-inner">' +
            '<p class="kicker mb-2">Objectifs de la formation</p>' +
            listOrPending(p.objectifs, "Objectifs") +
            '<p class="kicker mt-5 mb-2">Débouchés</p>' +
            listOrPending(p.debouches, "Débouchés") +
            "</div></div></div></div>"
          );
        })
        .join("");
      initModules(host);
    },

    "pesup-activites": function (host) {
      host.innerHTML = (D.pesupActivites || [])
        .map(function (a) {
          return (
            '<article class="value-card" data-reveal>' +
            '<div class="icon-badge">' + icon(a.icone) + "</div>" +
            "<div><h3 class=\"value-card__title\">" + esc(a.titre) + "</h3>" +
            '<p class="value-card__text">' + esc(a.texte) + "</p></div></article>"
          );
        })
        .join("");
    },

    "pesup-services": function (host) {
      host.innerHTML = (D.pesupServices || [])
        .map(function (s) {
          return (
            '<article class="service-card" data-reveal>' +
            '<div class="icon-badge icon-badge--soft service-card__icon">' + icon(s.icone) + "</div>" +
            '<h3 class="service-card__title">' + esc(s.titre) + "</h3>" +
            '<p class="service-card__text">' + esc(s.texte) + "</p>" +
            "</article>"
          );
        })
        .join("");
    },

    "pesup-evenements": function (host) {
      var list = byEventDate(D.pesupEvenements);
      host.innerHTML = list.length
        ? list.map(tplEvent).join("")
        : emptyState("Aucun événement publié", "Le calendrier de la PESUP-Santé sera communiqué par les services.");
    },

    "pesup-admission-conditions": function (host) {
      var a = D.pesupAdmission || {};
      host.innerHTML = (a.conditions || [])
        .map(function (c) {
          return (
            '<div class="value-card" data-reveal>' +
            '<div class="icon-badge icon-badge--soft">' + icon("checkCircle") + "</div>" +
            "<div><h3 class=\"value-card__title\">" + esc(c.titre) + "</h3>" +
            '<p class="value-card__text">' + esc(c.texte) + "</p></div></div>"
          );
        })
        .join("");
    },

    "pesup-admission-pieces": function (host) {
      var a = D.pesupAdmission || {};
      host.innerHTML =
        '<div class="module is-open" data-module>' +
        '<button class="module__head" type="button" aria-expanded="true">' +
        "<span>Pièces à fournir</span>" + icon("chevronDown") + "</button>" +
        '<div class="module__body"><div><div class="module__body-inner">' +
        listOrPending(a.pieces, "Liste des pièces") +
        "</div></div></div></div>";
      initModules(host);
    },

    "pesup-admission-etapes": function (host) {
      var a = D.pesupAdmission || {};
      host.innerHTML =
        '<ol class="check-list check-list--numbered">' +
        (a.etapes || [])
          .map(function (s) {
            return "<li><div><strong>" + esc(s.titre) + "</strong><br>" + esc(s.texte) + "</div></li>";
          })
          .join("") +
        "</ol>";
    },

    /* ---------- détail : actualité ---------- */
    /* L'en-tête est rattaché au <header> de la page : il renseigne le titre du
       document, le fil d'Ariane, le H1 et les étiquettes. Le corps, lui, affiche
       le message « contenu introuvable » quand l'identifiant est inconnu. */
    "actualite-detail-head": function (host) {
      var a = byId(D.actualites || [], param("id") || param("slug"));
      if (!a) {
        document.title = "Actualité introuvable — Université Bagnélé Diarra";
        host.setAttribute("data-missing", "actualite");
        fillTargets({ titre: "Actualité introuvable" });
        return;
      }
      document.title = a.titre + " — Actualités";
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", a.chapo);
      fillTargets({
        titre: esc(a.titre),
        chapo: esc(a.chapo),
        categorie: esc(catLabel(D.categoriesActualites, a.categorie)),
        date: esc(longDate(a.date)),
        image: a.image
      });
      $$("[data-dt='image']").forEach(function (n) {
        n.setAttribute("alt", a.alt || a.titre);
      });
    },

    "actualite-detail-body": function (host) {
      var a = byId(D.actualites || [], param("id") || param("slug"));
      if (!a) {
        notFound(host, "actualite");
        return;
      }
      host.innerHTML = '<div class="prose">' + renderBody(a.corps) + "</div>";
    },

    "actualite-detail-nav": function (host) {
      var list = byDateDesc(D.actualites);
      var a = byId(list, param("id") || param("slug"));
      if (!a) {
        backLink(host, "actualites.html", "Retour aux actualités", "Consulter la liste complète");
        return;
      }
      var i = list.indexOf(a);
      var prev = list[i + 1];
      var next = list[i - 1];
      var mk = function (item, dir) {
        if (!item) return '<div class="post-nav__link" aria-hidden="true"></div>';
        return (
          '<a class="post-nav__link' + (dir === "next" ? " post-nav__link--next" : "") + '" href="actualite-detail.html?id=' +
          encodeURIComponent(item.id) + '">' +
          '<span class="post-nav__label">' +
          (dir === "next" ? icon("arrowRight") + "Article suivant" : "Article précédent" + icon("arrowLeft")) +
          "</span>" +
          '<span class="post-nav__title">' + esc(item.titre) + "</span></a>"
        );
      };
      host.innerHTML = '<div class="post-nav">' + mk(prev, "prev") + mk(next, "next") + "</div>";
    },

    "actualite-detail-related": function (host) {
      var all = byDateDesc(D.actualites);
      var a = byId(all, param("id") || param("slug"));
      if (!a) {
        fallbackList(host, all.slice(0, 3), tplActu);
        return;
      }
      var same = all.filter(function (x) {
        return x.id !== a.id && x.categorie === a.categorie;
      });
      var others = all.filter(function (x) {
        return x.id !== a.id;
      });
      var list = (same.length >= 3 ? same : same.concat(others.filter(function (x) {
        return same.indexOf(x) === -1;
      }))).slice(0, 3);
      host.innerHTML = list.length
        ? '<div class="grid grid--3">' + list.map(tplActu).join("") + "</div>"
        : emptyState("Aucun article associé", "Consultez l’ensemble de nos actualités.");
    },

    /* ---------- détail : formation ---------- */
    "formation-detail-head": function (host) {
      var f = byId(D.formations || [], param("id") || param("slug"));
      if (!f) {
        document.title = "Formation introuvable — Université Bagnélé Diarra";
        host.setAttribute("data-missing", "formation");
        fillTargets({ titre: "Formation introuvable" });
        return;
      }
      document.title = f.intitule + " — Formations";
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", f.resume);
      fillTargets({
        titre: esc(f.intitule),
        resume: esc(f.resume),
        code: esc(f.code),
        niveau: esc(f.niveau),
        duree: esc(f.duree),
        departement: esc(catLabel(D.departements, f.departement)),
        domaine: esc(f.domaine),
        image: f.image
      });
      $$("[data-dt='image']").forEach(function (n) {
        n.setAttribute("alt", f.alt || f.intitule);
      });
    },

    "formation-detail-side": function (host) {
      var f = byId(D.formations || [], param("id") || param("slug"));
      if (!f) {
        host.innerHTML = '<a class="btn btn--primary btn--block" href="formations.html">Voir toutes les formations</a>';
        return;
      }
      var rows = [
        { icon: "fileText", label: "Code", value: esc(f.code) },
        { icon: "layers", label: "Niveau", value: esc(f.niveau) },
        { icon: "clock", label: "Durée", value: esc(f.duree) },
        { icon: "compass", label: "Département", value: esc(catLabel(D.departements, f.departement)) },
        { icon: "target", label: "Domaine", value: esc(f.domaine) },
        {
          icon: "megaphone",
          label: "Modalités",
          value: (f.modes || []).map(esc).join(" · ")
        }
      ];
      host.innerHTML =
        '<div class="meta-list">' +
        rows
          .map(function (r) {
            return (
              '<div class="meta-list__row"><div class="meta-list__icon">' + icon(r.icon) + "</div>" +
              '<div><div class="meta-list__label">' + esc(r.label) + "</div>" +
              '<div class="meta-list__value">' + r.value + "</div></div></div>"
            );
          })
          .join("") +
        "</div>";
    },

    "formation-detail-body": function (host) {
      var f = byId(D.formations || [], param("id") || param("slug"));
      if (!f) {
        notFound(host, "formation");
        return;
      }
      var programme = (f.programme || [])
        .map(function (sem) {
          return (
            '<div class="module" data-module>' +
            '<button class="module__head" type="button" aria-expanded="false">' +
            "<span>" + esc(sem.semestre) + ' <span class="text-muted fw-medium">(' +
            (sem.matieres || []).length + " matières)</span></span>" + icon("chevronDown") + "</button>" +
            '<div class="module__body"><div><div class="module__body-inner">' +
            ((sem.matieres || [])
              .map(function (m) {
                return (
                  '<div class="list-item"><div class="list-item__icon">' + icon("book") + "</div>" +
                  '<div class="list-item__title">' + esc(m) + "</div></div>"
                );
              })
              .join("") || pending("Matières en cours de consolidation")) +
            "</div></div></div></div>"
          );
        })
        .join("");

      host.innerHTML =
        '<div class="prose">' +
        "<h2>Présentation de la formation</h2>" +
        "<p>" + esc(f.resume) + "</p>" +
        "<h2>Objectifs pédagogiques</h2>" +
        listOrPending(f.objectifs, "Objectifs") +
        "<h2>Programme détaillé</h2>" +
        (programme || pending("Programme en cours de consolidation")) +
        "<h2>Débouchés professionnels</h2>" +
        listOrPending(f.debouches, "Débouchés") +
        "</div>";
      initModules(host);
    }
  };

  /* ======================================================================
     06. INTERACTIONS DE PAGE
     ====================================================================== */

  function initAccordions(scope) {
    $$(".accordion__btn", scope || document).forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        var item = btn.closest(".accordion__item");
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initModules(scope) {
    $$("[data-module] .module__head", scope || document).forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        var mod = btn.closest("[data-module]");
        var open = mod.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initLightbox() {
    var box = $("#lightbox");
    if (!box) {
      box = document.createElement("div");
      box.className = "lightbox";
      box.id = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.innerHTML =
        '<button class="lightbox__btn lightbox__btn--close" type="button" aria-label="Fermer">' + icon("close") + "</button>" +
        '<button class="lightbox__btn lightbox__btn--prev" type="button" aria-label="Image précédente">' + icon("chevronLeft") + "</button>" +
        '<button class="lightbox__btn lightbox__btn--next" type="button" aria-label="Image suivante">' + icon("chevronRight") + "</button>" +
        '<figure class="lightbox__figure">' +
        '<img class="lightbox__img" src="" alt="">' +
        '<figcaption class="lightbox__caption"><strong></strong><span class="lightbox__counter"></span></figcaption>' +
        "</figure>";
      document.body.appendChild(box);
    }

    var img = $(".lightbox__img", box);
    var cap = $(".lightbox__caption strong", box);
    var counter = $(".lightbox__counter", box);
    var items = [];
    var index = 0;
    var lastFocus = null;

    box.setAttribute("aria-hidden", "true");

    /* Pieges le focus a l'interieur de la boite de dialogue. */
    function focusables() {
      return $$(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        box
      ).filter(function (n) {
        return n.offsetParent !== null || n === document.activeElement;
      });
    }

    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      var it = items[index];
      img.setAttribute("src", asset(it.getAttribute("data-lightbox")));
      img.setAttribute("alt", it.getAttribute("data-alt") || "");
      cap.textContent = it.getAttribute("data-caption") || "";
      counter.textContent = index + 1 + " / " + items.length;
    }

    function open(i) {
      lastFocus = document.activeElement;
      items = $$("[data-lightbox]");
      show(i);
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
      $(".lightbox__btn--close", box).focus();
    }

    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
      if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("click", function (ev) {
      var trigger = ev.target.closest ? ev.target.closest("[data-lightbox]") : null;
      if (trigger) {
        var all = $$("[data-lightbox]");
        ev.preventDefault();
        open(all.indexOf(trigger));
      }
    });

    $(".lightbox__btn--close", box).addEventListener("click", close);
    $(".lightbox__btn--prev", box).addEventListener("click", function () {
      show(index - 1);
    });
    $(".lightbox__btn--next", box).addEventListener("click", function () {
      show(index + 1);
    });
    box.addEventListener("click", function (ev) {
      if (ev.target === box) close();
    });
    document.addEventListener("keydown", function (ev) {
      if (!box.classList.contains("is-open")) return;
      if (ev.key === "Escape") close();
      if (ev.key === "ArrowLeft") show(index - 1);
      if (ev.key === "ArrowRight") show(index + 1);

      if (ev.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0];
        var last = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault();
          last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault();
          first.focus();
        }
      }
    });
  }

  function initForms() {
    $$("form[data-validate]").forEach(function (form) {
      form.setAttribute("novalidate", "novalidate");

      var status = $(".form-status", form);

      function fieldOf(control) {
        return control.closest(".field") || control.closest(".choice") || control.parentNode;
      }

      function validate(control) {
        var wrap = fieldOf(control);
        var ok = true;
        var msg = "";
        var value = (control.value || "").trim();

        if (control.type === "checkbox" && control.required && !control.checked) {
          ok = false;
          msg = "Cette case doit être cochée pour continuer.";
        } else if (control.required && !value) {
          ok = false;
          msg = "Ce champ est obligatoire.";
        } else if (control.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          ok = false;
          msg = "Saisissez une adresse électronique valide.";
        } else if (control.type === "tel" && value && !/^[+0-9 ().\-]{6,}$/.test(value)) {
          ok = false;
          msg = "Saisissez un numéro de téléphone valide.";
        }

        var error = $(".field__error span", wrap) || $(".field__error", wrap);
        if (wrap && wrap.classList) {
          wrap.classList.toggle("has-error", !ok);
          wrap.classList.toggle("is-valid", ok && !!value);
        }
        if (error) error.textContent = msg;
        return ok;
      }

      $$("input, textarea, select", form).forEach(function (control) {
        if (!control.required) return;
        control.addEventListener("blur", function () {
          validate(control);
        });
        control.addEventListener("input", function () {
          if (fieldOf(control).classList.contains("has-error")) validate(control);
        });
      });

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var controls = $$("input, textarea, select", form).filter(function (c) {
          return c.type !== "hidden" && c.type !== "submit";
        });
        var firstBad = null;
        controls.forEach(function (control) {
          if (!validate(control) && !firstBad) firstBad = control;
        });

        if (firstBad) {
          if (status) {
            status.className = "form-status form-status--error is-visible";
            status.innerHTML = icon("alert") + "<span>Le formulaire comporte des champs à corriger. Vérifiez les informations saisies puis réessayez.</span>";
          }
          firstBad.focus();
          return;
        }

        var btn = $('button[type="submit"]', form);
        var original = btn ? btn.innerHTML : "";
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = icon("clock") + "Envoi en cours…";
        }

        window.setTimeout(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = original;
          }
          if (status) {
            status.className = "form-status form-status--ok is-visible";
            status.innerHTML =
              icon("checkCircle") +
              "<span><strong>Message enregistré.</strong> Le site étant actuellement en version de présentation, aucun envoi sortant n’est effectué. Vos informations n’ont pas été transmises : rapprochez-vous directement du service concerné via la page Contact, ou transmettez votre dossier au guichet de l’université.</span>";
          }
          form.reset();
          $$(".field", form).forEach(function (f) {
            f.classList.remove("has-error", "is-valid");
          });
          toast("Formulaire validé localement — aucun envoi n’a été effectué.");
        }, 900);
      });
    });
  }

  function initAutoReveal() {
    var grid = $("[data-auto-reveal]");
    if (!grid) return;
    var cols = parseInt(grid.dataset.autoReveal, 10) || 3;
    $$(":scope > *", grid).forEach(function (child, i) {
      if (child.hasAttribute("data-reveal")) return;
      child.setAttribute("data-reveal", "");
      child.setAttribute("data-reveal-delay", String((i % cols) + 1));
    });
  }

  function init() {
    injectSprite();

    $$("[data-render]").forEach(function (host) {
      var fn = RENDER[host.getAttribute("data-render")];
      if (fn) fn(host);
    });

    initHeader();
    initHeaderFit();
    initActiveNav();
    initDrawer();
    initDropdownKeys();
    initSmoothScroll();
    initAccordions();
    initModules();
    initLightbox();
    initForms();
    initAutoReveal();
    initReveal();
    initCounters();
    initBackToTop();

    $$("[data-year]").forEach(function (n) {
      n.textContent = String(new Date().getFullYear());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


