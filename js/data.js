/* ============================================================
   UNIVERSITÉ BAGNÉLÉ DIARRA (UBD) — COUCHE DE DONNÉES
   ------------------------------------------------------------
   Toutes les pages du site sont alimentées à partir de ce fichier.
   Pour ajouter ou modifier un contenu, éditez uniquement ce
   fichier : aucune modification du HTML ni du CSS n’est nécessaire.

   CONVENTION « DONNÉE NON OFFICIALISÉE »
   -------------------------------------
   Une information qui n’a pas encore été validée par les services
   de l’établissement est déclarée avec la valeur null (ou
   confirmed: false). L’interface affiche alors une présentation
   propre indiquant que le contenu sera ajouté ultérieurement,
   jamais une mention technique.
   ============================================================ */

window.UBD = (function () {
  "use strict";

  /* ------------------------------------------------------------
     1. IDENTITÉ ET COORDONNÉES
     null = information non encore communiquée par l’établissement
     ------------------------------------------------------------ */
  var site = {
    nom: "Université Bagnélé Diarra",
    sigle: "UBD",
    ville: "Bamako",
    pays: "Mali",
    adresse: null,
    telephone: null,
    email: null,
    emailAdmissions: null,
    horaires: null,
    reseaux: [
      { nom: "Facebook", icone: "facebook", href: null },
      { nom: "LinkedIn", icone: "linkedin", href: null },
      { nom: "YouTube", icone: "youtube", href: null },
      { nom: "X", icone: "x", href: null }
    ]
  };

  /* ------------------------------------------------------------
     2. CHIFFRES CLÉS
     confirmed: false → l’interface affiche un état « en cours de
     consolidation » plutôt qu’un chiffre non vérifié.
     ------------------------------------------------------------ */
  var chiffres = [
    {
      label: "Formations", valeur: 13, suffixe: "", confirmed: true,
      detail: "Licences, Masters et formations professionnelles"
    },
    {
      label: "Départements", valeur: 3, suffixe: "", confirmed: true,
      detail: "Sciences de gestion, Sciences juridiques et politiques, PESUP-Santé"
    },
    {
      label: "Étudiants", valeur: null, suffixe: "", confirmed: false,
      detail: "Effectif officiel en cours de consolidation"
    },
    {
      label: "Enseignants", valeur: null, suffixe: "", confirmed: false,
      detail: "Effectif officiel en cours de consolidation"
    }
  ];

  /* ------------------------------------------------------------
     3. DÉPARTEMENTS
     ------------------------------------------------------------ */
  var departements = [
    {
      id: "gestion",
      nom: "Sciences de Gestion",
      icone: "chart",
      resume: "Management, finance, marketing, communication et systèmes d’information.",
      texte: "Le département des Sciences de Gestion couvre l’ensemble des disciplines du management et de la gestion des entreprises. Il forme des profils opérationnels capables de piloter les fonctions ressources humaines, finance, marketing, communication et systèmes d’information, dans les organisations publiques comme privées."
    },
    {
      id: "droit",
      nom: "Sciences Juridiques et Politiques",
      icone: "scales",
      resume: "Droit public, droit privé, droit international et relations internationales.",
      texte: "Le département des Sciences Juridiques et Politiques assure une formation exigeante dans les branches du droit et des relations internationales. Il prépare des juristes et praticiens capables d’interpréter les normes, de sécuriser les opérations et de représenter des intérêts dans un environnement juridique en profonde évolution."
    },
    {
      id: "sante",
      nom: "PESUP-Santé",
      icone: "cross",
      resume: "Sciences infirmières, pharmacie, imagerie médicale et laboratoire.",
      texte: "La PESUP-Santé Bagnélé Diarra est l’école de santé de l’université. Elle dispense des formations paramédicales et pharmaceutiques adossées aux besoins sanitaires du Mali, avec des enseignements pratiques et des stages encadrés en milieu de soins."
    }
  ];

  /* ------------------------------------------------------------
     4. VALEURS INSTITUTIONNELLES
     ------------------------------------------------------------ */
  var valeurs = [
    {
      titre: "Excellence académique", icone: "award",
      texte: "Des standards de qualité exigeants dans l’enseignement, l’évaluation et l’encadrement des étudiants."
    },
    {
      titre: "Intégrité", icone: "shield",
      texte: "La transparence, l’honnêteté et le respect des règles comme principes de gouvernance."
    },
    {
      titre: "Innovation", icone: "spark",
      texte: "De nouvelles méthodes pédagogiques et les technologies au service de l’apprentissage."
    },
    {
      titre: "Inclusion", icone: "users",
      texte: "Un accès équitable à l’enseignement supérieur, sans distinction d’origine, de genre ou de parcours."
    },
    {
      titre: "Responsabilité", icone: "balance",
      texte: "Former des professionnels capables de rendre compte de leurs décisions et de leurs engagements."
    },
    {
      titre: "Engagement", icone: "heart",
      texte: "Une présence active dans la communauté, par le service, la recherche et les partenariats."
    }
  ];

  /* ------------------------------------------------------------
     5. INFRASTRUCTURES
     ------------------------------------------------------------ */
  var infrastructures = [
    {
      titre: "Bibliothèque et centre de documentation", icone: "book",
      texte: "Des fonds d’ouvrages, de revues scientifiques et de ressources numériques accessibles aux étudiants et aux enseignants."
    },
    {
      titre: "Salles de cours et amphithéâtres", icone: "screen",
      texte: "Des espaces de travail modernes et équipés pour la projection, le travail en groupe et les cours en grand nombre."
    },
    {
      titre: "Plateaux informatiques", icone: "monitor",
      texte: "Des postes de travail et un réseau à haut débit pour les enseignements informatiques et les projets étudiants."
    },
    {
      titre: "Laboratoires et salles de travaux pratiques", icone: "flask",
      texte: "Des espaces dédiés aux manipulations pratiques, à l’observation et à la compréhension des phénomènes étudiés."
    },
    {
      titre: "Espaces de vie et restauration", icone: "coffee",
      texte: "Des espaces de détente et de restauration qui complètent le temps universitaire."
    },
    {
      titre: "Installations sportives", icone: "trophy",
      texte: "Des terrains et des installations pour la pratique sportive et la vie associative."
    }
  ];

  /* ------------------------------------------------------------
     6. SERVICES / DÉPARTEMENTS ADMINISTRATIFS
     ------------------------------------------------------------ */
  var services = [
    {
      nom: "Secrétariat Général Académique", icone: "cap",
      texte: "Inscriptions, authentification des documents, dossiers étudiants et vie scolaire.",
      href: "pages/admissions.html"
    },
    {
      nom: "Scolarité et Examens", icone: "file",
      texte: "Suivi des inscriptions, convocation, organisation et surveillance des examens.",
      href: "pages/admissions.html"
    },
    {
      nom: "Direction des Études", icone: "book",
      texte: "Organisation pédagogique, emplois du temps, suivi des maquettes et des programmes.",
      href: "pages/formations.html"
    },
    {
      nom: "Service Comptable et Financier", icone: "coins",
      texte: "Frais de scolarité, facturation, règlements et gestion financière des étudiants.",
      href: "pages/admissions.html"
    },
    {
      nom: "Bibliothèque", icone: "library",
      texte: "Prêts, références, espace de lecture et ressources documentaires.",
      href: "pages/documents.html"
    },
    {
      nom: "Orientation et Insertion", icone: "compass",
      texte: "Accompagnement des étudiants dans leur parcours et leur projet professionnel.",
      href: "pages/vie-universitaire.html"
    },
    {
      nom: "Communication", icone: "megaphone",
      texte: "Relations avec les médias, annonces officielles et vie de l’établissement.",
      href: "pages/actualites.html"
    },
    {
      nom: "PESUP-Santé", icone: "cross",
      texte: "École de santé : formations paramédicales, stages et vie de l’école.",
      href: "pages/pesup-sante.html"
    }
  ];

  /* ------------------------------------------------------------
     7. GOUVERNANCE
     Les titulaires non communiqués sont rendus comme tels.
     ------------------------------------------------------------ */
  var gouvernance = [
    {
      organe: "Conseil d’Administration", role: null, deliberant: true,
      texte: "Instance de délibération de l’université, elle se prononce sur les orientations, le budget et les décisions stratégiques."
    },
    {
      organe: "Conseil Scientifique", role: null, deliberant: false,
      texte: "Instance consultative sur la politique de recherche, la publication et la coopération scientifique."
    },
    {
      organe: "Rectorat", role: "Recteur", deliberant: false,
      texte: "Direction générale de l’université, en charge de la représentation, de la cohérence et de la mise en œuvre des orientations."
    },
    {
      organe: "Vice-Rectorat", role: "Vice-Recteur Académique", deliberant: false,
      texte: "Supervision des enseignements, des évaluations et du suivi des parcours étudiants."
    },
    {
      organe: "Administration & Finances", role: "Vice-Recteur Administratif et Financier", deliberant: false,
      texte: "Gestion des ressources humaines, des finances, du patrimoine et des services administratifs."
    }
  ];

  /* ------------------------------------------------------------
     8. CATALOGUE DES FORMATIONS (UBD)
     Niveaux et durées : à valider par les services académiques.
     Le champ modes indique les modalités de suivi possibles.
     ------------------------------------------------------------ */
  var formations = [
    {
      id: "grh", code: "GRH", niveau: "pro", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Gestion des Ressources Humaines",
      domaine: "Management & Sciences du comportement",
      duree: "2 ans",
      image: "images/ubd-groupe-detail.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra regroupés sur le campus",
      resume: "Maîtriser la fonction ressources humaines : recrutement, gestion des compétences, rémunération, dialogue social et développement organisationnel.",
      objectifs: [
        "Concevoir et conduire une politique de recrutement et de gestion des compétences.",
        "Maîtriser la paie, la fiscalité et les obligations sociales du travail.",
        "Piloter les relations sociales et prévenir les conflits.",
        "Définir un plan de formation et de développement organisationnel."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Management des ressources humaines", "Droit du travail", "Recrutement et sélection", "Paie et charges sociales"] },
        { semestre: "Semestre 2", matieres: ["Gestion des compétences", "Formation professionnelle", "Gestion des emplois et des compétences", "Projet professionnel"] },
        { semestre: "Semestre 3", matieres: ["Stratégie RH", "Droit social", "Communication interne", "Méthodes de recherche"] },
        { semestre: "Semestre 4", matieres: ["Stage professionnel", "Mémoire de fin d’études", "Audit social", "Entrepreneuriat social"] }
      ],
      debouches: ["Chargé de recrutement", "Gestionnaire RH", "Responsable paie", "Consultant RH", "Chargé de formation", "Responsable administratif"]
    },
    {
      id: "finance", code: "FCO", niveau: "pro", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Finance-Comptabilité",
      domaine: "Finance & Gestion",
      duree: "2 ans",
      image: "images/thumb-ubd-1.jpg",
      alt: "Vue du campus de l’Université Bagnélé Diarra",
      resume: "Tenir la comptabilité, établir les états financiers, construire des tableaux de bord et accompagner la décision de gestion.",
      objectifs: [
        "Maîtriser le référentiel comptable et les normes de reporting financier.",
        "Établir et analyser les documents de synthèse.",
        "Construire des outils de pilotage et de prévision de trésorerie.",
        "Conseiller le dirigeant dans ses arbitrages financiers."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Comptabilité générale", "Mathématiques financières", "Droit comptable", "Introduction à l’économie"] },
        { semestre: "Semestre 2", matieres: ["Comptabilité des sociétés", "Fiscalité", "Analyse financière", "Bureautique professionnelle"] },
        { semestre: "Semestre 3", matieres: ["Contrôle de gestion", "Finance d’entreprise", "Systèmes d’information", "Communication professionnelle"] },
        { semestre: "Semestre 4", matieres: ["Stage professionnel", "Mémoire de fin d’études", "Audit comptable", "Entrepreneuriat"] }
      ],
      debouches: ["Comptable principal", "Assistant comptable", "Contrôleur de gestion", "Analyste financier", "Fiscaliste d’entreprise", "Auditeur"]
    },
    {
      id: "business", code: "ECO", niveau: "licence", departement: "gestion",
      modes: ["initiale"],
      intitule: "Business Économique",
      domaine: "Économie & Management",
      duree: "3 ans",
      image: "images/ubd-groupe.jpg",
      alt: "Groupe d’étudiants de l’Université Bagnélé Diarra",
      resume: "Analyser les phénomènes économiques, comprendre les marchés et construire un projet d’entreprise dans un environnement concurrentiel.",
      objectifs: [
        "Disposer des bases en économie, comptabilité, marketing et gestion.",
        "Construire une analyse économique et financière d’un projet.",
        "Élaborer un business plan et défendre un projet devant un jury.",
        "Comprendre l’environnement des affaires au Mali et dans la sous-région."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Économie générale", "Comptabilité", "Introduction au marketing", "Mathématiques pour la gestion"] },
        { semestre: "Semestre 2", matieres: ["Statistiques", "Microéconomie", "Gestion financière", "Expression et communication"] },
        { semestre: "Semestre 3", matieres: ["Macroéconomie", "Management", "Droit des affaires", "Informatique de gestion"] },
        { semestre: "Semestre 4", matieres: ["Économie du développement", "Analyse financière", "Gestion des organisations", "Projet entrepreneurial"] },
        { semestre: "Semestres 5 et 6", matieres: ["Stages et immersion professionnelle", "Mémoire", "Options et spécialisation"] }
      ],
      debouches: ["Chargé d’étude économique", "Chargé de marketing", "Gestionnaire de PME", "Conseiller économique", "Chargé d’affaires", "Entrepreneur"]
    },
    {
      id: "audit", code: "ACG", niveau: "master", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Audit et Contrôle de Gestion",
      domaine: "Audit & Gouvernance",
      duree: "2 ans",
      image: "images/ubd-campus.jpg",
      alt: "Bâtiment et espaces extérieurs du campus de l’Université Bagnélé Diarra",
      resume: "Concevoir des dispositifs de contrôle interne, conduire des missions d’audit et produire des outils de pilotage de la performance.",
      objectifs: [
        "Appliquer les normes d’audit et construire une méthodologie de mission.",
        "Évaluer le contrôle interne et formuler des recommandations.",
        "Mettre en place un tableau de bord de contrôle de gestion.",
        "Restituer les résultats de la mission aux organes de gouvernance."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Méthodologie d’audit", "Contrôle interne", "Comptabilité des sociétés", "Droit de l’audit"] },
        { semestre: "Semestre 2", matieres: ["Audit des systèmes d’information", "Contrôle de gestion", "Fiscalité des entreprises", "Communication professionnelle"] },
        { semestre: "Semestre 3", matieres: ["Audit sectoriel", "Mesure de la performance", "Gestion des risques", "Mémoire de recherche"] }
      ],
      debouches: ["Auditeur interne", "Contrôleur de gestion", "Consultant en organisation", "Analyste de risques", "Responsable conformité", "Enseignant-chercheur"]
    },
    {
      id: "marketing", code: "MCO", niveau: "licence", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Marketing-Communication",
      domaine: "Marketing & Communication",
      duree: "3 ans",
      image: "images/ubd-groupe-carrousel.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra",
      resume: "Concevoir des stratégies marketing, piloter des campagnes et développer une communication de marque mesurable.",
      objectifs: [
        "Analyser un marché, une clientèle et un positionnement.",
        "Construire un plan marketing et un mix stratégique.",
        "Piloter des actions de communication et évaluer leur retour.",
        "Définir une identité de marque et une stratégie de contenu."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Principes de marketing", "Comportement du consommateur", "Expression écrite", "Économie"] },
        { semestre: "Semestre 2", matieres: ["Étude de marché", "Communication d’entreprise", "Publicité", "Outils numériques"] },
        { semestre: "Semestre 3", matieres: ["Marketing stratégique", "Relations publiques", "Marketing international", "Statistiques marketing"] },
        { semestre: "Semestre 4", matieres: ["Plan marketing", "Communication de crise", "Gestion de marque", "Stage"] },
        { semestre: "Semestres 5 et 6", matieres: ["Projet professionnel", "Mémoire", "Option de spécialisation"] }
      ],
      debouches: ["Chargé de marketing", "Responsable de communication", "Chargé d’études de marché", "Media planner", "Community manager", "Consultant marketing"]
    },
    {
      id: "journalisme", code: "COJ", niveau: "licence", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Communication & Journalisme",
      domaine: "Médias & Journalisme",
      duree: "3 ans",
      image: "images/ubd-groupe-large.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra regroupés sur le campus",
      resume: "Former des journalistes et des communicateurs capables de traiter l’information avec rigueur, éthique et vérifiabilité.",
      objectifs: [
        "Acquérir les techniques de collecte, de vérification et de traitement de l’information.",
        "Écrire pour la presse, la radio, la télévision et le web.",
        "Appliquer les règles déontologiques de la profession.",
        "Maîtriser les techniques d’expression orale et d’entretien."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Théorie du journalisme", "Écriture journalistique", "Histoire contemporaine", "Expression orale"] },
        { semestre: "Semestre 2", matieres: ["Techniques de l’entretien", "Photographie et vidéo", "Droit de l’information", "Rédaction de presse"] },
        { semestre: "Semestre 3", matieres: ["Journalisme économique", "Journalisme local et communautaire", "Communication institutionnelle", "Déontologie"] },
        { semestre: "Semestre 4", matieres: ["Journalisme en ligne", "Reportage", "Stage en média", "Mémoire"] }
      ],
      debouches: ["Journaliste", "Rédacteur en chef", "Chargé de communication", "Producteur de contenu", "Attaché de presse", "Correspondant local"]
    },
    {
      id: "mfb", code: "MFBA", niveau: "pro", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Monnaie-Finance-Banque et Assurance",
      domaine: "Banque & Assurance",
      duree: "2 ans",
      image: "images/ubd-campus-detail.jpg",
      alt: "Campus de l’Université Bagnélé Diarra",
      resume: "Préparer aux métiers de la banque, de l’assurance et des services financiers pour l’économie malienne et sous-régionale.",
      objectifs: [
        "Comprendre le fonctionnement des systèmes bancaires et assurantiels.",
        "Maîtriser les produits et la réglementation du secteur financier.",
        "Construire une analyse de risque et de rentabilité.",
        "Accompagner la clientèle dans une solution financière adaptée."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Monnaie et systèmes de paiement", "Économie monétaire", "Comptabilité bancaire", "Droit bancaire"] },
        { semestre: "Semestre 2", matieres: ["Produits et services bancaires", "Management de la relation client", "Assurances", "Analyse financière"] },
        { semestre: "Semestre 3", matieres: ["Risque bancaire et assurance", "Finance de marché", "Réglementation régionale", "Stage"] },
        { semestre: "Semestre 4", matieres: ["Projet professionnel", "Mémoire", "Éthique financière"] }
      ],
      debouches: ["Conseiller bancaire", "Chargé de clientèle", "Analyste financier", "Chargé d’assurance", "Gestionnaire de portefeuille", "Responsable back-office"]
    },
    {
      id: "informatique", code: "INF", niveau: "licence", departement: "gestion",
      modes: ["initiale", "continue"],
      intitule: "Informatique de Gestion",
      domaine: "Systèmes d’information",
      duree: "3 ans",
      image: "images/thumb-ubd-3.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra",
      resume: "Concevoir et exploiter des solutions logicielles adaptées à la gestion des organisations, avec une forte culture d’entreprise.",
      objectifs: [
        "Maîtriser les fondamentaux de l’algorithmique et de la programmation.",
        "Concevoir et exploiter des bases de données relationnelles.",
        "Développer des applications de gestion et les faire évoluer.",
        "Sécuriser les systèmes d’information et organiser leur exploitation."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Algorithmique", "Introduction à l’informatique", "Bureautique", "Mathématiques discrètes"] },
        { semestre: "Semestre 2", matieres: ["Programmation structurée", "Bases de données", "Systèmes d’exploitation", "Expression professionnelle"] },
        { semestre: "Semestre 3", matieres: ["Programmation orientée objet", "Réseaux informatiques", "Gestion de projets", "Bases de données avancées"] },
        { semestre: "Semestre 4", matieres: ["Développement web", "Entrepôts de données", "Sécurité informatique", "Stage"] },
        { semestre: "Semestres 5 et 6", matieres: ["Architecture logicielle", "Projet de fin d’études", "Mémoire"] }
      ],
      debouches: ["Développeur d’applications", "Administrateur de bases de données", "Analyste fonctionnel", "Administrateur réseau", "Consultant SI", "Chef de projet informatique"]
    },
    {
      id: "droit-public", code: "DPU", niveau: "licence", departement: "droit",
      modes: ["initiale"],
      intitule: "Droit Public",
      domaine: "Droit & Administration",
      duree: "3 ans",
      image: "images/thumb-ubd-2.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra",
      resume: "Comprendre la structure de l’État, les sources du droit public et le contentieux administratif.",
      objectifs: [
        "Identifier les sources et les principes du droit public malien.",
        "Analyser l’organisation administrative de l’État et des collectivités.",
        "Construire un raisonnement juridique et rédiger une note de droit.",
        "Préparer les concours et l’entrée dans les fonctions publiques."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Introduction au droit", "Droit constitutionnel", "Histoire juridique", "Méthodologie juridique"] },
        { semestre: "Semestre 2", matieres: ["Droit administratif", "Droit civil", "Économie publique", "Institutions"] },
        { semestre: "Semestre 3", matieres: ["Contentieux administratif", "Droit des finances publiques", "Droit du travail", "Stage"] },
        { semestre: "Semestre 4", matieres: ["Droit des marchés publics", "Rédaction juridique", "Mémoire"] }
      ],
      debouches: ["Administrateur civil", "Chargé de contentieux", "Attaché administratif", "Consultant en droit public", "Greffier", "Agent de la fonction publique"]
    },
    {
      id: "droit-prive", code: "DPR", niveau: "licence", departement: "droit",
      modes: ["initiale"],
      intitule: "Droit Privé",
      domaine: "Droit des affaires",
      duree: "3 ans",
      image: "images/ubd-campus.jpg",
      alt: "Bâtiment et espaces extérieurs du campus de l’Université Bagnélé Diarra",
      resume: "Maîtriser les règles du droit privé, de la propriété aux obligations, en lien avec l’entreprise et le contentieux civil.",
      objectifs: [
        "Distinguer les sources du droit privé et leur hiérarchie.",
        "Rédiger des actes juridiques et des analyses de contentieux.",
        "Comprendre les mécanismes de la responsabilité civile.",
        "Associer le droit privé aux besoins des entreprises."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Introduction au droit", "Droit des personnes", "Droit des obligations", "Droit constitutionnel"] },
        { semestre: "Semestre 2", matieres: ["Droit des biens", "Droit des contrats spéciaux", "Droit des sociétés", "Méthodologie juridique"] },
        { semestre: "Semestre 3", matieres: ["Droit commercial", "Régimes matrimoniaux", "Contentieux civil", "Stage"] },
        { semestre: "Semestre 4", matieres: ["Régimes de sûretés", "Rédaction d’actes", "Mémoire"] }
      ],
      debouches: ["Assistant juridique", "Chargé de contentieux", "Consultant en droit des affaires", "Commissaire de justice (selon conditions)", "Responsable conformité", "Avocat (après concours)"]
    },
    {
      id: "droit-international", code: "DIH", niveau: "master", departement: "droit",
      modes: ["initiale", "continue"],
      intitule: "Droit International Humanitaire",
      domaine: "Droit international",
      duree: "2 ans",
      image: "images/ubd-groupe-detail.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra regroupés sur le campus",
      resume: "Approfondir les règles du droit international public et la protection des personnes en situation de conflit.",
      objectifs: [
        "Maîtriser les sources et la jurisprudence du droit international.",
        "Comprendre l’application du droit international humanitaire en situation de conflit.",
        "Analyser les mécanismes de protection des victimes.",
        "Conduire une recherche juridique en droit international comparé."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Sources du droit international", "Droit international public", "Droit international humanitaire introductif", "Méthodologie de la recherche"] },
        { semestre: "Semestre 2", matieres: ["Conflits armés", "Protection des victimes", "Droit de l’humanité", "Contentieux international"] },
        { semestre: "Semestre 3", matieres: ["Mémoire de recherche", "Stages et séminaires", "Cas pratique"] }
      ],
      debouches: ["Conseiller en droit international", "Chargé de programmes humanitaires", "Analyste sécurité", "Diplomate d’organisation internationale", "Consultant ONG", "Doctorant"]
    },
    {
      id: "relations-internationales", code: "RID", niveau: "master", departement: "droit",
      modes: ["initiale", "continue"],
      intitule: "Relations Internationales et Diplomatie",
      domaine: "Relations internationales",
      duree: "2 ans",
      image: "images/ubd-groupe.jpg",
      alt: "Groupe d’étudiants de l’Université Bagnélé Diarra",
      resume: "Comprendre la géopolitique, la diplomatie et les mécanismes de coopération internationale en Afrique de l’Ouest.",
      objectifs: [
        "Analyser les politiques étrangères et les rapports de force régionaux.",
        "Maîtriser les techniques de négociation et de médiation.",
        "Comprendre les cadres institutionnels de la coopération internationale.",
        "Conduire une recherche appliquée sur les enjeux ouest-africains."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Théorie des relations internationales", "Diplomatie et protocole", "Économie politique mondiale", "Méthodologie de la recherche"] },
        { semestre: "Semestre 2", matieres: ["Politiques africaines", "Sécurité régionale", "Organisations internationales", "Négociation et médiation"] },
        { semestre: "Semestre 3", matieres: ["Cas pratique de diplomatie", "Stage", "Mémoire de recherche"] }
      ],
      debouches: ["Diplomate", "Chargé de mission", "Analyste géopolitique", "Conseiller d’organisation internationale", "Consultant en coopération", "Enseignant-chercheur"]
    },
    {
      id: "droit-financier", code: "DFUA", niveau: "master", departement: "droit",
      modes: ["initiale", "continue"],
      intitule: "Droit Financier, Urbanisme et Aménagement",
      domaine: "Droit foncier & immobilier",
      duree: "2 ans",
      image: "images/ubd-campus-detail.jpg",
      alt: "Campus de l’Université Bagnélé Diarra",
      resume: "Maîtriser le droit du financement, le droit foncier et les règles de l’urbanisme et de l’aménagement.",
      objectifs: [
        "Appliquer les règles du crédit et du marché financier.",
        "Comprendre le régime foncier et les mécanismes de sécurisation.",
        "Analyser les documents d’urbanisme et les procédures d’aménagement.",
        "Sécuriser juridiquement les opérations immobilières et foncières."
      ],
      programme: [
        { semestre: "Semestre 1", matieres: ["Droit du crédit", "Régime foncier", "Droit de l’urbanisme", "Méthodologie juridique"] },
        { semestre: "Semestre 2", matieres: ["Opérations immobilières", "Droit de l’environnement", "Marché financier régional", "Sécurisation juridique"] },
        { semestre: "Semestre 3", matieres: ["Cas pratique d’aménagement", "Stage", "Mémoire de recherche"] }
      ],
      debouches: ["Notaire", "Conseiller foncier", "Chargé de programmation urbaine", "Juriste immobilier", "Consultant en aménagement", "Responsable foncier"]
    }
  ];

  /* ------------------------------------------------------------
     9. ACTUALITÉS
     Dates : à valider par le service de communication.
     ------------------------------------------------------------ */
  var actualites = [
    {
      id: "rentree-2026", categorie: "evenements", date: "2026-09-15", aLaUne: true,
      titre: "Rentrée universitaire 2026-2027 : l’UBD accueille ses nouveaux étudiants",
      chapo: "L’Université Bagnélé Diarra ouvre ses portes pour la nouvelle année académique et accueille les nouvelles promotions.",
      image: "images/ubd-hero.jpg",
      alt: "Vue du campus universitaire Bagnélé Diarra",
      corps: [
        "L’Université Bagnélé Diarra accueille les étudiants de la nouvelle année académique. Les inscriptions restent ouvertes et les services académiques travaillent en coordination avec les équipes de département pour accompagner chaque nouvel arrivant dans ses démarches et dans la découverte de l’institution.",
        "Cette rentrée rappelle les trois exigences qui structurent l’action de l’université : la qualité de l’enseignement, l’accompagnement personnalisé de chaque étudiant et l’ouverture sur les réalités professionnelles du Mali et de la sous-région.",
        "Les inscriptions s’effectuent auprès du service de scolarité. Les candidats peuvent également s’informer sur ce site et solliciter un rendez-vous auprès du service d’orientation."
      ]
    },
    {
      id: "inscriptions-ouvertes", categorie: "communiques", date: "2026-09-02", aLaUne: true,
      titre: "Admissions 2026-2027 : ouverture des inscriptions pour l’ensemble des formations",
      chapo: "Toutes les formations de l’université sont ouvertes à la candidature pour la prochaine année académique.",
      image: "images/ubd-campus.jpg",
      alt: "Bâtiment et espaces extérieurs du campus de l’Université Bagnélé Diarra",
      corps: [
        "Les inscriptions pour l’année académique 2026-2027 sont ouvertes pour l’ensemble des formations proposées par l’Université Bagnélé Diarra : licences, masters et formations professionnelles.",
        "Les dossiers de candidature sont déposés au secrétariat général académique, accompagnés des pièces demandées. Un accusé de réception est délivré à chaque candidat.",
        "La procédure complète, les niveaux d’accès et les pièces à fournir sont détaillés sur la page Admissions du site."
      ]
    },
    {
      id: "journee-portes-ouvertes", categorie: "evenements", date: "2026-06-20", aLaUne: true,
      titre: "Journée portes ouvertes : découvrir l’université et ses formations",
      chapo: "Une journée de découverte du campus, des métiers et de la parole d’anciens étudiants.",
      image: "images/ubd-groupe.jpg",
      alt: "Groupe d’étudiants de l’Université Bagnélé Diarra",
      corps: [
        "L’Université Bagnélé Diarra a organisé une journée portes ouvertes destinée aux futurs étudiants, à leurs parents et à ses partenaires.",
        "Au programme : présentation de l’institution et de sa gouvernance, visite du campus, présentation détaillée des treize formations, rencontres avec les enseignants et témoignage d’anciens étudiants.",
        "Cette journée a confirmé l’attrait de l’université pour les bacheliers de la région et a mis en évidence l’importance de l’orientation dès le choix d’une formation."
      ]
    },
    {
      id: "conference-droit", categorie: "vie-universitaire", date: "2026-05-12",
      titre: "Conférence sur le droit international et les enjeux contemporains",
      chapo: "Une rencontre ouverte avec des spécialistes du droit des relations internationales.",
      image: "images/ubd-campus-carrousel.jpg",
      alt: "Campus de l’Université Bagnélé Diarra",
      corps: [
        "Le département des Sciences Juridiques et Politiques a organisé une conférence consacrée au droit international et à ses applications contemporaines.",
        "La discussion a porté sur l’évolution du droit des conflits, les mécanismes de protection des personnes et la place des juristes dans la résolution des crises.",
        "Ce type de rencontre s’inscrit dans la politique de l’université de faire vivre la recherche et de rapprocher les étudiants des professionnels du droit."
      ]
    },
    {
      id: "atelier-informatique", categorie: "vie-universitaire", date: "2026-04-08",
      titre: "Atelier informatique : mettre les outils numériques au service de la gestion",
      chapo: "Un atelier pratique destiné aux étudiants de toutes les filières.",
      image: "images/thumb-ubd-1.jpg",
      alt: "Vue du campus de l’Université Bagnélé Diarra",
      corps: [
        "Un atelier pratique de perfectionnement en informatique a été organisé à l’attention des étudiants de toutes les filières.",
        "Les participants ont travaillé sur les outils de bureautique avancés, le traitement des données et les fondamentaux du développement web.",
        "Ces ateliers complètent l’enseignement théorique et permettent aux étudiants de disposer d’une autonomie réelle dans l’usage des outils numériques."
      ]
    },
    {
      id: "examen-semestre", categorie: "informations", date: "2026-03-25",
      titre: "Organisation des examens : publication des calendriers par filière",
      chapo: "Le calendrier des évaluations de fin de semestre est publié par le service de scolarité.",
      image: "images/ubd-campus-detail.jpg",
      alt: "Campus de l’Université Bagnélé Diarra",
      corps: [
        "Le service de scolarité a publié le calendrier des examens de fin de semestre pour l’ensemble des filières.",
        "Ce calendrier précise les dates d’épreuve, les horaires et les salles. Il est également affiché dans les espaces d’affichage du campus.",
        "Les étudiants sont invités à vérifier les informations de convocation qui leur sont adressées et à signaler toute difficulté en amont des épreuves."
      ]
    },
    {
      id: "partenariat-academique", categorie: "communiques", date: "2026-03-10",
      titre: "Coopération académique : le développement des partenariats avec les établissements partenaires",
      chapo: "L’université développe des liens de coopération avec des institutions d’enseignement et de recherche.",
      image: "images/ubd-groupe-large.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra regroupés sur le campus",
      corps: [
        "L’Université Bagnélé Diarra poursuit le renforcement de son réseau de partenariats académiques.",
        "Ces coopérations visent les échanges d’enseignants et d’étudiants, les projets de recherche conjoints et la mobilité des apprenants.",
        "Le détail des partenariats est publié sur la page de présentation de l’université. Les conventions en cours de négociation seront communiquées dès leur signature."
      ]
    },
    {
      id: "sport-universitaire", categorie: "vie-universitaire", date: "2026-02-18",
      titre: "Vie universitaire : l’UBD encourage la pratique sportive",
      chapo: "La pratique sportive complète le parcours académique et renforce la cohésion des étudiants.",
      image: "images/ubd-groupe-portrait.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra",
      corps: [
        "L’université encourage la pratique sportive dans le cadre de la vie étudiante.",
        "Les étudiants peuvent s’engager dans des activités collectives et représenter l’institution lors de compétitions universitaires.",
        "Le développement des installations sportives et des associations fait partie des projets portés par la direction de la vie universitaire."
      ]
    },
    {
      id: "orientation", categorie: "informations", date: "2026-01-30",
      titre: "Service d’orientation : un accompagnement du projet professionnel",
      chapo: "Un service dédié pour construire et affiner son projet d’études et son insertion professionnelle.",
      image: "images/thumb-ubd-2.jpg",
      alt: "Étudiants de l’Université Bagnélé Diarra",
      corps: [
        "Le service d’orientation accompagne les étudiants dans l’élaboration et la précision de leur projet professionnel.",
        "Il propose des entretiens individuels, des ateliers de recherche d’emploi et des rencontres avec des professionnels et des anciens étudiants.",
        "Ce service est accessible à tous les étudiants de l’université, quel que soit leur cycle."
      ]
    }
  ];

  /* ------------------------------------------------------------
     10. ÉVÉNEMENTS (accueil)
     ------------------------------------------------------------ */
  var evenements = [
    {
      id: "journee-scientifique", date: "2026-10-15", titre: "Journée scientifique annuelle", lieu: "Campus UBD",
      texte: "Présentations des travaux de recherche des étudiants et des enseignants."
    },
    {
      id: "forum-emploi", date: "2026-10-22", titre: "Forum de l’emploi", lieu: "Bamako",
      texte: "Rencontre entre étudiants, diplômés et entreprises pour l’insertion professionnelle."
    },
    {
      id: "colloque-developpement", date: "2026-11-05", titre: "Colloque sur le développement", lieu: "Bamako",
      texte: "Réflexion collective sur les défis du développement en Afrique de l’Ouest."
    }
  ];

  /* ------------------------------------------------------------
     11. GALERIE PESUP-SANTÉ
     ------------------------------------------------------------ */
  var galeriePesup = [
    { src: "images/pesup-etudiant.jpg", cat: "formations", titre: "Travaux pratiques en formation santé", alt: "Étudiant en formation de santé à la PESUP-Santé Bagnélé Diarra" },
    { src: "images/pesup-groupe.jpg", cat: "vie-etudiante", titre: "Promotion et vie étudiante", alt: "Étudiants de la PESUP-Santé Bagnélé Diarra" },
    { src: "images/pesup-pratique.jpg", cat: "activites", titre: "Activité de santé publique", alt: "Activité pratique de laboratoire à la PESUP-Santé" },
    { src: "images/pesup-couverture.jpg", cat: "campus", titre: "Le campus de la PESUP-Santé", alt: "Campus de la PESUP-Santé Bagnélé Diarra" },
    { src: "images/pesup-etudiant-carrousel.jpg", cat: "formations", titre: "Enseignements en sciences de la santé", alt: "Séance d’enseignement à la PESUP-Santé" },
    { src: "images/pesup-groupe-detail.jpg", cat: "vie-etudiante", titre: "Groupes de travail", alt: "Groupe de travail d’étudiants en santé" },
    { src: "images/pesup-hero.jpg", cat: "evenements", titre: "Événements de l’école", alt: "Événement de la PESUP-Santé Bagnélé Diarra" },
    { src: "images/pesup-groupe-carrousel.jpg", cat: "activites", titre: "Activité de formation continue", alt: "Session de formation à la PESUP-Santé" },
    { src: "images/pesup-etudiant-detail.jpg", cat: "formations", titre: "Apprentissage en situation", alt: "Apprentissage pratique en formation de santé" },
    { src: "images/thumb-pesup-1.jpg", cat: "formations", titre: "Parcours de formation en santé", alt: "Étudiant de la PESUP-Santé en formation" },
    { src: "images/thumb-pesup-2.jpg", cat: "vie-etudiante", titre: "Vie de groupe", alt: "Étudiants de la PESUP-Santé réunis" },
    { src: "images/thumb-pesup-3.jpg", cat: "campus", titre: "Campus et espaces de l’école", alt: "Vue des espaces de la PESUP-Santé" },
    { src: "images/Etudiant_Sante.jpg", cat: "formations", titre: "Étude en sciences de la santé", alt: "Étudiant de la PESUP-Santé en cours de formation" },
    { src: "images/Etudiant_Sante_2.jpg", cat: "formations", titre: "Travaux pratiques en santé", alt: "Étudiant de la PESUP-Santé pendant une séance pratique" },
    { src: "images/etudiant-en-sante.jpeg", cat: "vie-etudiante", titre: "Portrait d’étudiant", alt: "Étudiant de la PESUP-Santé" },
    { src: "images/etudiante-en-sante-2.jpeg", cat: "vie-etudiante", titre: "Étudiante en formation santé", alt: "Étudiante de la PESUP-Santé" },
    { src: "images/etudiantes-en-sante.jpeg", cat: "vie-etudiante", titre: "Promotion de la PESUP-Santé", alt: "Étudiantes de la PESUP-Santé" },
    { src: "images/etudiantes-en-sante-2.jpeg", cat: "vie-etudiante", titre: "Vie étudiante à la PESUP-Santé", alt: "Étudiantes de la PESUP-Santé" },
    { src: "images/Groupe_etudiants.jpg", cat: "vie-etudiante", titre: "Promotion réunie", alt: "Groupe d’étudiants de la PESUP-Santé Bagnélé Diarra" }
  ];

  /* ------------------------------------------------------------
     12. PESUP-SANTÉ — FORMATIONS
     ------------------------------------------------------------ */
  var pesupFormations = [
    {
      id: "soins-infirmiers", code: "INF-S", niveau: "Licence", duree: "3 ans",
      intitule: "Sciences Infirmières",
      domaine: "Soins infirmiers",
      image: "images/pesup-etudiant.jpg",
      alt: "Étudiant en formation de santé à la PESUP-Santé Bagnélé Diarra",
      resume: "Former des infirmiers capables d’assurer des soins de qualité, de contrôler la douleur et de jouer un rôle central dans l’éducation et la prévention.",
      objectifs: [
        "Maîtriser les techniques de soins infirmiers et les gestes d’urgence.",
        "Évaluer l’état de santé du patient et construire une démarche de soin.",
        "Assurer l’éducation thérapeutique et la prévention des maladies.",
        "Assumer une responsabilité professionnelle dans des structures de soins."
      ],
      debouches: ["Infirmier d’état", "Infirmier en milieu hospitalier", "Infirmier scolaire", "Infirmier en entreprise", "Soignant en clinique privée", "Éducateur sanitaire"]
    },
    {
      id: "pharmacie", code: "PHA-S", niveau: "Licence", duree: "3 ans",
      intitule: "Pharmacie",
      domaine: "Sciences pharmaceutiques",
      image: "images/pesup-groupe.jpg",
      alt: "Étudiants de la PESUP-Santé Bagnélé Diarra",
      resume: "Former des pharmaciens capables de dispenser un conseil pharmaceutique fiable, de gérer l’officine et de contribuer à la sécurité des médicaments.",
      objectifs: [
        "Connaître les médicaments, leurs indications et leurs contre-indications.",
        "Conduire l’analyse pharmaceutique et la dispensation.",
        "Gérer une officine et son stock de médicaments.",
        "Participer aux actions de pharmacie hospitalière et de santé publique."
      ],
      debouches: ["Officier de pharmacie", "Pharmacien assistant", "Responsable d’officine", "Pharmacien hospitalier", "Chargé de qualité pharmaceutique", "Travail en officine"]
    },
    {
      id: "imagerie", code: "IMA-S", niveau: "Licence", duree: "3 ans",
      intitule: "Imagerie Médicale et Radiologie",
      domaine: "Imagerie médicale",
      image: "images/pesup-couverture.jpg",
      alt: "Campus de la PESUP-Santé Bagnélé Diarra",
      resume: "Former des manipulateurs en imagerie capables de réaliser les examens radiologiques dans des conditions de sécurité et de qualité optimales.",
      objectifs: [
        "Maîtriser les techniques d’acquisition en imagerie médicale.",
        "Appliquer les mesures de radioprotection et de sécurité du patient.",
        "Préparer et contrôler les examens et respecter les paramètres d’acquisition.",
        "Participer à la chaîne de traitement du patient en imagerie."
      ],
      debouches: ["Manipulateur en radiologie", "Manipulateur en imagerie", "Agent de qualité en imagerie", "Technicien d’imagerie", "Chargé de matériel d’imagerie"]
    },
    {
      id: "laboratoire", code: "LAB-S", niveau: "Licence", duree: "3 ans",
      intitule: "Techniques de Laboratoire",
      domaine: "Analyses biologiques",
      image: "images/pesup-pratique.jpg",
      alt: "Activité pratique de laboratoire à la PESUP-Santé",
      resume: "Former des techniciens de laboratoire capables de réaliser les analyses biologiques et de garantir la fiabilité des résultats.",
      objectifs: [
        "Conduire les analyses biologiques de routine et en sécurité.",
        "Maîtriser le contrôle qualité et la gestion des réactifs.",
        "Appliquer les règles d’hygiène et de sécurité biologique.",
        "Rédiger les comptes rendus d’analyse et archiver les résultats."
      ],
      debouches: ["Technicien de laboratoire", "Technicien d’analyses biologiques", "Contrôleur qualité", "Technicien de recherche", "Responsable de laboratoire"]
    }
  ];

  var pesupChiffres = [
    { label: "Formations", valeur: 4, suffixe: "", confirmed: true, detail: "Licences de sciences de la santé" },
    { label: "Sites de stage", valeur: null, suffixe: "", confirmed: false, detail: "Sites de stage en cours de consolidation" },
    { label: "Encadrement", valeur: null, suffixe: "", confirmed: false, detail: "Effectif enseignant en cours de consolidation" },
    { label: "Équipements", valeur: null, suffixe: "", confirmed: false, detail: "Plateforme technique en cours de consolidation" }
  ];

  /* ------------------------------------------------------------
     13. ADMISSIONS
     ------------------------------------------------------------ */
  var admissions = {
    conditions: [
      { titre: "Titularité du baccalauréat", texte: "Être titulaire du baccalauréat malien ou de tout diplôme équivalent délivré par un établissement reconnu." },
      { titre: "Dossier complet", texte: "Le dossier de candidature doit être complet et déposé dans les délais auprès du secrétariat général académique." },
      { titre: "Admission sur dossier", texte: "L’admission est appréciée par le dossier et, selon les filières, par un entretien de motivation." }
    ],
    niveaux: [
      { titre: "Licence", duree: "3 ans", texte: "Acquérir les fondements académiques d’une discipline et ouvrir sur le domaine professionnel." },
      { titre: "Master", duree: "2 ans", texte: "Se spécialiser, maîtriser la méthodologie de la recherche et produire un mémoire de fin d’études." },
      { titre: "Formation professionnelle", duree: "2 ans", texte: "Suivre un programme directement professionnel, fortement orienté vers l’exercice en entreprise." }
    ],
    pieces: [
      "Copie certifiée du baccalauréat et des relevés de notes",
      "Fiche individuelle de candidature dûment remplie",
      "Deux (2) photos d’identité",
      "Copie de la pièce d’identité en cours de validité",
      "Certificat de nationalité",
      "Bulletins ou attestations des sessions précédentes, le cas échéant"
    ],
    etapes: [
      { titre: "Information et orientation", texte: "Consulter le catalogue des formations et prendre rendez-vous avec le service d’orientation pour valider son projet." },
      { titre: "Dépôt du dossier", texte: "Rassembler les pièces demandées et déposer le dossier au secrétariat général académique." },
      { titre: "Étude du dossier", texte: "Le dossier est étudié par les services académiques. Selon les filières, un entretien peut être proposé." },
      { titre: "Notification", texte: "La décision d’admission est notifiée aux candidats. Elle précise les conditions d’inscription." },
      { titre: "Inscription", texte: "L’étudiant procède aux formalités d’inscription avant la rentrée de l’année académique." }
    ],
    calendrier: [
      { periode: "Avis d’ouverture des inscriptions", date: "Publication sur ce site et affichage à l’accueil", confirmed: true },
      { periode: "Dépôt des dossiers", date: "Dates précisées à l’ouverture de chaque campagne", confirmed: true },
      { periode: "Évaluation des dossiers", date: "Selon le calendrier de chaque campagne", confirmed: true },
      { periode: "Rentrée universitaire", date: "Selon le calendrier national", confirmed: true }
    ],
    frais: {
      texte: "Les frais de scolarité dépendent de la formation et de l’année académique. Ils sont communiqués par le service comptable et financier lors de l’inscription et sur demande. Le détail des montants sera publié sur cette page dès sa validation par l’établissement."
    },
    faq: [
      { q: "Les inscriptions sont-elles encore ouvertes ?", r: "L’ouverture des inscriptions fait l’objet d’un communiqué publié sur cette page et d’un affichage au secrétariat. Les candidats peuvent également s’adresser directement au service de scolarité pour connaître la campagne en cours." },
      { q: "Peut-on déposer sa candidature en ligne ?", r: "Le dépôt en ligne n’est pas encore disponible. Le dépôt s’effectue sur place auprès du secrétariat général académique, sur présentation d’un dossier papier complet." },
      { q: "Quels sont les frais de scolarité ?", r: "Les frais de scolarité dépendent de la formation et de l’année académique. Ils sont communiqués par le service comptable et financier lors de l’inscription et sur demande." },
      { q: "Existe-t-il des conditions d’âge ?", r: "Les conditions d’accès relèvent des textes en vigueur. Elles sont précisées par les services académiques pour chaque campagne, à l’accueil et sur les affiches de la campagne." },
      { q: "Un diplôme étranger est-il accepté ?", r: "L’équivalence des diplômes étrangers est appréciée par les services académiques sur présentation d’un dossier de décharge. Contactez le secrétariat pour connaître la procédure en vigueur." }
    ]
  };

  /* ------------------------------------------------------------
     14. PESUP — ADMISSION
     ------------------------------------------------------------ */
  var pesupAdmission = {
    conditions: [
      { titre: "Baccalauréat ou équivalent", texte: "Être titulaire du baccalauréat malien ou d’un diplôme équivalent reconnu." },
      { titre: "Intérêt pour les sciences de la santé", texte: "Les candidats doivent justifier d’un intérêt pour les sciences de la santé et les métiers soignants." },
      { titre: "Entretien", texte: "Un entretien de motivation peut être organisé pour l’accès aux formations. Sa date est communiquée par l’école." }
    ],
    pieces: [
      "Copie certifiée du baccalauréat et des relevés de notes",
      "Fiche individuelle de candidature",
      "Deux (2) photos d’identité",
      "Copie de la pièce d’identité en cours de validité",
      "Certificat d’aptitude physique requis pour les formations concernées"
    ],
    etapes: [
      { titre: "Prise de contact", texte: "Se rapprocher de l’administration de la PESUP-Santé pour obtenir les informations sur la formation visée." },
      { titre: "Dépôt du dossier", texte: "Déposer le dossier complet auprès du secrétariat de l’école." },
      { titre: "Entretien", texte: "Passer l’entretien de motivation lorsqu’il est prévu par la filière." },
      { titre: "Confirmation et inscription", texte: "Recevoir la notification puis procéder aux formalités d’inscription." }
    ],
    faq: [
      { q: "Les inscriptions sont-elles ouvertes ?", r: "L’ouverture et la clôture des inscriptions font l’objet d’un communiqué affiché à l’école et publié sur ce site." },
      { q: "Les stages sont-ils obligatoires ?", r: "Les stages font partie intégrante de la formation. Leur organisation est assurée par l’école ; les modalités sont précisées par la filière." },
      { q: "Quels diplômes sont délivrés ?", r: "Le diplôme délivré est précisé sur la fiche descriptive de chaque formation publiée sur ce site." }
    ]
  };

  /* ------------------------------------------------------------
     15. PESUP — ÉVÉNEMENTS & ACTIVITÉS
     ------------------------------------------------------------ */
  var pesupEvenements = [
    { id: "journee-sante", date: "2026-11-12", titre: "Journée de la santé", texte: "Une journée consacrée à la santé, ouverte aux étudiants et aux écoles partenaires." },
    { id: "formation-continue", date: "2026-10-08", titre: "Semaine de la formation continue", texte: "Sessions de mise à jour des connaissances ouvertes aux professionnels de santé." },
    { id: "fin-annee", date: "2026-06-18", titre: "Cérémonie de fin d’année", texte: "Remise des attestations et temps d’échange entre promotions." },
    { id: "journee-sante-nationale", date: "2026-05-24", titre: "Journée nationale de la santé", texte: "Participation des étudiants aux activités de sensibilisation et de dépistage." }
  ];

  var pesupActivites = [
    { titre: "Activité académique", icone: "cap", texte: "Ateliers, travaux pratiques et évaluations qui structurent le quotidien des étudiants de l’école." },
    { titre: "Stages en milieu de soins", icone: "cross", texte: "Immersions encadrées dans les structures de santé pour mettre en pratique les acquis de la formation." },
    { titre: "Activités de santé publique", icone: "heart", texte: "Sensibilisation, prévention et campagnes de santé menées avec l’appui des partenaires." },
    { titre: "Recherche et formation continue", icone: "flask", texte: "Travaux de recherche et sessions de mise à jour des connaissances ouvertes aux professionnels." }
  ];

  var pesupServices = [
    { titre: "Scolarité", icone: "cap", texte: "Inscriptions, dossiers, convocations et organisation des examens." },
    { titre: "Pédagogie", icone: "book", texte: "Organisation des enseignements, emplois du temps et suivi des promotions." },
    { titre: "Stages", icone: "cross", texte: "Conventionnement, placement et encadrement des stages cliniques." },
    { titre: "Sciences et laboratoires", icone: "flask", texte: "Travaux pratiques, gestion des laboratoires et sécurité des manipulations." }
  ];

  /* ------------------------------------------------------------
     16. CATÉGORIES DE FILTRES
     Le premier élément de chaque catalogue est le filtre « tout
     afficher » : son identifiant reste vide, valeur que l'interface
     considère comme l'absence de filtre.
     ------------------------------------------------------------ */
  return {
    site: site,
    chiffres: chiffres,
    departements: departements,
    valeurs: valeurs,
    infrastructures: infrastructures,
    services: services,
    gouvernance: gouvernance,
    formations: formations,
    actualites: actualites,
    evenements: evenements,
    galeriePesup: galeriePesup,
    pesupFormations: pesupFormations,
    pesupChiffres: pesupChiffres,
    pesupActivites: pesupActivites,
    pesupServices: pesupServices,
    pesupEvenements: pesupEvenements,
    admissions: admissions,
    pesupAdmission: pesupAdmission,

    categories: [
      { id: "", label: "Tous" },
      { id: "licence", label: "Licence" },
      { id: "master", label: "Master" },
      { id: "pro", label: "Formations professionnelles" },
      { id: "continue", label: "Formations continues" }
    ],

    categoriesActualites: [
      { id: "", label: "Tous" },
      { id: "communiques", label: "Communiqués" },
      { id: "evenements", label: "Événements" },
      { id: "informations", label: "Informations" },
      { id: "vie-universitaire", label: "Vie universitaire" }
    ],

    categoriesGalerie: [
      { id: "", label: "Toutes" },
      { id: "campus", label: "Campus" },
      { id: "formations", label: "Formations" },
      { id: "evenements", label: "Événements" },
      { id: "vie-etudiante", label: "Vie étudiante" },
      { id: "activites", label: "Activités de santé" }
    ]
  };
})();
