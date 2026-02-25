import { Exercise } from "@/types";
import NextLink from "next/link";
import { Card, Chip } from "@heroui/react";
import { linkVariants } from "@heroui/styles";

const exercices: Exercise[] = [
  // Next.js
  {
    slug: "pages-with-layout",
    description:
      "Création d'un projet Next.js avec une page d'accueil et deux sous-pages.",
    conditions: [
      "Les sous-pages doivent partager un layout",
      "Les sous-pages doivent avoir un lien vers la page d'accueil",
    ],
    keywords: ["Next.js", "page"],
  },
  {
    slug: "vercel-deploy",
    description:
      "Créer votre site web personnel en utilisant Next.js et le déployer en production (ou en URL temporaire) à l'aide de Vercel.",
    conditions: [
      "Le site doit être généré statiquement donc utiliser Next.js en SSG",
      "Le site doit reprendre les informations de votre CV (expérience professionnelle, formation, projets, ...)",
      "Le site doit reprendre l'identité visuelle de votre CV (couleurs, font, ...)",
    ],
    keywords: ["GitHub", "Vercel", "Tailwind"],
  },
  {
    slug: "github-pages-deploy",
    description:
      "Créer votre site web personnel en utilisant Next.js et le déployer en production (ou en URL temporaire) à l'aide de GitHub Pages.",
    conditions: [
      "Le site doit être généré statiquement donc utiliser Next.js en SSG",
      "Le site doit reprendre les informations de votre CV (expérience professionnelle, formation, projets, ...)",
      "Le site doit reprendre l'identité visuelle de votre CV (couleurs, font, ...)",
    ],
    keywords: ["GitHub", "Vercel", "Tailwind"],
  },
  {
    slug: "tooling-with-linter-formatter",
    description:
      "Installer ESlint et Prettier et mettre en place le format-on-save sur son IDE.",
    conditions: [
      "Le formattage d'un fichier doit pouvoir se faire à chaque Ctrl+S",
    ],
    keywords: ["ESlint", "Prettier"],
  },
  {
    slug: "ui-library",
    description: "Mettre en place une librairie de composants UI.",
    conditions: [
      "Le choix de la librairie est libre, mais la version de Next.js étant récente, shadcn a été choisi pour la correction, car il est compatible Next.js v15 et Tailwind v4",
    ],
    keywords: ["Shadcn/ui", "MUI", "HeroUI"],
  },
  {
    slug: "theme-switch",
    description:
      "Utiliser Tailwind pour définir des classes pour thème sombre.",
    conditions: [
      "Le thème doit pouvoir alterner entre clair et sombre au clic d'un bouton",
    ],
    keywords: ["Tailwind"],
  },
  {
    slug: "tests",
    description: "Mettre en place une suite de tests unitaires.",
    conditions: [
      "Les tests doivent pouvoir se lancer via une commande npm run test",
    ],
    keywords: ["Vitest"],
  },
  // React
  {
    slug: "use-state-color",
    description:
      "Création d'une carte dont la couleur de fond change en fonction d'un input utilisateur.",
    conditions: [
      "L'input doit être réactif, c'est à dire que la couleur doit changer sans avoir à cliquer sur un bouton",
    ],
    keywords: ["useState"],
  },
  {
    slug: "use-context-tags",
    description: "Enregistrer une liste de string dans un contexte.",
    conditions: ["La liste doit être modifiable par un enfant du contexte"],
    keywords: ["useState", "useContext"],
  },
  {
    slug: "USE_REDUCER_TAGS",
    description: "Idem exercice précédent, mais en utilisant useReducer.",
    conditions: ["La liste doit être modifiable par un enfant du contexte"],
    keywords: ["useContext", "useReducer"],
  },
  {
    slug: "ZUSTAND_TAGS",
    description: "Idem exercice précédent, mais en utilisant Zustand.",
    conditions: [
      "La liste doit être modifiable par un enfant du store",
      "La liste doit être enregistrée dans le local storage",
    ],
    keywords: ["Zustand"],
  },
  // Fullstack
  {
    slug: "BASEROW_GET",
    description: "Afficher une liste de formations créées depuis Baserow.",
    conditions: [
      "Créer un compte Baserow",
      "Définir une base de données avec une table pour les formations",
      "Une formation doit avoir à minima un nom et une date de début",
      "Définir un database token et autoriser la lecture uniquement",
    ],
    keywords: ["useQuery", "Baserow"],
  },
  {
    slug: "BASEROW_GET_FILTER",
    description:
      "Idem exercice précédent, mais en rendant la liste filtrable à partir d'une liste de tags créés aussi depuis Baserow.",
    conditions: [
      "Créer un compte Baserow",
      "Définir une base de données avec une table pour les formations et une autre pour les tags",
      "Une formation doit avoir à minima un nom et une date de début ainsi qu'une liste de tags, un tag n'a qu'un nom",
      "Le filtrage doit se faire à partir de checkboxes",
    ],
    keywords: ["useQuery", "Baserow"],
  },
  {
    slug: "BASEROW_AUTH",
    description: "Se connecter en utilisant l'API de Baserow.",
    conditions: [
      "Créer un compte Baserow",
      "Se connecter en fournissant un email et un mot de passe",
      "Stocker le résultat dans le session storage",
    ],
    keywords: ["useMutation", "Baserow"],
  },
  {
    slug: "BASEROW_AUTH_CREATE",
    description:
      "En tant qu'utilisateur authentifié sur Baserow, ajouter une nouvelle formation.",
    conditions: [
      "Créer un compte Baserow",
      "Se connecter en fournissant un email et un mot de passe",
      "Créer un formulaire avec react-hook-form",
      "Ajouter une formation en utilisant le formulaire et la session utilisateur",
    ],
    keywords: ["useMutation", "Baserow", "react-hook-form", "axios"],
  },
  {
    slug: "BASEROW_AUTH_DELETE",
    description:
      "En tant qu'utilisateur authentifié sur Baserow, afficher une liste de formations et les rendre supprimables.",
    conditions: [
      "Créer un compte Baserow",
      "Se connecter en fournissant un email et un mot de passe",
      "Afficher les formations en utilisant l'API générée par Baserow (autorisant la lecture uniquement)",
      "Supprimer une formation en utilisant la session utilisateur",
    ],
    keywords: ["useQuery", "useMutation", "Baserow"],
  },
  {
    slug: "BASEROW_AUTH_UPDATE",
    description:
      "En tant qu'utilisateur authentifié sur Baserow, éditer une formation.",
    conditions: [
      "Créer un compte Baserow",
      "Se connecter en fournissant un email et un mot de passe",
      "Créer un formulaire avec Formik",
      "Editer une formation en utilisant le formulaire et la session utilisateur",
      "Le choix de la formation à éditer doit se faire via un select",
    ],
    keywords: ["useMutation", "Baserow", "Formik"],
  },
  {
    slug: "TS_TYPING",
    description:
      "Utiliser TypeScript pour typer le modèle de vos tables Baserow ainsi que le résultat des appels API Baserow.",
    conditions: [
      "Limiter le copier-coller : les types (ou interfaces) doivent pouvoir étendre d'autres types (ou interfaces)",
      "Un type doit pouvoir accepter un autre type en paramètre",
    ],
    keywords: ["TS", "Baserow"],
  },
  {
    slug: "BASEROW_COURSE_REGISTRATION",
    description: "S'inscrire à une formation.",
    conditions: [
      "Définir une base de données avec une table pour les formations et une autre pour les inscriptions",
      "Une formation doit avoir à minima un nom et une date de début",
      "Une inscription doit avoir à minima un email, un nom, un prénom et une référence vers une formation",
      "Créer un formulaire en 3 étapes",
      "La première étape permet de choisir une formation",
      "La seconde étape permet de renseigner ses informations",
      "La dernière étape permet de valider un formulaire et enregistrer l'inscription dans Baserow",
    ],
    keywords: ["Baserow"],
  },
  // TODO set up auth.js provider
  {
    slug: "PROXY",
    description: "Protéger une route.",
    conditions: [
      "Définir une sous-page page privée, accessible uniquement avec authentification",
      "Définir une sous-page publique servant de redirection en cas d'accès à la sous-page privée sans authentification",
      "Le middleware doit rediriger vers la sous-page privée en cas d'accès à la sous-page publique",
    ],
    keywords: ["Baserow", "proxy"],
  },
  {
    slug: "ROUTE_COURSES",
    description:
      "Créer une route API permettant d'accéder à la liste des formations, et une autre permettant d'accéder à une formation pour un ID donné.",
    conditions: [
      "Définir une route /courses",
      "Définir une route /courses/:id",
    ],
    keywords: ["Baserow", "endpoint"],
  },
];

