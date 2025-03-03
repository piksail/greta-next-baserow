// https://nextjs.org/docs/pages/building-your-application/authentication#optimistic-checks-with-middleware-optional

import Link from "next/link";

export default function Exo19() {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 19</h1>

      <div className="mt-12 flex justify-center gap-7">
        <Link
          href="/exo-19/sous-page-publique"
          className="inline-block rounded border-2 border-indigo-500 bg-white px-4 py-2 text-2xl font-bold"
        >
          Sous-page publique
        </Link>
        <Link
          href="/exo-19/sous-page-privee"
          className="inline-block rounded border-2 border-indigo-500 bg-white px-4 py-2 text-2xl font-bold"
        >
          Sous-page privée
        </Link>
      </div>
    </main>
  );
}
