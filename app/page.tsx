import Link from "next/link";

export default function Home() {
  const exercices = [
    {
      id: 1,
      description:
        "Création d'un projet Next.js avec une page d'accueil et deux sous-pages.",
      conditions: [
        "Les sous-pages doivent partager un layout",
        "Les sous-pages doivent avoir un lien vers la page d'accueil",
      ],
      keywords: ["Next.js", "page"],
    },
    {
      id: 2,
      description:
        "Création d'une carte dont la couleur de fond change en fonction d'un input utilisateur.",
      conditions: [
        "L'input doit être réactif, c'est à dire que la couleur doit changer sans avoir à cliquer sur un bouton",
      ],
      keywords: ["useState"],
    },
    {
      id: 3,
      description: "Enregistrer une liste de string dans un contexte.",
      conditions: ["La liste doit être modifiable par un enfant du contexte"],
      keywords: ["useState", "useContext"],
    },
    {
      id: 4,
      description: "Idem exercice 3, mais en utilisant useReducer.",
      conditions: ["La liste doit être modifiable par un enfant du contexte"],
      keywords: ["useContext", "useReducer"],
    },
    {
      id: 5,
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
      id: 6,
      description:
        "Idem exercice 5, mais en rendant la liste filtrable à partir d'une liste de tags créés aussi depuis Baserow.",
      conditions: [
        "Créer un compte Baserow",
        "Définir une base de données avec une table pour les formations et une autre pour les tags",
        "Une formation doit avoir à minima un nom et une date de début ainsi qu'une liste de tags, un tag n'a qu'un nom",
        "Le filtrage doit se faire à partir de checkboxes",
      ],
      keywords: ["useQuery", "Baserow"],
    },
    {
      id: 7,
      description: "Se connecter en utilisant l'API de Baserow.",
      conditions: [
        "Créer un compte Baserow",
        "Se connecter en fournissant un email et un mot de passe",
        "Stocker le résultat dans le session storage",
      ],
      keywords: ["useMutation", "Baserow"],
    },
    {
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
      description:
        "Installer ESlint et Prettier et mettre en place le format-on-save sur son IDE.",
      conditions: [
        "Le formattage d'un fichier doit pouvoir se faire à chaque Ctrl+S",
      ],
      keywords: ["ESlint", "Prettier"],
    },
    {
      id: 12,
      description:
        "Créer votre site web perso en utilisant Next.js et le déployer en production (ou en URL temporaire) à l'aide de Vercel.",
      conditions: [
        "Le site doit être généré statiquement donc utiliser Next.js en SSG",
        "Le site doit reprendre les informations de votre CV (expérience professionnelle, formation, projets, ...)",
        "Le site doit reprendre l'identité visuelle de votre CV (couleurs, font, ...)",
      ],
      keywords: ["GitHub", "Vercel", "Tailwind"],
    },
    {
      id: 13,
      description:
        "Utiliser Tailwind pour définir des classes pour thème sombre.",
      conditions: [
        "Le thème doit pouvoir alterner entre clair et sombre au clic d'un bouton",
      ],
      keywords: ["Tailwind"],
    },
    {
      id: 14,
      description:
        "Utiliser TypeScript pour typer le modèle de vos tables Baserow ainsi que le résultat des appels API Baserow.",
      conditions: [
        "Limiter le copier-coller : les types (ou interfaces) doivent pouvoir étendre d'autres types (ou interfaces)",
        "Un type doit pouvoir accepter un autre type en paramètre",
      ],
      keywords: ["TS", "Baserow"],
    },
    {
      id: 15,
      description: "Mettre en place une suite de tests unitaires.",
      conditions: [
        "Les tests doivent pouvoir se lancer via une commande npm run test",
      ],
      keywords: ["Vitest"],
    },
    {
      id: 16,
      description: "Idem exercice 3, mais en utilisant Zustand.",
      conditions: [
        "La liste doit être modifiable par un enfant du store",
        "La liste doit être enregistrée dans le local storage",
      ],
      keywords: ["Zustand"],
    },
    {
      id: 17,
      description: "Mettre en place une librairie de composants UI.",
      conditions: [
        "Le choix de la librairie est libre, mais la version de Next.js étant récente, shadcn a été choisi pour la correction, car il est compatible Next.js v15 et Tailwind v4",
      ],
      keywords: ["Shadcn/ui"],
    },
    {
      id: 18,
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
    {
      id: 19,
      description: "Protéger une route.",
      conditions: [
        "Définir une sous-page page privée, accessible uniquement avec authentification",
        "Définir une sous-page publique servant de redirection en cas d'accès à la sous-page privée sans authentification",
        "Le middleware doit rediriger vers la sous-page privée en cas d'accès à la sous-page publique",
      ],
      keywords: ["Baserow", "middleware"],
    },
  ];

  return (
    <div className="">
      <header className="p-7 text-center">
        <h1 className="font-display mt-12 text-8xl">Accueil</h1>
        <p className="text-3xl">{exercices.length} exercices</p>
      </header>
      <nav className="mx-auto grid max-w-7xl grid-cols-3 gap-7 p-7">
        {exercices.map((exercice) => (
          <div
            key={exercice.id}
            className="flex flex-col gap-7 rounded bg-indigo-500 p-8 text-xl text-white"
          >
            <h2 className="text-4xl">Exercice {exercice.id}</h2>
            <p className="">{exercice.description}</p>
            <ul className="list-inside list-disc text-base italic">
              {exercice.conditions?.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <div>
              <p className="mb-2">Outils requis pour l&apos;exercice&nbsp;:</p>
              <ul className="flex flex-wrap gap-2 text-sm uppercase">
                {exercice.keywords.map((kw) => (
                  <li key={kw} className="border-[1px] border-white px-2 py-1">
                    {kw}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/exo-${exercice.id}`}
              className="mt-auto ml-auto inline-block w-fit rounded bg-white px-4 py-2 text-2xl font-bold text-indigo-500"
            >
              Aller à l&apos;exercice
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
