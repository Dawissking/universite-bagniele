const { buildPage } = require("./layout.js");

/* ============================ UBD ============================ */
/* ---------- ACCUEIL ---------- */
/* Corps de la page d'accueil : hero, chiffres cles, formations,
   actualites, valeurs, sante et appel a l'action. */
const INDEX_BODY = `
  <!-- ================= HERO ================= -->
  <section class="hero">
    <div class="hero__bg">
      <img src="images/ubd-hero.jpg" alt="Vue du campus de l’Université Bagnélé Diarra" fetchpriority="high" width="1600" height="1000">
    </div>
    <div class="container hero__inner">
      <div class="hero__content">
        <span class="hero__badge">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-award"></use></svg>
          Enseignement supérieur privé — Bamako, Mali
        </span>
        <h1 class="hero__title title-serif">
          Former les leaders de <em>demain</em> pour le développement du Mali
        </h1>
        <p class="hero__lead">
          L’Université Bagnélé Diarra accompagne les étudiants vers l’excellence grâce à une
          pédagogie exigeante, un encadrement rapproché et des programmes construits
          en cohérence avec les réalités du Mali et de la sous-région.
        </p>
        <div class="hero__actions">
          <a class="btn btn--accent btn--lg" href="pages/formations.html">
            Découvrir nos formations
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
          </a>
          <a class="btn btn--outline-light btn--lg" href="pages/admissions.html">Candidater</a>
        </div>
        <div class="hero__meta">
          <div class="hero__meta-item">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-layers"></use></svg>
            <div>
              <div class="hero__meta-value">13 formations</div>
              <div class="hero__meta-label">Licences, masters et formations professionnelles</div>
            </div>
          </div>
          <div class="hero__meta-item">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-users"></use></svg>
            <div>
              <div class="hero__meta-value">3 départements</div>
              <div class="hero__meta-label">Sciences, gestion et santé</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-mouse"><span class="hero__scroll-dot"></span></span>
      <span>Défiler</span>
    </div>
  </section>

  <!-- ================= NOS PÔLES ================= -->
  <section class="section section--tight section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Nos pôles</span>
        <h2 class="section-title title-serif">Deux pôles, une même exigence académique</h2>
        <p class="section-lead">
          L’Université Bagnélé Diarra et sa PESUP-Santé forment un seul pôle
          d’enseignement supérieur privé à Bamako : chacun avec ses cursus, son
          campus et ses conditions d’admission.
        </p>
      </div>
      <div class="grid grid--2">
        <article class="card">
          <div class="card__body">
            <span class="eyebrow">Pôle universitaire</span>
            <h3 class="card__title"><a href="pages/universite.html">Université Bagnélé Diarra</a></h3>
            <p class="card__text">
              Licences, masters et formations professionnelles répartis en trois
              départements : sciences, gestion et santé.
            </p>
            <a class="link-arrow" href="pages/universite.html">
              Découvrir l’Université
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </article>
        <article class="card">
          <div class="card__body">
            <span class="eyebrow">Pôle santé</span>
            <h3 class="card__title"><a href="pages/pesup-sante.html">PESUP-Santé Bagnélé Diarra</a></h3>
            <p class="card__text">
              Soins infirmiers, sage-femme, kinésithérapie et gestion des
              établissements de santé : la formation aux métiers du soin.
            </p>
            <a class="link-arrow" href="pages/pesup-sante.html">
              Découvrir la PESUP-Santé
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ================= CHIFFRES CLÉS ================= -->
  <section class="section section--tight section--alt">
    <div class="container">
      <div class="stat-row" data-render="chiffres"></div>
      <p class="text-center text-muted mt-4 text-xs">
        Certains indicateurs sont encore en cours de consolidation par les services de l’université.
      </p>
    </div>
  </section>

  <!-- ================= PRÉSENTATION ================= -->
  <section class="section">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="frame frame--accent">
            <div class="frame__img">
              <img src="images/ubd-campus.jpg" alt="Campus de l’Université Bagnélé Diarra à Bamako" loading="lazy" width="1600" height="1067">
            </div>
            <div class="frame__badge frame__badge--br">
              <span class="icon-badge icon-badge--soft">
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-compass"></use></svg>
              </span>
              <div>
                <div class="frame__badge-value">Bamako</div>
                <div class="frame__badge-label">Notre campus, au cœur de la capitale malienne</div>
              </div>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">L’Université Bagnélé Diarra</span>
          <h2 class="section-title title-serif">Une institution pensée pour la réussite de ses étudiants</h2>
          <p class="lead">
            Fondée sur l’exigence et l’utilité sociale, l’Université Bagnélé Diarra accueille les
            étudiants qui souhaitent construire un parcours solide dans les sciences, la gestion
            et la santé.
          </p>
          <p class="text-soft">
            Notre projet académique repose sur trois engagements : une qualité d’enseignement
            contrôlée, un accompagnement personnalisé de chaque étudiant et une ouverture
            constante sur les réalités professionnelles du Mali et de la sous-région.
          </p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="pages/universite.html">
              En savoir plus sur l’université
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="link-arrow" href="pages/vie-universitaire.html">
              La vie au campus
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= VALEURS ================= -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Nos valeurs</span>
        <h2 class="section-title title-serif">Quatre principes guident chaque décision</h2>
        <p class="section-lead">
          Excellence, intégrité, innovation et inclusion : ces valeurs ne sont pas des formules
          affichées, elles structurent l’organisation de l’enseignement et l’accompagnement des étudiants.
        </p>
      </div>
      <div class="grid grid--auto" data-render="valeurs" data-auto-reveal="3"></div>
    </div>
  </section>

  <!-- ================= FORMATIONS ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Notre offre de formation</span>
          <h2 class="section-title title-serif">Des parcours conçus pour votre avenir professionnel</h2>
          <p class="section-lead">
            Licences, masters, formations professionnelles et formations continues :
            notre catalogue couvre les principaux secteurs d’insertion de l’emploi au Mali.
          </p>
        </div>
        <a class="btn btn--outline" href="pages/formations.html">
          Voir tout le catalogue
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--auto-lg" data-render="formations-home" data-limit="6"></div>
    </div>
  </section>

  <!-- ================= CHIFFRES / DEPARTEMENTS ================= -->
  <section class="section section--deep section--pattern">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center eyebrow--light">Nos départements</span>
        <h2 class="section-title title-serif">Trois départements de savoir-faire complémentaires</h2>
        <p class="section-lead">
          Chaque département réunit des enseignants, des laboratoires et des dispositifs de stage
          pour faire du cursus un espace de préparation professionnelle.
        </p>
      </div>
      <div class="grid grid--3" data-render="departements" data-auto-reveal="3"></div>
    </div>
  </section>

  <!-- ================= ACTUALITÉS ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Actualités</span>
          <h2 class="section-title title-serif">La vie de l’université</h2>
          <p class="section-lead">
            Rentrées, événements, annonces et temps forts de la communauté universitaire.
          </p>
        </div>
        <a class="btn btn--outline" href="pages/actualites.html">
          Toutes les actualités
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--3" data-render="actualites-home" data-limit="3"></div>
    </div>
  </section>

  <!-- ================= ÉVÉNEMENTS ================= -->
  <section class="section section--alt">
    <div class="container">
      <div class="split">
        <div class="split__body">
          <span class="eyebrow">Agenda</span>
          <h2 class="section-title title-serif">Les prochains rendez-vous</h2>
          <p class="section-lead">
            Institutions, conférences, Remise des diplômes et activités de vie scolaire :
            retrouvez les temps forts de l’université.
          </p>
          <div class="timeline mt-6" data-render="evenements" data-limit="4"></div>
        </div>
        <div class="split__media">
          <div class="media-panel">
            <img src="images/ubd-groupe.jpg" alt="Étudiants de l’Université Bagnélé Diarra réunis sur le campus" loading="lazy" width="1600" height="1067">
            <div class="media-panel__overlay">
              <h3 class="media-panel__title">Une communauté active</h3>
              <p class="media-panel__text">
                Association, sport, culture et entrepreneuriat : le campus est aussi un lieu
                d’échange et d’initiative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= CTA CANDIDATURE ================= -->
  <section class="cta-band">
    <div class="container cta-band__inner">
      <div class="cta-band__content">
        <h2 class="cta-band__title">Prêt à rejoindre l’Université Bagnélé Diarra ?</h2>
        <p class="cta-band__text">
          Consultez les conditions d’admission, préparez votre dossier et candidatez auprès
          du service des admissions pour la prochaine rentrée.
        </p>
      </div>
      <div class="btn-row">
        <a class="btn btn--accent btn--lg" href="pages/admissions.html">Déposer une candidature</a>
        <a class="btn btn--outline-light btn--lg" href="pages/contact.html">Nous contacter</a>
      </div>
    </div>
  </section>

  <!-- ================= PESUP-SANTÉ ================= -->
  <section class="section">
    <div class="container">
      <div class="split split--reverse">
        <div class="split__media">
          <div class="frame frame--accent-alt">
            <div class="frame__img">
              <img src="images/pesup-hero-alt.jpg" alt="Campus de la PESUP-Santé Bagnélé Diarra" loading="lazy" width="1600" height="1000">
            </div>
            <div class="frame__badge frame__badge--tl">
              <span class="icon-badge icon-badge--soft">
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-cross"></use></svg>
              </span>
              <div>
                <div class="frame__badge-value">PESUP</div>
                <div class="frame__badge-label">Pôle d’enseignement supérieur en santé</div>
              </div>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">PESUP-Santé Bagnélé Diarra</span>
          <h2 class="section-title title-serif">Former des professionnels de santé en Mali</h2>
          <p class="lead">
            La PESUP-Santé Bagnélé Diarra est notre pôle dédié aux métiers de la santé :
            soins infirmiers, formation de sages-femmes, kinésithérapie et gestion des
            établissements de santé.
          </p>
          <p class="text-soft">
            Les cursus s’appuient sur des enseignements pratiques, des terrains de stage et
            une équipe pédagogique composée de professionnels du secteur.
          </p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="pages/pesup-sante.html">
              Découvrir la PESUP-Santé
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="link-arrow" href="pages/pesup-admission.html">
              Conditions d’admission
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

/* L'accueil est ecrit dans le layout partage comme les autres pages : il
   recupere ainsi le bloc <noscript>, la navigation complete et le pied de
   page. Seuls le header transparent et la bande reseau lui sont propres. */
buildPage(
  "index.html",
  "ubd",
  "Former les leaders de demain",
  "L’Université Bagnélé Diarra forme à Bamako des professionnels responsables, techniquement solides et engagés pour le développement du Mali.",
  INDEX_BODY,
  "index.html",
  { home: "", transparentHeader: true, partners: true }
);

buildPage(
  "pages/universite.html",
  "ubd",
  "L’Université",
  "Présentation, gouvernance, infrastructures et services de l’Université Bagnélé Diarra à Bamako.",
  `
  <section class="page-hero">
    <div class="page-hero__bg"><img src="../images/ubd-campus.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">L’Université</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">L’Université Bagnélé Diarra</h1>
      <p class="page-hero__lead">
        Enseignement supérieur privé à Bamako, l’Université Bagnélé Diarra forme des
        professionnels responsables, techniquement solides et engagés dans le
        développement du Mali et de la sous-région.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__body">
          <span class="eyebrow">Notre projet</span>
          <h2 class="section-title title-serif">Une université construite autour de l’utilité sociale</h2>
          <p class="lead">
            L’Université Bagnélé Diarra est un établissement d’enseignement supérieur privé
            installé à Bamako. Elle accueille des étudiants venus de tout le Mali et de la
            sous-région dans un cadre d’étude favorable à la réussite et à l’ouverture.
          </p>
          <p class="text-soft">
            Notre action repose sur une idée simple : une formation de qualité doit être
            techniquement exigeante, mais aussi directement utile à ceux qui la reçoivent.
            C’est pourquoi chaque cursus articule enseignements fondamentaux, travaux
            pratiques, stages et projets professionnels.
          </p>
          <div class="meta-list mt-6" data-reveal>
            <div class="meta-list__row">
              <div class="meta-list__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-compass"></use></svg></div>
              <div><div class="meta-list__label">Devise</div>
              <div class="meta-list__value">Excellence · Intégrité · Innovation · Inclusion</div></div>
            </div>
            <div class="meta-list__row">
              <div class="meta-list__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mapPin"></use></svg></div>
              <div><div class="meta-list__label">Implantation</div>
              <div class="meta-list__value">Bamako, Mali</div></div>
            </div>
            <div class="meta-list__row">
              <div class="meta-list__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-award"></use></svg></div>
              <div><div class="meta-list__label">Établissement</div>
              <div class="meta-list__value">Enseignement supérieur privé</div></div>
            </div>
          </div>
        </div>
        <div class="split__media">
          <div class="frame frame--accent">
            <div class="frame__img">
              <img src="../images/ubd-groupe.jpg" alt="Étudiants de l’Université Bagnélé Diarra sur le campus" loading="lazy" width="1600" height="1067">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="stat-row" data-render="chiffres"></div>
      <p class="text-center text-muted mt-4 text-xs">
        Certains indicateurs sont encore en cours de consolidation par les services de l’université.
      </p>
    </div>
  </section>

  <section class="section section--alt-2">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Nos valeurs</span>
        <h2 class="section-title title-serif">Quatre principes guident chaque décision</h2>
        <p class="section-lead">
          Excellence, intégrité, innovation et inclusion guident l’organisation de
          l’enseignement, l’évaluation et l’accompagnement des étudiants.
        </p>
      </div>
      <div class="grid grid--auto" data-render="valeurs" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section" id="gouvernance">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Gouvernance</span>
        <h2 class="section-title title-serif">Une organisation claire et responsable</h2>
        <p class="section-lead">
          Les instances de l’université se distinguent selon leur nature : délibération
          stratégique, orientation pédagogique ou gestion opérationnelle. La composition
          nominative des organes est en cours de consolidation.
        </p>
      </div>
      <div class="grid grid--auto" data-render="gouvernance" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section section--deep section--pattern" id="infrastructures">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center eyebrow--light">Infrastructures</span>
        <h2 class="section-title title-serif">Des ressources pour apprendre et travailler</h2>
        <p class="section-lead">
          Bibliothèques, laboratoires, salles informatiques et espaces d’accompagnement
          constituent le socle matériel de la formation.
        </p>
      </div>
      <div class="grid grid--3" data-render="infrastructures" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Services aux étudiants</span>
        <h2 class="section-title title-serif">À qui s’adresser et pour quoi faire</h2>
        <p class="section-lead">
          Les services administratifs et pédagogiques centralisent l’information utile au
          parcours de chaque étudiant.
        </p>
      </div>
      <div class="grid grid--auto" data-render="services-ubd" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Poursuivre votre projet d’études</h2>
          <p class="cta-band__text">
            Consultez le catalogue des formations, vérifiez les conditions d’admission et
            contactez le service d’orientation.
          </p>
          <div class="btn-row">
            <a class="btn btn--accent" href="formations.html">
              Voir les formations
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="btn btn--outline-light" href="admissions.html">Conditions d’admission</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/formations.html",
  "ubd",
  "Formations",
  "Catalogue des licences, masters et formations professionnelles de l’Université Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-groupe.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Formations</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Nos formations</h1>
      <p class="page-hero__lead">
        Licences, masters et formations professionnelles : notre catalogue couvre les
        principaux secteurs d’insertion de l’emploi au Mali.
      </p>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="stat-row" data-render="chiffres"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Catalogue complet</span>
        <h2 class="section-title title-serif">Trouvez la formation qui correspond à votre projet</h2>
        <p class="section-lead">
          Filtrez les formations par niveau et par département. Chaque fiche détaille les
          objectifs, le programme et les débouchés professionnels.
        </p>
      </div>
      <div data-render="formations-grid"></div>
    </div>
  </section>

  <section class="section section--alt" id="licence">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Licences</span>
        <h2 class="section-title title-serif">Le premier cycle</h2>
        <p class="section-lead">
          Trois ans pour acquérir les fondements académiques d’une discipline et
          s’ouvrir progressivement à la pratique professionnelle.
        </p>
      </div>
      <div data-render="formations-niveau" data-niveau="licence"></div>
    </div>
  </section>

  <section class="section section--deep" id="master">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center eyebrow--light">Masters</span>
        <h2 class="section-title title-serif">La spécialisation</h2>
        <p class="section-lead">
          Deux années de spécialisation, de méthodologie de la recherche et de mémoire
          de fin d’études, orientées vers la maîtrise d’un domaine professionnel précis.
        </p>
      </div>
      <div data-render="formations-niveau" data-niveau="master"></div>
    </div>
  </section>

  <section class="section" id="pro">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Formations professionnelles</span>
        <h2 class="section-title title-serif">Apprendre un métier en exercice</h2>
        <p class="section-lead">
          Des programmes conçus avec le monde professionnel, fondés sur des travaux
          pratiques, des projets et des stages encadrés.
        </p>
      </div>
      <div data-render="formations-niveau" data-niveau="pro"></div>
    </div>
  </section>

  <section class="section section--alt-2" id="continue">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Formations continues</span>
        <h2 class="section-title title-serif">Se perfectionner en cours d’activité</h2>
        <p class="section-lead">
          Plusieurs parcours sont accessibles en formation continue. Les modalités
          d’inscription et les périodes de sessions seront communiquées par les services
          concernés.
        </p>
      </div>
      <div data-render="formations-niveau" data-niveau="continue"></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="media-panel">
            <img src="../images/ubd-groupe-large.jpg" alt="Étudiants réunis lors d’une activité universitaire" loading="lazy" width="1600" height="1067">
            <div class="media-panel__overlay">
              <h3 class="media-panel__title">Une formation, un projet professionnel</h3>
              <p class="media-panel__text">
                Chaque cursus associe enseignements, travaux pratiques, stage et projet
                professionnel pour relier la théorie à l’exercice du métier.
              </p>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">Progression</span>
          <h2 class="section-title title-serif">Trois années qui construisent un profil complet</h2>
          <p class="text-soft">
            Les licences construisent les bases, les masters approfondissent la
            spécialisation et les formations professionnelles privilégient l’employeur
            et le geste technique.
          </p>
          <div class="check-list mt-5">
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-book"></use></svg></div>
              <div><div class="list-item__title">Enseignements fondamentaux</div>
              <div class="list-item__text">Théorie, méthodologie et culture générale professionnelle.</div></div>
            </div>
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-flask"></use></svg></div>
              <div><div class="list-item__title">Travaux pratiques</div>
              <div class="list-item__text">Mise en situation, manipulation et résolution de cas professionnels.</div></div>
            </div>
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-briefcase"></use></svg></div>
              <div><div class="list-item__title">Stages encadrés</div>
              <div class="list-item__text">Immersion en entreprise ou en organisation, avec suivi pédagogique.</div></div>
            </div>
          </div>
          <div class="btn-row mt-6">
            <a class="btn btn--primary" href="admissions.html">
              Comment candidater
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/admissions.html",
  "ubd",
  "Admission",
  "Conditions, dossier de candidature, calendrier et questions fréquentes pour l’admission à l’Université Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-hero.jpg" alt="" width="1600" height="1000"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Admission</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Votre admission</h1>
      <p class="page-hero__lead">
        Toutes les informations utiles pour préparer votre candidature : conditions,
        pièces à fournir, étapes, calendrier et frais de scolarité.
      </p>
      <div class="page-hero__actions">
        <a class="btn btn--accent" href="#dossier">Constituer mon dossier</a>
        <a class="btn btn--outline-light" href="#faq">Questions fréquentes</a>
      </div>
    </div>
  </section>

  <section class="section section--tight" id="conditions">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Étape 1</span>
        <h2 class="section-title title-serif">Conditions d’admission</h2>
        <p class="section-lead">
          L’admission repose sur la titularité du baccalauréat, la complétude du dossier
          et l’appréciation du projet professionnel du candidat.
        </p>
      </div>
      <div class="grid grid--auto" data-render="admissions-conditions" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section section--alt" id="niveaux">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Niveaux proposés</span>
        <h2 class="section-title title-serif">Licence, Master, formation professionnelle</h2>
        <p class="section-lead">
          Quel que soit votre niveau actuel, une formation adaptée existe. Choisissez le
          cycle correspondant à votre parcours.
        </p>
      </div>
      <div class="grid grid--3" data-reveal>
        <article class="feature-box">
          <div class="feature-box__num">01</div>
          <h3 class="feature-box__title">Licence</h3>
          <p class="feature-box__text">Trois ans pour acquérir les fondements académiques d’une discipline et ouvrir sur le domaine professionnel.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">02</div>
          <h3 class="feature-box__title">Master</h3>
          <p class="feature-box__text">Deux ans de spécialisation, de méthodologie de la recherche et de mémoire de fin d’études.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">03</div>
          <h3 class="feature-box__title">Formation professionnelle</h3>
          <p class="feature-box__text">Programmes directement professionnels, fortement orientés vers l’exercice en entreprise.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="dossier">
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <span class="eyebrow">Étape 2</span>
        <h2 class="section-title title-serif">Votre dossier de candidature</h2>
        <p class="section-lead">
          Un dossier complet et déposé dans les délais est la condition première de
          l’instruction de votre candidature.
        </p>
      </div>
      <div data-render="admissions-pieces"></div>
    </div>
  </section>

  <section class="section section--alt" id="etapes">
    <div class="container container--narrow">
      <div class="section-head">
        <span class="eyebrow">Étape 3</span>
        <h2 class="section-title title-serif">Les étapes de votre candidature</h2>
        <p class="section-lead">
          De la première prise de contact à l’inscription effective, le parcours est
          balisé et accompagné par le service d’orientation.
        </p>
      </div>
      <div data-render="admissions-etapes"></div>
    </div>
  </section>

  <section class="section" id="calendrier">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Calendrier</span>
          <h2 class="section-title title-serif">Les dates clés de l’année</h2>
          <p class="section-lead">
            Les périodes d’inscription et de rentrée sont publiées par les services
            académiques. Les dates non encore arrêtées sont signalées comme à confirmer.
          </p>
        </div>
        <span class="badge badge--warn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
          Calendrier en consolidation
        </span>
      </div>
      <div data-render="admissions-calendrier"></div>
    </div>
  </section>

  <section class="section section--alt-2" id="frais">
    <div class="container container--narrow">
      <div class="section-head">
        <span class="eyebrow">Frais de scolarité</span>
        <h2 class="section-title title-serif">Une information transparente</h2>
      </div>
      <div data-render="admissions-frais"></div>
    </div>
  </section>

  <section class="section" id="faq">
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Questions fréquentes</span>
        <h2 class="section-title title-serif">Les réponses que vous cherchez</h2>
        <p class="section-lead">
          Si votre question n’y figure pas, le service d’orientation reste votre
          interlocuteur direct.
        </p>
      </div>
      <div data-render="faq" data-set="ubd"></div>
      <div class="mt-6" data-reveal>
        <div class="notice notice--info">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"></use></svg>
          <span>
            Aucune candidature n’est envoyée depuis ce site. La soumission des dossiers
            s’effectue auprès du secrétariat général académique, selon les modalités
            communiquées par les services.
          </span>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/actualites.html",
  "ubd",
  "Actualités",
  "Dernières actualités, communiqués et événements de l’Université Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-campus-detail.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Actualités</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Actualités</h1>
      <p class="page-hero__lead">
        Communiqués, événements, informations et temps forts de la communauté
        universitaire.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Toutes les publications</span>
          <h2 class="section-title title-serif">La vie de l’université</h2>
          <p class="section-lead">
            Sélectionnez une catégorie pour retrouver rapidement l’information qui vous
            intéresse.
          </p>
        </div>
      </div>
      <div data-render="actualites-grid"></div>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="cta-band cta-band--center">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Restez informé des prochains rendez-vous</h2>
          <p class="cta-band__text">
            Les inscriptions à la newsletter seront ouvertes prochainement. Vous pouvez
            d’ores et déjà consulter le calendrier des événements.
          </p>
          <div class="btn-row btn-row--center">
            <a class="btn btn--accent" href="vie-universitaire.html">Vie universitaire</a>
            <a class="btn btn--outline-light" href="contact.html">Nous contacter</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/actualite-detail.html",
  "ubd",
  "Actualité",
  "Détail d’une actualité de l’Université Bagnélé Diarra.",
  `
  <article>
    <header class="page-hero page-hero--compact" data-render="actualite-detail-head">
      <div class="page-hero__bg"><img data-dt="image" src="../images/ubd-hero.jpg" alt="" width="1600" height="1000"></div>
      <div class="container page-hero__inner">
        <nav aria-label="Fil d’Ariane">
          <ol class="breadcrumb">
            <li><a href="../index.html">Accueil</a></li>
            <li class="breadcrumb__sep" aria-hidden="true">/</li>
            <li><a href="actualites.html">Actualités</a></li>
            <li class="breadcrumb__sep" aria-hidden="true">/</li>
            <li aria-current="page" data-dt="titre">Actualité</li>
          </ol>
        </nav>
        <h1 class="page-hero__title title-serif" data-dt="titre">Actualité</h1>
        <p class="page-hero__lead" data-dt="chapo"></p>
        <div class="chip-row mt-4">
          <span class="chip chip--active" data-dt="categorie"></span>
          <span class="chip" data-dt="date"></span>
        </div>
      </div>
    </header>

    <div class="section">
      <div class="container container--narrow">
        <div data-render="actualite-detail-body"></div>
        <div class="share mt-6">
          <span class="share__label">Partager</span>
          <button class="share__btn" type="button" data-share="copier" aria-label="Copier le lien de l’article">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-file"></use></svg>
          </button>
          <a class="share__btn" data-share="facebook" href="#" aria-label="Partager sur Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-facebook"></use></svg>
          </a>
          <a class="share__btn" data-share="linkedin" href="#" aria-label="Partager sur LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-linkedin"></use></svg>
          </a>
          <a class="share__btn" data-share="x" href="#" aria-label="Partager sur X">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-x"></use></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="section section--tight section--alt">
      <div class="container">
        <div data-render="actualite-detail-nav"></div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-head section-head--split">
          <div>
            <span class="eyebrow">À lire également</span>
            <h2 class="section-title title-serif">D’autres actualités</h2>
          </div>
          <a class="btn btn--outline" href="actualites.html">
            Toutes les actualités
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
          </a>
        </div>
        <div data-render="actualite-detail-related"></div>
      </div>
    </section>
  </article>
`,
  "actualites.html"
);

