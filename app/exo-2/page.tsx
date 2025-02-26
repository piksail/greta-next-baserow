import Link from "next/link";
import ColorEditableCard from "./components/color-editable-card";

export default function Exo2() {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 2</h1>
      <ColorEditableCard />
      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
