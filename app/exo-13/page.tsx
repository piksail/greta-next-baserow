"use client";

import Link from "next/link";
import { useState } from "react";

export default function Exo13() {
  const [isDark, setIsDark] = useState(false);

  return (
    <main
      className="mx-auto max-w-7xl p-12 text-center dark:bg-indigo-950"
      data-theme={isDark ? "dark" : "light"}
    >
      <h1 className="text-7xl font-bold dark:text-indigo-200">Exercice 13</h1>

      <button
        className="mx-auto mt-12 block cursor-pointer rounded border-2 border-indigo-500 px-4 py-2 text-2xl font-bold text-indigo-900 dark:border-indigo-900 dark:text-indigo-300"
        onClick={() => setIsDark(!isDark)}
      >
        Basculer sur le thème {isDark ? "clair" : "sombre"}
      </button>

      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white dark:bg-indigo-900 dark:text-indigo-300"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
