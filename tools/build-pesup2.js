const { buildPage } = require("./layout.js");

buildPage(
  "pages/pesup-vie-ecole.html",
  "pesup",
  "Vie à l’école",
  "Activités, événements et galerie de la PESUP-Santé Bagnélé Diarra.",
  `
  <section class="page-hero">
    <div class="page-hero__bg"><img src="../images/pesup-groupe.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-sante.html">PESUP-Santé</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Vie à l’école</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Vie à l’école</h1>
      <p class="page-hero__lead">
        Formations, activités pédagogiques, événements et moments partagés : la vie de
        la PESUP-Santé au quotidien.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="frame frame--accent-alt">
            <div class="frame__img">
              <img src="../images/pesup-etudiant-detail.jpg" alt="Étudiant de la PESUP-Santé en activité" loading="lazy" width="1600" height="1067">
            </div>
            <div class="frame__badge frame__badge--br">
              <span class="icon-badge icon-badge--soft icon-badge--health">
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-spark"></use></svg>
              </span>
              <div>
                <div class="frame__badge-value">Apprendre et agir</div>
                <div class="frame__badge-label">Des activités qui prolongent la formation</div>
              </div>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">Au quotidien</span>
          <h2 class="section-title title-serif">Une école qui vit et forme</h2>
          <p class="lead">
            La PESUP-Santé ne se limite pas aux cours : stages, ateliers, campagnes de
            santé et rencontres complètent le quotidien des étudiants.
          </p>
          <p class="text-soft">
            Ces activités prolongent les enseignements, renforcent le travail en équipe et
            confrontent les étudiants à des situations de soin réelles.
          </p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="pesup-activites.html">
              Voir les activités
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
            <a class="link-arrow" href="pesup-galerie.html">
              La galerie
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
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

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Activités</span>
        <h2 class="section-title title-serif">Quatre temps forts de l’école</h2>
        <p class="section-lead">
          L’année scolaire de la PESUP-Santé s’organise autour d’un socle pédagogique et
          d’activités qui prolongent la formation.
        </p>
      </div>
      <div class="grid grid--2" data-render="pesup-activites" data-auto-reveal="2"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Agenda</span>
          <h2 class="section-title title-serif">Les prochains rendez-vous</h2>
          <p class="section-lead">
            Journées de santé, ateliers et campagnes : le calendrier de la PESUP-Santé.
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

  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Galerie</span>
          <h2 class="section-title title-serif">Moments de la vie scolaire</h2>
          <p class="section-lead">
            Travaux pratiques, travaux de groupe et campagnes de santé photographiés
            par l’école.
          </p>
        </div>
        <a class="btn btn--outline" href="pesup-galerie.html">
          Ouvrir la galerie
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="gallery-grid gallery-grid--4" data-render="galerie-home" data-limit="8"></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band cta-band--center">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Rejoindre l’école</h2>
          <p class="cta-band__text">
            Les conditions d’admission et les pièces à fournir sont disponibles sur la
            page dédiée.
          </p>
          <div class="btn-row btn-row--center">
            <a class="btn btn--accent" href="pesup-admission.html">Processus d’admission</a>
            <a class="btn btn--outline-light" href="pesup-formations.html">Nos formations</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/pesup-activites.html",
  "pesup",
  "Activités",
  "Activités pédagogiques et associatives de la PESUP-Santé Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/pesup-pratique.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-sante.html">PESUP-Santé</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-vie-ecole.html">Vie à l’école</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Activités</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Activités</h1>
      <p class="page-hero__lead">
        Les activités qui structurent l’année scolaire et prolongent les enseignements
        des formations de santé.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Pédagogie et initiative</span>
        <h2 class="section-title title-serif">Ce qui anime l’école</h2>
        <p class="section-lead">
          Quatre domaines d’activité organisent le quotidien des étudiants de la
          PESUP-Santé.
        </p>
      </div>
      <div class="grid grid--2" data-render="pesup-activites" data-auto-reveal="2"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="split split--media-first">
        <div class="split__media">
          <div class="media-panel">
            <img src="../images/pesup-groupe-detail.jpg" alt="Groupe d’étudiants de la PESUP-Santé" loading="lazy" width="1600" height="1067">
            <div class="media-panel__overlay">
              <h3 class="media-panel__title">Apprendre ensemble</h3>
              <p class="media-panel__text">
                Les travaux de groupe et les ateliers développent la collaboration, la
                communication et la responsabilité.
              </p>
            </div>
          </div>
        </div>
        <div class="split__body">
          <span class="eyebrow">Pédagogie active</span>
          <h2 class="section-title title-serif">Des situations d’apprentissage concrètes</h2>
          <p class="text-soft">
            Les activités de la PESUP-Santé partent des situations de soin. Études de
            cas, simulations et travaux pratiques transforment les connaissances
            théoriques en réflexes professionnels.
          </p>
          <div class="check-list mt-5">
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-flask"></use></svg></div>
              <div><div class="list-item__title">Travaux pratiques</div>
              <div class="list-item__text">Manipulation, gestes soignants et matériel sous supervision.</div></div>
            </div>
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-users"></use></svg></div>
              <div><div class="list-item__title">Travaux de groupe</div>
              <div class="list-item__text">Études de cas et échanges d’analyses cliniques.</div></div>
            </div>
            <div class="list-item">
              <div class="list-item__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-megaphone"></use></svg></div>
              <div><div class="list-item__title">Actions de terrain</div>
              <div class="list-item__text">Campagnes de santé et interventions de sensibilisation.</div></div>
            </div>
          </div>
          <div class="btn-row mt-6">
            <a class="btn btn--primary" href="pesup-evenements.html">
              Voir les événements
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--deep section--pattern-ink">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow eyebrow--light">Services</span>
          <h2 class="section-title title-serif">Un accompagnement pendant toute l’année</h2>
          <p class="section-lead">
            Les services de la PESUP-Santé accompagnent les étudiants de la rentrée aux
            examens.
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

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band cta-band--center">
        <div class="cta-band__inner cta-band__content">
          <h2 class="cta-band__title">Participer aux activités</h2>
          <p class="cta-band__text">
            Les modalités d’inscription aux activités seront communiquées par le
            service de scolarité de l’école.
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
  "pages/pesup-evenements.html",
  "pesup",
  "Événements",
  "Agenda des événements de la PESUP-Santé Bagnélé Diarra.",
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
          <li><a href="pesup-vie-ecole.html">Vie à l’école</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Événements</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Événements</h1>
      <p class="page-hero__lead">
        Journées de santé, ateliers pédagogiques et campagnes de sensibilisation
        ouvertes aux étudiants de la PESUP-Santé.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Agenda de l’école</span>
          <h2 class="section-title title-serif">Les prochains rendez-vous</h2>
          <p class="section-lead">
            Les dates définitives seront communiquées par les services de la PESUP-Santé.
          </p>
        </div>
        <span class="badge badge--warn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-clock"></use></svg>
          Dates à confirmer
        </span>
      </div>
      <div class="grid grid--2" data-render="pesup-evenements" data-auto-reveal="2"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Contexte</span>
        <h2 class="section-title title-serif">Pourquoi ces rendez-vous comptent</h2>
        <p class="section-lead">
          Les événements de la PESUP-Santé prolongent la formation : ils confrontent les
          étudiants à des situations de santé publique et à la diversité des parcours
          de soin.
        </p>
      </div>
      <div class="grid grid--3" data-reveal>
        <article class="feature-box">
          <div class="feature-box__num">01</div>
          <h3 class="feature-box__title">Se former en situation</h3>
          <p class="feature-box__text">Ateliers, simulations et interventions sur le terrain.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">02</div>
          <h3 class="feature-box__title">Servir la communauté</h3>
          <p class="feature-box__text">Campagnes de sensibilisation et actions de prévention.</p>
        </article>
        <article class="feature-box">
          <div class="feature-box__num">03</div>
          <h3 class="feature-box__title">Rencontrer des partenaires</h3>
          <p class="feature-box__text">Échanges avec les structures de santé de la région.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="eyebrow">Activités</span>
          <h2 class="section-title title-serif">Le programme de l’école</h2>
          <p class="section-lead">
            Les activités pédagogiques et associatives tout au long de l’année.
          </p>
        </div>
        <a class="btn btn--outline" href="pesup-activites.html">
          Toutes les activités
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
      <div class="grid grid--2" data-render="pesup-activites" data-auto-reveal="2"></div>
    </div>
  </section>
`
);