buildPage(
  "pages/formation-detail.html",
  "ubd",
  "Formation",
  "Détail d’une formation de l’Université Bagnélé Diarra : objectifs, programme et débouchés.",
  `
  <article>
    <header class="page-hero page-hero--compact" data-render="formation-detail-head">
      <div class="page-hero__bg"><img data-dt="image" src="../images/ubd-groupe.jpg" alt="" width="1600" height="1067"></div>
      <div class="container page-hero__inner">
        <nav aria-label="Fil d’Ariane">
          <ol class="breadcrumb">
            <li><a href="../index.html">Accueil</a></li>
            <li class="breadcrumb__sep" aria-hidden="true">/</li>
            <li><a href="formations.html">Formations</a></li>
            <li class="breadcrumb__sep" aria-hidden="true">/</li>
            <li aria-current="page" data-dt="titre">Formation</li>
          </ol>
        </nav>
        <h1 class="page-hero__title title-serif" data-dt="titre">Formation</h1>
        <p class="page-hero__lead" data-dt="resume"></p>
        <div class="chip-row mt-4">
          <span class="chip chip--active" data-dt="niveau"></span>
          <span class="chip" data-dt="duree"></span>
          <span class="chip" data-dt="departement"></span>
        </div>
      </div>
    </header>

    <div class="section">
      <div class="container">
        <div class="split">
          <div class="split__body" data-render="formation-detail-body"></div>
          <div class="split__media">
            <div class="sticky-aside" data-render="formation-detail-side"></div>
          </div>
        </div>
      </div>
    </div>

    <section class="section section--tight section--alt">
      <div class="container">
        <div class="section-head section-head--split">
          <div>
            <span class="eyebrow">Poursuivre</span>
            <h2 class="section-title title-serif">D’autres formations à découvrir</h2>
          </div>
          <a class="btn btn--outline" href="formations.html">
            Tout le catalogue
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
          </a>
        </div>
        <div data-render="formations-condensees"></div>
      </div>
    </section>
  </article>
`,
  "formations.html"
);

