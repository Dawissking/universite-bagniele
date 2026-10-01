# Université Bagnélé Diarra — site institutionnel

Site statique de l’**Université Bagnélé Diarra (UBD)** et de son école de santé
(**PESUP-Santé**) : HTML, CSS et JavaScript sans framework. Les pages sont
**générées** par des scripts Node, les données éditoriales sont centralisées
dans un seul fichier.

- 21 pages : `index.html` + `pages/*.html`
- Aucun serveur, aucune dépendance côté navigateur : ouvrir `index.html`
  directement dans le navigateur suffit.

## Structure

| Dossier | Rôle |
| --- | --- |
| `index.html`, `pages/` | Pages **générées** — ne pas les éditer à la main |
| `css/style.css` | Feuille de style unique (design system UBD / PESUP) |
| `js/data.js` | Toutes les données du site (contenus à modifier ici) |
| `js/main.js` | Rendu dynamique, filtres, tiroir de navigation, états dégradés |
| `js/icons.js` | Jeu d’icônes SVG inline |
| `images/` | Visuels du site, optimisés en JPEG |
| `documents/` | Emplacement réservé aux documents officiels de l’établissement |
| `tools/` | Générateurs de pages et contrôles qualité |

## Prérequis

- Node.js 18 ou supérieur, avec npm.

## Installation

```bash
cd tools
npm install
```

## Générer le site

```bash
cd tools
npm run build
```

Le script `build` enchaîne quatre générateurs — `build-ubd.js`,
`build-legal.js`, `build-pesup1.js`, `build-pesup2.js` — qui s’appuient tous
sur `tools/layout.js` (en-tête, navigation, tiroir, pied de page, métadonnées).

> **Toute modification d’une page passe par les générateurs.** Éditer
> directement un fichier `pages/*.html` serait écrasé au prochain
> `npm run build`.

Les chemins de sortie sont résolus par rapport au projet : le script fonctionne
depuis n’importe quel répertoire (`node tools/build-ubd.js`).

## Contrôles qualité

```bash
cd tools
npm run check
```

16 étapes, toutes attendues au vert :

1. Syntaxe JavaScript
2. Intégrité du texte
3. Gabarits résolus
4. Audit liens et assets
5. Images : fichiers, ratios, `alt`
6. Contrats HTML
7. Accessibilité
8. Variables CSS
9. Classes CSS
10. Taille des icônes
11. Pied de page
12. Contraste des textes
13. Pages de détail
14. Interactions
15. Exécution dans le DOM
16. Codes de sortie

Chaque contrôle est également exécutable isolément :
`npm run interactions`, `npm run contrast`, `npm run images`,
`npm run placeholders`, `npm run components`.
Depuis la racine : `node tools/check-all.js`.

## Modifier les contenus

Tout le contenu éditorial se trouve dans `js/data.js` : services, départements,
formations, actualités, événements, gouvernance, galerie, admissions, contenus
PESUP-Santé. Ajouter une actualité ou une formation s’y fait en ajoutant un
objet, puis :

```bash
cd tools
npm run build && npm run check
```

### Conventions de rigueur

- **`null` = information non encore communiquée.** L’interface affiche
  « En cours de consolidation » plutôt qu’un chiffre ou un contact inventé.
- **Ne jamais fabriquer** un chiffre, un tarif, une date officielle ou un
  document téléchargeable : l’état dégradé est toujours préférable à une
  donnée fausse.
- Les statuts d’événement (« À venir » / « Passé ») sont **calculés à
  l’affichage**, jamais figés dans les données.
- L’ordre d’affichage est imposé par le rendu (actualités du plus récent au
  plus ancien, événements à venir d’abord) : il ne dépend pas de l’ordre du
  fichier de données.
- Chaque visuel porte un `alt` descriptif en français, sans nom d’auteur ni
  mention de licence.
- Les libellés de filtre utilisent `label` (ou `nom`) ; les pages détail
  d’un identifiant inconnu affichent un état « introuvable » unique et un lien
  de retour.