buildPage(
  "pages/pesup-galerie.html",
  "pesup",
  "Galerie",
  "Galerie photo de la PESUP-Santé Bagnélé Diarra : travaux pratiques, campagnes et vie scolaire.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/pesup-groupe.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-sante.html">PESUP-Santé</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li><a href="pesup-vie-ecole.html">Vie à l’école</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Galerie</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Galerie</h1>
      <p class="page-hero__lead">
        Travaux pratiques, campagnes de santé et moments partagés : les images de la
        vie de la PESUP-Santé.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Collection</span>
        <h2 class="section-title title-serif">Nos images</h2>
        <p class="section-lead">
          Filtrez par thème pour retrouver les moments qui vous intéressent. Cliquez sur
          une image pour l’agrandir.
        </p>
      </div>
      <div data-render="galerie"></div>
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      <div class="notice notice--info" data-reveal>
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-camera"></use></svg>
        <span>
          Cette galerie présente des photographies réalisées par l’école lors de ses
          activités. Elle s’étoffera au fil des années scolaires.
        </span>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/pesup-contact.html",
  "pesup",
  "Contact",
  "Contactez la PESUP-Santé Bagnélé Diarra : formulaire, coordonnées et services.",
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
          <li aria-current="page">Contact</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Nous contacter</h1>
      <p class="page-hero__lead">
        Une question sur les formations de santé, l’admission ou la vie de l’école ?
        Adressez-vous au service concerné.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Coordonnées</span>
        <h2 class="section-title title-serif">Joindre la PESUP-Santé</h2>
        <p class="section-lead">
          Les coordonnées de l’école sont rattachées à celles de l’Université Bagnélé
          Diarra. Certaines informations restent en cours de consolidation.
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
          <h2 class="section-title title-serif">Écrivez à l’école</h2>
          <p class="text-soft">
            Précisez l’objet de votre demande : le service de scolarité vous orientera
            vers le bon interlocuteur.
          </p>
          <form class="form form--contact mt-6" data-validate novalidate>
            <div class="form-row">
              <div class="field">
                <label class="field__label" for="p-nom">Nom et prénom <span class="field__required" aria-hidden="true">*</span></label>
                <input class="field__control" type="text" id="p-nom" name="nom" required autocomplete="name">
                <span class="field__error" data-error></span>
              </div>
              <div class="field">
                <label class="field__label" for="p-email">Adresse électronique <span class="field__required" aria-hidden="true">*</span></label>
                <input class="field__control" type="email" id="p-email" name="email" required autocomplete="email">
                <span class="field__error" data-error></span>
              </div>
            </div>
            <div class="form-row">
              <div class="field">
                <label class="field__label" for="p-tel">Téléphone</label>
                <input class="field__control" type="tel" id="p-tel" name="telephone" autocomplete="tel">
                <span class="field__hint">Facultatif</span>
              </div>
              <div class="field">
                <label class="field__label" for="p-sujet">Objet de la demande <span class="field__required" aria-hidden="true">*</span></label>
                <select class="field__control" id="p-sujet" name="sujet" required>
                  <option value="">Sélectionnez un objet</option>
                  <option value="admission">Admission en sciences de la santé</option>
                  <option value="formation">Information sur une formation</option>
                  <option value="scolarite">Dossier de scolarité</option>
                  <option value="stage">Stages et terrain</option>
                  <option value="partenariat">Partenariat et coopération</option>
                  <option value="autre">Autre demande</option>
                </select>
                <span class="field__error" data-error></span>
              </div>
            </div>
            <div class="field">
              <label class="field__label" for="p-message">Message <span class="field__required" aria-hidden="true">*</span></label>
              <textarea class="field__control" id="p-message" name="message" rows="6" required></textarea>
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
              La PESUP-Santé Bagnélé Diarra est le pôle santé de l’Université Bagnélé
              Diarra, à Bamako. L’adresse précise sera publiée après consolidation.
            </p>
          </div>
          <div class="notice notice--info">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"></use></svg>
            <span>
              <strong>Un seul formulaire, un interlocuteur identifié.</strong>
              Le service de scolarité reçoit votre demande et la transmet au service
              compétent, tant que les coordonnées directes ne sont pas consolidées.
            </span>
          </div>
          <div class="btn-row">
            <a class="btn btn--outline" href="pesup-admission.html">
              Admission et candidature
              <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
            </a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section section--tight section--alt-2">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow eyebrow--center">Services</span>
        <h2 class="section-title title-serif">À qui s’adresser</h2>
        <p class="section-lead">
          Les services de l’école vous orientent selon la nature de votre demande.
        </p>
      </div>
      <div class="grid grid--4" data-render="pesup-services" data-auto-reveal="4"></div>
    </div>
  </section>
`
);

console.log("Pages PESUP 2/2 generees.");
