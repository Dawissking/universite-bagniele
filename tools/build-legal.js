const { buildPage } = require("./layout.js");

/* ============================ LÉGAL ============================ */

buildPage(
  "pages/mentions-legales.html",
  "ubd",
  "Mentions légales",
  "Mentions légales relatives au site de l’Université Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-campus-detail.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Mentions légales</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Mentions légales</h1>
      <p class="page-hero__lead">
        Informations relatives à l’édition, à l’hébergement et à l’utilisation de ce
        site.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container container--narrow">
      <div class="prose">
        <h2>Éditeur du site</h2>
        <p>
          Ce site présente l’Université Bagnélé Diarra, établissement d’enseignement
          supérieur privé situé à Bamako, Mali, ainsi que sa PESUP-Santé.
        </p>
        <p>
          Les coordonnées complètes de l’éditeur (adresse postale exacte, numéro de
          téléphone, adresse électronique, registre ou numéro d’identification) sont
          <strong>en cours de consolidation</strong> et seront publiées dès validation par
          les services compétents.
        </p>

        <h2>Directrice de la publication</h2>
        <p>
          La direction de la publication est assurée par la Direction de
          l’Université Bagnélé Diarra. Son identité nominative sera précisée après
          consolidation des informations institutionnelles.
        </p>

        <h2>Hébergement</h2>
        <p>
          Les informations techniques relatives à l’hébergeur du site (raison sociale,
          adresse, coordonnées) ne sont pas encore disponibles et restent en cours de
          consolidation.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus présents sur ce site (textes, photographies, logos,
          éléments graphiques) est protégé. Toute reproduction, représentation ou
          adaptation, totale ou partielle, est interdite sans autorisation écrite
          préalable de l’éditeur.
        </p>
        <p>
          Les photographies de campus et d’étudiants utilisées sur ce site sont
          représentatives de l’institution. Leur réutilisation dans d’autres supports
          suppose l’accord préalable de l’université.
        </p>

        <h2>Liens externes</h2>
        <p>
          Ce site peut mentionner des ressources ou des institutions tierces. L’éditeur
          n’exerce aucun contrôle sur ces contenus et décline toute responsabilité
          quant à leur disponibilité ou à leur contenu.
        </p>

        <h2>Exactitude des informations</h2>
        <p>
          L’université s’efforce de garantir l’exactitude des informations publiées.
          Toutefois, certaines données (coordonnées, dates du calendrier académique,
          frais, effectifs, compositions d’organes) sont encore en cours de
          consolidation et sont signalées comme telles sur le site. Ces informations ne
          sauraient valoir engagement contractuel.
        </p>

        <h2>Propriété du code</h2>
        <p>
          Le code source, la structure technique et le contenu rédactionnel de ce site
          sont l’œuvre de l’éditeur. Toute réutilisation sans autorisation est
          proscrite.
        </p>

        <h2>Droit applicable</h2>
        <p>
          Les présentes mentions sont soumises au droit malien. Tout litige relatif à
          l’utilisation de ce site relève de la compétence des juridictions
          compétentes de Bamako.
        </p>
      </div>

      <div class="notice notice--warn mt-6" data-reveal>
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-alert"></use></svg>
        <span>
          Ce document est une version de travail. Il sera complété des mentions
          définitives (adresse, téléphone, hébergeur, responsable de publication) dès
          réception des informations validées.
        </span>
      </div>

      <div class="btn-row mt-6">
        <a class="btn btn--primary" href="contact.html">
          Nous contacter
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
        <a class="link-arrow" href="politique-confidentialite.html">
          Politique de confidentialité
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
    </div>
  </section>
`
);

buildPage(
  "pages/politique-confidentialite.html",
  "ubd",
  "Politique de confidentialité",
  "Politique de confidentialité et traitement des données personnelles du site de l’Université Bagnélé Diarra.",
  `
  <section class="page-hero page-hero--compact">
    <div class="page-hero__bg"><img src="../images/ubd-campus.jpg" alt="" width="1600" height="1067"></div>
    <div class="container page-hero__inner">
      <nav aria-label="Fil d’Ariane">
        <ol class="breadcrumb">
          <li><a href="../index.html">Accueil</a></li>
          <li class="breadcrumb__sep" aria-hidden="true">/</li>
          <li aria-current="page">Politique de confidentialité</li>
        </ol>
      </nav>
      <h1 class="page-hero__title title-serif">Politique de confidentialité</h1>
      <p class="page-hero__lead">
        Comment ce site traite les informations que vous nous transmettez et ce qu’il
        enregistre dans votre navigateur.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container container--narrow">
      <div class="prose">
        <h2>Principe général</h2>
        <p>
          Ce site a été conçu pour rester informatif. Il ne comporte pas d’espace de
          compte, ni d’abonnement à une liste de diffusion, ni d’espace de paiement.
          Les échanges se font par formulaire ou lors de vos démarches auprès des
          services de l’université.
        </p>

        <h2>Données transmises par le formulaire de contact</h2>
        <p>
          Lorsque vous utilisez le formulaire de contact, les champs suivants sont
          demandés : nom, adresse électronique, téléphone (facultatif), objet de la
          demande, message et acceptement de traitement.
        </p>
        <div class="notice notice--info mt-4 mb-4">
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-info"></use></svg>
          <span>
            <strong>Aucun envoi n’est effectué depuis ce site.</strong> Le formulaire
            fonctionne en démonstration locale : les données saisies sont uniquement
            vérifiées dans votre navigateur, ne sont pas transmises et ne sont pas
            conservées. Pour une démarche réelle, adressez-vous directement au service
            concerné.
          </span>
        </div>
        <p>
          Dès la mise en service d’un canal d’envoi sécurisé, les données transmises
          seront utilisées dans le seul but de répondre à votre demande.
        </p>

        <h2>Données enregistrées dans votre navigateur</h2>
        <p>
          Aucune technologie de suivi publicitaire n’est utilisée. Le site ne dépose pas
          de cookie publicitaire ni de cookie de mesure d’audience tiers.
        </p>
        <p>
          Si le stockage local du navigateur est disponible, il sert uniquement au
          fonctionnement de l’interface (par exemple la mémorisation du thème ou d’un
          panneau ouvert). Ces éléments peuvent être effacés à tout moment depuis les
          réglages de votre navigateur.
        </p>

        <h2>Photos et données sensibles</h2>
        <p>
          Les photographies publiées sur ce site illustrent la vie de l’établissement.
          Aucune donnée sensible concernant une personne n’est publiée.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez à tout moment demander l’accès, la rectification ou la
          suppression des informations vous concernant, ainsi que vous opposer à leur
          traitement. Ces demandes sont à adresser à l’université par écrit. Le
          canal de contact précis sera précisé dès la consolidation des coordonnées
          officielles.
        </p>

        <h2>Sécurité</h2>
        <p>
          L’université veille à limiter la diffusion d’informations personnelles
          liées aux dossiers étudiants. Les traitements d’admission s’effectuent par
          les services habilités, selon les procédures internes.
        </p>

        <h2>Évolution de la présente politique</h2>
        <p>
          Cette politique peut être mise à jour lorsque les fonctionnalités du site
          évoluent. La date de dernière révision sera indiquée dès consolidation du
          document.
        </p>
      </div>

      <div class="btn-row mt-6">
        <a class="btn btn--primary" href="contact.html">
          Nous contacter
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
        <a class="link-arrow" href="mentions-legales.html">
          Mentions légales
          <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrowRight"></use></svg>
        </a>
      </div>
    </div>
  </section>
`
);

console.log("Pages legales generees.");