export default function Home() {
  const slots = linkVariants();

  return (
    <div className="">
      <header className="p-8 text-center">
        <h1 className="font-body mt-12 text-5xl">Accueil</h1>
        <p className="text-xl">{exercices.length} exercices</p>
      </header>
      <main className="mx-auto grid max-w-7xl grid-cols-3 gap-8 p-8">
        {exercices.map((exercice) => (
          <Card key={exercice.slug} variant="default" className="rounded-sm">
            <Card.Header>
              <Card.Title className="text-lg">
                Exercice{" "}
                <span className="text-accent italic">{exercice.slug}</span>
              </Card.Title>
              <Card.Description>{exercice.description}</Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="text-muted list-inside list-disc text-sm italic">
                {exercice.conditions?.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="my-8">
                <p className="text-accent-foreground mb-2 text-xs">
                  Outils requis pour l&apos;exercice&nbsp;:
                </p>
                <ul className="flex flex-wrap gap-2">
                  {exercice.keywords.map((kw) => (
                    <li key={kw}>
                      <Chip color="accent" variant="soft">
                        {kw}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Content>
            <Card.Footer>
              <NextLink
                href={`/exercises/${exercice.slug}`}
                className={`${slots.base()}`}
              >
                Voir à la correction
              </NextLink>
            </Card.Footer>
          </Card>
        ))}
      </main>
    </div>
  );
}