buildPage(
  "pages/vie-universitaire.html",
  "ubd",
  "Vie universitaire",
  "Activités, association, sport et culture au campus de l’Université Bagnélé Diarra.",
  `
  <section class="page-hero">
    <div class="page-hero__bg"><img src="../images/ubd-groupe-large.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Vie universitaire</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Vie universitaire</h1>
      <p class="page-hero__lead">
        Au-delà des cours, le campus est un lieu d’engagement, de culture et
        d’initiative où les étudiants se côtoient.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="frame frame--accent">
            <div class="frame__img">
              <img src="../images/ubd-groupe-portrait.jpg" alt="Étudiants de l’université réunis sur le campus" loading="lazy" width="1600" height="1067">
            </div>
            <div class="frame__badge frame__badge--br">
              <span class="icon-badge icon-badge--soft">
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-users"></use></svg>
              </span>
              <div>
                <div class="frame__badge-value">Une communauté</div>
                <div class="frame__badge-label">Association, sport, culture et entrepreneuriat</div>
              </div>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">Au quotidien</span>
          <h2 class="section-title title-serif">Un campus où l’on apprend aussi hors des murs</h2>
          <p class="lead">
            La vie universitaire structure le temps des étudiants : travail personnel,
            vie collective, projets associatifs et ouvertures professionnelles.
          </p>
          <p class="text-soft">
            L’université encourage les initiatives qui prolongent la formation :
            clubs scientifiques, actions associatives, campagnes de santé, événements
            culturels et rencontres avec le monde professionnel.
          </p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="actualites.html">
              Les actualités du campus
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="link-arrow" href="contact.html">
              Nous contacter
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Pôles d’activité</span>
        <h2 class="section-title title-serif">Se rencontrer, s’engager, entreprendre</h2>
        <p class="section-lead">
          Quatre domaines d’engagement structurent la vie du campus.
        </p>
      </div>
      <div class="grid grid--4" data-reveal>
        <article class="feature-box">
          <div class="feature-box__num">01</div>
          <h3 class="feature-box__title">Association</h3>
          <p class="feature-box__text">Regrouper les étudiants par filière et porter des initiatives collectives.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">02</div>
          <h3 class="feature-box__title">Sport</h3>
          <p class="feature-box__text">Pratiquer une activité physique et participer aux compétitions internes.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">03</div>
          <h3 class="feature-box__title">Culture</h3>
          <p class="feature-box__text">Ateliers, conférences, lectures et échanges autour des savoirs.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">04</div>
          <h3 class="feature-box__title">Entrepreneuriat</h3>
          <p class="feature-box__text">Structurer un projet, le présenter et préparer son insertion professionnelle.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--tight section--alt-2">
    <div class="container">
      <div class="stat-row" data-render="chiffres"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Services</span>
          <h2 class="section-title title-serif">Se renseigner sur le campus</h2>
          <p class="section-lead">
            Scolarité, orientation, bibliothèque et services administratifs : voici les
            interlocuteurs à privilégier.
          </p>
        </div>
        <a class="btn btn--outline" href="contact.html">
          Nous contacter
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--auto" data-render="services-ubd" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Agenda</span>
        <h2 class="section-title title-serif">Les prochains rendez-vous</h2>
      </div>
      <div class="timeline" data-render="evenements" data-limit="6"></div>
    </div>
  </section>
`
);

