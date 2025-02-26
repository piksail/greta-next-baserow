"use client";

import Link from "next/link";
import UserPreferredTags from "./components/user-preferred-tags";
import { PreferredTagsProvider } from "./context";

export default function Exo3() {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 3</h1>
      <PreferredTagsProvider>
        <UserPreferredTags />
      </PreferredTagsProvider>
      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
