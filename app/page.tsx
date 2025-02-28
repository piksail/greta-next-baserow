import Link from "next/link";

export default function Home() {
  const exercices = [
    {
      id: 1,
      description:
        "Création d'un projet Next.js avec une page d'accueil et deux sous-pages partageant un layout avec un lien vers la page d'accueil.",
      keywords: ["Next.js", "page"],
    },
    {
      id: 2,
      description:
        "Création d'une carte dont la couleur de fond change en fonction d'un input utilisateur.",
      keywords: ["useState"],
    },
    {
      id: 3,
      description:
        "Enregistrer une liste de string dans un contexte et les modifier.",
      keywords: ["useState", "useContext"],
    },
    {
      id: 4,
      description: "Idem exercice 3, mais en passant par un state manager.",
      keywords: ["useContext", "useReducer"],
    },
    {
      id: 5,
      description: "Afficher une liste de formations créées depuis Baserow.",
      keywords: ["useQuery", "Baserow"],
    },
    {
      id: 6,
      description:
        "Afficher une liste de formations créées depuis Baserow et les filtrer à partir d'une liste de tags créés aussi depuis Baserow.",
      keywords: ["useQuery", "Baserow"],
    },
    {
      id: 7,
      description:
        "Se connecter en utilisant l'API de Baserow et stocker le résultat dans le session storage.",
      keywords: ["useMutation", "Baserow"],
    },
    {
      id: 8,
      description:
        "En tant qu'utilisateur authentifié sur Baserow, afficher une liste de formations et les supprimer.",
      keywords: ["useQuery", "useMutation", "Baserow"],
    },
    {
      id: 9,
      description:
        "En tant qu'utilisateur authentifié sur Baserow, ajouter une nouvelle formation.",
      keywords: ["useMutation", "Baserow", "react-hook-form", "axios"],
    },
    {
      id: 10,
      description:
        "En tant qu'utilisateur authentifié sur Baserow, éditer une formation.",
      keywords: ["useMutation", "Baserow", "Formik"],
    },
  ];

  return (
    <div className="">
      <header className="p-7 text-center">
        <h1 className="font-display mt-12 text-8xl">Accueil</h1>
        <p className="text-3xl">{exercices.length} exercices</p>
      </header>
      <nav className="mx-auto grid max-w-7xl grid-cols-3 gap-7">
        {exercices.map((exercice) => (
          <div
            key={exercice.id}
            className="flex flex-col gap-7 rounded bg-indigo-500 p-8 text-xl text-white"
          >
            <h2 className="text-4xl">Exercice {exercice.id}</h2>
            <p className="">{exercice.description}</p>
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