buildPage(
  "pages/documents.html",
  "ubd",
  "Documents",
  "Documents officiels, règlements et ressources utiles de l’Université Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-campus-detail.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Documents</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Documents officiels</h1>
      <p class="page-hero__lead">
        Règlement intérieur, guides d’inscription et ressources de formation. Les
        documents sont publiés au fur et à mesure de leur validation par les instances.
      </p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="notice notice--info" data-reveal>
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"></use></svg>
        <span>
          <strong>Aucune archive n’est encore disponible en ligne.</strong> Les documents
          ci-dessous sont identifiés et seront ajoutés dès leur validation. Pour toute
          demande, adressez-vous au secrétariat général académique.
        </span>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Cadre institutionnel</span>
        <h2 class="section-title title-serif">Documents de référence</h2>
      </div>
      <div class="grid grid--auto" data-reveal>
        <article class="doc-card">
          <div class="doc-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-fileText"></use></svg></div>
          <div class="doc-card__body">
            <h3 class="doc-card__title">Statuts de l’université</h3>
            <p class="doc-card__meta">Organisation et missions de l’établissement</p>
          </div>
          <div class="doc-card__action">
            <span class="badge badge--warn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
              En validation
            </span>
          </div>
        </article>
        <article class="doc-card">
          <div class="doc-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-fileText"></use></svg></div>
          <div class="doc-card__body">
            <h3 class="doc-card__title">Règlement intérieur</h3>
            <p class="doc-card__meta">Règles de fonctionnement et discipline</p>
          </div>
          <div class="doc-card__action">
            <span class="badge badge--warn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
              En validation
            </span>
          </div>
        </article>
        <article class="doc-card">
          <div class="doc-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-fileText"></use></svg></div>
          <div class="doc-card__body">
            <h3 class="doc-card__title">Guide de la procédure d’admission</h3>
            <p class="doc-card__meta">Pièces à fournir et étapes d’inscription</p>
          </div>
          <div class="doc-card__action">
            <span class="badge badge--warn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
              En validation
            </span>
          </div>
        </article>
        <article class="doc-card">
          <div class="doc-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-fileText"></use></svg></div>
          <div class="doc-card__body">
            <h3 class="doc-card__title">Guide d’usage de la bibliothèque</h3>
            <p class="doc-card__meta">Règles de prêt et ressources consultables</p>
          </div>
          <div class="doc-card__action">
            <span class="badge badge--warn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
              En validation
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Ressources</span>
        <h2 class="section-title title-serif">Infrastructures et services</h2>
        <p class="section-lead">
          Les équipements et services disponibles sur le campus, présentés dans le détail
          de notre projet institutionnel.
        </p>
      </div>
      <div class="grid grid--3" data-render="infrastructures" data-auto-reveal="3"></div>
      <div class="btn-row mt-6">
        <a class="btn btn--outline" href="universite.html#infrastructures">
          Voir le projet de l’université
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Besoin d’un document précis ?</h2>
          <p class="cta-band__text">
            Les coordonnées de contact sont en cours de consolidation. En attendant,
            utilisez le formulaire de contact pour préciser votre demande.
          </p>
          <div class="btn-row">
            <a class="btn btn--accent" href="contact.html">Nous écrire</a>
            <a class="btn btn--outline-light" href="admissions.html">Admission</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/contact.html",
  "ubd",
  "Contact",
  "Contactez l’Université Bagnélé Diarra à Bamako : formulaire, services et informations pratiques.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-hero.jpg" alt="" width="1600" height="1000"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Contact</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Nous contacter</h1>
      <p class="page-hero__lead">
        Une question sur une formation, une candidature ou la vie de l’université ?
        Utilisez le formulaire ci-dessous ou adressez-vous directement au service
        concerné.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Coordonnées</span>
        <h2 class="section-title title-serif">Joindre l’université</h2>
        <p class="section-lead">
          Certaines informations ne sont pas encore stabilisées. Elles sont signalées
          comme « en cours de consolidation » plutôt que d’être approximatives.
        </p>
      </div>
      <div class="contact-list" data-render="site-contact"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="contact-layout">
        <div class="contact-layout__main">
          <span class="eyebrow">Formulaire</span>
          <h2 class="section-title title-serif">Écrivez-nous</h2>
          <p class="text-soft">
            Décrivez votre demande : votre message nous permet de vous orienter vers le bon service.
          </p>
          <form class="form form--contact mt-6" data-validate novalidate>
            <div class="form-row">
              <div class="field">
                <label class="field__label" for="c-nom">Nom et prénom <span class="field__required" aria-hidden="true">*</span></label>
                <input class="field__control" type="text" id="c-nom" name="nom" required autocomplete="name">
                <span class="field__error" data-error></span>
              </div>
              <div class="field">
                <label class="field__label" for="c-email">Adresse électronique <span class="field__required" aria-hidden="true">*</span></label>
                <input class="field__control" type="email" id="c-email" name="email" required autocomplete="email">
                <span class="field__error" data-error></span>
              </div>
            </div>
            <div class="form-row">
              <div class="field">
                <label class="field__label" for="c-tel">Téléphone</label>
                <input class="field__control" type="tel" id="c-tel" name="telephone" autocomplete="tel">
                <span class="field__hint">Facultatif</span>
              </div>
              <div class="field">
                <label class="field__label" for="c-sujet">Objet de la demande <span class="field__required" aria-hidden="true">*</span></label>
                <select class="field__control" id="c-sujet" name="sujet" required>
                  <option value="">Sélectionnez un objet</option>
                  <option value="admission">Admission et inscription</option>
                  <option value="formation">Information sur une formation</option>
                  <option value="documents">Demande de document</option>
                  <option value="partenariat">Partenariat et coopération</option>
                  <option value="autre">Autre demande</option>
                </select>
                <span class="field__error" data-error></span>
              </div>
            </div>
            <div class="field">
              <label class="field__label" for="c-message">Message <span class="field__required" aria-hidden="true">*</span></label>
              <textarea class="field__control" id="c-message" name="message" rows="6" required></textarea>
              <span class="field__error" data-error></span>
            </div>
            <div class="field field--full">
              <label class="checkbox">
                <input type="checkbox" name="consentement" required>
                <span>J’accepte que ces informations soient utilisées pour traiter ma demande.</span>
              </label>
              <span class="field__error" data-error></span>
            </div>
            <div class="field field--full">
              <div class="form-status" data-form-status role="status" aria-live="polite"></div>
              <div class="form-actions">
                <button class="btn btn--accent btn--lg" type="submit">
                  Envoyer la demande
                  <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-send"></use></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        <aside class="contact-layout__aside sticky-aside">
          <div class="place-card">
            <div class="place-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mapPin"></use></svg></div>
            <h3 class="place-card__title">Bamako, Mali</h3>
            <p class="place-card__text">
              L’Université Bagnélé Diarra est implantée à Bamako. L’adresse précise et
              l’itinéraire d’accès sont en cours de consolidation et seront publiés
              dès validation.
            </p>
          </div>
          <div class="notice notice--info">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"></use></svg>
            <span>
              <strong>Le formulaire reste le canal le plus direct.</strong>
              Les coordonnées téléphoniques et électroniques étant en cours de
              consolidation, chaque demande est orientée vers le service concerné.
            </span>
          </div>
          <div class="btn-row">
            <a class="btn btn--outline" href="admissions.html">
              Admission et candidature
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Réseaux</span>
        <h2 class="section-title title-serif">Suivre l’université</h2>
      </div>
      <div data-render="site-reseaux"></div>
    </div>
  </section>
`
);

console.log("Pages UBD generees.");
