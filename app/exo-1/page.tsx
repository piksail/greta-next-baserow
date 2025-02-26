import Link from "next/link";

export default function Exo1() {
  return (
    <>
      <h1 className="text-7xl font-bold">Exercice 1</h1>
      <div className="flex justify-center gap-2">
        <Link
          href="/exo-1/sous-page-1/"
          className="mt-12 inline-block rounded border-2 border-indigo-500 bg-white px-4 py-2 text-2xl font-bold"
        >
          Aller à la sous-page 1
        </Link>
        <Link
          href="/exo-1/sous-page-2/"
          className="mt-12 inline-block rounded border-2 border-indigo-500 bg-white px-4 py-2 text-2xl font-bold"
        >
          Aller à la sous-page 2
        </Link>
      </div>
    </>
  );
}
