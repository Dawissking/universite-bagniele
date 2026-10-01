const { buildPage } = require("./layout.js");

/* ============================ PESUP-SANTÉ ============================ */

buildPage(
  "pages/pesup-sante.html",
  "pesup",
  "Accueil",
  "Pôle d’enseignement supérieur dédié aux métiers de la santé à Bamako : formations, services et vie de l’école.",
  `
  <section class="hero">
    <div class="hero__bg">
      <img src="../images/pesup-hero.jpg" alt="Étudiants de la PESUP-Santé Bagnélé Diarra" fetchpriority="high" width="1600" height="1000">
    </div>
    <div class="container hero__inner">
      <div class="hero__content">
        <span class="hero__badge">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-stethoscope"></use></svg>
          Pôle d’enseignement supérieur en santé — Bamako, Mali
        </span>
        <h1 class="hero__title title-serif">
          Former des soignants <em>compétents</em> et engagés
        </h1>
        <p class="hero__lead">
          La PESUP-Santé Bagnélé Diarra est le pôle dédié aux métiers de la santé de
          notre université. Elle forme des professionnels infirmiers, refocusés sur la
          qualité des soins, la sécurité du patient et l’éthique professionnelle.
        </p>
        <div class="hero__actions">
          <a class="btn btn--accent btn--lg" href="pesup-formations.html">
            Découvrir les formations
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
          </a>
          <a class="btn btn--outline-light btn--lg" href="pesup-admission.html">Candidater</a>
        </div>
        <div class="hero__meta">
          <div class="hero__meta-item">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-layers"></use></svg>
            <div>
              <div class="hero__meta-value">4 formations</div>
              <div class="hero__meta-label">Licences de sciences de la santé</div>
            </div>
          </div>
          <div class="hero__meta-item">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-flask"></use></svg>
            <div>
              <div class="hero__meta-value">Enseignements pratiques</div>
              <div class="hero__meta-label">Travaux pratiques et stages encadrés</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="stat-row" data-render="pesup-chiffres"></div>
      <p class="text-center text-muted mt-4 text-xs">
        Certains indicateurs sont encore en cours de consolidation par les services de
        l’école.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="frame frame--accent-alt">
            <div class="frame__img">
              <img src="../images/pesup-etudiant.jpg" alt="Étudiant en formation de santé à la PESUP-Santé" loading="lazy" width="1600" height="1067">
            </div>
            <div class="frame__badge frame__badge--br">
              <span class="icon-badge icon-badge--soft icon-badge--health">
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-heart"></use></svg>
              </span>
              <div>
                <div class="frame__badge-value">Qualité des soins</div>
                <div class="frame__badge-label">Compétence, sécurité et éthique professionnelle</div>
              </div>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">PESUP-Santé Bagnélé Diarra</span>
          <h2 class="section-title title-serif">Une école de santé adossée à notre université</h2>
          <p class="lead">
            La PESUP-Santé réunit des enseignements de sciences infirmières et des
            métiers de la santé dans une structure dédiée à la formation professionnelle
            de soignants.
          </p>
          <p class="text-soft">
            Notre projet associe rigueur scientifique, gesture technique maîtrisé et
            accompagnement humain. Les étudiants y apprennent à raisonner cliniquement,
            à travailler en équipe et à tenir la distance professionnelle dans la
            relation de soin.
          </p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="pesup-presentation.html">
              Notre présentation
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="link-arrow" href="pesup-vie-ecole.html">
              La vie à l’école
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Nos formations</span>
          <h2 class="section-title title-serif">Des filières de santé complètes</h2>
          <p class="section-lead">
            Quatre formations en sciences de la santé, orientées vers l’exercice
            hospitalier et communautaire.
          </p>
        </div>
        <a class="btn btn--outline" href="pesup-formations.html">
          Voir toutes les formations
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--auto-lg" data-render="pesup-formations" data-limit="4"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Pédagogie</span>
        <h2 class="section-title title-serif">Le quotidien d’un étudiant en santé</h2>
        <p class="section-lead">
          Ateliers, travaux pratiques et évaluations structurent une semaine de
          formation intense et rythmée.
        </p>
      </div>
      <div class="grid grid--2" data-render="pesup-activites" data-auto-reveal="2"></div>
    </div>
  </section>

  <section class="section section--deep section--pattern-ink">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow eyebrow--light">Services aux étudiants</span>
          <h2 class="section-title title-serif">Un accompagnement complet</h2>
          <p class="section-lead">
            Scolarité, bibliothèque, laboratoires et services d’orientation : voici les
            ressources disponibles pendant votre cursus.
          </p>
        </div>
        <a class="btn btn--outline-light" href="pesup-presentation.html#services">
          Voir les services
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--4" data-render="pesup-services" data-auto-reveal="4"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Agenda</span>
          <h2 class="section-title title-serif">Les prochains rendez-vous</h2>
          <p class="section-lead">
            Journées de santé, campagnes de dépistage et activités pédagogiques : le
            calendrier de l’école.
          </p>
        </div>
        <a class="btn btn--outline" href="pesup-evenements.html">
          Tous les événements
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--2" data-render="pesup-evenements" data-auto-reveal="2"></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Rejoindre la PESUP-Santé</h2>
          <p class="cta-band__text">
            Consultez les conditions d’admission, les pièces à fournir et le calendrier
            de la prochaine rentrée.
          </p>
          <div class="btn-row">
            <a class="btn btn--accent" href="pesup-admission.html">
              Processus d’admission
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="btn btn--outline-light" href="pesup-contact.html">Nous contacter</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/pesup-presentation.html",
  "pesup",
  "Présentation",
  "Identité, mission, organisation et services de la PESUP-Santé Bagnélé Diarra.",
  `
  <section class="page-hero">
    <div class="page-hero__bg"><img src="../images/pesup-hero-alt.jpg" alt="" width="1600" height="1000"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-sante.html">PESUP-Santé</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Présentation</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">La PESUP-Santé</h1>
      <p class="page-hero__lead">
        Pôle d’enseignement supérieur dédié aux métiers de la santé, la PESUP-Santé
        forme des professionnels soignants responsables et compétents.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__body">
          <span class="eyebrow">Notre mission</span>
          <h2 class="section-title title-serif">Former des soignants prêts à exercer</h2>
          <p class="lead">
            La PESUP-Santé Bagnélé Diarra assure la formation des étudiants en sciences
            infirmières et dans les métiers de la santé, dans un cadre structuré par
            l’enseignement théorique, la pratique clinique et l’éthique.
          </p>
          <p class="text-soft">
            Notre projet est simple : donner à chaque étudiant les compétences
            techniques, le raisonnement clinique et l’attitude professionnelle
            nécessaires pour prendre soin en sécurité, dans le respect du patient et
            de l’équipe soignante.
          </p>
          <div class="meta-list mt-6" data-reveal>
            <div class="meta-list__row">
              <div class="meta-list__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-heart"></use></svg></div>
              <div><div class="meta-list__label">Engagement central</div>
              <div class="meta-list__value">Qualité des soins et sécurité du patient</div></div>
            </div>
            <div class="meta-list__row">
              <div class="meta-list__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-stethoscope"></use></svg></div>
              <div><div class="meta-list__label">Approche</div>
              <div class="meta-list__value">Théorie, travaux pratiques et stages encadrés</div></div>
            </div>
            <div class="meta-list__row">
              <div class="meta-list__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-scales"></use></svg></div>
              <div><div class="meta-list__label">Exigence</div>
              <div class="meta-list__value">Rigueur scientifique et éthique professionnelle</div></div>
            </div>
          </div>
        </div>
        <div class="split__media">
          <div class="frame frame--accent-alt">
            <div class="frame__img">
              <img src="../images/pesup-pratique.jpg" alt="Travaux pratiques à la PESUP-Santé" loading="lazy" width="1600" height="1067">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="stat-row" data-render="pesup-chiffres"></div>
    </div>
  </section>

  <section class="section" id="organisation">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Organisation</span>
        <h2 class="section-title title-serif">Encadrement et fonctionnement</h2>
        <p class="section-lead">
          La PESUP-Santé s’appuie sur une organisation pédagogique et administrative
          dédiée. La composition nominative des équipes sera publiée après
          consolidation.
        </p>
      </div>
      <div class="grid grid--3" data-reveal>
        <article class="place-card">
          <div class="place-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-users"></use></svg></div>
          <h3 class="place-card__title">Équipe pédagogique</h3>
          <p class="place-card__text">
            Enseignants, encadrants de travaux pratiques et consultants hospitaliers. L’identité nominative de l’équipe sera publiée après consolidation.
          </p>
        </article>
        <article class="place-card">
          <div class="place-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-cap"></use></svg></div>
          <h3 class="place-card__title">Équipe administrative</h3>
          <p class="place-card__text">
            Scolarité, dossiers étudiants, examens et organisation administrative de
            l’école.
          </p>
        </article>
        <article class="place-card">
          <div class="place-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-heart"></use></svg></div>
          <h3 class="place-card__title">Encadrement de stage</h3>
          <p class="place-card__text">
            Suivi des étudiants en milieu hospitalier et communautaire, en lien avec les
            structures d’accueil partenaires.
          </p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="services">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Services</span>
        <h2 class="section-title title-serif">Ressources et accompagnement</h2>
        <p class="section-lead">
          Quatre services principaux accompagnent les étudiants tout au long de leur
          cursus.
        </p>
      </div>
      <div class="grid grid--4" data-render="pesup-services" data-auto-reveal="4"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Formations</span>
          <h2 class="section-title title-serif">Nos filières de santé</h2>
          <p class="section-lead">
            Licences de sciences infirmières et de disciplines connexes, toutes orientées
            vers l’exercice en milieu de soins.
          </p>
        </div>
        <a class="btn btn--outline" href="pesup-formations.html">
          Voir les formations
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--auto-lg" data-render="pesup-formations" data-limit="4"></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band cta-band--center">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Une question sur l’école ?</h2>
          <p class="cta-band__text">
            Le service de scolarité de la PESUP-Santé vous accompagne dans vos
            démarches d’inscription et d’orientation.
          </p>
          <div class="btn-row btn-row--center">
            <a class="btn btn--accent" href="pesup-contact.html">Nous contacter</a>
            <a class="btn btn--outline-light" href="pesup-admission.html">Admission</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/pesup-formations.html",
  "pesup",
  "Formations",
  "Formations en sciences de la santé dispensées par la PESUP-Santé Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/pesup-hero.jpg" alt="" width="1600" height="1000"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-sante.html">PESUP-Santé</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Formations</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Formations en santé</h1>
      <p class="page-hero__lead">
        Quatre licences en sciences de la santé : des cursus axés sur la pratique
        clinique, l’éthique et la qualité des soins.
      </p>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="stat-row" data-render="pesup-chiffres"></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Catalogue</span>
        <h2 class="section-title title-serif">Choisir sa filière de santé</h2>
        <p class="section-lead">
          Chaque formation associe enseignements théoriques, travaux pratiques,
          stages encadrés et projet professionnel.
        </p>
      </div>
      <div class="grid grid--auto-lg" data-render="pesup-formations" data-limit="4"></div>
    </div>
  </section>

  <section class="section">
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Programme</span>
        <h2 class="section-title title-serif">Objectifs et débouchés</h2>
        <p class="section-lead">
          Filière par filière, ce que la formation vous apprend et vers quels
          métiers elle vous conduit.
        </p>
      </div>
      <div data-render="pesup-formations-detail"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Pédagogie</span>
        <h2 class="section-title title-serif">Comment se déroule un cursus</h2>
        <p class="section-lead">
          Une progression en alternance de théorie, de pratique supervisée et de
          confrontation aux situations professionnelles.
        </p>
      </div>
      <div class="grid grid--4" data-reveal>
        <article class="step">
          <div class="step__num">1</div>
          <h3 class="step__title">Fondements</h3>
          <p class="step__text">Anatomie, physiologie, biologie et notions de santé publique.</p>
        </article>
        <article class="step">
          <div class="step__num">2</div>
          <h3 class="step__title">Raisonnement clinique</h3>
          <p class="step__text">Méthode de soin, diagnostic infirmier et hiérarchisation des priorités.</p>
        </article>
        <article class="step">
          <div class="step__num">3</div>
          <h3 class="step__title">Pratique encadrée</h3>
          <p class="step__text">Travaux pratiques en laboratoire et gestes soignants supervisés.</p>
        </article>
        <article class="step">
          <div class="step__num">4</div>
          <h3 class="step__title">Immersion professionnelle</h3>
          <p class="step__text">Stages en milieu hospitalier et communautaire, avec suivi.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="media-panel">
            <img src="../images/pesup-groupe.jpg" alt="Étudiants de la PESUP-Santé réunis" loading="lazy" width="1600" height="1067">
            <div class="media-panel__overlay">
              <h3 class="media-panel__title">Apprendre à prendre soin</h3>
              <p class="media-panel__text">
                La pratique s’apprend : gestes supervisés, situations simulées et
                confrontation progressive au réel.
              </p>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">Exigences</span>
          <h2 class="section-title title-serif">Un engagement sérieux et exigeant</h2>
          <p class="text-soft">
            Se former aux métiers de la santé suppose une présence régulière, une
            maîtrise progressive des gestes et une attention constante à la sécurité
            du patient. L’école accompagne chaque étudiant dans cette exigence.
          </p>
          <div class="check-list mt-5">
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-checkCircle"></use></svg></div>
              <div><div class="list-item__title">Assiduité</div>
              <div class="list-item__text">Participation régulière aux cours et aux travaux pratiques.</div></div>
            </div>
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-checkCircle"></use></svg></div>
              <div><div class="list-item__title">Hygiène et sécurité</div>
              <div class="list-item__text">Respect des protocoles d’hygiène et des règles de sécurité.</div></div>
            </div>
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-checkCircle"></use></svg></div>
              <div><div class="list-item__title">Éthique</div>
              <div class="list-item__text">Respect du secret professionnel et de la dignité du patient.</div></div>
            </div>
          </div>
          <div class="btn-row mt-6">
            <a class="btn btn--primary" href="pesup-admission.html">
              Les conditions d’admission
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band cta-band--center">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Une question sur une filière ?</h2>
          <p class="cta-band__text">
            Le service d’orientation de la PESUP-Santé vous accompagne dans le choix de
            votre formation.
          </p>
          <div class="btn-row btn-row--center">
            <a class="btn btn--accent" href="pesup-contact.html">Nous contacter</a>
            <a class="btn btn--outline-light" href="pesup-admission.html">Admission</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/pesup-admission.html",
  "pesup",
  "Admission",
  "Conditions, dossier, étapes et questions fréquentes pour l’admission à la PESUP-Santé.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/pesup-hero-alt.jpg" alt="" width="1600" height="1000"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-sante.html">PESUP-Santé</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Admission</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Votre admission à la PESUP-Santé</h1>
      <p class="page-hero__lead">
        Conditions d’accès, dossier de candidature et calendrier d’admission pour les
        formations en sciences de la santé.
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
          L’accès aux formations de santé repose sur des exigences claires,
          complétées par l’examen du dossier du candidat.
        </p>
      </div>
      <div class="grid grid--auto" data-render="pesup-admission-conditions" data-auto-reveal="3"></div>
    </div>
  </section>

  <section class="section section--alt" id="dossier">
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Étape 2</span>
        <h2 class="section-title title-serif">Les pièces à fournir</h2>
        <p class="section-lead">
          Un dossier complet est nécessaire pour l’instruction de votre candidature par
          le service de scolarité.
        </p>
      </div>
      <div data-render="pesup-admission-pieces"></div>
    </div>
  </section>

  <section class="section" id="etapes">
    <div class="container container--narrow">
      <div class="section-head">
        <span class="eyebrow">Étape 3</span>
        <h2 class="section-title title-serif">Les étapes de votre candidature</h2>
        <p class="section-lead">
          De la prise de contact à l’inscription effective, chaque étape est
          accompagnée par le service de scolarité.
        </p>
      </div>
      <div data-render="pesup-admission-etapes"></div>
    </div>
  </section>

  <section class="section section--alt-2" id="frais">
    <div class="container container--narrow">
      <div class="section-head">
        <span class="eyebrow">Frais de scolarité</span>
        <h2 class="section-title title-serif">Une information en cours de consolidation</h2>
      </div>
      <div class="notice notice--warn" data-reveal>
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
        <span>
          <strong>Frais de scolarité de la PESUP-Santé.</strong> Le montant et les
          modalités de paiement sont en cours de consolidation. Ils seront communiqués
          par le service de scolarité lors de la prochaine rentrée.
        </span>
      </div>
    </div>
  </section>

  <section class="section" id="faq">
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Questions fréquentes</span>
        <h2 class="section-title title-serif">Les réponses que vous cherchez</h2>
        <p class="section-lead">
          Pour toute question non couverte ici, le service de scolarité reste votre
          interlocuteur direct.
        </p>
      </div>
      <div data-render="faq" data-set="pesup"></div>
      <div class="mt-6" data-reveal>
        <div class="notice notice--info">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"></use></svg>
          <span>
            Aucune candidature n’est envoyée depuis ce site. Le dépôt des dossiers
            s’effectue auprès du service de scolarité de la PESUP-Santé.
          </span>
        </div>
      </div>
    </div>
  </section>
`
);

console.log("Pages PESUP 1/2 generees.");
