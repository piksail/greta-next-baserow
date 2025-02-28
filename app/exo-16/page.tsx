"use client";

import Link from "next/link";
import { create } from "zustand";
import UserStoreReader from "./components/user-store-reader";
import UserPreferredTags from "./components/user-preferred-tags";

export const usePreferredTagsStore = create<{
  preferredTags: string[];
  updateTags: (tags: string[]) => void;
}>((set) => ({
  preferredTags: [],
  updateTags: (tags: string[]) => set({ preferredTags: tags }),
}));

export default function Exo16() {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 16</h1>
      <UserStoreReader />
      <UserPreferredTags />
      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
