//https://nextjs.org/docs/app/building-your-application/testing/vitest

import Link from "next/link";

export default function Exo15() {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold" data-testid="mainHeading">
        Exercice 15
      </h1>
      <Link
        data-testid="backToHome"
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
